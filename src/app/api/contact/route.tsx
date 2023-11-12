import dbConn from "@/utils/dbConn";
import Contact from "@/models/contact";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

interface ContactData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body: ContactData = await req.json();
        await dbConn();
        await Contact.create(body);
        return NextResponse.json({
            message: "Message sent successfully"
        }, {
            status: 200
        })
    } catch (e) {
        console.error("Error:", e);
        return NextResponse.json({
            message: "Server error, please try again!"
        }, {
            status: 500
        })
    }
}