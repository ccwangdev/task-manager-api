require("./db/mongoose");
const express = require("express");
const multer = require("multer");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT;

// const upload = multer({
//     dest: "src/images",
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error("Please upload a Word document"));
//         }

//         cb(undefined, true);
//     }
// });

// const errorMiddleware = (req, res,next) => {
//     throw new Error("From my middleware");
// };

// app.post("/upload", upload.single("upload"), (req, res) => {
//     res.send();
// }, (error, req, res, next) => { // error callback handler
//     res.status(400).send({ error: error.message });
// });

// do something
// app.use((req, res, next) => {
//     console.log(req.method, req.path);

//     if (req.method === "GET") {
//         res.send("GET requests are disabled")
//     } else {
//         next();
//     }
// });

// app.use((req, res, next) => {
//     res.status(503).send("Site is currently down. Check back soon!");
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


// Without express middleware: new request -> run route handler
// With express middleware:    new request -> do something -> run route handler            


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const myFunction = async () => {
    // bcrypt test
    // const password = "Red12345!";
    // const hashedPassword = await bcrypt.hash(password, 8); // 8 is a good number of round

    // console.log(password);
    // console.log(hashedPassword);

    // const isMatch = await bcrypt.compare("red12345!", hashedPassword);
    // console.log(isMatch);

    // jwt test
    const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse", { expiresIn: "7 days" });
    console.log(token);

    const data = jwt.verify(token, "thisismynewcourse");
    console.log(data);
};

// myFunction();

// const pet = {
//     name: "Hal"
// };

// pet.toJSON = function() {
//     console.log(this);
//     return {};
// }

// console.log(JSON.stringify(pet));

// const Task = require("./models/task");
// const User = require("./models/user");

const main = async () => {
    // const task = await Task.findById("5c9c407ae4b145696383495f");
    // await task.populate("owner").execPopulate();
    // console.log(task.owner);

    // const user = await User.findById("5c9c4073e4b145696383495d");
    // await user.populate("tasks").execPopulate();
    // console.log(user.tasks);
};