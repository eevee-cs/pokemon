const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


// require in routers

const app = express();
const PORT = 3000;

// TODO update these to use express module
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// check if the root directory will be in public
// serve up static files
app.use(express.static(path.join(__dirname, 'public')));

// flow message
app.use((req, res, next) => {
  console.log(
    `CHAOS FLOW TEST: METHOD: ${req.method}, PATH: ${req.url}, BODY: ${JSON.stringify(req.body)}`,
  );
  return next();
});

// add routers here:
// app.use('/login', loginRouter);

// render default endpoint html page
app.use('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'));
});

// standard bad endpoint, send 404
app.use('*', (req, res) => {
  console.log('undefined endpoint, 404 error sent to user');
  res.status(404).send('This endpoint has not been built, try again!');
});

// global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultError = {
    status: 500,
    message: 'Default Error from the Global Error Handler',
  };

  console.log('global error handler triggered');
  const assignError = { ...defaultError, ...err };

  // send the response
  res.status(assignError.status).send(assignError.message);
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
