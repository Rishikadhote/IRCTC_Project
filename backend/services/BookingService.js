const pool = require('../config/database');
const Booking = require('../models/Booking');
const Train = require('../models/Train');

const BookingService = {
  bookSeat: async (userId, trainId) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      const [train] = await connection.execute("SELECT available_seats FROM trains WHERE id = ? FOR UPDATE", [trainId]);

      if (train[0].available_seats <= 0) throw new Error("No seats available");

      await Booking.create(userId, trainId);
      await connection.execute("UPDATE trains SET available_seats = available_seats - 1 WHERE id = ?", [trainId]);

      await connection.commit();
      return { message: "Seat booked successfully!" };

    } catch (error) {
      await connection.rollback();
      throw new Error(error.message);
    } finally {
      connection.release();
    }
  },

  getBookingsByUser: async (userId) => {
    return Booking.findByUserId(userId);
  }
};

module.exports = BookingService;
