require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;

async function testConnection() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('✅ MongoDB connected successfully!');
    await client.close();
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
  }
}

testConnection();