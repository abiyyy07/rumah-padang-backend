// pengecekan role khusus admin
const isAdminRole = async (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next()
    } else {
        res.status(403).json({ message: "You are not admin" })
    }
}

module.exports = isAdminRole