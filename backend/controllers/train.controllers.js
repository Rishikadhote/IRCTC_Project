const db = require("../config/database");

exports.addTrain = (req, res) => {
    const { name, source, destination, total_seats } = req.body;

    db.query(
        "INSERT INTO trains (name, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?)",
        [name, source, destination, total_seats, total_seats],
        (err) => {
            if (err) return res.status(500).json({ error: "Failed to add train" });
            res.json({ message: "Train added successfully" });
        }
    );
};
