import express from 'express';
import { pool } from '../config/database.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/availability', authenticateUser, async (req, res) => {
  const { trainId } = req.query;

  try {
    const [seats] = await pool.execute(
      "SELECT available_seats FROM trains WHERE id = ?",
      [trainId]
    );

    if (seats.length === 0) return res.status(404).json({ message: "Train not found" });

    res.json({ availableSeats: seats[0].available_seats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
