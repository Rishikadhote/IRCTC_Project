const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const UserService = {
  register: async (username, password, role) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return User.create(username, hashedPassword, role);
  },

  login: async (username, password) => {
    const user = await User.findByUsername(username);
    if (!user) throw new Error("User not found");

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token };
  }
};

module.exports = UserService;
