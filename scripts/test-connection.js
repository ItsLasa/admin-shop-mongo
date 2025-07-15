const { MongoClient } = require("mongodb")
require("dotenv").config({ path: ".env.local" })

async function testConnection() {
  console.log("🔍 Testing MongoDB Connection...")
  console.log("📍 URI:", process.env.MONGODB_URI ? "Set ✅" : "Missing ❌")

  if (!process.env.MONGODB_URI) {
    console.error("❌ MONGODB_URI environment variable is not set")
    console.log("💡 Add MONGODB_URI to your .env.local file")
    return
  }

  const client = new MongoClient(process.env.MONGODB_URI)

  try {
    console.log("🔌 Connecting to MongoDB...")
    await client.connect()
    console.log("✅ Connected successfully!")

    console.log("🏓 Testing ping...")
    await client.db("admin").command({ ping: 1 })
    console.log("✅ Ping successful!")

    console.log("📊 Getting database info...")
    const db = client.db("clothing-store")

    // List collections
    const collections = await db.listCollections().toArray()
    console.log("📁 Collections found:", collections.length)
    collections.forEach((col) => {
      console.log(`  - ${col.name}`)
    })

    // Check each collection
    for (const collection of ["products", "orders", "admins"]) {
      try {
        const count = await db.collection(collection).countDocuments()
        console.log(`📄 ${collection}: ${count} documents`)
      } catch (error) {
        console.log(`❌ ${collection}: Error - ${error.message}`)
      }
    }

    // Database stats
    try {
      const stats = await db.stats()
      console.log("📈 Database Stats:")
      console.log(`  - Data Size: ${(stats.dataSize / 1024).toFixed(2)} KB`)
      console.log(`  - Storage Size: ${(stats.storageSize / 1024).toFixed(2)} KB`)
      console.log(`  - Indexes: ${stats.indexes}`)
      console.log(`  - Collections: ${stats.collections}`)
    } catch (error) {
      console.log("⚠️  Could not get database stats:", error.message)
    }
  } catch (error) {
    console.error("❌ Connection failed:")
    console.error("Error:", error.message)

    // Common error solutions
    if (error.message.includes("ENOTFOUND")) {
      console.log("\n💡 Possible solutions:")
      console.log("  - Check your MongoDB URI")
      console.log("  - Ensure your IP is whitelisted (MongoDB Atlas)")
      console.log("  - Check your internet connection")
    } else if (error.message.includes("authentication")) {
      console.log("\n💡 Possible solutions:")
      console.log("  - Check your username and password")
      console.log("  - Ensure the user has proper permissions")
    }
  } finally {
    await client.close()
    console.log("🔌 Connection closed")
  }
}

testConnection()
