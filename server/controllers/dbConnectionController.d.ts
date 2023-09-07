import { RequestHandler } from 'express';
type DbConnectionController = {
    connectAndInitializeDB: RequestHandler;
    createExtension: RequestHandler;
    checkUserPermissions: RequestHandler;
};
declare const dbConnectionController: DbConnectionController;
export default dbConnectionController;
