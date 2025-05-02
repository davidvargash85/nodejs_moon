import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { get404 } from './controllers/error';
import mainRouter from './routes'; // ✅ Only one router now!
// import { sequelize, User } from './models';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// declare global {
//   namespace Express {
//     interface Request {
//       user?: InstanceType<typeof User>;
//     }
//   }
// }

app.use(async (req: Request, res: Response, next: NextFunction) => {
  // try {
  //   const u = await User.findOne({
  //     where: {
  //       email: 'david@vivasoft.com'
  //     }
  //   })
  //   if (u) {
  //     req.user = u;
  //   }
  //   next();
  // } catch (error) {
  //   console.log('>> error fetching the app user');
  // }
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

// ✅ Use the consolidated main router
app.use(mainRouter);

// 404 handler
app.use(get404);

// Start database and server
// sequelize
//   // .sync({
//   //   force: true,
//   // })
//   .sync()
//   // fetching user 
//   .then(async () => {
//     const [user, created] = await User.findOrCreate({
//       where: { email: 'david@vivasoft.com' },
//       defaults: {
//         name: 'David Vargas',
//         email: 'david@vivasoft.com'
//       }
//     });
//     if (created) {
//       console.log(`Dummy user created: ${user.name}`);
//     } else {
//       console.log(`Dummy user already exists: ${user.name}`);
//     }
//   })
//   .then(() => {
//     console.log('Database synced successfully!');
//     app.listen(3000, () => {
//       console.log('Server is running on http://localhost:3000');
//     });
//   })
//   .catch((error) => {
//     console.error('Database sync error:', error);
//   });