const jwt = require("jsonwebtoken");

// Middleware autentikasi
const authMiddleware = (req, res, next) => {
  // Ambil token dari header atau cookie
  // const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

  // Jika token tidak ditemukan, kirim response 401 (Unauthorized)
  if (!token) {
    return res.status(401).json({ message: "Authorization Denied! No token provided." });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Simpan data user di req.user
    next(); // Lanjutkan ke middleware berikutnya
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
