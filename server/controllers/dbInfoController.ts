import { RequestHandler } from 'express';
// import pkg from 'pg';
import { QueryResult } from 'pg';
// QueryResult doesn't exist in pg package. May need to install another package.

//PURPOSE: The purpose of this controller is mainly to provide the user a comprehensive birds-eye view of their database. For convience it is also use to supply other controllers with necessary information.

type DbInfoController = {
  getDataBaseInfo: RequestHandler;
};

interface ForeignKey {
    column: string;
    referencedTable: string;
    referencedColumn: string;
}

type ForeignKeyInfo = {[columName: string]: ForeignKey}

type PrimaryKeyInfo = {
  [columnName: string]: {datatype: string, isAutoIncrementing: boolean};
};
interface TableInfo {
    tableName: string;
    numberOfRows: number;
    numberOfIndexes: number;
    numberOfFields: number;
    numberOfForeignKeys: number;
    foreignKeysObj: ForeignKeyInfo|null;
    primaryKeysObj: PrimaryKeyInfo | null;
}

interface CheckConstraint {
  constraint_name: string;
  column_name: string;
  constraint_definition: string;
}

interface CheckConstraintMap {
  [columnName: string]: string;
}
  

const dbInfoController: DbInfoController = {
  getDataBaseInfo: async (req, res, next): Promise<void> => {
    // pulling database connection from res locals
    const db = res.locals.dbConnection;

    try {
      // Retrievie table names
      const tables: QueryResult = await db.query(
        'SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != \'pg_catalog\' AND schemaname != \'information_schema\';'
      );

      // Check if we have at least one table to work with
      if (tables.rows.length === 0) {
        res.locals.result = 'No tables found in database.';
        return next();
      }

      //array of table names to use in generic metrics function
      const tableNames = tables.rows.map(obj => obj.tablename);

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
        const foreignKeyObject: ForeignKeyInfo = {};

        for (const row of foreignKeys.rows) {
          foreignKeyObject[row.column] = {
            column: row.column,
            referencedTable: row.referencedtable,
            referencedColumn: row.referencedcolumn
          };
        }
      
        const primaryKeys: QueryResult = await db.query(`
          SELECT 
            kcu.column_name AS column,
            cols.data_type AS data_type,
            CASE 
              WHEN cols.column_default LIKE 'nextval%' THEN TRUE
              ELSE FALSE
            END AS is_auto_incrementing
          FROM 
          information_schema.table_constraints AS tc 
          JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name 
          JOIN information_schema.columns AS cols ON tc.table_name = cols.table_name AND kcu.column_name = cols.column_name
        WHERE 
          tc.constraint_type = 'PRIMARY KEY' AND tc.table_name = $1;`,
        [tableName]
        );

        const primaryKeyObject: PrimaryKeyInfo = {};
        // creating an object of the column name as the key and { datatype, isAutoIncrementing } as the value
        for (const row of primaryKeys.rows) {
          primaryKeyObject[row.column] = {
            datatype: row.data_type,
            isAutoIncrementing: row.is_auto_incrementing
          };
        }
    
        const sampleData: QueryResult = await db.query(
          `SELECT * FROM ${tableName} LIMIT 100;`
        );
    
        const columnDataTypes: QueryResult = await db.query(`
        SELECT column_name, data_type, column_default, is_nullable 
        FROM information_schema.columns 
        WHERE table_name = $1 AND table_schema = 'public'
        ORDER BY ordinal_position;`,
        [tableName]
        );

        // Now, transform 'result.rows' to the desired format
        // const fieldTypes: { [key: string]: string } = {};

        // for (const row of columnDataTypes.rows) {
        //   fieldTypes[row.column_name] = row.data_type;
        // }
        
        // A check constrain is a constraint on a column that requires only specific values be inserted (i.e. "Yes" or "No")
        const checkContraints = await db.query(`
        SELECT 
            conname AS constraint_name, 
            a.attname AS column_name, 
            con.conkey AS constraint_definition
        FROM 
            pg_constraint con
        INNER JOIN 
            pg_class rel ON rel.oid = con.conrelid
        INNER JOIN 
            pg_attribute a ON a.attnum = ANY(con.conkey)
        WHERE 
            con.contype = 'c' AND rel.relname = $1;`,
        [tableName]
        );
        const checkContraintObj: CheckConstraintMap = {};
        checkContraints.rows.forEach((checkEl : CheckConstraint) => {
          checkContraintObj[checkEl.column_name] = checkEl.constraint_definition;
        });

        return {
          tableName,
          numberOfRows: parseInt(numberOfRows.rows[0].count, 10),
          numberOfIndexes: parseInt(numberOfIndexes.rows[0].count, 10),
          numberOfFields: parseInt(numberOfFields.rows[0].count, 10),
          numberOfForeignKeys: foreignKeys.rowCount,
          numberOfPrimaryKeys: primaryKeys.rowCount,
          checkConstraints: checkContraintObj,
          foreignKeysObj: foreignKeyObject || {},
          primaryKeysObj: primaryKeyObject || {},
          sampleData: sampleData.rows[sampleData.rows.length-1] || {}, // Sample data for the table
          columnDataTypes: columnDataTypes.rows.map((obj) => {
            return ({column_name: obj.column_name, datatype: obj.data_type});
          })  // Column names and their data types
        };
      });
      // Usage
      //  use Promise.all() to wait for all promises to resolve
      // const databaseInfo = await Promise.all(tableInfoPromises);
      Promise.all(tableInfoPromises).then((databaseInfo) => {
        const databaseInfoMap: { [key: string]: TableInfo } = {};
        databaseInfo.forEach(info => {
          databaseInfoMap[info.tableName] = info;
        });
        res.locals.databaseInfo = databaseInfoMap;
        return next();
      });    
      
    } catch (error) {
      return next(error);
    }
  }
};

export default dbInfoController;