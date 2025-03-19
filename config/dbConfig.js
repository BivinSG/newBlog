const mongoose = require("mongoose");
require("dotenv").config();  // Load environment variables

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mydb"; // Fallback for local dev

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB ✅"))
.catch(err => console.error("MongoDB Connection Error ❌", err));
