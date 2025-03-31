const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = 3000;

const SignupModel = require("./Models/Signup.js");
const SigninModel = require("./Models/Signin.js");
const AuctionModel = require("./Models/Auction.js");

app.get("/hello", (req, res) => {
  res.send("Hello World to Evening Class!");
});


// Signup
app.post("/signup", async (req, res) => {
  const { name, email, password, dob, rollNo } = req.body;

  if (!name || !email || !password || !dob || !rollNo) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const existingUser = await SignupModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }
    const newUser = await SignupModel.create({ name, email, password, dob, rollNo });
    res.status(201).json({ message: "User registered successfully", user: newUser });
    console.log("User created:", newUser);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// signin
app.post("/signin", async (req, res) => {
  try {
    const { rollNo, password } = req.body;

    const user = await SigninModel.findOne({ rollNo });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Sign-in successful", user });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


app.post("/addauctiondata", async (req, res) => {
  try {
    const Auction1 = await AuctionModel.create(req.body);
    res.status(200).json(Auction1);
    console.log(req.body);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get("/getauctiondata", async (req, res) => {
  try {
    const Auction1 = await AuctionModel.find();
    res.status(200).json(Auction1);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


const MONGO_URL = "mongodb://127.0.0.1:27017/auction";
main()
.then(() => {
    console.log("connected to MongoDB");
})
.catch((err) => {
    console.log(err)
});

async function main() {
  await mongoose.connect(MONGO_URL);
}
