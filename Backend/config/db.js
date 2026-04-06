const mongoose = require("mongoose");
const dns = require("dns");

// Override system DNS to resolve MongoDB Atlas hostnames (fixes local router DNS timeouts)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // Fail after 10s instead of 30s
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("\n❌ MongoDB connection failed:", error.message);
    
    // More specific error handling
    if (error.name === 'MongoServerSelectionError') {
      console.error("⚠️  Hostname could not be resolved or network is blocked (Port 27017).");
    }
    
    console.error(
      "\n⚠️  Troubleshooting tips:\n" +
      "  1. REFRESH your MongoDB Atlas tab - check if IP Access List status is 'Active'.\n" +
      "  2. Current IP: 102.215.12.245 (added to Atlas whitelist?)\n" +
      "  3. Ensure no local MongoDB instance is conflicting.\n" +
      "  4. Check if you have a VPN active that might block Port 27017.\n"
    );
    process.exit(1);
  }
};

module.exports = connectDB;
