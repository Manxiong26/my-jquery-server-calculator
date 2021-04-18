const express = require('express');
const app = express();
app.use(express.static('server/public') );
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true} ) );








const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);   
})