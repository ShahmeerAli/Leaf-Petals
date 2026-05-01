import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import Order from "@/models/Order";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const body = await req.json();

        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = body;

        if (orderItems && orderItems.length === 0) {
            return NextResponse.json({ success: false, message: "No order items" }, { status: 400 });
        } else {
            const order = new Order({
                orderItems,
                user: session.user.id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            });

            const createdOrder = await order.save();
            return NextResponse.json({ success: true, data: createdOrder }, { status: 201 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        // Assuming admin route returns all orders, else return unauthorized
        // Skipping role check strictly to ensure it works for now, but in reality should verify
        await connectDB();

        let orders;
        if (session?.user?.role === "admin") {
            orders = await Order.find({}).populate("user", "name email").sort({ createdAt: -1 });
        } else {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        return NextResponse.json({ success: true, data: orders }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
