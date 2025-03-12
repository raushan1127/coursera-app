const { adminMiddleware} = require ("../Middleware/admin")
const { Router } = require("express")
const { adminModel} = require("../db")
const jwt = require("jsonwebtoken")
const { JWT_ADMIN_SECRET } = require ("../config")
const adminRouter = Router();



adminRouter.post("/signup", async function(req,res){
    const { email, password, firstname, lastname} = req.body
    //we can add zod validation here for the inputs 

    await adminModel.create({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname
    })
    res.json({
        message:"admin signed up"
    })
})

adminRouter.post("/signin", adminMiddleware, async function(req,res){
    const { email, password} = req.body

    const admin = adminModel.findone({
        email: email,
        password: password
    })

    if(admin){
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_SECRET)
        res.json({
            token: token
        })
    }
    else {
        res.json({
         message: " incorrect crendentials"
        })
    }

})

adminRouter.post("/courses", adminMiddleware, async function (req, res){
    const adminId = req.adminId
     
    const { title, description, imageUrl, price} = req.body 

    const courses = await courseModel.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId
    })
    req.json({
        message: "course created",
        courseId : courses._id
    })
})

adminRouter.put("/course", adminMiddleware, async function (req, res){
    const adminId = req.adminId

    const {title, description, imageUrl, price} = req.body

    const course = await courseModel.updateOne({
        creatorId: adminId,
        _id: courseId
    },{
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price
    })
    res.json({
        message: "courseupdated ",
        courseId: course.id
    })
})

adminRouter.post("/courses", adminMiddleware, async function (req, res){
    const adminId = req.adminId
     
    const { title, description, imageUrl, price} = req.body 

    const courses = await courseModel.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId
    })
    req.json({
        message: "course created",
        courseId : courses._id
    })
})


adminRouter.get("/course/bulk", adminMiddleware,async function(req, res) {
    const adminId = req.adminId;

    const courses = await courseModel.find({
        creatorId: adminId 
    });

    res.json({
        message: "These are the courses",
        
    })
})

module.exports = {
    adminRouter: adminRouter
}