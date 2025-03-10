import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
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
    await User.findByIdAndUpdate(id, body)
    return NextResponse.json({ message: "Usuario actualizado" }, { status: 200 });
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
      const userdb = await User.findById(id);

      if(!userdb){
        return NextResponse.json(
          { message: "Este usuario no existe" },
          { status: 400 }
        );
      }
      if(userdb.isAdmin){
        return NextResponse.json(
          { message: "Este usuario no puede ser eliminado" },
          { status: 401 }
        );
      }
      await User.findByIdAndDelete(id)
      return NextResponse.json({ message: "Usuario eliminado" }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.error();
    }
  }