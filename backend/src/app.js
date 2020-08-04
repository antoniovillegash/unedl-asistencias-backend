const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

//settings
app.set('port', process.env.PORT || 4000);

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//middelwares
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true, limit:'50mb'}));
//app.use(express.json());


//routes
app.use('/api/attendance', require('./routes/attendance'))
app.use('/api/users', require('./routes/users'))

//static files
app.use('/assets', express.static(__dirname + '/assets/'))


module.exports = app;
