import { getDatabase } from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const db = await getDatabase()
    const orders = await db.collection("orders").find({}).sort({ createdAt: -1 }).toArray()

    const formattedOrders = orders.map((order) => ({
      ...order,
      _id: order._id.toString(),
    }))

    return NextResponse.json(formattedOrders)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
