"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'https://kotloff-frontend.onrender.com',
            'https://kotloff-frontend.onrender.com',
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true,
    });
    const port = process.env.PORT || 5000;
    await app.listen(port);
    console.log(`🚀 Бэкенд запущен на порту ${port}`);
    console.log('✅ CORS разрешен для:');
    console.log('   - http://localhost:3000');
    console.log('   - https://kotloff-frontend.onrender.com');
}
bootstrap();
//# sourceMappingURL=main.js.map