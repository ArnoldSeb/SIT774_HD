const express = require('express');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Setup view engine and static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/data', express.static('data'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session config
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

// User storage path
const usersPath = path.join(__dirname, 'data/users.json');

// Utility functions to read and write users
function readUsers() {
  if (!fs.existsSync(usersPath)) return [];
  const data = fs.readFileSync(usersPath);
  return JSON.parse(data);
}

function writeUsers(users) {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
}

// Routes
app.get('/', (req, res) => res.redirect('/login'));

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = { username };
    return res.redirect('/loading');
  }
  res.render('login', { error: 'Incorrect username or password' });
});

app.get('/register', (req, res) => {
  res.render('register', { error: null });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  if (users.find(u => u.username === username)) {
    return res.render('register', { error: 'Username already exists' });
  }
  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  writeUsers(users);
  res.redirect('/login');
});

app.get('/loading', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('loading');
});

app.get('/index', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('index', { user: req.session.user });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
