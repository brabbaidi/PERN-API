// Connect to postgres using the node-postgres package

const POOL = require('pg').Pool

const pool = new POOL({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432
})

// Create  all the functions that will be our request handlers in our express server

// Create method
const createLinks = (req, res) =>{
    //take the data the user passes us and insert it into our table
    const name = request.body.name
    const URL = request.body.URL
    pool.query('INSERT INTO links (name, URL) VALUES (41, $2)', [name, URL], (error, result)=>{
        if(error){
            throw error
        }
        response.status(201).send(`Link added with ID: ${result.insertId}`)
    })
}

// Get back all the data currently in the dadabase 
const getLinks = (req, res) => {
    pool.query('SELECT * FROM links ORDER BY id ASC', (error, result)=>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows)
    })
}


module.exports = {
    getLinks,
    createLinks
}