const jwt = require ("jsonwebtoken")
const JWT_ADMIN_SECRET ("randomraushanadminsecret")

function adminMiddleware(req,res,next){
    const token = req.headers.token 
    const decoded = token.verify(token,JWT_ADMIN_SECRET)

    if (decoded){
        req.userId = decoded.id
    }
    else {
        res.json({
            message: "you are not signed up"
        })
    }
}