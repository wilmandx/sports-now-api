import * as config from 'config';

export class Config {
    public static logEnv() {
        console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));
    }

    public static get server(): IServerConfig {
        return config.get("server") as IServerConfig;
    }

    public static get dbConfig(): IDbConfig {
        return config.get("db") as IDbConfig;
    }
}

interface IServerConfig {
    scheme: string;
    host: string;
    port: string;
    swaggerPort: string;
}

interface IDbConfig {
    host: string;
    port: string;
    user: string;
    pwd: string;
    name: string;
    debug: boolean;
}
