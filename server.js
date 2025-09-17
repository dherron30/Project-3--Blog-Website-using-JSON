// server.js (frontend)
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const API_URL = process.env.API_URL || "http://localhost:4000";

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Home page (list posts)
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    res.render("index", { posts: response.data });
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).send("Error fetching posts");
  }
});

// New post form
app.get("/new", (req, res) => {
  res.render("update", {
    heading: "New Post",
    submit: "Create Post",
    post: { title: "", content: "", author: "" },
  });
});

// Edit form
app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    res.render("update", {
      heading: "Edit Post",
      submit: "Update Post",
      post: response.data,
    });
  } catch (error) {
    console.error("Error fetching post:", error.message);
    res.status(500).send("Error loading post");
  }
});

// Create new post
app.post("/api/posts", async (req, res) => {
  try {
    await axios.post(`${API_URL}/posts`, req.body);
    res.redirect("/");
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).send("Error creating post");
  }
});

// Update post
app.post("/api/posts/:id", async (req, res) => {
  try {
    await axios.patch(`${API_URL}/posts/${req.params.id}`, req.body);
    res.redirect("/");
  } catch (error) {
    console.error("Error updating post:", error.message);
    res.status(500).send("Error updating post");
  }
});

// Delete post
app.get("/api/posts/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting post:", error.message);
    res.status(500).send("Error deleting post");
  }
});

// Start frontend server
app.listen(port, "0.0.0.0", () => {
  console.log(`Frontend server running at http://localhost:${port}`);
});
