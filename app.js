require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
let movieList = require('./movieList.json')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(function validateBearerToken(req, res, next) {
    const bearerToken = req.get('Authorization')
    const apiToken = process.env.API_TOKEN

    console.log('validate bearer token middleware')

    if (!bearerToken || bearerToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({ error: 'Unauthorized request' })
    }
    next()
})


app.get('/movie', (req, res) => {
    const movieGenre = req.query.genre
    const movieCountry = req.query.country
    const movieAvgVote = req.query.avg_vote
    let response = movieList

    // Genre query
    if (movieGenre) {
        response = response.filter(movie =>
            movie.genre.toLowerCase().includes(movieGenre.toLowerCase())
        )
    }

    // Country query
    if (movieCountry) {
        response = response.filter(movie =>
            movie.country.toLowerCase().includes(movieCountry.toLowerCase())
        )
    }

    // Average vote query (number)
    if (movieAvgVote) {
        response = response.filter(movie =>
            movie.avg_vote >= Number(movieAvgVote))
    }


    res.send(response)
})

const PORT = 8000
app.listen(PORT, () => console.log(`Moviedex is working on ${PORT}`))

