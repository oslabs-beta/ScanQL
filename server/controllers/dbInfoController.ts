import { RequestHandler } from 'express';
// import pkg from 'pg';
import { QueryResult } from 'pg';
// QueryResult doesn't exist in pg package. May need to install another package.

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
        'SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != \'pg_catalog\' AND schemaname != \'information_schema\';'
      );
      console.log('tables', tables)
      // Check if we have at least one table to work with
      if (tables.rows.length === 0) {
        res.locals.result = 'No tables found in database.';
        return next();
      }
      //array of table names to use in generic metrics function
      const tableNames = tables.rows.slice();

      // passing tableNames through res locals
      res.locals.tableNames = tableNames;

      //creating an array of comprehensive info on the tables
      const tableInfoPromises: Promise<TableInfo>[] = tables.rows.map(async (row: any) => {
        const tableName = row.tablename;
    
        const numberOfFields: QueryResult = await db.query(
          'SELECT COUNT(*) FROM information_schema.columns WHERE table_name = $1;',
          [tableName]
        );
    
        const numberOfRows: QueryResult = await db.query(
          `SELECT COUNT(*) FROM ${tableName};`
        );
    
        const numberOfIndexes: QueryResult = await db.query(
          'SELECT COUNT(*) FROM pg_indexes WHERE tablename = $1;',
          [tableName]
        );
    
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
              tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = $1`,
        [tableName]
        );
    
        const primaryKey: QueryResult = await db.query(`
            SELECT 
              kcu.column_name AS column 
            FROM 
              information_schema.table_constraints AS tc 
              JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name 
            WHERE 
              tc.constraint_type = 'PRIMARY KEY' AND tc.table_name = $1
            LIMIT 1;`,
        [tableName]
        );
    
        const sampleData: QueryResult = await db.query(
          `SELECT * FROM ${tableName} LIMIT 1;`
        );
    
        const columnDataTypes: QueryResult = await db.query(`
        SELECT column_name, data_type, column_default, is_nullable 
        FROM information_schema.columns 
        WHERE table_name = $1
        ORDER BY ordinal_position;`,
        [tableName]
        );

        // Now, transform 'result.rows' to the desired format
        const fieldTypes: { [key: string]: string } = {};

        for (const row of columnDataTypes.rows) {
          fieldTypes[row.column_name] = row.data_type;
        }
        console.log('columntypes!!!!!!!!!!', columnDataTypes);
    
        return {
          tableName,
          numberOfRows: parseInt(numberOfRows.rows[0].count, 10),
          numberOfIndexes: parseInt(numberOfIndexes.rows[0].count, 10),
          numberOfFields: parseInt(numberOfFields.rows[0].count, 10),
          numberOfForeignKeys: foreignKeys.rowCount,
          foreignKeys: foreignKeys.rows,
          primaryKey: primaryKey.rows[0] ? primaryKey.rows[0].column : null,
          sampleData: sampleData.rows[0] || {}, // Sample data for the table
          columnDataTypes: columnDataTypes.rows.map((obj) => {
            return ({column_name: obj.column_name, dataype: obj.data_type});
          })  // Column names and their data types
        };
      });
      // Usage
      //  use Promise.all() to wait for all promises to resolve
      // const databaseInfo = await Promise.all(tableInfoPromises);
      Promise.all(tableInfoPromises).then((databaseInfo) => {
        // console.log('DBINFOARRAY', databaseInfo);
        const databaseInfoMap: { [key: string]: TableInfo } = {};
        databaseInfo.forEach(info => {
          databaseInfoMap[info.tableName] = info;
        });
        // console.log('this is dbinfooooo!!!!!!',databaseInfoMap)
        res.locals.databaseInfo = databaseInfoMap;
        return next();
      });    
      
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
    "numberOfRows": 100,
    "numberOfIndexes": 2,
    "numberOfFields": 5,
    "numberOfForeignKeys": 0,
    "foreignKeys": [],
    "primaryKey": "id",
    "firstRowData": {
      "id": 1,
      "name": "John Doe",
      "email": "johndoe@example.com",
      "created_at": "2023-01-01",
      "is_active": true
    },
    "fieldTypes": {
      "id": "integer",
      "name": "text",
      "email": "text",
      "created_at": "timestamp",
      "is_active": "boolean"
    }
  },
  {
    "tableName": "orders",
    "numberOfRows": 200,
    "numberOfIndexes": 1,
    "numberOfFields": 4,
    "numberOfForeignKeys": 1,
    "foreignKeys": [
      {
        "column": "user_id",
        "referencedTable": "users",
        "referencedColumn": "id"
      }
    ],
    "primaryKey": "id",
    "firstRowData": {
      "id": 1,
      "user_id": 1,
      "order_date": "2023-01-02",
      "amount": 99.99
    },
    "fieldTypes": {
      "id": "integer",
      "user_id": "integer",
      "order_date": "date",
      "amount": "numeric"
    }
  }
]
*/