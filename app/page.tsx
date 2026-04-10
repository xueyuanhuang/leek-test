"use client";

import { useState, useCallback, useMemo } from "react";
import { questions, dimensions } from "@/lib/data";
import { matchPersonality, type MatchResult } from "@/lib/engine";

type Phase = "landing" | "quiz" | "result";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("landing");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<MatchResult | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const totalQuestions = questions.length;
  const progress = ((currentQ) / totalQuestions) * 100;

  const handleStart = useCallback(() => {
    setPhase("quiz");
    setCurrentQ(0);
    setAnswers({});
    setResult(null);
  }, []);

  const handleAnswer = useCallback(
    (questionId: number, score: number) => {
      const newAnswers = { ...answers, [questionId]: score };
      setAnswers(newAnswers);

      setTransitioning(true);
      setTimeout(() => {
        if (currentQ < totalQuestions - 1) {
          setCurrentQ(currentQ + 1);
        } else {
          // 计算结果
          const matchResult = matchPersonality(newAnswers);
          setResult(matchResult);
          setPhase("result");
        }
        setTransitioning(false);
      }, 300);
    },
    [answers, currentQ, totalQuestions]
  );

  const handleBack = useCallback(() => {
    if (currentQ > 0) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentQ(currentQ - 1);
        setTransitioning(false);
      }, 200);
    }
  }, [currentQ]);

  const handleRestart = useCallback(() => {
    setPhase("landing");
    setCurrentQ(0);
    setAnswers({});
    setResult(null);
  }, []);

  const handleShare = useCallback(async () => {
    if (!result) return;
    const text = `我在「韭菜人格测试」中测出了 ${result.personality.emoji} ${result.personality.code}·${result.personality.name}！「${result.personality.tagline}」\n\n你是哪棵韭菜？来测测 👉`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "韭菜人格测试", text });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(text);
      alert("已复制到剪贴板！");
    }
  }, [result]);

  if (phase === "landing") {
    return <LandingPage onStart={handleStart} />;
  }

  if (phase === "quiz") {
    const q = questions[currentQ];
    return (
      <QuizPage
        question={q}
        questionIndex={currentQ}
        total={totalQuestions}
        progress={progress}
        transitioning={transitioning}
        selectedAnswer={answers[q.id]}
        onAnswer={handleAnswer}
        onBack={currentQ > 0 ? handleBack : undefined}
      />
    );
  }

  if (phase === "result" && result) {
    return (
      <ResultPage
        result={result}
        onRestart={handleRestart}
        onShare={handleShare}
      />
    );
  }

  return null;
}

// ===== Landing Page =====
function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="text-6xl animate-fade-in">🌿</div>
        <h1 className="text-3xl font-bold animate-fade-in">
          韭菜人格测试
        </h1>
        <p className="text-[var(--color-text-secondary)] text-lg animate-fade-in-delay">
          30 道币圈灵魂拷问
          <br />
          看看你是哪棵韭菜
        </p>
        <div className="animate-fade-in-delay-2 space-y-4">
          <button
            onClick={onStart}
            className="w-full py-4 px-8 rounded-xl text-lg font-semibold
              bg-[var(--color-accent)] text-black
              hover:brightness-110 active:brightness-90
              transition-all cursor-pointer"
          >
            开始测试
          </button>
          <p className="text-xs text-[var(--color-text-secondary)]">
            27 种韭菜人格 · 含隐藏结局 · 纯属娱乐
          </p>
        </div>
      </div>
    </div>
  );
}

// ===== Quiz Page =====
function QuizPage({
  question,
  questionIndex,
  total,
  progress,
  transitioning,
  selectedAnswer,
  onAnswer,
  onBack,
}: {
  question: (typeof questions)[0];
  questionIndex: number;
  total: number;
  progress: number;
  transitioning: boolean;
  selectedAnswer?: number;
  onAnswer: (questionId: number, score: number) => void;
  onBack?: () => void;
}) {
  // 随机打乱选项顺序（但保持同一题目顺序不变）
  const shuffledOptions = useMemo(() => {
    const opts = question.options.map((o, i) => ({ ...o, originalIndex: i }));
    // 使用 question.id 作为种子的简单 shuffle
    const seed = question.id;
    return opts.sort((a, b) => {
      const ha = ((a.originalIndex * 2654435761 + seed) >>> 0) % 1000;
      const hb = ((b.originalIndex * 2654435761 + seed) >>> 0) % 1000;
      return ha - hb;
    });
  }, [question.id, question.options]);

  return (
    <div className="flex flex-1 flex-col items-center px-6 py-8">
      <div className="max-w-lg w-full space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-[var(--color-text-secondary)]">
            <div className="flex items-center gap-3">
              {onBack && (
                <button
                  onClick={onBack}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
                  aria-label="上一题"
                >
                  ← 上一题
                </button>
              )}
            </div>
            <span>{questionIndex + 1} / {total}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
            <div
              className="progress-bar h-full rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div
          className={`space-y-6 ${transitioning ? "opacity-0 translate-x-4" : "animate-slide-in"}`}
          style={{ transition: "opacity 0.2s, transform 0.2s" }}
        >
          <h2 className="text-xl font-semibold leading-relaxed">
            {question.text}
          </h2>

          <div className="space-y-3">
            {shuffledOptions.map((option) => (
              <button
                key={option.originalIndex}
                className={`option-btn ${selectedAnswer === option.score ? "selected" : ""}`}
                onClick={() => onAnswer(question.id, option.score)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== Result Page =====
function ResultPage({
  result,
  onRestart,
  onShare,
}: {
  result: MatchResult;
  onRestart: () => void;
  onShare: () => void;
}) {
  const { personality: p, similarity: sim, vector } = result;
  const [showDimensions, setShowDimensions] = useState(false);

  return (
    <div className="flex flex-1 flex-col items-center px-6 py-8 pb-24">
      <div className="max-w-lg w-full space-y-6">
        {/* Result Card */}
        <div className="result-card p-8 text-center animate-fade-in">
          <div className="text-6xl mb-4">{p.emoji}</div>
          <div className="mb-2">
            <span
              className={`text-xs font-mono px-2 py-0.5 border rounded-full rarity-${p.rarity}`}
            >
              {p.rarityLabel}
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-1">
            {p.code} · {p.name}
          </h2>
          <p className="text-[var(--color-accent)] text-sm mb-4">
            {p.tagline}
          </p>
          <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-4">
            匹配度 {Math.round(sim)}%
          </p>
          <p className="text-[var(--color-text)] leading-relaxed text-left">
            {p.description}
          </p>
        </div>

        {/* Quote */}
        <div className="animate-fade-in-delay text-center">
          <p className="text-[var(--color-text-secondary)] italic text-sm">
            「{p.quote}」
          </p>
        </div>

        {/* Traits */}
        <div className="animate-fade-in-delay flex flex-wrap justify-center gap-2">
          {p.traits.map((t) => (
            <span
              key={t}
              className="text-xs px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Dimension Details (collapsible) */}
        <div className="animate-fade-in-delay-2">
          <button
            onClick={() => setShowDimensions(!showDimensions)}
            className="w-full text-center text-sm text-[var(--color-text-secondary)]
              hover:text-[var(--color-text)] transition-colors cursor-pointer py-2"
          >
            {showDimensions ? "收起" : "展开"} 15维度详情 {showDimensions ? "▲" : "▼"}
          </button>

          {showDimensions && (
            <div className="space-y-3 mt-4">
              {dimensions.map((dim, i) => {
                const val = vector[i];
                const pct = ((val - 1) / 2) * 100;
                return (
                  <div key={dim.code} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-[var(--color-text-secondary)]">
                        {dim.low}
                      </span>
                      <span className="font-medium">{dim.name}</span>
                      <span className="text-[var(--color-text-secondary)]">
                        {dim.high}
                      </span>
                    </div>
                    <div className="dim-bar">
                      <div
                        className="dim-bar-fill"
                        style={{ width: `${Math.max(5, pct)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Top 3 Matches */}
        {result.topMatches.length > 1 && (
          <div className="animate-fade-in-delay-2 space-y-2">
            <h3 className="text-sm text-[var(--color-text-secondary)] text-center">
              你也有点像...
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {result.topMatches.slice(1, 3).map((m) => (
                <div
                  key={m.personality.code}
                  className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-3 text-center"
                >
                  <div className="text-2xl mb-1">{m.personality.emoji}</div>
                  <div className="text-xs font-semibold">{m.personality.code}</div>
                  <div className="text-xs text-[var(--color-text-secondary)]">
                    {m.personality.name} · {Math.round(m.similarity)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="animate-fade-in-delay-2 space-y-3 pt-4">
          <button
            onClick={onShare}
            className="w-full py-3.5 px-6 rounded-xl font-semibold
              bg-[var(--color-accent)] text-black
              hover:brightness-110 active:brightness-90
              transition-all cursor-pointer"
          >
            分享结果
          </button>
          <button
            onClick={onRestart}
            className="w-full py-3.5 px-6 rounded-xl font-semibold
              bg-[var(--color-surface)] text-[var(--color-text)]
              border border-[var(--color-border)]
              hover:bg-[var(--color-surface-hover)]
              transition-all cursor-pointer"
          >
            重新测试
          </button>
        </div>
      </div>
    </div>
  );
}
