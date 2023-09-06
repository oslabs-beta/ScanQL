import { RequestHandler } from 'express';
type DbInfoController = {
    getDataBaseInfo: RequestHandler;
};
declare const dbInfoController: DbInfoController;
export default dbInfoController;
