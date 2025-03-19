const express = require('express');
const postModel = require("./models/postModel")
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json())
app.use(express.static('public'))

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended : true}))

app.use(bodyParser.json());
app.use(cors());

app.get("/",async(req,res)=>{
    const posts = await postModel.find()
    res.render("home",{title : "Home Page", posts : posts})
})

app.get("/home",async(req,res)=>{
    const posts = await postModel.find()
    res.render("index",{title : "Home Page", posts})
})

app.post("/posts",async(req,res)=>{
    console.log(req.body)

    const { title,content } = req.body

    const blogPost = new postModel({
        title,
        content
    })
    const postData = await blogPost.save()
    console.log(postData)

    const posts = await postModel.find();
    res.render("home",{title : "Home Page",posts : posts})
})


app.get('/edit/:id', async (req, res) => {
    const post = await postModel.findById(req.params.id);
    res.render('edit', { title: 'Edit Post', post });
});

// app.post('/edit/:id', async (req, res) => {
//     const { title, content } = req.body;
//     await postModel.findByIdAndUpdate(req.params.id, { title, content });
//     res.redirect('/');
// });

app.post("/edit/:id",async(req,res)=>{
    const {title,content} =req.body

    try{
        await postModel.findByIdAndUpdate(req.params.id,req.body)
        const posts =await postModel.find()
        res.render('home',{title : "Home Page",posts})

    }catch (error) {
        console.error('Error updating post:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.post('/delete/:id', async (req, res) => {
    try {
        await postModel.findByIdAndDelete(req.params.id);
        const posts = await postModel.find(); // Fetch updated posts after deletion
        res.render('home', { title: 'Home Page', posts });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).send('Internal Server Error');
    }
});


const connectDB = require("./config/dbConfig");
connectDB()


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
