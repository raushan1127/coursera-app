const jwt = require ("jsonwebtoken")
const { JWT_ADMIN_SECRET } = require ("../config")

function adminMiddleware(req,res,next){
    const token = req.headers.token 
    const decoded = token.verify(token, JWT_ADMIN_SECRET)

    if (decoded){
        req.adminId = decoded.id
    }
    else {
        res.json({
            message: "you are not signed up"
        })
    }
}

module.exports = {
    adminMiddleware: adminMiddleware

}