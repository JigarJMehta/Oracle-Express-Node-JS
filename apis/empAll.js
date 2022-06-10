async function getEmps(oracledb) {
    process.env.ORA_SDTZ = 'UTC';
    const dbConfig = require('../dbconfig');
    let connection;
    let sql, binds, options, result;
    try {
        connection = await oracledb.getConnection(dbConfig);
        sql = `SELECT * FROM emp`;

        binds = {};

        options = {
            outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
            extendedMetaData: false,               // get extra metadata
            // prefetchRows:     100,                // internal buffer allocation size for tuning
            // fetchArraySize:   100                 // internal buffer allocation size for tuning
        };

        result = await connection.execute(sql, binds, options);

    }
    catch (err) {
        return (err)
    }
    finally {
        if (connection) {
            try {
                await connection.close();
                return result.rows

            } catch (err) {
                console.log(err);
            }
        }
    }
}

module.exports = { getEmps }