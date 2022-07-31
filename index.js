const express = require('express')
const fs = require('fs');
const path = require('path');
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

app.get('/list_files_gui',((req,res)=>{
    const directoryPath = path.join(__dirname, 'uploads');
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            res.write(file); 
            res.send()
        });
    });
}));
app.get('/cc',((req,res)=>{
    // res.send('d');
    const directoryPath = path.join(__dirname, 'uploads');
    let xx = [];
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        let i =0;
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            // res.write({}); 
            let obj = {};
            obj[file] = 'https://molazim-node.herokuapp.com/uploads/'+file;
            xx.push(obj)
            i++;
        });
        console.log(JSON.stringify(xx))
        res.send(JSON.stringify(xx))
    }); 
}));
app.listen(process.env.PORT || 8000)