export declare class AppService {
    private readonly FIREBASE_URL;
    private readonly GOOGLE_SHEETS_URL;
    private readonly BOT_TOKEN;
    private readonly ADMIN_ID;
    handleFullRequest(data: any): Promise<any>;
    handlePhoneOnlyRequest(data: any): Promise<any>;
    private saveToFirebase;
    private savePhoneToFirebase;
    private sendToGoogleSheets;
    private sendToTelegramFull;
    private sendToTelegramPhoneOnly;
}
