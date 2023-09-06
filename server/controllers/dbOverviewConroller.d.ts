import { RequestHandler } from 'express';
type DbOverviewController = {
    dbSizeMetrics: RequestHandler;
};
declare const dbOverviewController: DbOverviewController;
export default dbOverviewController;
