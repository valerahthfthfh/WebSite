"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let AppService = class AppService {
    FIREBASE_URL = 'https://dataform-a57ff-default-rtdb.asia-southeast1.firebasedatabase.app';
    GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwlNH38uZ50j_nHIAL1eZy6zrfiX19v56UBB3n2J0VuK_sPxZg2Pg8Dx1lD9AxaZxpd/exec';
    BOT_TOKEN = '8033399130:AAGI_89YLNq-FBrD5CacJK0bBSqtC7hwSdc';
    ADMIN_ID = '804822685';
    async handleRequest(data) {
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
        }
        catch (error) {
            console.error('=== ОШИБКА ОБРАБОТКИ ===');
            console.error('Сообщение:', error.message);
            return {
                success: false,
                message: 'Ошибка при отправке заявки',
            };
        }
    }
    async saveToFirebase(data) {
        const url = `${this.FIREBASE_URL}/applications/${data.id}.json`;
        console.log('Firebase URL:', url);
        const response = await axios_1.default.put(url, data);
        console.log('Firebase ответ:', response.status);
    }
    async sendToGoogleSheets(name, phone, comment) {
        const params = new URLSearchParams();
        params.append('name', name);
        params.append('phone', phone);
        params.append('comment', comment || '');
        const response = await axios_1.default.post(this.GOOGLE_SHEETS_URL, params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        console.log('Google Sheets ответ:', response.data);
    }
    async sendToTelegram(name, phone, comment, applicationId) {
        const date = new Date();
        const timeNow = date.toLocaleTimeString('ru-RU');
        const dateNow = date.toLocaleDateString('ru-RU');
        const message = `НОВАЯ ЗАЯВКА С САЙТА

Имя: ${name}
Телефон: ${phone}
Комментарий: ${comment || 'Не указан'}
ID: ${applicationId}
Дата: ${dateNow}
Время: ${timeNow}`;
        const response = await axios_1.default.post(`https://api.telegram.org/bot${this.BOT_TOKEN}/sendMessage`, {
            chat_id: this.ADMIN_ID,
            text: message,
            parse_mode: 'HTML',
        });
        console.log('Telegram ответ:', response.data.ok);
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map