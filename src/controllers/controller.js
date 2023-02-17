import db from "../db/db.js"

function filterWord(req,res){
    const word = req.body.id;
    res.redirect('/tabs?p=0&w='+word);
}
function addSuggest(req,res){
    const name = req.body.name;
    const direc = req.body.direc;
    const creator = req.body.creator;
    db.query('INSERT INTO suggest SET ?', {direc:direc,description:name,creator:creator},(error,results)=>{
        if(error){
            console.log(error);
        }
        else{
            res.redirect('/tabs?p=0&w=');
        }
    });
}
export default {filterWord,addSuggest};