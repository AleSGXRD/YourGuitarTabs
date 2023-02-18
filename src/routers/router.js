import express from "express";

import pool from "../db/db.js"

const Router = express.Router();

Router.get("/",(req,res)=>{
    res.render("index",{web:"index",pos:0});
})

Router.get("/tabs", async(req,res)=>{
    const filters = req.query;
    filters.p = parseInt(filters.p);
    const [result] = await pool.query(`SELECT * FROM tabs as RESULT`);
    var nuevaLista = [];
  
    if (req.query.w !== "") {
      for (var i = 0; i < result.length; i++) {
        var temp = "-";
        temp += result[i].description.toLocaleLowerCase();
        if (temp.includes(filters.w.toLocaleLowerCase())) {
          nuevaLista.push(result[i]);
        }
      }
      result = nuevaLista;
    }
    res.render("tabs",{web:"tabs",tabs:result,pos:filters.p,word:filters.w,list:filters.l});
})
Router.get("/about",(req,res)=>{
    res.render("about",{web:"about"});
})
Router.get("/addsong",(req,res)=>{
  res.render("add",{web:""});
})

import control from "../controllers/controller.js"

Router.post('/filter-word', control.filterWord);
Router.post('/add', control.addSuggest);


export default Router;