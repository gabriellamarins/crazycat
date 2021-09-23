const express = require('express')
const app = express();
const port = 8000;

//const path = require('path')
// let cc_db = []

app.use(express.static('public'))
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname +'/index.html')
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname +'/about.html')
});

app.get('/movies', (req, res) => {
    res.sendFile(__dirname +'/movies.html')
});


app.get('/about' + ':id', (req, res) => {
    console.log(req.params.id)
    res.sendFile(__dirname +'/about.html')
});

// app.get('/', (req, res) => {
//     return res.json(cc_db)
// })
//
//
// app.post('/add_movie',(req, res) => {
//     const body = req.body
//     if (!body)
//         return res.status(400).end(body)
//     cc_db.push(body)
//     return res.json(body)
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});



//https://stackoverflow.com/questions/25623041/how-to-configure-dynamic-routes-with-express-js