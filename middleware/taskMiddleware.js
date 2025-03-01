// Fungsi untuk menerima request dari user sebelum diteruskan ke server
const validateTask = (req, res, next) => {
    const { title, category, deadline } = req.body;
    if (!title || !category || !deadline) {
        return res.status(400).json({ message: "All fields are required!" });
    }
    next();
}; 

module.exports = validateTask;