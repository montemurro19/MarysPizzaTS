import 'dotenv/config';

class Config {
    private MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`
    private SERVER_PORT = Number(process.env.SERVER_PORT) || 3000;
    private JWT_SECRET = process.env.JWT_SECRET || ''
    private EMAIL_CONFIG = {
        host: 'smtp.example.com',
        port: Number(process.env.EMAIL_PORT),
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER || '',
            pass: process.env.EMAIL_PASS || '',
        }
    }

    get mongo(): string {
        return this.MONGO_URI
    }

    get jwt(): string {
        return this.JWT_SECRET
    }

    get port(): number {
        return this.SERVER_PORT
    }

    get email(): any {
        return this.EMAIL_CONFIG
    }
}

export default new Config()
