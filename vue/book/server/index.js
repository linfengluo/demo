import express from 'express'
import {Nuxt, Builder} from 'nuxt'
import bodyParser from 'body-parser'
// import cookieParser from 'cookie-parser'
// import session from 'express-session'
import apiRouter from './api'

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3030


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
// app.use(cookieParser())
// app.use(session({
//     secret: 'book',
//     resave: false,
//     saveUninitialized: false
// }))

app.set('port', port)

app.use(apiRouter)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
    const builder = new Builder(nuxt)
    builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)

console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console

