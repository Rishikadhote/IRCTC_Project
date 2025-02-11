const pool = require('../config/database');

const Booking = {
  create: async (userId, trainId) => {
    const query = "INSERT INTO bookings (user_id, train_id) VALUES (?, ?)";
    return pool.execute(query, [userId, trainId]);
  },

  findByUserId: async (userId) => {
    const query = "SELECT * FROM bookings WHERE user_id = ?";
    const [rows] = await pool.execute(query, [userId]);
    return rows;
  }
};

module.exports = Booking;
