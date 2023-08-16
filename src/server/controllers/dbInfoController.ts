import { RequestHandler } from 'express';
import { Pool, QueryResult } from 'pg';

type DbInfoController = {
  getDataBaseInfo: RequestHandler;
};

interface ForeignKey {
    column: string;
    referencedTable: string;
    referencedColumn: string;
}

interface TableInfo {
    tableName: string;
    numberOfRows: number;
    numberOfIndexes: number;
    numberOfFields: number;
    numberOfForeignKeys: number;
    foreignKeys: ForeignKey[];
    primaryKey: string | null;
}



const dbInfoController: DbInfoController = {
    getDataBaseInfo: async (req, res, next): Promise<void> => {

        // pulling database connection from res locals
        const db = res.locals.dbConnection;

        try {
            const tables: QueryResult = await db.query(
              "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';"
            );
                  // Check if we have at least one table to work with
            if (tables.rows.length === 0) {
                res.locals.result = 'No tables found in database.';
                return next();
            }
            //array of table names to use in generic metrics function
            const tableNames = tables.rows.slice();

            // passing tableNames through res locals
            res.locals.tableNames = tableNames

            //creating an array of comprehensive info on the tables
            const tableInfoPromises: Promise<TableInfo>[] = tables.rows.map(async (row:any) => {
              const tableName = row.tablename;
              const numberOfFields: QueryResult = await db.query(`SELECT COUNT(*) FROM information_schema.columns WHERE table_name = $1;`,[tableName]);
              const numberOfRows: QueryResult = await db.query(`SELECT COUNT(*) FROM $1;`,[tableName]);
              const numberOfIndexes: QueryResult = await db.query(`SELECT COUNT(*) FROM pg_indexes WHERE tablename = $1;`, [tableName]);
              const foreignKeys: QueryResult = await db.query(`
                SELECT 
                  kcu.column_name AS column, 
                  ccu.table_name AS referencedTable, 
                  ccu.column_name AS referencedColumn 
                FROM 
                  information_schema.table_constraints AS tc 
                  JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name 
                  JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name 
                WHERE 
                  tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = $1`, [tableName]);
              
              const primaryKey: QueryResult = await db.query(`
                SELECT 
                  kcu.column_name AS column 
                FROM 
                  information_schema.table_constraints AS tc 
                  JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name 
                WHERE 
                  tc.constraint_type = 'PRIMARY KEY' AND tc.table_name = $1
                LIMIT 1;`,[tableName]);
              
              return {
                tableName,
                numberOfRows: parseInt(numberOfRows.rows[0].count, 10),
                numberOfIndexes: parseInt(numberOfIndexes.rows[0].count, 10),
                numberOfFields: parseInt(numberOfFields.rows[0].count, 10),
                numberOfForeignKeys: foreignKeys.rowCount,
                foreignKeys: foreignKeys.rows,
                primaryKey: primaryKey.rows[0] ? primaryKey.rows[0].column : null
              };
            });
          
            const databaseInfo = await Promise.all(tableInfoPromises);
            res.locals.databaseInfo = databaseInfo;
            return next();
        } catch (error) {
            return next(error);
        }
    }
};

export default dbInfoController;

// 
// Example result:
/*
[
  {
    "tableName": "users",
    "numberOfRows": 5,
    "numberOfIndexes": 2,
    "numberOfFields": 4,
    "numberOfForeignKeys": 0,
    "foreignKeys": [],
    "primaryKey": "id"
  },
  {
    "tableName": "orders",
    "numberOfRows": 10,
    "numberOfIndexes": 1,
    "numberOfFields": 3,
    "numberOfForeignKeys": 1,
    "foreignKeys": [
      {
        "column": "user_id",
        "referencedTable": "users",
        "referencedColumn": "id"
      }
    ],
    "primaryKey": "id"
  }
]

*/