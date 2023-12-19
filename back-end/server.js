import express from 'express';
import methodOverride from 'method-override';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

app.use(express.urlencoded());
app.use(express.json());
app.set('views');
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

mongoose
.connect('mongodb://localhost:27017/usersList', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log("connected to MongoDB using Mongoose"))
.catch(err => console.log("Could not connect to MongoDB", err));

const userSchema = new mongoose.Schema({
  name: String,
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.send(`<button><a href="/api/users">Users</a></button><button><a href="/api/users/add">Add Users</a></button>`);
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const collection = db.collection('users');
    const user = await collection.findOne({ _id: userId });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send(`User with ID ${userId} not found.`);
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/users/add', (req, res) => {
  res.status(200).json('userForm.ejs');
});

app.post('/api/users', async (req, res) => {
  try {
    const { name } = req.body;
    const newUser = new User({ name });
    await newUser.save();
    res.redirect('/api/users');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.put('/api/users/update/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedName = req.body.name;
    const user = await User.findByIdAndUpdate(userId, { name: updatedName }, { new: true });
    if (user) {
      res.status(200).send(`User with ID ${userId} updated.`);
    } else {
      res.status(404).send(`User with ID ${userId} not found.`);
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send(`User deleted.`);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
