import { MongoClient } from "mongodb"

export async function testMongoConnection() {
  if (!process.env.MONGODB_URI) {
    return {
      success: false,
      error: "MONGODB_URI environment variable is not set",
      details: null,
    }
  }

  const client = new MongoClient(process.env.MONGODB_URI)

  try {
    // Connect to MongoDB
    await client.connect()

    // Test the connection
    await client.db("admin").command({ ping: 1 })

    // Get database info
    const db = client.db("clothing-store")
    const collections = await db.listCollections().toArray()
    const stats = await db.stats()

    return {
      success: true,
      error: null,
      details: {
        database: "clothing-store",
        collections: collections.map((col) => col.name),
        totalCollections: collections.length,
        dataSize: stats.dataSize,
        storageSize: stats.storageSize,
        indexes: stats.indexes,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      details: null,
    }
  } finally {
    await client.close()
  }
}

export async function checkDatabaseHealth() {
  const client = new MongoClient(process.env.MONGODB_URI!)

  try {
    await client.connect()
    const db = client.db("clothing-store")

    // Check each collection
    const collections = ["products", "orders", "admins"]
    const health = {}

    for (const collectionName of collections) {
      try {
        const collection = db.collection(collectionName)
        const count = await collection.countDocuments()
        const sampleDoc = await collection.findOne()

        health[collectionName] = {
          exists: true,
          documentCount: count,
          hasSampleData: !!sampleDoc,
          lastDocument: sampleDoc
            ? {
                id: sampleDoc._id?.toString(),
                createdAt: sampleDoc.createdAt,
              }
            : null,
        }
      } catch (error) {
        health[collectionName] = {
          exists: false,
          error: error instanceof Error ? error.message : "Unknown error",
        }
      }
    }

    return {
      success: true,
      collections: health,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    }
  } finally {
    await client.close()
  }
}
