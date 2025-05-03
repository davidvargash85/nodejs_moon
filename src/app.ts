// app.ts
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { errors as celebrateErrors, isCelebrateError } from 'celebrate';
import bodyParser from 'body-parser';
import connectDB from './utils/db';
import mainRouter from './routes';
import { get404 } from './controllers/error';
import { User } from './models';

dotenv.config();

const app = express();

declare global {
  namespace Express {
    interface Request {
      user?: InstanceType<typeof User>;
    }
  }
}

const dummyUserEmail = 'davidvargash@gmail.com';

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// body‐parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use(async (req: Request, res: Response, next: NextFunction) => {
  {
    try {
      const user = await User.findOne({ email: dummyUserEmail });
      if (user) {
        req.user = user;
      }
      next();
    } catch (error) {
      console.log('>> error fetching user', error);
    }
  }
})

// 1️⃣ Mount all your application routes
app.use(mainRouter);

// 2️⃣ Celebrate’s error handler: catches Joi validation errors
//    and turns them into 400 responses automatically.
//    Must come *after* your routes.
app.use(celebrateErrors());

// 👇 define it as ErrorRequestHandler
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log('>>> error caught!!!')
  if (isCelebrateError(err)) {
    const validation = err.details.get('body');
    const messages = validation
      ? validation.details.map((d) => d.message)
      : ['Invalid request'];

    // send response, then return void
    res.status(400).json({
      message: 'Validation failed',
      errors: messages,
    });
    return; // <— this makes the return type void
  }

  console.error('Unhandled error:', err);

  // send 500, then return void
  res.status(500).json({
    message: 'Internal server error',
    error: err.message || String(err),
  });
  return;
};
// Register it with app.use — now TS knows this is an ErrorRequestHandler
app.use(globalErrorHandler);

// 4️⃣ 404 handler for anything that didn’t match
app.use(get404);

// DB + server start
connectDB()
  .then(async () => {
    console.log('✅ MongoDB connected');
    const user = await User.findOne({
      email: dummyUserEmail
    })

    if (!user) {
      await User.create({
        name: 'David V',
        email: dummyUserEmail
      });
    }

    app.listen(3001, () => {
      console.log('🚀 Listening on http://localhost:3001');
    });
  })
  .catch((err) => {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  });
