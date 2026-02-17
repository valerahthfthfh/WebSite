import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  private readonly FIREBASE_URL = 'https://dataform-a57ff-default-rtdb.asia-southeast1.firebasedatabase.app';
  private readonly GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxn4WNchvPajG2R63BfuyIW9vmbz2tK3TZqWaMH6Tg2IJJIfyrjruMRJJyCn1SPjjTb/exec';
  
  // URL бота для отправки заявок (предполагается, что бот работает на том же сервере)
  private readonly BOT_API_URL = 'http://localhost:5001/send_application';

  async handleFullRequest(data: any): Promise<any> {
    const { name, phone, comment } = data;

    if (!name || !phone) {
      return { success: false, message: 'Заполните имя и телефон' };
    }

    try {
      console.log('📝 Обработка полной заявки:', { name, phone, comment });
      
      const applicationId = `app_${Date.now()}`;
      
      await this.saveToFirebase(applicationId, {
        type: 'full',
        name,
        phone,
        comment,
        timestamp: new Date().toISOString()
      });
      
      await this.sendToGoogleSheets(name, phone, comment);
      
      // Отправляем через эндпоинт бота, чтобы заявка ушла всем администраторам
      await this.sendToBotEndpoint({
        name,
        phone,
        comment,
        type: 'full'
      });

      console.log('✅ Полная заявка успешно обработана');
      
      return {
        success: true,
        message: 'Заявка успешно отправлена',
        applicationId,
      };
    } catch (error) {
      console.error('❌ Ошибка полной заявки:', error.message);
      return {
        success: false,
        message: 'Ошибка при отправке заявки',
      };
    }
  }

  async handlePhoneOnlyRequest(data: any): Promise<any> {
    const { phone } = data;

    if (!phone) {
      return { success: false, message: 'Введите номер телефона' };
    }

    try {
      console.log('📞 Обработка заявки (только телефон):', { phone });
      
      const applicationId = `phone_${Date.now()}`;
      
      await this.savePhoneToFirebase(applicationId, {
        type: 'phone-only',
        phone,
        timestamp: new Date().toISOString()
      });
      
      try {
        await this.sendToGoogleSheets('', phone, '');
      } catch (sheetsError) {
        console.log('⚠️ Google Sheets недоступен, продолжаем...');
      }
      
      // Отправляем через эндпоинт бота, чтобы заявка ушла всем администраторам
      await this.sendToBotEndpoint({
        phone,
        type: 'phone-only'
      });

      console.log('✅ Заявка (только телефон) успешно обработана');
      
      return {
        success: true,
        message: 'Номер отправлен',
        applicationId,
      };
    } catch (error) {
      console.error('❌ Ошибка отправки номера:', error.message);
      return {
        success: false,
        message: 'Ошибка при отправке номера',
      };
    }
  }

  private async saveToFirebase(id: string, data: any): Promise<void> {
    const url = `${this.FIREBASE_URL}/applications/${id}.json`;
    await axios.put(url, data);
    console.log('🔥 Firebase: данные сохранены');
  }

  private async savePhoneToFirebase(id: string, data: any): Promise<void> {
    const url = `${this.FIREBASE_URL}/phone-requests/${id}.json`;
    await axios.put(url, data);
    console.log('🔥 Firebase: телефон сохранен');
  }

  private async sendToGoogleSheets(name: string, phone: string, comment: string): Promise<void> {
    try {
      const params = new URLSearchParams();
      params.append('name', name || '');
      params.append('phone', phone);
      params.append('comment', comment || '');

      console.log('📊 Отправка в Google Sheets:', params.toString());

      const response = await axios.post(
        this.GOOGLE_SHEETS_URL,
        params.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      
      console.log('📊 Google Sheets ответ:', response.data);
    } catch (error) {
      console.error('❌ Ошибка Google Sheets:', error.message);
      throw error;
    }
  }

  private async sendToBotEndpoint(data: any): Promise<void> {
    try {
      const date = new Date();
      const timeNow = date.toLocaleTimeString('ru-RU');
      const dateNow = date.toLocaleDateString('ru-RU');

      // Форматируем данные для отправки
      let applicationData: any = {
        'Дата/Время': `${dateNow}, ${timeNow}`
      };

      if (data.type === 'full') {
        applicationData = {
          'ФИО': data.name,
          'Телефон': data.phone,
          'Комментарий': data.comment || 'Не указан',
          'Дата/Время': `${dateNow}, ${timeNow}`
        };
      } else {
        applicationData = {
          'Телефон': data.phone,
          'Тип заявки': 'Только телефон',
          'Дата/Время': `${dateNow}, ${timeNow}`
        };
      }

      console.log('📤 Отправка заявки через эндпоинт бота:', applicationData);

      const response = await axios.post(
        this.BOT_API_URL,
        applicationData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      console.log('🤖 Бот эндпоинт ответ:', response.data);
    } catch (error) {
      console.error('❌ Ошибка отправки через эндпоинт бота:', error.message);
      
      // Если не удалось отправить через эндпоинт, пробуем отправить напрямую главному админу
      try {
        await this.sendToTelegramDirect(data);
      } catch (fallbackError) {
        console.error('❌ Ошибка fallback отправки:', fallbackError.message);
      }
    }
  }

  private async sendToTelegramDirect(data: any): Promise<void> {
    // Резервный метод отправки напрямую главному админу
    const BOT_TOKEN = '8033399130:AAGI_89YLNq-FBrD5CacJK0bBSqtC7hwSdc';
    const ADMIN_ID = '804822685';

    const date = new Date();
    const timeNow = date.toLocaleTimeString('ru-RU');
    const dateNow = date.toLocaleDateString('ru-RU');

    let message = '';
    if (data.type === 'full') {
      message = `🔥 <b>НОВАЯ ЗАЯВКА С САЙТА</b> 🔥

<b>ФИО:</b> ${data.name}
<b>Телефон:</b> <code>${data.phone}</code>
<b>Комментарий:</b> ${data.comment || 'Не указан'}
<b>Дата/Время:</b> ${dateNow}, ${timeNow}

⚠️ Отправлено только главному администратору (ошибка массовой рассылки)`;
    } else {
      message = `🔥 <b>НОВАЯ ЗАЯВКА С САЙТА</b> 🔥

<b>Телефон:</b> <code>${data.phone}</code>
<b>Тип:</b> Только телефон
<b>Дата/Время:</b> ${dateNow}, ${timeNow}

⚠️ Отправлено только главному администратору (ошибка массовой рассылки)`;
    }

    await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: ADMIN_ID,
        text: message,
        parse_mode: 'HTML',
      }
    );
  }
}