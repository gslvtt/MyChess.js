const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./models/db.js');
const session = require('express-session');
const router = require('./router');
const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 3000;
const SECRET = process.env.SECRET || 'SECRET';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const corsConfig = {
  origin: CLIENT_URL,
  credentials : true
}

app.use(cors(corsConfig))
   .use(express.json())
   .use(
      session({
        // the store property, if not specified, defaults to the in-memory store
        name: 'sid',
        saveUninitialized: false,
        resave: false,
        secret: SECRET,
        cookie: {
          maxAge: 1000 * 60 * 60, // 1hr
          sameSite: true,
          httpOnly: true,
          // Set to True for https
          secure: false,
        },
      })
    )
   .use(router)
   .get('*', (req, res) => {
      res.status(404).send('Not Found');
    });

const server = bootstrap();

async function bootstrap() {
  try {
    await dbConnection.authenticate();
    console.log('Connection has been established successfully.');
    await dbConnection.sync();
    console.log('Sync Complete.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  return app.listen(SERVER_PORT, (err) => {
    if (err) {
      console.log(`Sorry, something went wrong! ${err}`);
    } else {
      console.log(`MyChess listening on port ${SERVER_PORT}`);
    }
  });
}

module.exports = server;