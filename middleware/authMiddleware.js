const jwt = require("jsonwebtoken");

// Middleware Authentikasi User
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  // Jika token tidak ditemukan, kirim response dengan status code 401 (Unauthorized)
  if (!token) {
    return res.redirect("/auth/login");
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Simpan data user di req.user
    next(); // Lanjutkan ke middleware berikutnya
  } catch (err) {
    res.redirect("/auth/login");
  }
};

module.exports = authMiddleware;
