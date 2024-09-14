import { NextRequest, NextResponse } from "next/server";
import { Content, GoogleGenerativeAI } from "@google/generative-ai";
import { Message } from "@/app/interfaces/Message";

const history: Content[] = [];

export async function POST(req: NextRequest) {
    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) return NextResponse.json({ error: "Not found API KEY" });

    // POSTデータ取得
    const message: Message = await req.json();
    if (!message) return NextResponse.json({ error: "Not found message" });

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat({ history: history });

    try {
        const result = await chat.sendMessage(message.content);
        if (!result) return NextResponse.json({ error: "Not found message" });

        const botMessage: Message = {
            sender: "bot",
            content: result.response.text()
        }

        const data = {
            client: message,
            bot: botMessage,
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Gemini API error" });
    }
}