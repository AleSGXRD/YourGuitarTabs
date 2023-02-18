import express from 'express';
import {dirname,join} from "path";
import { fileURLToPath } from 'url';

import router  from './routers/router.js';

const app = express();

const _dirname = dirname(fileURLToPath(import.meta.url));

app.set("views", join(_dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended:false}));

app.use(router);

app.use(express.static(join(_dirname,"public")));

import {PORT} from "./config.js"

app.listen(PORT, ()=>{
    console.log("port: " +PORT);
})

