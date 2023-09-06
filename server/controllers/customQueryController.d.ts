import { RequestHandler } from 'express';
type CustomDBController = {
    customQueryMetrics: RequestHandler;
};
declare const customDBController: CustomDBController;
export default customDBController;
