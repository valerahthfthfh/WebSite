import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  private readonly FIREBASE_URL = 'https://dataform-a57ff-default-rtdb.asia-southeast1.firebasedatabase.app';
  private readonly GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxn4WNchvPajG2R63BfuyIW9vmbz2tK3TZqWaMH6Tg2IJJIfyrjruMRJJyCn1SPjjTb/exec';
  
  private readonly BOT_API_URL = 'http://192.168.1.83:5001/send_application';

  async handleFullRequest(data: any): Promise<any> {
    const { name, phone, comment } = data;

    if (!name || !phone) {
      return { success: false, message: 'Заполните имя и телефон' };
    }

    try {
      
      const applicationId = `app_${Date.now()}`;
      
      await this.saveToFirebase(applicationId, {
        type: 'full',
        name,
        phone,
        comment,
        timestamp: new Date().toISOString()
      });
      
      await this.sendToGoogleSheets(name, phone, comment);
      
      // Отправляем через эндпоинт бота
      await this.sendToBotEndpoint({
        name,
        phone,
        comment,
        type: 'full'
      });
      
      return {
        success: true,
        message: 'Заявка успешно отправлена',
        applicationId,
      };
    } catch (error) {
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
      
      const applicationId = `phone_${Date.now()}`;
      
      await this.savePhoneToFirebase(applicationId, {
        type: 'phone-only',
        phone,
        timestamp: new Date().toISOString()
      });
      
      try {
        await this.sendToGoogleSheets('', phone, '');
      } catch (sheetsError) {
      }
      
      // Отправляем через эндпоинт бота
      await this.sendToBotEndpoint({
        phone,
        type: 'phone-only'
      });
      
      return {
        success: true,
        message: 'Номер отправлен',
        applicationId,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Ошибка при отправке номера',
      };
    }
  }

  private async saveToFirebase(id: string, data: any): Promise<void> {
    const url = `${this.FIREBASE_URL}/applications/${id}.json`;
    await axios.put(url, data);
  }

  private async savePhoneToFirebase(id: string, data: any): Promise<void> {
    const url = `${this.FIREBASE_URL}/phone-requests/${id}.json`;
    await axios.put(url, data);
  }

  private async sendToGoogleSheets(name: string, phone: string, comment: string): Promise<void> {
    try {
      const params = new URLSearchParams();
      params.append('name', name || '');
      params.append('phone', phone);
      params.append('comment', comment || '');

      const response = await axios.post(
        this.GOOGLE_SHEETS_URL,
        params.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      
    } catch (error) {
      throw error;
    }
  }

  private async sendToBotEndpoint(data: any): Promise<void> {
    try {
      const date = new Date();
      const timeNow = date.toLocaleTimeString('ru-RU');
      const dateNow = date.toLocaleDateString('ru-RU');

      // Форматируем данные для отправки в бот
      let applicationData: any = {};

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

      const response = await axios.post(
        this.BOT_API_URL,
        applicationData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 5000 // 5 секунд таймаут
        }
      );
      
    } catch (error) {
      
      // Пробуем отправить напрямую главному админу как запасной вариант
      try {
        await this.sendToTelegramDirect(data);
      } catch (fallbackError) {
      }
    }
  }

  private async sendToTelegramDirect(data: any): Promise<void> {
    // Запасной метод отправки напрямую главному админу
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
<b>Дата/Время:</b> ${dateNow}, ${timeNow}`;
    } else {
      message = `🔥 <b>НОВАЯ ЗАЯВКА С САЙТА</b> 🔥

<b>Телефон:</b> <code>${data.phone}</code>
<b>Тип:</b> Только телефон
<b>Дата/Время:</b> ${dateNow}, ${timeNow}`;
    }

    const response = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: ADMIN_ID,
        text: message,
        parse_mode: 'HTML',
      }
    );
    
  }
}