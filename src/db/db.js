import mysql from "mysql";
import { DB_HOST,DB_NAME,DB_PASSWORD,DB_USER,DB_PORT } from "../config.js";

const db = await mysql.createConnection({
    user:DB_USER,
    password:DB_PASSWORD,
    host:DB_HOST,
    port:   DB_PORT,
    database:DB_NAME
})

db.connect((error)=>{
    if(error){
        console.log(error);
    }
    
    console.log("connect");
})

export default db;