"use server"

import { getDatabase } from "@/lib/mongodb"
import type { Product } from "@/types/product"
import { ObjectId } from "mongodb"
import { revalidatePath } from "next/cache"

export async function addProduct(productData: Omit<Product, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDatabase()

  const product = {
    ...productData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result = await db.collection("products").insertOne(product)

  revalidatePath("/admin/dashboard")
  revalidatePath("/shop")

  return {
    _id: result.insertedId.toString(),
    ...product,
  }
}

export async function updateProduct(id: string, productData: Partial<Product>) {
  const db = await getDatabase()

  const updateData = {
    ...productData,
    updatedAt: new Date(),
  }

  await db.collection("products").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

  revalidatePath("/admin/dashboard")
  revalidatePath("/shop")

  const updatedProduct = await db.collection("products").findOne({ _id: new ObjectId(id) })

  return {
    ...updatedProduct,
    _id: updatedProduct?._id.toString(),
  } as Product
}

export async function deleteProduct(id: string) {
  const db = await getDatabase()

  await db.collection("products").deleteOne({ _id: new ObjectId(id) })

  revalidatePath("/admin/dashboard")
  revalidatePath("/shop")
}

export async function getProducts() {
  const db = await getDatabase()

  const products = await db.collection("products").find({}).toArray()

  return products.map((product) => ({
    ...product,
    _id: product._id.toString(),
  })) as Product[]
}
