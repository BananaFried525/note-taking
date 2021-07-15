export class Config {
    constructor() { }
    config = {
        dev: {
            env: "dev",
            port: 8081,
            db: {
                host: "localhost",
                port: "27017",
                name: "note-express"
            }
        },
        container: {
            env: "combined",
            port: process.env.PORT || 8081,
            db: {
                host: process.env.DB_HOST || "mongo",
                port: process.env.DB_POST || "27017",
                name: process.env.DB_NAME || "note-express"
            }
        }

    }
    get(env: String) {
        let cfg: any
        switch (env.trim()) {
            case 'dev':
                cfg = this.config.dev;
                break;
            case 'container':
                cfg = this.config.container;
                break;
            default:
                cfg = this.config.dev;
                break;
        }
        return cfg;
    }
}