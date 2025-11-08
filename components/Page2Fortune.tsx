"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppStore } from "@/lib/store";

export default function Page2Fortune() {
  const { fortuneResult, setPage, resetStore, clearChatHistory } = useAppStore();

  const handleAskAI = () => {
    clearChatHistory();
    setPage(3);
  };

  const handleReset = () => {
    resetStore();
  };

  if (!fortuneResult) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-black">
        <div className="text-center">
          <p className="text-zinc-400">운세 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      <div className="w-full max-w-4xl space-y-6">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-emerald-400">
            당신의 운세
          </h1>
          <p className="text-zinc-400">AI가 분석한 결과입니다</p>
        </div>

        {/* Fortune Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Today's Fortune */}
          <Card className="hover:border-emerald-500/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>☀️</span>
                <span>오늘의 운세</span>
              </CardTitle>
              <CardDescription>Today&apos;s Fortune</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-200 leading-relaxed">
                {fortuneResult.today}
              </p>
            </CardContent>
          </Card>

          {/* Wealth Fortune */}
          <Card className="hover:border-emerald-500/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>💰</span>
                <span>재물운</span>
              </CardTitle>
              <CardDescription>Wealth Fortune</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-200 leading-relaxed">
                {fortuneResult.wealth}
              </p>
            </CardContent>
          </Card>

          {/* Love Fortune */}
          <Card className="hover:border-emerald-500/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>💖</span>
                <span>애정운</span>
              </CardTitle>
              <CardDescription>Love Fortune</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-200 leading-relaxed">
                {fortuneResult.love}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleAskAI} size="lg" className="min-w-[200px]">
            AI에게 질문하기
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            size="lg"
            className="min-w-[200px]"
          >
            정보 다시 입력
          </Button>
        </div>
      </div>
    </div>
  );
}

