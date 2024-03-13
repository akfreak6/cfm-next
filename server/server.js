import express from 'express';
import bodyParser from 'body-parser';
import DB from './db.model.cjs'; // Replace with your database connection

const app = express();
app.use(bodyParser.json());

// Get all data
app.get('/data', async (req, res) => {
  try {
    const data = await DB.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get data by ID
app.get('/data/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await DB.getById(id);
    if (!data) {
      res.status(404).send('Data not found');
    } else {
      res.json(data);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create new data
app.post('/data', async (req, res) => {
  try {
    const data = req.body;
    const newData = await DB.create(data);
    res.json(newData);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Update data
app.put('/data/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedData = await DB.update(id, data);
    if (!updatedData) {
      res.status(404).send('Data not found');
    } else {
      res.json(updatedData);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete data
app.delete('/data/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await DB.delete(id);
    res.sendStatus(204); // No content
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(4000, () => console.log('Server listening on port 4000'));
