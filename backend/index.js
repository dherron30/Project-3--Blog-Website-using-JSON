// index.js (backend API)
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const host = "0.0.0.0"; // Required for Render

// CORS setup - allow all or restrict to frontend domain
app.use(cors());
// app.use(cors({ origin: "https://your-frontend.onrender.com" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Backend API is working", endpoints: ["/posts", "/posts/:id"] });
});

// Sample data (in-memory)
let posts = [
  {
    id: 1,
    title: "Sample Post",
    content: "This is a blog post.",
    author: "Danielle Herron",
    date: "17/09/2025",
  }
];
let lastId = posts.length;


// Get all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// GET one
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.json(post);
});

// Create new post
app.post("/posts", (req, res) => {
  const newPost = {
    id: ++lastId,
    title: req.body.title || "",
    content: req.body.content|| "",
    author: req.body.author|| "",
    date: new Date().toISOString().split("T")[0]
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Edit post
app.patch("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// Delete post
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

// Start server
app.listen(port, host, () => {
  console.log(`Backend API running at http://${host}:${port}`);
});
