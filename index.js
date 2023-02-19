import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import * as WaiterController from './controllers/WaiterController.js';
import * as AdminController from './controllers/AdminController.js';
import * as TipsController from './controllers/TipsController.js';

mongoose.connect('mongodb+srv://LateBloomer:20010ovvoO@tips.jfoguii.mongodb.net/tips?retryWrites=true&w=majority')
  .then(() => console.log('DB OK'))
  .catch(error => console.log('DB ERROR', error));

const app = express();

app.use(express.json());
app.use(cors());

// ----------------------- WAITER -----------------------
app.get('/waiters', WaiterController.getAll);
app.post('/waiters', WaiterController.add);
app.delete('/waiters/:id', WaiterController.remove);

// ----------------------- ADMIN -----------------------
app.get('/admin', AdminController.getAll);
app.post('/login', AdminController.login);
app.post('/admin', AdminController.create);
app.delete('/admin/:id', AdminController.remove);

// ----------------------- TIPS -----------------------
app.post('/tips', TipsController.sendData);

app.listen(666, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});






