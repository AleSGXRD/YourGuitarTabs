import {createPool} from "mysql";
import { DB_HOST,DB_NAME,DB_PASSWORD,DB_USER,DB_PORT } from "../config.js";

const db = createPool({
    user:DB_USER,
    password:DB_PASSWORD,
    host:DB_HOST,
    port:   DB_PORT,
    database:DB_NAME
})

export default db;