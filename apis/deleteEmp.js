async function delEmp(oracledb, empID) {
    process.env.ORA_SDTZ = 'UTC';
    const dbConfig = require('../dbconfig');
    let connection;
    let sql, binds, options, result;
    try {
        connection = await oracledb.getConnection(dbConfig);

        // insert query
        sql = `DELETE FROM emp WHERE empno = :1 `;

        //binding value for columns/attribute
        binds = [empID];
        options = {
            autoCommit: true
        }
        result = await connection.execute(sql, binds, options);
        console.log("Number of rows deleted:", result.rowsAffected);
    }
    catch (err) {
        console.log("Error:", err);
        return (err)
    }
    finally {
        if (connection) {
            try {
                await connection.close();
                // console.log(result);
                return result

            } catch (err) {
                console.log(err);
            }
        }
    }
}

module.exports = { delEmp }