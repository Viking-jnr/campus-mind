
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req: Request) {
    if (!genAI) {
      return NextResponse.json({ text: "INTERNAL ERROR: GEMINI_API_KEY is missing from .env.local" }, { status: 500 });
    }
    try{
        const body = await req.json();
        const { messages, agent } = body;

        if (!messages || messages.length === 0) {
          return NextResponse.json({ text: "ERROR: No messages provided." }, { status: 400 });
        }

        const systemPrompts: Record<string, string> = {
            assistant: `You are the Campus Mind Orchestrator. Your role is to understand the user's needs and direct their queries to the appropriate specialized agent (Notes, Quiz, Group, Assignment).
            Based on the user's input, determine which agent is best suited to handle their request and respond accordingly. If the user's query is ambiguous, ask clarifying questions to ensure they are connected with the right agent.
            Always keep the user's goals in mind and strive to provide helpful and accurate guidance.
            If the user wants to be tested or asks for a quiz, you MUST follow this protocol:
            1. Start your response with [QUIZ_MODE].
            2. Provide a JSON object containing 3-5 questions.
            3. JSON SCHEMA:
                {
                "quizTitle": "Subject Name",
                "questions": [
                {
                "id": 1,
                "question": "The text of the question?",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correctAnswer": "Option A"
                }
                ]
                }",
                Example:
                  User: "Test me on Calculus"
                  Assistant: "[QUIZ_MODE] {"questions": [...]}"

                  Otherwise, respond in natural Markdown as a helpful study buddy.`,
            notes: `You are a helpful assistant that summarizes lecture notes into concise summaries and key topics for students to easily understand and find relevant information.
            `,
            quiz: `You are the Campus Mind Quiz Generator. Your goal is to convert study materials into challenging multiple-choice questions.
            CRITICAL INSTRUCTIONS:
              Output ONLY a valid JSON object.
              Do NOT include markdown code blocks (like '''json).
              Do NOT include any text before or after the JSON.
              JSON SCHEMA:
                {
                "quizTitle": "Subject Name",
                "questions": [
                {
                "id": 1,
                "question": "The text of the question?",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "answer": "Option A"
                }
                ]
                }"`,
            group: `You are a helpful assistant that matches students based on their courses, study preferences, and goals to help them find suitable study partners and form effective study groups.`,
            assignment: `You are a helpful assistant that provides strategic advice and planning assistance for students working on assignments, helping them break down tasks, manage their time effectively, and develop a clear approach to completing their work.`
        };

        const model = genAI.getGenerativeModel({ 
        model: "gemini-3-flash-preview",
        systemInstruction: systemPrompts[agent] || systemPrompts.assistant,
        });

        const history = messages
          .slice(0, -1) // Take everything except the last message
          .map((m: any) => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.content },
              ...(m.fileData ? [{inlineData: {data: m.fileData, MimeType: m.fileData.type }}]: [])
            ],
          }))
          .filter((m: any, index: number) => {
            // Force the first message to be 'user'
            if (index === 0) return m.role === "user";
            return true;
          });

        const chat = model.startChat({ history });

        // Send the latest message
        const lastMessage = messages[messages.length - 1].content;
        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ text });
}catch (error: any) {
    console.error("--- GEMINI ERROR LOG ---");
    console.error(error); 
    console.error("------------------------");

    return NextResponse.json({ 
      text: `GEMINI ERROR: ${error.message || "Unknown error"}. Please try again later.` 
    }, { status: 500 });
  }
}

    