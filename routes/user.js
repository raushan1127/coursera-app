const { router } = require ("express")
const userRouter = router();
const { userModel } = require (../db)
const jwt = require('jsonwebtoken')
const 

userRouter.post('/signup', async function(req, res){
    const { email, password, firstName, lastname} = req.body;

    //todo: hash the password before storing in db 
    // todo: try catch for error catching 
   await userModel.create({
    email: email,
    password: password,
    firstname: firstname,
    lastname: lastname
    });

    res.json({
        message: "you are signed"
    })

})

userRouter.post('/signup', async function (req,res){


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


userRouter.get("/get",userMiddleware, async function (req,res){
    
    const userId  = req.userId;

    const purchases = await purchaseModel.find({
        
    })

})
