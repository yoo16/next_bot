import { GoogleGenerativeAI, GenerationConfig } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const generationConfig:GenerationConfig = {
    temperature: 1,  //ランダム性
    topP: 0.95,      //累積確率
    topK: 64,        //トップkトークン
    maxOutputTokens: 2048,  //最大出力トークン数
    responseMimeType: "application/json", //JSONでレスポンス
};


export async function GET(req: NextRequest) {
    // Gemini APIキーを読み込み
    const API_KEY = process.env.GEMINI_API_KEY;
    // API_KEYがなければ終了
    if (!API_KEY) return NextResponse.json({ message: "Not found API KEY" });

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // モデルにConfig設定
    model.generationConfig = generationConfig;
    // プロンプト
    const prompt = "日本で一番高い山は？";
    // Gemini APIにリクエスト
    const result = await model.generateContent(prompt);
    // JSONをJavaScriptのオブジェクトに変換
    const text = JSON.parse(result.response.text());
    // レスポンス
    return NextResponse.json(text);
}