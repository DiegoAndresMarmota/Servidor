import * as dotenv from "dotenv";
import { DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export abstract class ConfigServer {
    constructor() {
        const nodeNameEnv = this.createPathEnv(this.nodeEnv);
        dotenv.config({
            path: nodeNameEnv
        });
    }
    
    public getEnvironment(k: string): string | undefined {
        return process.env[k];
    }

    public getNumberEnv(k: string): number {
        return Number(this.getEnvironment(k));
    }

    public get nodeEnv(): string {
        return this.getEnvironment("NODE_ENV")?.trim() || "";
    }

    public createPathEnv(path: string): string {
        const arrEnv: Array<string> = ['env']

        if (path.length > 0) {
            const stringToArr = path.split(".");
            arrEnv.unshift(...stringToArr);
        }
        return '.' + arrEnv.join('.')
    }

    public get typeORMConfig(): DataSourceOptions {
        return {
            type: "mysql",
            host: this.getEnvironment("DB_HOST"),
            port: this.getNumberEnv("DB_PORT"),
            username: this.getEnvironment("DB_USER"),
            password: this.getEnvironment("DB_PASSWORD"),
            database: this.getEnvironment("DB_DATABASE"),
            entities: [__dirname + "/../**/*.entity{.ts,.js}"],
            migrations: [__dirname + "/../../migrations/*{.ts,.js}"],
            synchronize: true,
            logging: true,
            namingStrategy: new SnakeNamingStrategy(),
        };
    }
}
