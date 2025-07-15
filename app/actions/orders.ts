"use server"

import { getDatabase } from "@/lib/mongodb"
import type { Order } from "@/types/product"
import { ObjectId } from "mongodb"
import { revalidatePath } from "next/cache"

export async function updateOrderStatus(id: string, status: Order["status"]) {
  const db = await getDatabase()

  await db.collection("orders").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        status,
        updatedAt: new Date(),
      },
    },
  )

  revalidatePath("/admin/dashboard")

  const updatedOrder = await db.collection("orders").findOne({ _id: new ObjectId(id) })

  return {
    ...updatedOrder,
    _id: updatedOrder?._id.toString(),
  } as Order
}

export async function getOrders() {
  const db = await getDatabase()

  const orders = await db.collection("orders").find({}).sort({ createdAt: -1 }).toArray()

  return orders.map((order) => ({
    ...order,
    _id: order._id.toString(),
  })) as Order[]
}
