import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  private readonly FIREBASE_URL = 'https://dataform-a57ff-default-rtdb.asia-southeast1.firebasedatabase.app';
  private readonly GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxn4WNchvPajG2R63BfuyIW9vmbz2tK3TZqWaMH6Tg2IJJIfyrjruMRJJyCn1SPjjTb/exec';
  private readonly BOT_TOKEN = '8033399130:AAGI_89YLNq-FBrD5CacJK0bBSqtC7hwSdc';
  private readonly ADMIN_ID = '804822685';

  async handleRequest(data: any): Promise<any> {
    const { name, phone, comment } = data;

    if (!name || !phone) {
      return { success: false, message: 'Заполните имя и телефон' };
    }

    try {
      console.log('=== НАЧАЛО ОБРАБОТКИ ===');
      
      // 1. Генерируем ID для заявки
      const applicationId = `app_${Date.now()}`;
      console.log('ID заявки:', applicationId);
      
      // 2. Подготавливаем данные для Firebase (ОРИГИНАЛЬНЫЕ данные)
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
      
      // 3. Сохраняем ОРИГИНАЛЬНЫЕ данные в Firebase
      console.log('Сохранение в Firebase...');
      await this.saveToFirebase(firebaseData);
      console.log('Firebase сохранено');
      
      // 4. Отправляем ОРИГИНАЛЬНЫЕ данные в Google Sheets
      console.log('Отправка в Google Sheets...');
      await this.sendToGoogleSheets(name, phone, comment);
      console.log('Google Sheets отправлено');
      
      // 5. Отправляем ОРИГИНАЛЬНЫЕ данные в Telegram
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

  // Сохранение ОРИГИНАЛЬНЫХ данных в Firebase
  private async saveToFirebase(data: any): Promise<void> {
    const url = `${this.FIREBASE_URL}/applications/${data.id}.json`;
    console.log('Firebase URL:', url);
    
    const response = await axios.put(url, data);
    console.log('Firebase ответ:', response.status);
  }

  // Отправка ОРИГИНАЛЬНЫХ данных в Google Sheets
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

  // Отправка ОРИГИНАЛЬНЫХ данных в Telegram
  private async sendToTelegram(name: string, phone: string, comment: string, applicationId: string): Promise<void> {
    const date = new Date();
    const timeNow = date.toLocaleTimeString('ru-RU');
    const dateNow = date.toLocaleDateString('ru-RU');

    const message = `НОВАЯ ЗАЯВКА С САЙТА❤

Имя: ${name}
Телефон: ${phone}
Комментарий: ${comment || 'Не указан'}
ID: ${applicationId}
Дата: ${dateNow}
Время: ${timeNow}`;

    const response = await axios.post(
      `https://api.telegram.org/bot${this.BOT_TOKEN}/sendMessage`,
      {
        chat_id: this.ADMIN_ID,
        text: message,
        parse_mode: 'HTML',
      }
    );
    
    console.log('Telegram ответ:', response.data.ok);
  }
}