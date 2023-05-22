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

// Get all the data from db
 
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
}