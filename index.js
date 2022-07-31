const express = require('express')
const fs = require('fs');
const app = express()

const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const _ = require('lodash');
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.get('/',((req,res) => {
    let form = fs.readFile('index.html',{encoding:'utf-8'},(err,data)=>{
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data)
        return res.send();
    })
}));

app.post('/test',((req,res)=>{
    let f = req.files.profile;
    f.mv('./uploads/'+f.name);
    res.send('yo')
}))
app.listen(process.env.PORT || 8000)