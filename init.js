const mongoose = require('mongoose');

async function main() {

   await mongoose.connect('mongodb://127.0.0.1:27017/Chat')
}

main().then(()=>console.log('Connection Established')).catch(err=>console.log(err.message));

const chat = require ('./Models/Chat');


let chats = (
  
  [

    {

      From: 'B Mumma',

      To: 'Aanchal',

      Message: 'Did you take milk with you for mukku',

      Date: new Date()
    },

    {

      From: 'Rav',

      To: 'Aanchu❤',

      Message: 'Hi Bubu',

      Date: new Date()

    },


    {

      From: 'Ankita',

      To: 'Aanchal',

      Message: 'Are we going ?',

      Date: new Date()
    }

  ]


);


chat.insertMany(chats).then(res=>console.log(res)).catch(err=>console.log(err.message));