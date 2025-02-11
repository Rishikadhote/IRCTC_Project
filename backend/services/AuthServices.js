const jwt = require('jsonwebtoken');

const AuthnService = {
  verifyToken: (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return null;
    }
  }
};

module.exports = AuthnService;
