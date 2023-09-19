const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const hbs = exphbs.create({});
const routes = require('./controllers');

//express
const app = express();
const PORT = process.env.PORT || 3001;

// Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
//TODO: add controller
app.use(routes);

app.listen(PORT, () => {
    console.log('the server is running at localhost:' + PORT);
})