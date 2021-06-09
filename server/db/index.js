
// bringin in the pg library
const { Pool } = require('pg')

// how we connect to postgres database
const pool = new Pool()

module.exports = {
  query: (text, params) => pool.query(text, params),
}