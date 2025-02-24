const db = require("../config/db");
const bcrypt = require("bcryptjs");

// Register user
async function userRegister(req, res) {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: 'User registered' });
  });
}

// Login user
async function userLogin(req, res) {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = results[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username }, 'secret_key', { expiresIn: '1h' });
    res.json({ token });
  });
}

// Logout user
async function userLogout(req, res) {
  res.json({ message: 'Logged out' });
}

module.exports = { userRegister, userLogin, userLogout };