import { RequestHandler } from 'express';
interface schemaControllers {
    getSchemaPostgreSQL: RequestHandler;
}
declare const dbERDcontroller: schemaControllers;
export default dbERDcontroller;
