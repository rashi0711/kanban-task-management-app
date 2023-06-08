import mysql from 'mysql'
import 'dotenv/config'
export const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:process.env.DB_PASSWORD,
    database:"tasks"
})