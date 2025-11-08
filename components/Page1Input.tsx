"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppStore } from "@/lib/store";
import { Loader2 } from "lucide-react";

export default function Page1Input() {
  const { setUserInfo, setPage, setFortuneResult } = useAppStore();
  const [birthDate, setBirthDate] = useState("");
  const [birthHour, setBirthHour] = useState("12");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateBirthDate = (date: string): boolean => {
    // Check if 8 digits
    if (!/^\d{8}$/.test(date)) {
      setError("생년월일은 8자리 숫자로 입력해주세요 (예: 19900101)");
      return false;
    }

    const year = parseInt(date.substring(0, 4));
    const month = parseInt(date.substring(4, 6));
    const day = parseInt(date.substring(6, 8));

    // Validate year
    if (year < 1900 || year > 2100) {
      setError("연도는 1900년에서 2100년 사이여야 합니다");
      return false;
    }

    // Validate month
    if (month < 1 || month > 12) {
      setError("월은 1에서 12 사이여야 합니다");
      return false;
    }

    // Validate day
    if (day < 1 || day > 31) {
      setError("일은 1에서 31 사이여야 합니다");
      return false;
    }

    // Check days in month
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day > daysInMonth) {
      setError(`${month}월은 ${daysInMonth}일까지 있습니다`);
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    setError("");

    // Validate
    if (!validateBirthDate(birthDate)) {
      return;
    }

    setLoading(true);

    try {
      // Save user info
      setUserInfo({ birthDate, birthHour, gender });

      // Call fortune API
      const response = await fetch("/api/fortune", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ birthDate, birthHour, gender }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "운세 분석에 실패했습니다");
      }

      const fortuneData = await response.json();
      setFortuneResult(fortuneData);

      // Navigate to page 2
      setPage(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      <div className="w-full max-w-md space-y-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-emerald-400">
            🔮 Gemini Saju
          </h1>
          <p className="text-xl text-zinc-300">AI가 분석하는 당신의 운명</p>
        </div>

        {/* Form */}
        <div className="space-y-6 bg-zinc-950 p-8 rounded-lg border border-zinc-800">
          {/* Birth Date */}
          <div className="space-y-2">
            <Label htmlFor="birthDate">생년월일</Label>
            <Input
              id="birthDate"
              type="text"
              placeholder="19900101"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              maxLength={8}
              disabled={loading}
            />
            <p className="text-xs text-zinc-500">8자리 숫자로 입력 (예: 19900101)</p>
          </div>

          {/* Birth Hour */}
          <div className="space-y-2">
            <Label htmlFor="birthHour">출생 시간</Label>
            <Select
              id="birthHour"
              value={birthHour}
              onChange={(e) => setBirthHour(e.target.value)}
              disabled={loading}
            >
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i.toString().padStart(2, "0")}>
                  {i.toString().padStart(2, "0")}시
                </option>
              ))}
            </Select>
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label>성별</Label>
            <RadioGroup
              value={gender}
              onValueChange={(value) => setGender(value as "male" | "female")}
            >
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="male"
                    id="male"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                    disabled={loading}
                  />
                  <Label htmlFor="male" className="cursor-pointer">
                    남성
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="female"
                    id="female"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                    disabled={loading}
                  />
                  <Label htmlFor="female" className="cursor-pointer">
                    여성
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-md bg-red-950/50 border border-red-900">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                천기를 읽는 중...
              </>
            ) : (
              "분석 시작하기"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

