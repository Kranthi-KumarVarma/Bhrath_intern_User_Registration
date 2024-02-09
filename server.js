const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/User_registration', {
 
});

// Create a user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

// Create a user model
const User = mongoose.model('User', userSchema);

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Create a new user
  const newUser = new User({
    username: username,
    email: email,
    password: password
  });

  // Save the user to the database
  newUser.save()
  .then(() => {
    res.send('User registered successfully! <a href="/">Go back to the registration form</a>');
  })
  .catch(error => {
    console.error(error);
    res.status(500).send('Error registering user');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
