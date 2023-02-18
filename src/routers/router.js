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


Router.get("/admin",async (req,res)=>{
  const filters = req.query;
  filters.p = parseInt(filters.p);
  const [result] = await pool.query('SELECT * FROM suggest');

  res.render("admin",{web:"admin",suggest:result,pos:filters.p});
})
import control from "../controllers/controller.js"

Router.post('/filter-word', control.filterWord);
Router.post('/add', control.addSuggest);

Router.get('/add-tab/:id',(req,res)=>{
  const id = parseInt(req.params.id)-1;
  const tab= {id:0,direc:'xx',description:'xx',creator:'xx'};
  db.query('SELECT * FROM suggest',(error,results)=>{
      if(error)
          console.log(error);
      else{
          const m=results[id];
          tab.direc=m.direc;
          tab.description = m.description;
          tab.creator = m.creator;
          db.query('INSERT INTO tabs SET ?',{direc:tab.direc,description:tab.description,creator:tab.creator},(error,results)=>{
              if(error)
                  console.log(error);
              else{
                  db.query('DELETE FROM suggest WHERE id = ?', [parseInt(id)+1],(error, results) =>{
                      if(error){
                          throw error;
                      }
                      else{
                        res.redirect('/tabs?p=0&w=');
                      }
                  })
              }
          })
      }
  })
})


export default Router;