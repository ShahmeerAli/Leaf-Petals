import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import Order from "@/models/Order";
import { getServerSession } from "next-auth/next";

export async function GET(req) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const orders = await Order.find({ user: session.user.id }).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: orders }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
