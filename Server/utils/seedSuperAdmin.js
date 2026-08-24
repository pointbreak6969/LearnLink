import User from "../models/userModel.js";

export const seedSuperAdmin = async () => {
  try {
    const adminEmail = process.env.SUPERADMIN_EMAIL;
    const adminPassword = process.env.SUPERADMIN_PASSWORD;
    const adminName = process.env.SUPERADMIN_NAME || "Super Admin";

    if (!adminEmail || !adminPassword) {
      console.log("No SUPERADMIN_EMAIL / SUPERADMIN_PASSWORD specified in env.");
      return;
    }

    const existingUser = await User.findOne({ email: adminEmail.toLowerCase().trim() });

    if (!existingUser) {
      const superAdmin = await User.create({
        fullName: adminName,
        email: adminEmail.toLowerCase().trim(),
        password: adminPassword,
        role: "superadmin",
      });
      console.log(`[SuperAdmin] Created default superadmin user: ${superAdmin.email}`);
    } else if (existingUser.role !== "superadmin") {
      existingUser.role = "superadmin";
      await existingUser.save({ validateBeforeSave: false });
      console.log(`[SuperAdmin] Updated existing user ${existingUser.email} to superadmin`);
    } else {
      console.log(`[SuperAdmin] Verified superadmin account: ${existingUser.email}`);
    }
  } catch (error) {
    console.error("[SuperAdmin] Error seeding superadmin user:", error.message);
  }
};
