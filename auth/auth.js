// auth.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

app.use(bodyParser.json());

// Simulated authentication logic
const authenticate = (req, res) => {
  const { email } = req.body;
  // Simulated authentication check
  const authenticated = email && email.endsWith('@example.com');
  
  if (authenticated) {
    res.status(200).json({ authenticated });
  } else {
    res.status(401).json({ authenticated });
  }
};

app.post('/auth', authenticate);

const server = app.listen(port, () => {
  console.log(`Authentication Service running on port ${port}`);
});

module.exports = { app, server };


