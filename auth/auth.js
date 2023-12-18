const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

app.use(bodyParser.json());

// Simulated authentication logic
app.post('/auth', (req, res) => {
  const { email } = req.body;
  // Simulated authentication check
  const authenticated = email && email.endsWith('@example.com');
  res.json({ authenticated });
});

app.listen(port, () => {
  console.log(`Authentication Service running on port ${port}`);
});
