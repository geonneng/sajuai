"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppStore } from "@/lib/store";
import { Loader2, Send } from "lucide-react";

export default function Page3Chat() {
  const { userInfo, chatHistory, addChatMessage, resetStore } = useAppStore();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSend = async () => {
    if (!message.trim() || !userInfo || loading) return;

    const userMessage = message.trim();
    setMessage("");
    setLoading(true);

    // Add user message immediately
    addChatMessage({ role: "user", content: userMessage });

    try {
      // Call chat API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          birthDate: userInfo.birthDate,
          birthHour: userInfo.birthHour,
          gender: userInfo.gender,
          message: userMessage,
          chatHistory: chatHistory,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "답변 생성에 실패했습니다");
      }

      const data = await response.json();

      // Add AI response
      addChatMessage({ role: "assistant", content: data.response });
    } catch (error) {
      console.error("Chat error:", error);
      addChatMessage({
        role: "assistant",
        content: "죄송합니다. 답변 생성 중 오류가 발생했습니다. 다시 시도해주세요.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    resetStore();
  };

  return (
    <div className="min-h-screen flex flex-col p-4 bg-black">
      <div className="w-full max-w-4xl mx-auto flex flex-col h-screen max-h-screen py-4">
        {/* Header */}
        <div className="flex-shrink-0 space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-emerald-400">
                AI 사주 상담
              </h1>
              <p className="text-sm text-zinc-400">
                궁금한 점을 자유롭게 질문해보세요
              </p>
            </div>
            <Button onClick={handleReset} variant="outline" size="sm">
              처음으로
            </Button>
          </div>
        </div>

        {/* Chat Area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
          style={{ minHeight: 0 }}
        >
          {chatHistory.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-3 text-zinc-500">
                <p className="text-lg">💬</p>
                <p>대화를 시작해보세요</p>
                <div className="text-sm space-y-1">
                  <p>예시 질문:</p>
                  <p className="text-emerald-400/70">&quot;올해 이직운은 어때?&quot;</p>
                  <p className="text-emerald-400/70">&quot;나의 성격적 장점은?&quot;</p>
                </div>
              </div>
            </div>
          ) : (
            chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-emerald-600 text-white"
                      : "bg-zinc-800 text-zinc-100"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-zinc-800 text-zinc-100 rounded-lg px-4 py-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">답변을 생성하는 중...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="질문을 입력하세요..."
            disabled={loading}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={loading || !message.trim()}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

