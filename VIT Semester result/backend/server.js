
const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(express.static(path.join(__dirname, "public")))
app.use(cors());
app.use(express.json());

const port = 5000

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'results'
})

app.post('/result', (req, res) => {
    console.log('Received request:', req.body);

    const {
        prn,
        name,
        subject1mse,
        subject1ese,
        subject2mse,
        subject2ese,
        subject3mse,
        subject3ese,
        subject4mse,
        subject4ese,
        percentage
    } = req.body;

    // Define the SQL query to insert data into studentmarks
    const sqlInsert = `INSERT INTO studentmarks (
        prn,
        name,
        subject1mse,
        subject1ese,
        subject2mse,
        subject2ese,
        subject3mse,
        subject3ese,
        subject4mse,
        subject4ese,
        percentage
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Values to insert
    const values = [
        prn,
        name,
        subject1mse,
        subject1ese,
        subject2mse,
        subject2ese,
        subject3mse,
        subject3ese,
        subject4mse,
        subject4ese,
        percentage
    ];

    // Execute the SQL query
    db.query(sqlInsert, values, (err, data) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Error inserting data', details: err });
        }
        console.log('Data inserted successfully:', data);
        res.json({ message: 'Data inserted successfully' });
    });
});


app.listen(port,()=>{
    console.log("Listening...");
})