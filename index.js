const mainPrompt = require('./utils/prompts/inquierPrompts');
const db = require('./db/connections');

db.connect((err) =>{
    if (err){
        throw err;
    }
    console.log("Welcome! You are now connected to the employees database");
    mainPrompt();
})