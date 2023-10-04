const express = require('express');
const app = express();
const port = 3000;
const methodOverride = require('method-override');
const path = require('path');
const fs = require('fs').promises; 

app.use(express.urlencoded());
app.use(express.json());
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))

app.use((req,res,next) =>{
console.log(`${req.method} request for ${req.url}`);
next()
})

app.get('/', (req, res) =>{
    res.send(`<button ><a href="/api/users""> users </a> </button> <button ><a href="/api/users/add""> add users </a> </button> `)
})

app.get('/api/users', async (req,res) =>{
    try{
        const data = await fs.readFile(path.join(__dirname, 'users.json'), 'utf8');
        const usersData = JSON.parse(data);
        res.status(200).render('users.ejs', { users: usersData });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    } 
});

app.get('/api/users/add', (req,res) =>{
    res.render('userForm.ejs');
})


app.get('/api/users/add/:id', (req,res) =>{
    res.render('updateUser.ejs');
})

//Sort the users
app.get('/api/users/sort', async (req, res) => {
    const { sort } = req.query;
    let sortedUsers = [];

    try{
        const data = await fs.readFile(path.join(__dirname, 'users.json'), 'utf8');
        sortedUsers = JSON.parse(data);

        if (sort) {
            sortedUsers.sort((a, b) => {
                if (a[sort] < b[sort]) return -1;
                if (a[sort] > b[sort]) return 1;
                return 0;
            });
        }
        res.status(200).json(sortedUsers);
    } catch (error) {

        res.status(500).send('Internal Server Error');

    }
});

//Filter the users
app.get('/api/users/filter', async (req, res) => {
    const {filter} = req.query;

    try {
        const data = await fs.readFile(path.join(__dirname, 'users.json'), 'utf8');
        const users = JSON.parse(data);

        let filteredUser = [...users];

        if (filter) {
            const filterName = filter.toLowerCase();
            filteredUser = filteredUser.filter(user =>
                user.name.toLowerCase().includes(filterName)
            );
        }
        res.status(200).json(filteredUser);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }   
});


app.post('/api/users', (req, res)=>{

    console.log(req.body.name);

    const newUser ={
    id:users.length + 1,
    name: req.body.name
    };

    users.push(newUser);
    res.redirect('/api/users');

})


// Define a PUT route handler for updating a user.
app.put('/api/users/update/:id', (req, res) => {
    console.log("fired put");
    const userId = parseInt(req.params.id);
    const updatedName = req.body.name;

    const user = users.find(u => u.id === userId);

    if (user) {
      user.name = updatedName;
      res.status(200).send(`User with ID ${userId} updated.`);
    } else {
      res.status(404).send(`User with ID ${userId} not found.`);
    }
  });


app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}/`);
})