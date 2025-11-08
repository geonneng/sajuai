import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { birthDate, birthHour, gender, message, chatHistory } = await request.json();

    // Validate input
    if (!birthDate || !birthHour || !gender || !message) {
      return NextResponse.json(
        { error: "필수 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    // Check API key
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("🔑 [Chat] API Key 상태:", apiKey ? "존재함 ✅" : "없음 ❌");
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "API 키가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    // Using gemini-1.5-pro model (stable and compatible with SDK v0.21.0)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Format date for better readability
    const year = birthDate.substring(0, 4);
    const month = birthDate.substring(4, 6);
    const day = birthDate.substring(6, 8);
    const genderText = gender === "male" ? "남성" : "여성";
    const formattedDate = `${year}년 ${month}월 ${day}일 ${birthHour}시`;

    // Build conversation history
    let conversationContext = `너는 ${formattedDate} 생, ${genderText} 사주를 가진 사용자와 대화하는 전문 사주 명리학자야.
사용자의 이 사주 정보를 바탕으로 모든 질문에 답변해야 해.
답변은 친절하고 명확하며, 현대적이고 실용적인 조언을 포함해줘.
답변은 200자 이내로 간결하게 작성해줘.

`;

    // Add chat history if exists
    if (chatHistory && chatHistory.length > 0) {
      conversationContext += "\n이전 대화:\n";
      chatHistory.forEach((msg: { role: string; content: string }) => {
        if (msg.role === "user") {
          conversationContext += `사용자: ${msg.content}\n`;
        } else {
          conversationContext += `당신: ${msg.content}\n`;
        }
      });
      conversationContext += "\n";
    }

    conversationContext += `현재 사용자 질문: ${message}\n\n답변:`;

    // Generate content
    const result = await model.generateContent(conversationContext);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text.trim() });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "답변 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

