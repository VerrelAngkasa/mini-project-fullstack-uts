const validateTask = (req, res, next) => {
    const { title, category, deadline, status } = req.body;
    if (!title || !category || !deadline || !status) {
        return res.status(400).json({ message: "All fields are required!" });
    }
    next();
}; 

module.exports = validateTask;