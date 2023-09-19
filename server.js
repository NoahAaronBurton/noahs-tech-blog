const express = require('express');

//express
const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('the server is running at localhost:' + PORT);
})