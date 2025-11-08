import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { birthDate, birthHour, gender } = await request.json();

    // Validate input
    if (!birthDate || !birthHour || !gender) {
      return NextResponse.json(
        { error: "생년월일, 시간, 성별 정보가 필요합니다." },
        { status: 400 }
      );
    }

    // Check API key
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("🔑 API Key 상태:", apiKey ? "존재함 ✅" : "없음 ❌");
    console.log("🔑 API Key 첫 10자:", apiKey?.substring(0, 10) || "없음");
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "API 키가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Format date for better readability
    const year = birthDate.substring(0, 4);
    const month = birthDate.substring(4, 6);
    const day = birthDate.substring(6, 8);
    const genderText = gender === "male" ? "남성" : "여성";
    const formattedDate = `${year}년 ${month}월 ${day}일 ${birthHour}시`;

    // Create prompt
    const prompt = `너는 전문 사주 명리학자야. 다음 정보를 가진 사람의 운세를 분석해줘:

생년월일시: ${formattedDate}
성별: ${genderText}

다음 세 가지 운세를 각각 80-120자 내외로 분석해줘:
1. 오늘의 운세
2. 재물운
3. 애정운

현대적이고 희망적인 어조로 설명하되, 구체적이고 실용적인 조언을 포함해줘.

**중요**: 반드시 아래 JSON 형식으로만 응답해줘. 다른 텍스트는 포함하지 마:

\`\`\`json
{
  "today": "오늘의 운세 내용...",
  "wealth": "재물운 내용...",
  "love": "애정운 내용..."
}
\`\`\``;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse JSON from response
    let fortuneData;
    try {
      // Extract JSON from markdown code block if present
      const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : text;
      fortuneData = JSON.parse(jsonString.trim());
    } catch (parseError) {
      console.error("JSON 파싱 실패:", text);
      // Fallback: try to parse without code blocks
      try {
        fortuneData = JSON.parse(text);
      } catch {
        return NextResponse.json(
          { error: "AI 응답 형식이 올바르지 않습니다.", rawText: text },
          { status: 500 }
        );
      }
    }

    // Validate response structure
    if (!fortuneData.today || !fortuneData.wealth || !fortuneData.love) {
      return NextResponse.json(
        { error: "AI 응답에 필요한 정보가 누락되었습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json(fortuneData);
  } catch (error) {
    console.error("Fortune API Error:", error);
    return NextResponse.json(
      { error: "운세 분석 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

