export declare class AppService {
    private readonly FIREBASE_URL;
    private readonly GOOGLE_SHEETS_URL;
    private readonly BOT_TOKEN;
    private readonly BOT_API_URL;
    handleRequest(data: any): Promise<any>;
    private saveToFirebase;
    private sendToGoogleSheets;
    private getAdmins;
    private sendToTelegram;
}
