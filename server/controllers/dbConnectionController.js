import pkg from 'pg';
const { Pool } = pkg;
// on request, connect to user's database and return query pool on res.locals
const dbConnectionController = {
    //create controller for first time connection and storage 
    connectAndInitializeDB: async (req, res, next) => {
        // Connecting to database by first retrieve the uri sent from the client then initializing the Pool instance labled pool. Lastly declating db to use the query method from pool and passing array to use in query
        const uri_string = req.body.uri;
        const pool = new Pool({
            connectionString: uri_string,
        });
        const db = {
            query: (text, params) => {
                return pool.query(text, params);
            },
            explainQuery: (text, params) => {
                return pool.query(`EXPLAIN (ANALYZE true, COSTS true, SETTINGS true, BUFFERS true, WAL true, SUMMARY true, FORMAT JSON) ${text}`, params);
            },
        };
        // Sam added try catch block because there was no error being caught on the server when an invalid URI was entered - it was causing the server to crash. 
        try {
            await db.query('SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != \'pg_catalog\' AND schemaname != \'information_schema\';');
        }
        catch (err) {
            return next({
                log: 'URI invalid, could not connect to database',
                status: 400,
                message: {
                    error: `URI invalid, could not connect to database: ${err}`,
                }
            });
        }
        res.locals.dbConnection = db;
        res.locals.result = {};
        const queryString = 'SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != \'pg_catalog\' AND schemaname != \'information_schema\';';
        try {
            // const dbStats = 
            await db.query(queryString);
            res.locals.result.validURI = true;
            res.locals.result.currentStats = 'Connected To Database';
            return next();
        }
        catch (error) {
            return next({
                log: `ERROR caught in connectController.connectAndInitializeDB: ${error}`,
                message: {
                    Error: `Error: ${error}`,
                }
            });
        }
    },
    // creates pg_stat_statements if not already created
    // createExtension: async (req, res, next) => {
    //   const db = res.locals.dbConnection;
    //   const queryString = 'CREATE EXTENSION IF NOT EXISTS pg_stat_statements';
    //   try {
    //     await db.query(queryString);
    //     res.locals.result.validURI = true;
    //     return next();
    //   } catch (error) {
    //     return next({
    //       log: `ERROR caught in connectController.createExtension: ${error}`,
    //       status: 400,
    //       message:
    //         'ERROR: error has occured in connectController.createExtension',
    //     });
    //   }
    // },
    // initializes pg_stat_statements if not already initialized
    // first controller to stop response cycle and return an error if connection fails
    createExtension: async (_req, res, next) => {
        const db = res.locals.dbConnection;
        const queryString = 'CREATE EXTENSION IF NOT EXISTS pg_stat_statements';
        try {
            await db.query(queryString);
            res.locals.result.validURI = true;
            return next();
        }
        catch (error) {
            return next({
                log: `ERROR caught in connectController.createExtension: ${error}`,
                status: 400,
                message: 'ERROR: error has occured in connectController.createExtension',
            });
        }
    },
    checkUserPermissions: async (req, res, next) => {
        const db = res.locals.dbConnection;
        const username = req.body.username; // Assume the username is passed in the request body
        const dbname = req.body.dbname; // Assume the dbname is passed in the request body
        const queryString = `
      SELECT 
        has_database_privilege('${username}', '${dbname}', 'CONNECT') AS can_connect
    `;
        //checking if user can connect to the e
        const permissionsQuery = `
      SELECT table_schema, table_name, privilege_type
      FROM information_schema.role_table_grants
      WHERE grantee = $1;
      `;
        try {
            const result = await db.query(queryString); // the result of whether the user can connect or not
            const canConnect = result.rows[0]?.can_connect || false;
            const permissions = await db.query(permissionsQuery, [username]); //the permissions of that user
            const userPermissions = permissions.rows;
            res.locals.userPermissions = userPermissions;
            if (canConnect) {
                return next(); // User has CONNECT privilege, so continue to the next middleware
            }
            else {
                return next({
                    log: 'ERROR: User does not have CONNECT privilege on this database',
                    status: 403,
                    message: 'ERROR: User does not have necessary permissions',
                });
            }
        }
        catch (error) {
            return next({
                log: `ERROR caught in connectController.checkUserPermissions: ${error}`,
                status: 500,
                message: 'ERROR: error has occurred while checking user permissions',
            });
        }
    },
};
export default dbConnectionController;
