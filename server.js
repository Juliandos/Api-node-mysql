const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');


const app = express();

const dboptions = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'library_node_mysql'
}

app.set('port', process.env.PORT || 9000);

app.use(myconn(mysql, dboptions, 'single'));

app.listen(app.get('port'), () => {
    console.log('listening on port', app.get('port'));
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});