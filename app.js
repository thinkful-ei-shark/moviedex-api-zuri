const express = require('express')
const morgan = require('morgan')
let movieList = require('./movieList.js')

const app = express()

app.use(morgan('dev'))

app.get('/movie', (req, res) => {
    const movieGenre = req.query.genre
    const movieCountry = req.query.country
    const movieAvgVote = req.query.avg_vote
    let response = movieList

    if (movieCountry) {
        response = response.filter(movie =>
            movie.country.toLowerCase().includes(movieCountry.toLowerCase())
        )
    }
    // Genre query
    if (movieGenre) {
        response = response.filter(movie =>
            movie.genre.toLowerCase().includes(movieGenre.toLowerCase())
        )
    }

    // Country query

    // Average vote query (number)
    if (movieAvgVote) {
        response = response.filter(movie =>
            movie.avg_vote >= Number(movieAvgVote))
    }


    res.send(response)
})

const PORT = 8000
app.listen(PORT, () => console.log(`Moviedex is working on ${PORT}`))


// 1. get query working
// 2. authorization
// 3.cors
