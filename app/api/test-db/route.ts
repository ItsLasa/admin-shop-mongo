import { NextResponse } from "next/server"
import { testMongoConnection, checkDatabaseHealth } from "@/lib/mongodb-test"

export async function GET() {
  try {
    const connectionTest = await testMongoConnection()
    const healthCheck = await checkDatabaseHealth()

    return NextResponse.json({
      connection: connectionTest,
      health: healthCheck,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to test database connection",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
