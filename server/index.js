const express = require('express')

const app = express()

const path = require('path')

const bodyParser = require('body-parser');

const { Pool } = require('pg');

const db = require('./queries')

const PORT = 9001

//Middleware


//host react app as static files
app.use(express.static(path.resolve(__dirname, '../client/build')))

//Routes
//app.get('/', (req, res) => {
// we'll do some stuff here
//res.send("Hellooooo from the server!")
//})

// GET: /
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
  });

app.get('/test', (req, res)=>{
    //do something with the res
})

// POST: /links
app.post('/links', async (req, res) => {
    const { name, URL } = req.body;
    try {
      const client = await pool.connect();
      await client.query('INSERT INTO links (title, url) VALUES ($1, $2)', [title, url]);
      client.release();
      res.send('Link created successfully');
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).send('An error occurred');
    }
  });

  // PUT: /links/:id
app.put('/links/:id', async (req, res) => {
    const id = req.params.id;
    const { name, URL } = req.body;
    try {
      const client = await pool.connect();
      await client.query('UPDATE links SET name = $1, url = $2 WHERE id = $3', [title, url, id]);
      client.release();
      res.send('Link updated successfully');
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).send('An error occurred');
    }
  });

  // DELETE: /links/:id
app.delete('/links/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const client = await pool.connect();
      await client.query('DELETE FROM links WHERE id = $1', [id]);
      client.release();
      res.send('Link deleted successfully');
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).send('An error occurred');
    }
  });
  
  

app.get('/links', db.getLinks)

app.use(bodyParser.json());

// Starting Express on our PORT
app.listen(PORT, ()=>{
    console.log(`The app is running on port ${PORT}`)
})