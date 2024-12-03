const express = require('express');

const app = express();

const port = 3000;

const { v4: uuidv4 } = require('uuid');

const path = require('path');

const mysql = require('mysql2');

const methodOverRide = require('method-override');

const { faker } = require('@faker-js/faker');

app.use(methodOverRide('_method'));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended:true}));

app.use(express.json());


app.listen(port, () => {

   console.log('Server Started');
})

const connection = mysql.createConnection({
  

  host: 'localhost',

  user: 'root',

  database: 'abetech',

  password: 'MobiControl@)!!'
  
});


app.get('/users', (req,res)=> {

let q = 'select * from bunzl';

connection.query(q, (err, users)=> {

  if (err) {

     console.log(err.message);
  
    } else {

      res.render('main', {users});
    }
    
})

});




app.get('/users/new', (req,res)=>{

   res.render('new');
})


app.post('/users', (req,res)=> {

   let id = uuidv4();

   let {username,email,password} = req.body;

  let q =  'insert into bunzl (id, username, email, password) values (?,?,?,?)';

    connection.query(q,[id, username, email, password],(err,res)=> {

        if (err) {

          console.log(err.message);
        
        } else {

          console.log(res);  
      }

       
    })

    res.redirect('/users');
})



app.get('/users/:id/edit', (req,res)=>{

   let {id} = req.params;

   let q = `select * from bunzl where id = '${id}'`;

  connection.query(q, (err,users)=> {

      if (err) {

        console.log(err.message);
      
      } else {

         res.render('edit', {users})
      }
  })

})


app.post('/users/:id', (req,res) => {

    let {id} = req.params;

    let {newUsername} = req.body;

    let {password} = req.body;

    console.log(newUsername);

    let q = `select * from bunzl where id = '${id}'`;

    connection.query(q, (err,result)=> {

      let user = result[0];

        if (password !== user.password) {

           console.log('wrong');
        
          } else {

             let query = `update bunzl set username = '${newUsername}' where id = '${id}'`;

             connection.query(query, (err,result)=>{


              res.redirect('/users');
                
             });
          }
    })

})



app.delete('/users/:id', (req,res)=> {

   let {id} = req.params;

   let q = `delete from bunzl where id = '${id}'`;

   connection.query(q, (err,result)=> {

      if (err) {

         console.log(err.message);
      
        } else {

           console.log(result);

           res.redirect('/users');
        }
   })
})