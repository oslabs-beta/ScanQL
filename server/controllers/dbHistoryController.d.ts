import { RequestHandler } from 'express';
type DBHistoryController = {
    dbPastMetrics: RequestHandler;
};
declare const dBHistoryController: DBHistoryController;
export default dBHistoryController;
