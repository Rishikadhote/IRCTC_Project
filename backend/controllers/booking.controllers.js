const db = require("../config/database");

exports.bookSeat = (req, res) => {
    const { train_id, seat_number } = req.body;
    const user_id = req.user.id;

    db.beginTransaction((err) => {
        if (err) return res.status(500).json({ error: "Transaction error" });

        db.query("SELECT available_seats FROM trains WHERE id = ?", [train_id], (err, results) => {
            if (err || results.length === 0) return res.status(400).json({ error: "Train not found" });

            const availableSeats = results[0].available_seats;
            if (availableSeats <= 0) return res.status(400).json({ error: "No seats available" });

            db.query("UPDATE trains SET available_seats = available_seats - 1 WHERE id = ?", [train_id], (err) => {
                if (err) return db.rollback(() => res.status(500).json({ error: "Booking failed" }));

                db.query("INSERT INTO bookings (user_id, train_id, seat_number) VALUES (?, ?, ?)", [user_id, train_id, seat_number], (err) => {
                    if (err) return db.rollback(() => res.status(500).json({ error: "Booking failed" }));

                    db.commit((err) => {
                        if (err) return res.status(500).json({ error: "Commit failed" });
                        res.json({ message: "Seat booked successfully" });
                    });
                });
            });
        });
    });
};
