const express = require("express")
const mongoose = require("mongoose")
const { userRouter }  = require("./routes/user")
const { adminRouter }  = require("./routes/admin")
const { courseRouter }  = require("./routes/course")
const { purchaseRouter }  = require("./routes/purchase")

const app = express()
app.use(express.json());

app.use("/user", userRouter);


app.use("/admin", adminRouter)


app.use("/course", courseRouter)


app.use("/purchases", purchaseRouter)

async function main (){

    await mongoose.connect("mongodb+srv://kumarraushan2615:Raushan8100.@cluster0-jtpxd.mongodb.net/admin")
    app.listen(2000);
}

main();



