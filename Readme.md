#This is the <span style="color:green"> Crazy Cat API </span> 👹  documentation


This API is not authenticated.


## Display the list of movies
GET '/movies'



✔️Example request:
app.get('/movies', (req, res) => {
res.sendFile(__dirname +'/movies.html')
});



##Display a movie by ID
GET '/movie' + ':id_movie'



✔️Example request:

app.get('/movie' + ':id', (req, res) => {
console.log(req.params.id)
res.sendFile(__dirname +'/movie.html')
});




##How to add a movie 

POST '/movie' + 'id_movie'


✔️Example request:

app.post('/movie' + ':id_movie', (req, res) => {
const movie = Movie.creat(req.body, (err) => {
if (err) return res.status(400).json({
error:true,
message: "Error: Movie not added"
});

return res.status(200).json({
error:false,
message: "Movie  successfully added"
})
});
});

 Parameters:
  - id_movie - integer

  - title - string  
    The name of the movie.
  
  - poster_path  string  
    The  poster of the movie.
  
  - release_date -  date  
    The date of the insertion in the list.
  
  - adult -  boolean  
    The status of the supplier.
  
  - vote_average - string
    The latitude of the supplier.
  
  - overview - text
    the description of the movie.



##How to delete a movie

DELETE '/movies' + ':id_movie'

✔️Example request:

app.delete('/movies' + 'id_movie', req, res) => {
console.log(req.params.id)
res.sendFile(__dirname +'/movie.html')




##How to edit a movie

PUT '/movies' + 'id_movie'

PATCH '/movies' + 'id_movie'


✔️Example request:

app.put('/movies' + 'id_movie', req, res) => {
console.log(req.params.id)
res.sendFile(__dirname +'/movie.html')

app.patch('/movies' + 'id_movie', req, res) => {
console.log(req.params.id)
res.sendFile(__dirname +'/movie.html')