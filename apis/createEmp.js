async function setEmp(oracledb, emp) {
    console.log('First');
    process.env.ORA_SDTZ = 'UTC';
    const dbConfig = require('../dbconfig');
    let connection;
    let sql, binds, options, result;
    try {
        connection = await oracledb.getConnection(dbConfig);

        // insert query
        sql = `Insert into EMP (EMPNO,ENAME,JOB,MGR,HIREDATE,SAL,COMM,DEPTNO) 
        values (:1,:2,:3,:4,to_date(:5,'DD-MON-RR'),:6,:7,:8) `;

        //binding value for columns/attribute
        binds = [...Object.values(emp)];
        options = {
            autoCommit: true,
            // batchErrors: true,  // continue processing even if there are data errors
            // bindDefs: [
            //     { type: oracledb.NUMBER },
            //     { type: oracledb.STRING, maxSize: 20 },
            //     { type: oracledb.STRING, maxSize: 20 },
            //     { type: oracledb.NUMBER },
            //     { type: oracledb.STRING, maxSize: 20 },
            //     { type: oracledb.NUMBER },
            //     { type: oracledb.NUMBER },
            //     { type: oracledb.NUMBER }
            // ]
        };
        result = await connection.execute(sql, binds, options);
        console.log("Number of rows inserted:", result.rowsAffected);
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

module.exports = { setEmp }