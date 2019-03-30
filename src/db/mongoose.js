const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true, // mongoose will ask mongodb to create index for each data
    useFindAndModify: false
});
