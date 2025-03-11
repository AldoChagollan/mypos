import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product";
import { connectDB } from "@/libs/mongodb";

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  try {
    const token = request.headers.get("Authorization")?.split("Bearer ")[1];
    if (!token) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }
    await connectDB();
    const { id } = await context.params;
    const body = await request.json();
    await Product.findByIdAndUpdate(id, body)
    return NextResponse.json({ message: "Producto actualizado" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    try {
      const token = request.headers.get("Authorization")?.split("Bearer ")[1];
      if (!token) {
        return NextResponse.json({ message: "No autorizado" }, { status: 401 });
      }

      await connectDB();
      const { id } = await context.params;
      const productdb = await Product.findById(id);

      if(!productdb){
        return NextResponse.json(
          { message: "Este Producto no existe" },
          { status: 400 }
        );
      }
      await Product.findByIdAndDelete(id)
      return NextResponse.json({ message: "Producto eliminado" }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.error();
    }
  }