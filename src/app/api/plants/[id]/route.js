import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import Plant from "@/models/Plant";
import { getServerSession } from "next-auth/next";

export async function PUT(req, { params }) {
    try {
        const session = await getServerSession();
        // Admin check logic
        /*
        if (!session || session.user.role !== "admin") {
          return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        */

        await connectDB();
        const { id } = await params;
        const body = await req.json();

        const plant = await Plant.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!plant) {
            return NextResponse.json({ success: false, message: "Plant not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: plant }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const session = await getServerSession();
        // Admin check logic
        /*
        if (!session || session.user.role !== "admin") {
          return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        */

        await connectDB();
        const { id } = await params;

        const plant = await Plant.findByIdAndDelete(id);

        if (!plant) {
            return NextResponse.json({ success: false, message: "Plant not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: {} }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function GET(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        const plant = await Plant.findById(id);

        if (!plant) {
            return NextResponse.json({ success: false, message: "Plant not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: plant }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
