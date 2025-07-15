const { MongoClient } = require("mongodb")
const bcrypt = require("bcryptjs")

async function createAdminUser() {
  const client = new MongoClient(process.env.MONGODB_URI)

  try {
    await client.connect()
    const db = client.db("clothing-store")

    // Check if admin already exists
    const existingAdmin = await db.collection("admins").findOne({ email: "admin@clothingstore.com" })

    if (existingAdmin) {
      console.log("Admin user already exists")
      return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 12)

    // Create admin user
    const adminUser = {
      name: "Admin User",
      email: "admin@clothingstore.com",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await db.collection("admins").insertOne(adminUser)
    console.log("Admin user created successfully")
    console.log("Email: admin@clothingstore.com")
    console.log("Password: admin123")
  } catch (error) {
    console.error("Error creating admin user:", error)
  } finally {
    await client.close()
  }
}

createAdminUser()
