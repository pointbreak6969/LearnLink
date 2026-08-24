import mongoose from "mongoose";
import "dotenv/config";
import User from "../models/userModel.js";

const email = process.argv[2];

if (!email) {
  console.error("Usage: node scripts/makeSuperAdmin.js <user-email>");
  process.exit(1);
}

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      console.error(`User with email ${email} not found.`);
      process.exit(1);
    }
    user.role = "superadmin";
    await user.save({ validateBeforeSave: false });
    console.log(`Successfully updated ${user.fullName} (${user.email}) to role: superadmin`);
    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
};

run();
