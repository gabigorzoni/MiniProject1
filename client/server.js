const express = require('express');
const fs = require('fs');
const app = express();
const port = 3001;

app.use(express.json());

app.use((req,res,next) =>{
  console.log(`${req.method} request for ${req.url}`);
  next()
})

app.get('/', (req, res) => {
  res.send('');
});

app.get('/api/exercises', (req, res) => {
  fs.readFile('exercises.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading exercises.json:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const exercises = JSON.parse(data);
      res.json(exercises);
    }
  });
});

app.listen(port, () => {
  console.log(`Server working on ${port}`);
});
