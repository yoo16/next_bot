import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, GenerationConfig } from "@google/generative-ai";

const GEMINI_MODEL = 'gemini-1.5-flash';

const generationConfig:GenerationConfig = {
    temperature: 1,  //ランダム性
    topP: 0.95,      //累積確率
    topK: 64,        //トップkトークン
    maxOutputTokens: 2048,  //最大出力トークン数
    responseMimeType: "application/json",
};

export async function GET(req: NextRequest) {
    // Gemini APIキーを読み込み
    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) return;

    req;
    // Gemini API
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    model.generationConfig = generationConfig;

    const data = { message: "test" };
    return NextResponse.json(data);
}