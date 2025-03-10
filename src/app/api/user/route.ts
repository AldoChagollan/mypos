import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const generateRandomCode = (): number => {
  return Math.floor(100000 + Math.random() * 900000);
};

//User register
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.split("Bearer ")[1];
    if (!token) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const existEmail = await User.findOne({ email: body.email });
    const existUsername = await User.findOne({ username: body.username });

    if (existEmail) {
      return NextResponse.json(
        { message: "Este usuario ya existe" },
        { status: 400 }
      );
    }
    if (existUsername) {
      return NextResponse.json(
        { message: "Este usuario ya existe" },
        { status: 400 }
      );
    }

    // Hashear la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const data = new User({
      ...body,
      code: generateRandomCode(),
      password: hashedPassword,
      active: true,
      isAdmin: false,
      enterprice:
        body.enterprice && new mongoose.Types.ObjectId(body.enterprice),
    });
    await data.save();
    return NextResponse.json(
      { message: "Usuario registrado" },
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

//get USERS
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.split("Bearer ")[1];
    if (!token) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    await connectDB();
    const { searchParams } = new URL(request.url);
    const enterprice = searchParams.get("identerprice");

    const users = await User.find({ enterprice });
    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
