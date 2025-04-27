import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { get404 } from './controllers/error';
import { sequelize } from './util/database';
import mainRouter from './routes'; // ✅ Only one router now!

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

// ✅ Use the consolidated main router
app.use(mainRouter);

// 404 handler
app.use(get404);

// Start database and server
sequelize
  .sync()
  .then(() => {
    console.log('Database synced successfully!');
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  })
  .catch((error) => {
    console.error('Database sync error:', error);
  });
