const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('63dd53a418cec53595e8396c')
//     .then(user => {
//       // console.log(user);
//       // console.log('this was called');
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       // console.log(req.user);
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://archie00:FQVKwBFEVrspxBfc@cluster0.t9sz7p7.mongodb.net/test')
.then(result => {
  app.listen(3000);
})
.catch(err => console.log(err));