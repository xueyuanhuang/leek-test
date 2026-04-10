import { dimensions, questions, personalities, type Personality } from "./data";

// 每个维度2题，取平均分
export function computeVector(answers: Record<number, number>): number[] {
  const dimCodes = dimensions.map((d) => d.code);
  return dimCodes.map((code) => {
    const scores: number[] = [];
    questions.forEach((q) => {
      if (q.dimension === code && answers[q.id] !== undefined) {
        scores.push(answers[q.id]);
      }
    });
    if (scores.length === 0) return 2; // default mid
    return scores.reduce((a, b) => a + b, 0) / scores.length;
  });
}

// 欧几里得距离匹配
function euclideanDistance(a: number[], b: number[]): number {
  return Math.sqrt(
    a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0)
  );
}

// 计算匹配相似度 (0-100%)
function similarity(userVec: number[], targetVec: number[]): number {
  const maxDist = Math.sqrt(15 * Math.pow(2, 2)); // 最大可能距离
  const dist = euclideanDistance(userVec, targetVec);
  return Math.max(0, (1 - dist / maxDist) * 100);
}

export interface MatchResult {
  personality: Personality;
  similarity: number;
  vector: number[];
  topMatches: { personality: Personality; similarity: number }[];
}

export function matchPersonality(
  answers: Record<number, number>
): MatchResult {
  // 检查隐藏触发：第31题选了"是我"
  if (answers[31] === 3) {
    const hidden = personalities.find((p) => p.special === "hidden")!;
    const vector = computeVector(answers);
    return {
      personality: hidden,
      similarity: 100,
      vector,
      topMatches: [{ personality: hidden, similarity: 100 }],
    };
  }

  const vector = computeVector(answers);

  // 只匹配标准人格（排除特殊的）
  const standardPersonalities = personalities.filter((p) => !p.special);

  const matches = standardPersonalities
    .map((p) => ({
      personality: p,
      similarity: similarity(vector, p.vector),
    }))
    .sort((a, b) => b.similarity - a.similarity);

  // 兜底：最佳匹配 < 55% 时触发 NGMI
  if (matches[0].similarity < 55) {
    const fallback = personalities.find((p) => p.special === "fallback")!;
    return {
      personality: fallback,
      similarity: matches[0].similarity,
      vector,
      topMatches: matches.slice(0, 3),
    };
  }

  return {
    personality: matches[0].personality,
    similarity: matches[0].similarity,
    vector,
    topMatches: matches.slice(0, 3),
  };
}
