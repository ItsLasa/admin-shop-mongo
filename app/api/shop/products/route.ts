import { getDatabase } from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const search = searchParams.get("search")
    const featured = searchParams.get("featured")

    const db = await getDatabase()

    // Build query
    const query: any = { stock: { $gt: 0 } } // Only show products in stock

    if (category && category !== "all") {
      query.category = category
    }

    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number.parseFloat(minPrice)
      if (maxPrice) query.price.$lte = Number.parseFloat(maxPrice)
    }

    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
    }

    if (featured === "true") {
      query.featured = true
    }

    const products = await db.collection("products").find(query).sort({ featured: -1, createdAt: -1 }).toArray()

    const formattedProducts = products.map((product) => ({
      ...product,
      _id: product._id.toString(),
    }))

    return NextResponse.json(formattedProducts)
  } catch (error) {
    console.error("Error fetching shop products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
