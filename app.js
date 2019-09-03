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
                  <button data-id="${y._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                  <button data-id="${y._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
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
// We used a CDN for Axios because we wanted to use it within the browers, not the server side. If we had to use it in the server, we would install the module through npm and require it in the app.js file.
    
})

app.post('/create-item', (req, res) => {

    if(req.body.item == '') {
        console.log('Enter a task')
       res.redirect('/')
    } else {
    
    db.collection('task_list').insertOne({task: req.body.item}, function() {
        res.redirect('/')
    })
    }
})

app.post('/update-item', (req, res)=> {

    db.collection('task_list').findOneAndUpdate({_id: new mongodb.ObjectId(req.body.id)}, {$set: {task: req.body.task}}, function() {
        res.send('Success')
    })
})

app.post('/delete-item', (req, res) => {
    db.collection('task_list').deleteOne({_id: new mongodb.ObjectID(req.body.id)}, function() {
        res.send('Success')
    })
})

app.listen(3000)