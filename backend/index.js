import express from "express";
import dotenv, { config } from "dotenv";
config()
import mongoose from "mongoose";
import cors from "cors";
import jwt from 'jsonwebtoken'

dotenv.config();
const app = express();

// Middleware
app.use(express.json());


// defining origin,and methods
const corsOption = {
  // defining origin,and methods
      origin:["http://localhost:5173"],
      methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
      allowedHeaders:["Content-Type", "Authorization"],
      credentials:true
  }


app.use(cors(corsOption));
app.options("*", cors(corsOption));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {

}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error(" MongoDB connection error:", err));




// Define Schema & Model
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  password:String
},{timestamps:true});

const Contact = mongoose.model("Contact", contactSchema);


// generating jsonwebtoken for authentication

contactSchema.methods.generatewebtoken= function(){

  return jwt.sign(
    {
userId:this._id.tostring(),
email:this.email

    },
    process.env.JWT_SIGNATURE_CONTACT,{
      expiresIn:'10d'

    }
  )

}



// hashing password for authentication

contactSchema.pre('save',async function (next){
const Contact = this

if (!Contact.isModified('password'))
{
  next()

}
try{

const hash_password =  bcrypt.hash(Contact.password,10)
Contact.password= hash_password
next()
  
}
catch{

  next(error)
}



})



























// POST route to handle form submission
app.post("/api/user", async (req, res) => {
  try {
    const { name, phone, email,password } = req.body;

    // Save to MongoDB
    const newContact = new Contact({ name, phone, email, password });
    await newContact.save();

    



    res.status(200).json({ success: true, message: "authentication succesfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
