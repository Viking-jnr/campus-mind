import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
    if (!process.env.GEMINI_API_KEY) {
  return NextResponse.json({ error: "API Key missing" }, { status: 500 });
}
    try{
        const body = await req.json();
        const { messages, agent } = body;
        const systemPrompts: Record<string, string> = {
            assistant: "You are the Campus Mind Master Assistant. Help students navigate university life.",
            finder: "You are a helpful assistant that summarizes lecture notes into concise summaries and key topics for students to easily understand and find relevant information.",
            quiz: "You are the Quiz Generator. Your goal is to turn study notes into challenging multiple-choice questions. Each question should have one correct answer and three plausible distractors, covering key concepts from the notes to help students test their understanding and prepare for exams.",
            group: "You are a helpful assistant that matches students based on their courses, study preferences, and goals to help them find suitable study partners and form effective study groups.",
            assignment: "You are a helpful assistant that provides strategic advice and planning assistance for students working on assignments, helping them break down tasks, manage their time effectively, and develop a clear approach to completing their work."
        };

        const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: systemPrompts[agent] || systemPrompts.assistant,
        });

        const chat = model.startChat({
        history: messages.slice(0, -1).map((m: any) => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.content }],
        })),
        });

        // 3. Send the latest message
        const lastMessage = messages[messages.length - 1].content;
        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        
        return NextResponse.json({ text: response.text() });
}catch(error){
    return NextResponse.json({ error: "Failed to fetch AI response" }, { status: 500 });
}
}
    