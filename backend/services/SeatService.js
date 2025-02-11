const Train = require('../models/Train');

const SeatService = {
  getAvailableSeats: async (trainId) => {
    const train = await Train.findById(trainId);
    if (!train) throw new Error("Train not found");
    return train.available_seats;
  }
};

module.exports = SeatService;
