import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import Plant from "@/models/Plant";
import { getServerSession } from "next-auth/next";

export async function GET() {
    try {
        await connectDB();
        const plants = await Plant.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: plants }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const session = await getServerSession();
        // Assuming you have an admin role check
        /*
        if (!session || session.user.role !== "admin") {
          return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        */

        await connectDB();
        const body = await req.json();
        const plant = await Plant.create(body);
        return NextResponse.json({ success: true, data: plant }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
