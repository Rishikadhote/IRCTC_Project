const Train = require('../models/Train');

const TrainService = {
  addTrain: async (trainName, source, destination, totalSeats) => {
    return Train.create(trainName, source, destination, totalSeats);
  },

  getTrainsBetweenStations: async (source, destination) => {
    return Train.findBetweenStations(source, destination);
  }
};

module.exports = TrainService;
