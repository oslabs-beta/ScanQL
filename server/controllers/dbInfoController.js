const dbInfoController = {
    getDataBaseInfo: async (_req, res, next) => {
        // console.log('made it in dbinfo');
        // pulling database connection from res locals
        const db = res.locals.dbConnection;
        try {
            // Retrievie table names
            const tables = await db.query('SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != \'pg_catalog\' AND schemaname != \'information_schema\';');
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
            const tableInfoPromises = tables.rows.map(async (row) => {
                const tableName = row.tablename;
                const numberOfFields = await db.query('SELECT COUNT(*) FROM information_schema.columns WHERE table_name = $1;', [tableName]);
                const numberOfRows = await db.query(`SELECT COUNT(*) FROM ${tableName};`);
                const numberOfIndexes = await db.query('SELECT COUNT(*) FROM pg_indexes WHERE tablename = $1;', [tableName]);
                const foreignKeys = await db.query(`
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
                const foreignKeyObject = {};
                for (const row of foreignKeys.rows) {
                    foreignKeyObject[row.column] = {
                        column: row.column,
                        referencedTable: row.referencedtable,
                        referencedColumn: row.referencedcolumn
                    };
                }
                const primaryKeys = await db.query(`
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
          tc.constraint_type = 'PRIMARY KEY' AND tc.table_name = $1;`, [tableName]);
                const primaryKeyObject = {};
                // creating an object of the column name as the key and { datatype, isAutoIncrementing } as the value
                for (const row of primaryKeys.rows) {
                    primaryKeyObject[row.column] = {
                        datatype: row.data_type,
                        isAutoIncrementing: row.is_auto_incrementing
                    };
                }
                const sampleData = await db.query(`SELECT * FROM ${tableName} LIMIT 100;`);
                const columnDataTypes = await db.query(`
        SELECT column_name, data_type, column_default, is_nullable 
        FROM information_schema.columns 
        WHERE table_name = $1 AND table_schema = 'public'
        ORDER BY ordinal_position;`, [tableName]);
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
            con.contype = 'c' AND rel.relname = $1;`, [tableName]);
                const checkContraintObj = {};
                checkContraints.rows.forEach((checkEl) => {
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
                    sampleData: sampleData.rows[sampleData.rows.length - 1] || {},
                    columnDataTypes: columnDataTypes.rows.map((obj) => {
                        return ({ column_name: obj.column_name, datatype: obj.data_type });
                    }) // Column names and their data types
                };
            });
            // Usage
            //  use Promise.all() to wait for all promises to resolve
            // const databaseInfo = await Promise.all(tableInfoPromises);
            Promise.all(tableInfoPromises).then((databaseInfo) => {
                const databaseInfoMap = {};
                databaseInfo.forEach(info => {
                    databaseInfoMap[info.tableName] = info;
                });
                res.locals.databaseInfo = databaseInfoMap;
                return next();
            });
        }
        catch (error) {
            return next(error);
        }
    }
};
export default dbInfoController;
