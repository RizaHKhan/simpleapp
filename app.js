let express = require('express')
let mongodb = require('mongodb')


let app = express()
let db

//this will make the contents of the folder available from the root of our server
app.use(express.static('public'))

const connectionString = 'mongodb+srv://mastaraz:Sidi2sexy!@to-do-list-s6ku5.mongodb.net/ToDoApp2?retryWrites=true&w=majority'
mongodb.connect(connectionString, {useNewUrlParser:true, useUnifiedTopology: true}, (err, client) => {
    db = client.db()
})



//automactically attach submitted form data to the body object. 
app.use(express.urlencoded({extended: false}))
//automactically attach submitted form data to the body object. 
app.use(express.json())

app.get('', (req, res) => {
    db.collection('task_list').find().toArray(function(err, x) {
        
        res.send(`<!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Simple To-Do App</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
        </head>
        <body>
          <div class="container">
            <h1 class="display-4 text-center py-1">To-Do App</h1>
            
            <div class="jumbotron p-3 shadow-sm">
              <form action="/create-item" method="POST">
                <div class="d-flex align-items-center">
                  <input autofocus name='item' autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
                  <button class="btn btn-primary">Add New Item</button>
                </div>
              </form>
            </div>
            
            <ul class="list-group pb-5">
                
            ${x.map(function(y) {
                return `
                <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                <span class="item-text">${y.task}</span>
                <div>
                  <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                  <button class="delete-me btn btn-danger btn-sm">Delete</button>
                </div>
              </li>
                `
            }).join('')}
              
            </ul>
          </div>

          <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
          <script src="/browser.js"></script>
        </body>
        </html>`)
    })

    
})

app.post('/create-item', (req, res) => {

    if(req.body.item == '') {
        console.log('Enter a task')
        res.render('/')
    } else {
    
    db.collection('task_list').insertOne({task: req.body.item}, function() {
        res.redirect('/')
    })
    }
})

app.post('/update-item', (req, res)=> {
    console.log(req.body.task)
    res.send('Success')
})


app.listen(3000)