const mongoose = require('mongoose');

const chat = require('./Models/project');

let allChats = (

[

 {

  From: 'Rav',

  To: 'Aanchal',

  Message: "Let's Go❤",

  Date: new Date()

 },


 {

From: 'Andy',

To: 'Ankita',

Message: 'On for baddy ?',

Date: new Date()

 }

]


);


chat.insertMany(allChats);


async function main() {

  await mongoose.connect('mongodb://127.0.0.1:27017/Chatting');
  
}


main().then(()=> console.log('connection established')).catch(err => console.log(err.message));


