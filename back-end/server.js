import express from 'express';
import methodOverride from 'method-override';
import { MongoClient } from 'mongodb';

const app = express();
const port = 3000;
const uri = 'mongodb://localhost:27017';

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static('C:/Users/gabig/OneDrive/Área de Trabalho/Humber College/CPAN212_ModernWebTechnologies/MiniProject7/MiniProject1/front-end'));
app.set('views', 'C:/Users/gabig/OneDrive/Área de Trabalho/Humber College/CPAN212_ModernWebTechnologies/MiniProject7/MiniProject1/front-end/views');
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

let db;

(async function () {
  try {
    const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
    console.log('Connected to MongoDB.');
    db = client.db('usersdb');
  } catch (err) {
    console.error('Error occurred while connecting to MongoDB:', err);
  }
})();

app.get('/', (req, res) => {
  res.send(`<button><a href="/api/users">Users</a></button><button><a href="/api/users/add">Add Users</a></button>`);
});

app.get('/api/users', async (req, res) => {
  try {
    const collection = db.collection('users');
    const users = await collection.find({}).toArray();
    res.render('users.ejs', { users });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/users/add', (req, res) => {
  res.render('userForm.ejs');
});

app.post('/api/users', async (req, res) => {
  try {
    const { name } = req.body;
    const collection = db.collection('users');
    await collection.insertOne({ name });
    res.redirect('/api/users');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.put('/api/users/update/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const updatedName = req.body.name;
    const collection = db.collection('users');
    const user = await collection.findOneAndUpdate(
      { id: userId },
      { $set: { name: updatedName } },
      { returnOriginal: false }
    );
    if (user.value) {
      res.status(200).send(`User with ID ${userId} updated.`);
    } else {
      res.status(404).send(`User with ID ${userId} not found.`);
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
