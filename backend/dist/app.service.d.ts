export declare class AppService {
    private readonly FIREBASE_URL;
    private readonly GOOGLE_SHEETS_URL;
    private readonly BOT_API_URL;
    handleFullRequest(data: any): Promise<any>;
    handlePhoneOnlyRequest(data: any): Promise<any>;
    private saveToFirebase;
    private savePhoneToFirebase;
    private sendToGoogleSheets;
    private sendToBotEndpoint;
    private sendToTelegramDirect;
}
