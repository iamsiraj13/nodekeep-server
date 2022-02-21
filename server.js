const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const notes = require('./data/data');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database')
const userRoutes  = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middlewares/middlewares');


dotenv.config();

app.use(cors());
app.use(express.json())

connectDB();
// get all the notes
// app.get('/api/notes', ( req, res)=>{
//     res.json(notes)
// })


// get single note
// app.get('/api/note/:id', ( req, res)=>{
    
//     const id = req.params.id;
//     const result = notes.find((n)=>n._id === id);

//     res.json(result)
// })

// user route
app.use('/api/users', userRoutes)



// app.get('/', (req, res) => {
//   res.send('Api is running')
// })

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})