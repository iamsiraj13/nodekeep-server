const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const notes = require("./data/data");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/middlewares");

const path = require("path")

dotenv.config();

app.use(cors());
app.use(express.json());

connectDB(); 


// user route
app.use("/api/users", userRoutes);

app.use("/api/notes", noteRoutes);


/*----------- deployment---------*/

__dirname = path.resolve();

if( process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/notekeep-client/build')))

    app.get('*', ( req, res )=>{
      res.sendFile(path.resolve(__dirname,'notekeep-client','build','index.html'))
    })
  } else{
  app.get("/", (req, res )=>{
    res.send("API is running")
  })
}

/*----------- deployment---------*/

app.get('/', (req, res) => {
  res.send('Api is running')
})

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
