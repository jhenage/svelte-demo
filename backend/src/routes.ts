import { Router } from "express";
import users, { User } from "./users";

const router = Router();

// Get all users
router.get("/users", (req, res) => {
    res.json(Array.from(users.values()));
});
  
// Create a new user
router.post("/user", (req, res) => {
  const { id, first_name, last_name, email, avatar } = req.body;
  if (!id || !first_name || !last_name || !email || !avatar ) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  if (users.has(id)) {
    res.status(409).json({ error: "User ID already exists" });
    return;
  }
  const newUser: User = { id, first_name, last_name, email, avatar };
  users.set(id, newUser);
  res.status(201).json(newUser);
});

// Update a whole user
router.put("/user", (req, res) => {
  const { id, first_name, last_name, email, avatar } = req.body;
  if (!users.has(id)) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  const updatedUser: User = { id, first_name, last_name, email, avatar };
  users.set(id, updatedUser);
  res.json(updatedUser);
});

// Update a partial user
router.patch("/user", (req, res) => {
  const { id, first_name, last_name, email, avatar } = req.body;
  const oldUser = users.get(id);
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
  users.set(id, updatedUser);
  res.json(updatedUser);
});

// Delete a user
router.delete("/user", (req, res) => {
  const { id } = req.body;
  if (!users.has(id)) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  users.delete(id);
  res.status(204).send();
});

export default router;
