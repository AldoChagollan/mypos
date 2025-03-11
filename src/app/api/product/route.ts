import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product";
import { connectDB } from "@/libs/mongodb";
import mongoose from "mongoose";

const generateRandomCode = (): number => {
  return Math.floor(100000000 + Math.random() * 900000000);
};


//Product register
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.split("Bearer ")[1];
    if (!token) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const existCodebar = await Product.findOne({ barcode: body.barcode });
    const existAlternateKey = await Product.findOne({ alternateKey: body.alternateKey });

    if (existCodebar) {
      return NextResponse.json(
        { message: "Este código de barras ya existe" },
        { status: 400 }
      );
    }
    if (existAlternateKey) {
      return NextResponse.json(
        { message: "Esta clave alterna ya existe" },
        { status: 400 }
      );
    }

    const data = new Product({
      ...body,
      active: true,
      barcode: body.barcode ? body.barcode : generateRandomCode().toString(),
      enterprice:
        body.enterprice && new mongoose.Types.ObjectId(body.enterprice),
    });
    await data.save();
    return NextResponse.json(
      { message: "Producto registrado" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: error?.message || "Error desconocido" },
      { status: 500 }
    );
  }
}

//get Products
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.split("Bearer ")[1];
    if (!token) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    await connectDB();
    const { searchParams } = new URL(request.url);
    const enterprice = searchParams.get("identerprice");

    const productos = await Product.find({ enterprice });
    return NextResponse.json(productos);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
