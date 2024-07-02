const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: [isEmail, "Invalid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.post("save", function (document, next) {
  console.log("A new user was created and saved", document);
  next();
});

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    //console.log(auth);
    if (auth) {
      //console.log(user);
      return user;
    } else {
      throw Error("Incorrect Password");
    }
  } else {
    throw Error("Incorrect username");
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
