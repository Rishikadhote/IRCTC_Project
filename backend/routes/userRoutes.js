import express from 'express';
import { pool } from '../config/database.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/profile', authenticateUser, async (req, res) => {
  try {
    const [user] = await pool.execute(
      "SELECT id, username, role FROM users WHERE id = ?",
      [req.user.id]
    );

    if (user.length === 0) return res.status(404).json({ message: "User not found" });

    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
