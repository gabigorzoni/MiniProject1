import express from 'express';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import session from 'express-session';
import 'dotenv/config';

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

const nameListSchema = new mongoose.Schema({
  name: String,
});

const NameList = mongoose.model('NameList', nameListSchema);

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema);

passport.use(new LocalStrategy(
  async (username, password, done) => {
      const user = await User.findOne({ username: username });
      if (!user || !bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Incorrect username or password.' });
      }
      return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
      const user = await User.findById(id);
      done(null, user);
  } catch (err) {
      done(err);
  }
});

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

//routes
app.post('/register', (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const newUser = new User({ username: req.body.username, email: req.body.email, password: hashedPassword });
  newUser.save();
  res.json({ message: 'User registered successfully' });
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Logged in successfully' });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logged out successfully' });
});

app.get('/', (req, res) => {
  res.send(`<button><a href="/api/users">Users</a></button><button><a href="/api/users/add">Add Users</a></button>`);
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await NameList.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const nameId = parseInt(req.params.id);
    const collection = db.collection('users');
    const nameList = await collection.findOne({ _id: nameId });
    if (nameList) {
      res.status(200).json(nameList);
    } else {
      res.status(404).send(`Name with ID ${nameId} not found.`);
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
    const newNameList = new NameList({ name });
    await newNameList.save();
    res.redirect('/api/users');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.put('/api/users/update/:id', async (req, res) => {
  try {
    const nameId = req.params.id;
    const updatedName = req.body.name;
    const nameList = await NameList.findByIdAndUpdate(nameId, { name: updatedName }, { new: true });
    if (nameList) {
      res.status(200).send(`Name with ID ${nameId} updated.`);
    } else {
      res.status(404).send(`Name with ID ${nameId} not found.`);
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    await NameList.findByIdAndDelete(req.params.id);
    res.status(200).send(`Name deleted.`);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
