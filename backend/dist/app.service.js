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
    GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxn4WNchvPajG2R63BfuyIW9vmbz2tK3TZqWaMH6Tg2IJJIfyrjruMRJJyCn1SPjjTb/exec';
    BOT_API_URL = 'http://localhost:5001/send_application';
    async handleFullRequest(data) {
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
        }
        catch (error) {
            console.error('❌ Ошибка полной заявки:', error.message);
            return {
                success: false,
                message: 'Ошибка при отправке заявки',
            };
        }
    }
    async handlePhoneOnlyRequest(data) {
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
            }
            catch (sheetsError) {
                console.log('⚠️ Google Sheets недоступен, продолжаем...');
            }
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
        }
        catch (error) {
            console.error('❌ Ошибка отправки номера:', error.message);
            return {
                success: false,
                message: 'Ошибка при отправке номера',
            };
        }
    }
    async saveToFirebase(id, data) {
        const url = `${this.FIREBASE_URL}/applications/${id}.json`;
        await axios_1.default.put(url, data);
        console.log('🔥 Firebase: данные сохранены');
    }
    async savePhoneToFirebase(id, data) {
        const url = `${this.FIREBASE_URL}/phone-requests/${id}.json`;
        await axios_1.default.put(url, data);
        console.log('🔥 Firebase: телефон сохранен');
    }
    async sendToGoogleSheets(name, phone, comment) {
        try {
            const params = new URLSearchParams();
            params.append('name', name || '');
            params.append('phone', phone);
            params.append('comment', comment || '');
            console.log('📊 Отправка в Google Sheets:', params.toString());
            const response = await axios_1.default.post(this.GOOGLE_SHEETS_URL, params.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            console.log('📊 Google Sheets ответ:', response.data);
        }
        catch (error) {
            console.error('❌ Ошибка Google Sheets:', error.message);
            throw error;
        }
    }
    async sendToBotEndpoint(data) {
        try {
            const date = new Date();
            const timeNow = date.toLocaleTimeString('ru-RU');
            const dateNow = date.toLocaleDateString('ru-RU');
            let applicationData = {};
            if (data.type === 'full') {
                applicationData = {
                    'ФИО': data.name,
                    'Телефон': data.phone,
                    'Комментарий': data.comment || 'Не указан',
                    'Дата/Время': `${dateNow}, ${timeNow}`
                };
            }
            else {
                applicationData = {
                    'Телефон': data.phone,
                    'Тип заявки': 'Только телефон',
                    'Дата/Время': `${dateNow}, ${timeNow}`
                };
            }
            console.log('📤 Отправка заявки в бот:', applicationData);
            console.log('📤 URL бота:', this.BOT_API_URL);
            const response = await axios_1.default.post(this.BOT_API_URL, applicationData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 5000
            });
            console.log('🤖 Ответ от бота:', response.data);
        }
        catch (error) {
            console.error('❌ Ошибка отправки в бот:', error.message);
            try {
                await this.sendToTelegramDirect(data);
            }
            catch (fallbackError) {
                console.error('❌ Ошибка запасной отправки:', fallbackError.message);
            }
        }
    }
    async sendToTelegramDirect(data) {
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
        }
        else {
            message = `🔥 <b>НОВАЯ ЗАЯВКА С САЙТА</b> 🔥

<b>Телефон:</b> <code>${data.phone}</code>
<b>Тип:</b> Только телефон
<b>Дата/Время:</b> ${dateNow}, ${timeNow}

⚠️ Отправлено только главному администратору (ошибка массовой рассылки)`;
        }
        const response = await axios_1.default.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: ADMIN_ID,
            text: message,
            parse_mode: 'HTML',
        });
        console.log('📢 Запасная отправка в Telegram:', response.data);
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map