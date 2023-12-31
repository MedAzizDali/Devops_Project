const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { register, collectDefaultMetrics } = require('prom-client');

const app = express();
const port = 3000;
const AUTH_SERVICE_URL = 'http://localhost:4000/auth'; // URL of the authentication service

const httpRequestCounter = new register.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'path', 'status'],
});


app.use(bodyParser.json());

let users = [];

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  
  try {
    const authResponse = await axios.post(AUTH_SERVICE_URL, { email });
    if (authResponse.data.authenticated) {
      const newUser = { id: users.length + 1, name, email };
      users.push(newUser);
      res.status(201).json(newUser);
    } else {
      res.status(401).json({ error: 'Unauthorized: Email domain not allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/users', (req, res) => {
  httpRequestCounter.inc({ method: 'GET', path: '/users', status: res.statusCode });
  res.json({ users });
});

collectDefaultMetrics();


app.listen(port, () => {
  console.log(`User Management Service running on port ${port}`);
});
