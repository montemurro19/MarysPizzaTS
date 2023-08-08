interface LogLevelFunctions {
    info: typeof console.info;
    warn: typeof console.warn;
    error: typeof console.error;
    debug: typeof console.debug;
  }
  
  class Log {
    private timestamp(): string {
      return new Date().toISOString();
    }
  
    private logMessage(namespace: string, level: keyof LogLevelFunctions, message: string, object?: any) {
      const logFn = console[level] || console.info;
      const logObject = object ? ` ${JSON.stringify(object)}` : '';
      logFn(`[${this.timestamp()}] [${level.toUpperCase()}] [${namespace}] ${message}${logObject}`);
    }
  
    info(namespace: string, message: string, object?: any) {
      this.logMessage(namespace, 'info', message, object);
    }
  
    warn(namespace: string, message: string, object?: any) {
      this.logMessage(namespace, 'warn', message, object);
    }
  
    error(namespace: string, message: string, object?: any) {
      this.logMessage(namespace, 'error', message, object);
    }
  
    debug(namespace: string, message: string, object?: any) {
      this.logMessage(namespace, 'debug', message, object);
    }
  }
  
  export default new Log();
  