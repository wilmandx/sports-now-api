import * as mongoose from 'mongoose';
import { createApp } from "./app";
import { Config } from './app-configs';
import { Express } from 'express';
import * as fs from 'fs';

let app: Express;
export async function startServer(): Promise<Express> {

    if (!app) {
        app = await createApp();

        try {
            await MongoDB.mongoInit(); 
        } catch (err) {
            console.log(JSON.stringify(err));
            console.log("Server will exit, database connection error.");
            process.exit(-1);
            return Promise.reject(new Error("Server will exit, database connection error."));
        }
        //Show current environment
        Config.logEnv();
        await new Promise(async function (resolve, reject) {
            try {

                let server: any;
                server = require("http").Server(app);
                server.listen(Config.server.port, async function () {
                    console.log(`We're on on port ${Config.server.port}!`);
                    /*console.log(`Should we fill up? ${Config.fillUpForDev}`);

                    if (Config.fillUpForDev) {
                        await fillUpForDev();
                    }*/

                    resolve();
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    return Promise.resolve(app);
}

async function fillUpForDev(): Promise<void> {
    //here we can make sure our database has the required data for our system (ex : default colors, brands, etc.)
    
    try {
        return Promise.resolve();
    }
    catch (error) {
        return Promise.reject(error);
    }
}

class MongoDB {

    public static mongoInit(): Promise<void> {

        Config.logEnv();

        let dbConfigs = Config.dbConfig;

        mongoose.set('debug', dbConfigs.debug && !process.env.gulpTesting);

        let credentials = `${dbConfigs.user}:${dbConfigs.pwd}@`;
        let host = dbConfigs.host;
        let port = dbConfigs.port.length === 0 ? "" : `:${dbConfigs.port}`;
        let dbName = dbConfigs.name;

        if (credentials === ':@') {
            credentials = "";
        }

        return new Promise<void>((resolve, reject) => {
            mongoose.connect(`mongodb://${credentials}${host}:${port}/${dbName}?authSource=${dbName}`, {}, function (error: any) {
                if (error) {
                    console.log("Connection to mongo db failed:\n" + JSON.stringify(error));
                    reject(error);
                } else {
                    console.log(`Connected to mongo db on \nHost: ${host}, \nPort: ${port}, \nDB: ${dbName}`);
                    let db = mongoose.connection;
                    db.on('error', console.error.bind(console, 'connection error:'));
                    db.once('open', () => resolve());
                }
            });
        })
            .catch((err: any) => {
                return Promise.reject(new Error(`Error connecting to database. :\n${JSON.stringify(err)}`));
            });
    }
}