// pengecekan role khusus staff
const isStaffRole = async (req, res, next) => {
    if (req.user && req.user.role === 'staff') {
        next()
    } else {
        res.status(403).json({ message: "You are not staff" })
    }
}

module.exports = isStaffRole