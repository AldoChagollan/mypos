import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//User signin
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const userDB = await User.findOne({ email: body.email });

    if (!userDB) {
      return NextResponse.json(
        { message: "Credenciales inválidas" },
        { status: 400 }
      );
    }

    const { password } = body;

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, userDB.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Credenciales inválidas" }, { status: 401 });
    }

    // Crear token JWT
    const token = jwt.sign({userid: userDB._id, enterprice: userDB.enterprice}, process.env.JWT_SECRET!, { expiresIn: "7d" });

    return NextResponse.json({ message: "Inicio exitoso", token }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}