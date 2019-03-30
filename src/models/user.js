const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (validator.contains(value.toLowerCase(), "password")) {
                throw new Error("Your password contains password");
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Age must be a postive number");
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer // allow us to store the buffer with binary image data right in the database alongside of the use who the image belongs to
    }
}, {
    timestamps: true
});

// Virtual makes relantionship between two collections' fields and it not real stores in the database.
userSchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "owner"
});

// Create generateAuthToken "Instance" function, "Instance" means will add or update data 
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id : user._id.toString() }, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject(); // transform user function to user object

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
};

// Create findByCredentials "Model" function, "Model" means won't modify any data, just retrive data
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Unable to login");
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
        throw new Error("Unable to login");
    }

    return user;
}


// Hash the plain text password before saving
userSchema.pre("save", async function (next) { // because arrow function does not bind this
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    } 
    next();
});

// Delete user tasks when user user is removed
userSchema.pre("remove", async function (next) {
    const user = this;
    await Task.deleteMany({ owner: user._id });

    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;