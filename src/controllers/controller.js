import db from "../db/db.js"

function filterWord(req,res){
    const word = req.body.id;
    res.redirect('/tabs?p=0&w='+word);
}
async function addSuggest (req,res){
    const name = req.body.name;
    const direc = req.body.direc;
    const creator = req.body.creator;
    const [result] = await db.query('SELECT * FROM suggest');

    await db.query('INSERT INTO suggest SET ?', {id:result.length,direc:direc,description:name,creator:creator});
    res.redirect('/tabs?p=0&w=');
}
export default {filterWord,addSuggest};