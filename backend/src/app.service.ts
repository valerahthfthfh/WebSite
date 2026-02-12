import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  private readonly FIREBASE_URL = 'https://dataform-a57ff-default-rtdb.asia-southeast1.firebasedatabase.app';
  private readonly GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxn4WNchvPajG2R63BfuyIW9vmbz2tK3TZqWaMH6Tg2IJJIfyrjruMRJJyCn1SPjjTb/exec';
  private readonly BOT_TOKEN = '8033399130:AAGI_89YLNq-FBrD5CacJK0bBSqtC7hwSdc';
  private readonly BOT_API_URL = 'http://localhost:5001'; // порт изменен на 5001

  async handleRequest(data: any): Promise<any> {
    const { name, phone, comment } = data;

    if (!name || !phone) {
      return { success: false, message: 'Заполните имя и телефон' };
    }

    try {
      console.log('=== НАЧАЛО ОБРАБОТКИ ===');
      
      const applicationId = `app_${Date.now()}`;
      console.log('ID заявки:', applicationId);
      
      const firebaseData = {
        id: applicationId,
        name: name.trim(),
        phone: phone.trim(),
        comment: comment || '',
        timestamp: new Date().toISOString(),
        source: 'website',
        status: 'new',
      };
      
      console.log('Данные для Firebase:', firebaseData);
      
      console.log('Сохранение в Firebase...');
      await this.saveToFirebase(firebaseData);
      console.log('Firebase сохранено');
      
      console.log('Отправка в Google Sheets...');
      await this.sendToGoogleSheets(name, phone, comment);
      console.log('Google Sheets отправлено');
      
      console.log('Отправка в Telegram...');
      await this.sendToTelegram(name, phone, comment, applicationId);
      console.log('Telegram отправлено');

      console.log('=== УСПЕШНО ЗАВЕРШЕНО ===');
      return {
        success: true,
        message: 'Заявка успешно отправлена',
        applicationId: applicationId,
      };
    } catch (error) {
      console.error('=== ОШИБКА ОБРАБОТКИ ===');
      console.error('Сообщение:', error.message);
      return {
        success: false,
        message: 'Ошибка при отправке заявки',
      };
    }
  }

  private async saveToFirebase(data: any): Promise<void> {
    const url = `${this.FIREBASE_URL}/applications/${data.id}.json`;
    console.log('Firebase URL:', url);
    
    const response = await axios.put(url, data);
    console.log('Firebase ответ:', response.status);
  }

  private async sendToGoogleSheets(name: string, phone: string, comment: string): Promise<void> {
    const params = new URLSearchParams();
    params.append('name', name);
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
    
    console.log('Google Sheets ответ:', response.data);
  }

  private async getAdmins(): Promise<number[]> {
    try {
      console.log('Запрос списка админов...');
      const response = await axios.get(`${this.BOT_API_URL}/get_admins`, {
        timeout: 5000 // таймаут 5 секунд
      });
      console.log('Получен список админов:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка загрузки админов:', error.message);
      console.log('Использую список админов по умолчанию: [804822685]');
      return [804822685];
    }
  }

  private async sendToTelegram(name: string, phone: string, comment: string, applicationId: string): Promise<void> {
    const date = new Date();
    const dateTime = `${date.toLocaleDateString('ru-RU')}, ${date.toLocaleTimeString('ru-RU')}`;

    const message = `<b>НОВАЯ ЗАЯВКА С САЙТА</b>

<b>ФИО:</b> ${name}
<b>Телефон:</b> <code>${phone}</code>
<b>Комментарий:</b> ${comment || 'Не указан'}
<b>Дата/Время:</b> ${dateTime}`;

    const admins = await this.getAdmins();
    console.log('Отправка уведомлений админам:', admins);
    
    for (const adminId of admins) {
      try {
        await axios.post(
          `https://api.telegram.org/bot${this.BOT_TOKEN}/sendMessage`,
          {
            chat_id: adminId,
            text: message,
            parse_mode: 'HTML',
          }
        );
        console.log(`✅ Уведомление отправлено админу ${adminId}`);
      } catch (error) {
        console.error(`❌ Ошибка отправки админу ${adminId}:`, error.message);
      }
    }
  }
}