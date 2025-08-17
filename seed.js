// seed.js
const fs = require('fs')
const { Pool } = require('pg')
require('dotenv').config(); 

console.log('DB_PASS:', process.env.DB_USER, typeof process.env.DB_USER);

const pool = new Pool({
  connectionString:process.env.DATABASE_URL,
    ssl: {
    rejectUnauthorized: false // Render usually requires SSL
  }
});

async function runSeed() {
  try {
    const sql = fs.readFileSync('./seed.sql', 'utf-8')
    await pool.query(sql)
    console.log('Seed complete!')
  } catch (err) {
    console.error('Error running seed:', err)
  } finally {
    await pool.end()
  }
}

runSeed()
