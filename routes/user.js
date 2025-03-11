const { Router } = require ("express")
const { userModel, courseModel, purchaseModel } = require ("../db")
const jwt = require('jsonwebtoken')
const { userMiddleware } = require ("../Middleware/users")


const userRouter = Router();

userRouter.post('/signup', async function(req, res){
    const { email, password, firstname, lastname} = req.body;

    //todo: hash the password before storing in db 
    // todo: try catch for error catching 
   await userModel.create({
    email: email,
    password: password,
    firstname: firstname,
    lastname: lastname
    });

    res.json({
        message: "you are signed up"
    })

})

userRouter.post('/signin', async function (req,res){


    const { email, password} = req.body ; 

    const isUser = await userModel.findone({
        email: email,
        password: password
    })
    

    if(isUser) {
        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET )

        res.json({
            token: token
        })
    }
    else {
        res.json({
            message: "user not found"
        })
    }

})


userRouter.get("/purchases", userMiddleware, async function (req,res){
    
    const userId  = req.userId;

    const purchases = await purchaseModel.find({
        userId,
    })

    let purchasedId =[]

    for (i=0; i<=purchases.length; i++){
        purchasedId.push(purchases[i].courseId)
    }

    const courseData = await courseModel.find({
        _id: {$in: purchasedId}
    })

    res.json({
        userId,
        courseId
    })

})
