// SUGESTÃO DE MELHORIA 03
// Refatorar os métodos da Classe Logs para que o código fique mais limpo e legível
// Pular uma linha entre os métodos
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
    // SUGESTÃO DE MELHORIA 09
    // Implementar logs persinstentes (ex: salvar em arquivo ou banco de dados)
    
    // SUGESTÃO DE MELHORIA 10
    // Implementar alerta para logs de erro (ex: enviar email ou sms)
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
