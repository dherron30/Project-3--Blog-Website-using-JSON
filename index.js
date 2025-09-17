// index.js (backend API)
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// JSON data
let posts = [
  {
    id: 1,
    title: "🥢 From Dim Sum to Phonics: My TEFL Life in Hong Kong",
    content: "Moving to Hong Kong to teach English wasn’t just a career move — it was a leap into a whole new lifestyle. One day I was nervously ordering dim sum, the next I was standing in front of a classroom full of bright-eyed learners, ready to explore their first English sounds.Teaching children aged 3 to 12 has been a joyful challenge. From phonics and first words to full sentences and creative stories, watching my students grow in confidence and language skills has been incredibly rewarding.Outside the classroom, life in Hong Kong is fast-paced, flavorful, and full of adventure. The MTR makes getting around effortless, whether I’m heading to work or hiking trails like Dragon’s Back. On weekends, I’m often exploring local cafés, sharing meals with fellow teachers, or diving into Hong Kong’s endless food scene — from street noodles to late-night hotpot.Teaching in Hong Kong has given me more than professional growth — it’s given me unforgettable experiences, lasting friendships, and a deep appreciation for a culture that now feels like home.",
    author: "Danielle Herron",
    date: "17/09/2025",
  },
    {
    id: 2,
    title: "From Rickshaws to the Best Bao Bun: My live in Hanoi Vietnam",
    content: "Moving to Hanoi was like stepping into a storybook written in color, chaos, and the scent of street food. From the hum of rickshaws weaving through narrow lanes to the early morning buzz of locals sipping egg coffee on tiny plastic stools, every day brought something new.As a teacher and traveler, life in Hanoi has been full of unexpected joy. My days are a blend of lesson plans and language games, but in between, I’m exploring temples tucked behind markets, dodging scooters with surprising ease, and searching for the perfect bao bun — soft, warm, filled with flavors I can’t always name, but instantly love.The rhythm of life here is different. Slower in some ways, louder in others. It’s in the daily rituals — the call of street vendors, the smile from the bánh mì lady who knows my order, the calm of Hoàn Kiếm Lake at dusk — that I’ve found my version of home.Living in Hanoi isn’t always easy, but it’s always rich. In culture, in community, and yes — in carbs.",
    author: "Danielle Herron",
    date: "17/09/2025",
  }
];
let lastId = 3;

//Middlewarae
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Get all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

// GET a specific post by id 
app.get("/posts/:id", (req,res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found"});
  res.json(post);
});

// POST a new post
app.post("/posts", (req,res) => {
  const newId = lastId +=1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when only one parameter needs updating
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p)=> p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// Delete a specific post by using the id.
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
