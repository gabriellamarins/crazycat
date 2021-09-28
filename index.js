const express = require('express')
const app = express();
// const port = 8000;
const port = (parseInt(process.env.PORT ||'8000', 10));// variable d’environnement PORT
//const level = require('level')
const level = require('level')
const sublevel = require('level-sublevel')



app.use(express.static('public'))
app.use('/static', express.static('public'))
app.use(express.json());

app.get('/', (req, res) => { //so pra ter uma carinha no index
    res.sendFile(__dirname +'/index.html')
});




const db = sublevel(level('./db_cc', {  valueEncoding: 'json'}))
const movies_db = db.sublevel('movies')
const mylist_db = db.sublevel('mylist')
const myreviews_db = db.sublevel('myreviews')



// app.post('/movies', async (req , res) => {
//      await movies_db.put(req.body.id, req.body) //  await movies_db.put(req.body.id, req.body) era assim, com um .id depois do primeiro body
//      res.json(req.body)
//      console.log(req.body)
// })


app.post('/movies', async (req , res) => { //nao funcionaaaaa

    if (parseInt(req.body.id)) {
        await movies_db.put(req.body.id, req.body)
        console.log(req.body)
        res.status(200).json(req.body)
    } else {
        res.status(404).json("The ID must be an integer").end();
    }

   if (!(req.body.id && req.body.name && req.body.rate)) {
        res.status(404).json("You must fill all the form").end()
    }

    // await movies_db.put(req.body.id, req.body) //  await movies_db.put(req.body.id, req.body) era assim, com um .id depois do primeiro body
    // res.json(req.body)
     console.log(req.body)
})




app.get('/movies/:movie_id', async (req , res) => {
    movies_db.get(req.params.movie_id, function (err, value) { //o await não funciona com o sublevel aqui no get
        if (err) return console.log('Ooops!', err)
        res.json(value)
        console.log(req.params)
    })
})

app.delete('/movies/:movie_id', async (req , res) => {
    movies_db.del(req.params.movie_id, function (err, value) {
        if (err) return console.log('Ooops!', err)
        res.json(value)
        console.log('The movie has been deleted')
    })
})


app.put('/movies/:id', async (req , res) => {
    await movies_db.put(req.body.id, req.body)
    res.json(req.body)
    console.log(req.body)
})


//--------------Movies Lists--------------

app.post('/mylist', async(req, res) => { //one movies list
    await mylist_db.put(req.body.id, req.body)
    res.json(req.body)
    console.log(req.body)
})


app.get('/mylist/:id', async (req , res) => {
    mylist_db.get(req.params.id, function (err, value) { //o await não funciona com o sublevel aqui no get
        if (err) return console.log('Ooops!', err)
        res.json(value)
        console.log(req.params)
    })
})


app.delete('/mylist/:id', async (req , res) => {
    mylist_db.del(req.params.id, function (err, value) {
        if (err) return console.log('Ooops!', err)
        res.json(value)
        console.log(req.params)
        console.log('The movie has been deleted')
    })
})


app.put('/mylist/:id', async (req , res) => {
    await mylist_db.put(req.body.id, req.body)
    res.json(req.body)
    console.log(req.body)
})


//-------- Movies List ------Add a movie to a list

app.post('/mylist/:id/add', async (req,res)=>{

    mylist_db.get(req.params.id, function (err, list_movies) { // list_movies = variable qui stocke la liste de films qui se trouve à l'intérieur de la liste principale.
        if (err) return console.log('Ooops!', err)             // list_inside = la liste de films qui se trouve à l'intérieur de la liste principale.
        list_movies.list_inside.push(req.body.movie_id)
        mylist_db.put(req.params.id, list_movies)
        res.json(req.body)
        console.log(list_movies)

    })
})

//--------Movies List ------Remove a movie from a list

app.delete('/mylist/:id/del/:movie_id', async (req , res) => {
    mylist_db.get(req.params.id, function (err, list_movies) {
        if (err) return console.log('Ooops!', err)
        let i = list_movies.list_inside.indexOf(parseInt(req.params.movie_id))
        console.log(i)
        list_movies.list_inside.splice(i,1);
        mylist_db.put(req.params.id, list_movies)
        res.json(list_movies)
        console.log(list_movies)

    })
})





app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});



//https://stackoverflow.com/questions/25623041/how-to-configure-dynamic-routes-with-express-js



