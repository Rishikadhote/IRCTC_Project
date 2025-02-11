import express from 'express';
import { pool } from '../config/database.js';
import { authenticateAdmin } from '../middlewares/authentication.middleware.js';

const router = express.Router();

router.post('/add', authenticateAdmin, async (req, res) => {
  const { trainName, source, destination, totalSeats } = req.body;
  const query =
    "INSERT INTO trains (train_name, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?)";

  try {
    await pool.execute(query, [
      trainName,
      source,
      destination,
      totalSeats,
      totalSeats,
    ]);
    res.status(201).json({ message: "Train added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/search', async (req, res) => {
  const { source, destination } = req.query;
  const query = "SELECT * FROM trains WHERE source = ? AND destination = ?";

  try {
    const [trains] = await pool.execute(query, [source, destination]);
    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
