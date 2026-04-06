const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = 'admin@cbc.com';
    const adminPassword = 'admin123';
    const adminName = 'CBC Administrator';

    let admin = await User.findOne({ email: adminEmail });

    if (admin) {
      admin.name = adminName;
      admin.role = 'admin';
      admin.password = adminPassword; // will be hashed in pre-save hook
      await admin.save();
      console.log('✅ Existing admin user updated:', adminEmail);
    } else {
      admin = await User.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      });
      console.log('✅ Admin user seeded:', adminEmail);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to seed admin user:', error.message);
    process.exit(1);
  }
};

seedAdmin();
