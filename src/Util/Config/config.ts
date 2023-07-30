import 'dotenv/config';

class Config {
    private MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`
    private SERVER_PORT = Number(process.env.SERVER_PORT) || 3000;
    private JWT_SECRET = process.env.JWT_SECRET || ''
    
    get mongo(): string {
        return this.MONGO_URI
    }

    get jwt(): string {
        return this.JWT_SECRET
    }

    get port(): number {
        return this.SERVER_PORT
    }
}

export default new Config()
