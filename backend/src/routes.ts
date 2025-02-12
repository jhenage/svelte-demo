import { Router } from "express";
import users, { User, fetchusers } from "./users";

const router = Router();
let nextId = 0;
fetchusers.then(()=>{nextId = users.size + 1})

// Get all users
router.get("/users", (req, res) => {
    res.json(Array.from(users.values()));
});
  
// Create a new user
router.post("/user", (req, res) => {
  const { first_name, last_name, email, avatar } = req.body;
  if (!first_name || !last_name || !email || !avatar ) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  const newUser: User = { id:nextId, first_name, last_name, email, avatar };
  users.set(nextId+'', newUser);
  nextId++;
  res.status(201).json({user:newUser});
});

// Update a whole user
router.put("/user", (req, res) => {
  const { id, first_name, last_name, email, avatar } = req.body;
  if (!users.has(id+'')) {
    res.status(404).json({ error: `User ${id} not found` });
    return;
  }
  const updatedUser: User = { id, first_name, last_name, email, avatar };
  users.set(id+'', updatedUser);
  res.json({user:updatedUser});
});

// Update a partial user
router.patch("/user", (req, res) => {
  const { id, first_name, last_name, email, avatar } = req.body;
  const oldUser = users.get(id+'');
  if (!oldUser) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  const updatedUser: User = { 
    id, 
    first_name:first_name ?? oldUser.first_name, 
    last_name:last_name ?? oldUser.last_name, 
    email:email ?? oldUser.email, 
    avatar:avatar ?? oldUser.avatar
  };
  users.set(id+'', updatedUser);
  res.json({user:updatedUser});
});

// Delete a user
router.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  if (!users.has(id)) {
    res.status(404).json({ error: `User ${id} not found` });
    return;
  }
  users.delete(id);
  res.status(204).send();
});

export default router;
