'use strict'
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

//connecting
app.use(express.static(_dirname+'/dist'));
app.get('*', (req, res) =>{
    res.sendFile(path.resolve(_dirname+'/dist', 'index.html'));
});
app.listen(port);