const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/cbc-report-portal";

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000, // Fail after 10s instead of 30s
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("\n❌ MongoDB connection failed:", error.message);

    if (error.name === "MongoServerSelectionError") {
      console.error("⚠️  Could not connect to local MongoDB. Ensure MongoDB is running on localhost:27017.");
    }

    console.error(
      "\n⚠️  Troubleshooting tips:\n" +
      "  1. Install MongoDB Community Server and start the service.\n" +
      "  2. Confirm the daemon is running: mongo --eval \"db.runCommand({ ping: 1 })\"\n" +
      "  3. If using a custom URI, set MONGO_URI in Backend/.env.\n" +
      "  4. If you are behind a firewall or VPN, allow localhost connections.\n"
    );
    process.exit(1);
  }
};

module.exports = connectDB;
