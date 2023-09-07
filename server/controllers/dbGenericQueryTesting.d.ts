import { RequestHandler } from 'express';
type GeneralMetricsController = {
    performGenericQueries: RequestHandler;
};
declare const dbGenericQueryTesting: GeneralMetricsController;
export default dbGenericQueryTesting;
