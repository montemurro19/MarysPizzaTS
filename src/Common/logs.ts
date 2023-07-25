class Logs {
    private timestamp() {
        return new Date().toISOString();
    }
    info(namespace: string, message: string, object?: any) {
        if (object) {
            console.info(`[${this.timestamp()}] [INFO] [${namespace}] ${message}`, object);
        } else {
            console.info(`[${this.timestamp()}] [INFO] [${namespace}] ${message}`);
        }
    }
    warn(namespace: string, message: string, object?: any) {
        if (object) {
            console.warn(`[${this.timestamp()}] [INFO] [${namespace}] ${message}`, object);
        } else {
            console.warn(`[${this.timestamp()}] [INFO] [${namespace}] ${message}`);
        }
    }
    error(namespace: string, message: string, object?: any) {
        if (object) {
            console.error(`[${this.timestamp()}] [INFO] [${namespace}] ${message}`, object);
        } else {
            console.error(`[${this.timestamp()}] [INFO] [${namespace}] ${message}`);
        }
    }
    debug(namespace: string, message: string, object?: any) {
        if (object) {
            console.debug(`[${this.timestamp()}] [INFO] [${namespace}] ${message}`, object);
        } else {
            console.debug(`[${this.timestamp()}] [INFO] [${namespace}] ${message}`);
        }
    }
}

export default new Logs();
