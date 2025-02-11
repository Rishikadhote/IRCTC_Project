import express from 'express';
import { pool } from '../config/database.js';
import { authenticateUser } from '../middlewares/authentication.middleware.js';

const router = express.Router();

router.post('/book', authenticateUser, async (req, res) => {
  const { userId, trainId } = req.body;

  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    const [train] = await connection.execute(
      "SELECT available_seats FROM trains WHERE id = ? FOR UPDATE",
      [trainId]
    );

    if (train.length === 0) {
      throw new Error("Train not found");
    }

    if (train[0].available_seats <= 0) {
      throw new Error("No seats available");
    }

    await connection.execute(
      "INSERT INTO bookings (user_id, train_id) VALUES (?, ?)",
      [userId, trainId]
    );
    await connection.execute(
      "UPDATE trains SET available_seats = available_seats - 1 WHERE id = ?",
      [trainId]
    );

    await connection.commit();
    res.status(200).json({ message: "Seat booked successfully!" });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

export default router;
