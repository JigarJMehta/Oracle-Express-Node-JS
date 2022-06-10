const express = require('express');
const app = express();
const fs = require('fs');
const oracledb = require('oracledb');
app.use(express.json());

// Setting upthe Oracle Client 
let libPath = 'C:\\Oracle\\instantclient_21_3';
if (libPath && fs.existsSync(libPath)) {
    oracledb.initOracleClient({ libDir: libPath });
}

app.get('/', (req, res) => {
    res.send("CRUD Home Page")
})

// fetching all employees available
app.get('/apis/emps', (req, res) => {
    const empAll = require('./apis/empAll')
    empAll.getEmps(oracledb)
        .then(result => res.send(JSON.stringify(result))
        )
})

// fetching  employee with ID
app.get('/apis/emps/:id', (req, res) => {
    const emp = require('./apis/empwithID')
    emp.getEmp(oracledb, req.params.id)
        .then(result => res.send(JSON.stringify(result)))
})

// create new  employee 
app.post('/apis/emps', (req, res) => {
    const newEmp = require('./apis/createEmp')
    newEmp.setEmp(oracledb, req.body)
        .then(result => res.send(JSON.stringify(result)))

})

// delete existing employee
app.delete('/apis/emps/:id', (req, res) => {
    const emp = require('./apis/deleteEmp')
    emp.delEmp(oracledb, req.params.id)
        .then(result => res.send(JSON.stringify(result)))

})

// update existing employee
app.put('/apis/emps', (req, res) => {
    const emp = require('./apis/updateEmp')
    emp.updateEmp(oracledb, req.body)
        .then(result => res.send(JSON.stringify(result)))

})

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`))
