import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import connectDB from './utils/db';
import Hello from './models/hello';
import { get404 } from './controllers/error';
import mainRouter from './routes';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

// ✅ Use the consolidated main router
app.use(mainRouter);

// 404 handler
app.use(get404);

connectDB().then(async () => {
  const test = new Hello({ message: 'Hello MongoDB!' });
  await test.save();

  const docs = await Hello.find();
  console.log('📦 Documents in DB:', docs);

  app.listen(3001, () => {
    console.log('🚀 Server running on http://localhost:3001');
  });
});
