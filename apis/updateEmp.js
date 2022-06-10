async function updateEmp(oracledb, emp) {
    process.env.ORA_SDTZ = 'UTC';
    const dbConfig = require('../dbconfig');
    let connection;
    let sql, binds, options, result;
    try {
        connection = await oracledb.getConnection(dbConfig);
        // update query
        // SET :2 = :10, :3 = :11, :4 = :12, :5 = :13, :6 = :14, :7 = :15, :8=:16
        sql = `UPDATE EMP 
        SET ENAME = :1, JOB = :2, MGR = :3, HIREDATE = to_date(:4), SAL = :5, COMM = :6 , DEPTNO = :7
         WHERE  empno = :8 `;

        //binding value for columns/attribute
        //binding sequence must be maintain
        binds = [emp.ENAME, emp.JOB, emp.MGR, emp.HIREDATE, emp.SAL, emp.COMM, emp.DEPTNO, emp.EMPNO,];
        console.log(binds);
        options = { autoCommit: true }
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

module.exports = { updateEmp }