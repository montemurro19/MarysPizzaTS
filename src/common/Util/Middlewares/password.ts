import { genSalt, hash } from 'bcrypt';

class Password {
    async salt() {
        return await genSalt(10);
    }

    async hash(password: string) {
        const salt = await this.salt();
        return await hash(password, salt);
    }
}

export default new Password();
