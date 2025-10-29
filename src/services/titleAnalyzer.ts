import type { TitleAnalysis } from '../types';

// Power words that increase engagement
const POWER_WORDS = [
  'amazing', 'awesome', 'best', 'complete', 'easy', 'essential', 'exclusive',
  'expert', 'fast', 'free', 'guaranteed', 'guide', 'hack', 'how', 'incredible',
  'instant', 'learn', 'master', 'new', 'perfect', 'powerful', 'proven', 'quick',
  'secret', 'simple', 'step', 'stunning', 'super', 'top', 'ultimate', 'unique',
  'unlock', 'vital', 'win', 'wonderful', 'advanced', 'beginner', 'breakthrough',
  'comprehensive', 'definitive', 'detailed', 'effective', 'efficient', 'epic',
  'extraordinary', 'fantastic', 'fundamental', 'genius', 'great', 'helpful',
  'important', 'impressive', 'innovative', 'insane', 'inspiring', 'intensive',
  'killer', 'legendary', 'life-changing', 'magnificent', 'massive', 'mind-blowing',
  'must-see', 'outstanding', 'premium', 'professional', 'remarkable', 'revolutionary',
  'sensational', 'spectacular', 'strategic', 'successful', 'superior', 'supreme',
  'terrific', 'transformative', 'unbelievable', 'valuable', 'winning', 'world-class',
  'actionable', 'authentic', 'brilliant', 'certified', 'complete', 'critical',
  'cutting-edge', 'dynamic', 'elite', 'essential', 'exclusive', 'explosive',
  'extreme', 'flawless', 'foolproof', 'game-changing', 'groundbreaking', 'hands-on',
  'high-quality', 'honest', 'in-depth', 'insider', 'intensive', 'jaw-dropping',
  'key', 'latest', 'limited', 'magic', 'modern', 'next-level', 'official',
  'optimal', 'perfect', 'practical', 'premium', 'prime', 'pro', 'real', 'reliable',
];

/**
 * Analyzes video title and provides SEO score
 * Requirements: 1.2, 1.3, 1.4, 1.5
 */
export function analyzeTitle(title: string): TitleAnalysis {
  const length = title.length;
  const lowerTitle = title.toLowerCase();
  
  // Check for numbers (Requirements: 1.5)
  const hasNumbers = /\d/.test(title);
  
  // Check for brackets (Requirements: 1.5)
  const hasBrackets = /[\[\](){}]/.test(title);
  
  // Check for power words (Requirements: 1.4)
  const hasPowerWords = POWER_WORDS.some(word => 
    lowerTitle.includes(word.toLowerCase())
  );
  
  // Detect keyword placement (Requirements: 1.2)
  const words = title.split(/\s+/);
  const keywordPlacement = detectKeywordPlacement(words);
  
  // Calculate score
  const lengthScore = calculateLengthScore(length);
  const powerWordsScore = hasPowerWords ? 25 : 0;
  const numbersScore = hasNumbers ? 15 : 0;
  const bracketsScore = hasBrackets ? 10 : 0;
  const keywordScore = keywordPlacement !== 'none' ? 20 : 0;
  
  // Weighted score calculation
  const score = Math.min(100, lengthScore + powerWordsScore + numbersScore + bracketsScore + keywordScore);
  
  const recommendations = generateTitleRecommendations(
    length,
    hasPowerWords,
    hasNumbers,
    hasBrackets,
    keywordPlacement
  );
  
  return {
    score: Math.round(score),
    length,
    hasNumbers,
    hasPowerWords,
    keywordPlacement,
    recommendations,
  };
}

/**
 * Calculate score based on title length
 * Optimal: 50-70 characters
 */
function calculateLengthScore(length: number): number {
  if (length === 0) return 0;
  if (length < 30) return 10;
  if (length >= 50 && length <= 70) return 30; // Optimal range
  if (length >= 40 && length < 50) return 25;
  if (length > 70 && length <= 80) return 25;
  if (length > 80 && length <= 100) return 15;
  return 10;
}

/**
 * Detect keyword placement in title
 */
function detectKeywordPlacement(words: string[]): 'beginning' | 'middle' | 'end' | 'none' {
  if (words.length === 0) return 'none';
  
  // Simple heuristic: Check if important words are at the beginning
  // In a real implementation, this would use actual keywords from the content
  const firstWord = words[0].toLowerCase();
  const lastWord = words[words.length - 1].toLowerCase();
  
  // Check if first word is likely a keyword (longer than 3 chars, not a common word)
  const commonWords = ['the', 'a', 'an', 'how', 'why', 'what', 'when', 'where', 'who'];
  
  if (firstWord.length > 3 && !commonWords.includes(firstWord)) {
    return 'beginning';
  }
  
  if (lastWord.length > 3 && !commonWords.includes(lastWord)) {
    return 'end';
  }
  
  // Check middle
  const middleWords = words.slice(1, -1);
  const hasKeywordInMiddle = middleWords.some(word => 
    word.length > 4 && !commonWords.includes(word.toLowerCase())
  );
  
  return hasKeywordInMiddle ? 'middle' : 'none';
}

/**
 * Generate recommendations for title improvement
 */
function generateTitleRecommendations(
  length: number,
  hasPowerWords: boolean,
  hasNumbers: boolean,
  hasBrackets: boolean,
  keywordPlacement: string
): Array<{
  id: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: 'title';
  issue: string;
  suggestion: string;
  impact: number;
}> {
  const recommendations = [];
  let idCounter = 1;
  
  // Length recommendations
  if (length === 0) {
    recommendations.push({
      id: `title-${idCounter++}`,
      priority: 'critical' as const,
      category: 'title' as const,
      issue: 'Title is empty',
      suggestion: 'Add a descriptive title between 50-70 characters',
      impact: 30,
    });
  } else if (length < 30) {
    recommendations.push({
      id: `title-${idCounter++}`,
      priority: 'high' as const,
      category: 'title' as const,
      issue: 'Title is too short',
      suggestion: 'Expand your title to 50-70 characters for better SEO',
      impact: 20,
    });
  } else if (length > 70) {
    recommendations.push({
      id: `title-${idCounter++}`,
      priority: 'medium' as const,
      category: 'title' as const,
      issue: 'Title may be truncated in search results',
      suggestion: 'Consider shortening to 50-70 characters',
      impact: 10,
    });
  }
  
  // Power words recommendation
  if (!hasPowerWords) {
    recommendations.push({
      id: `title-${idCounter++}`,
      priority: 'medium' as const,
      category: 'title' as const,
      issue: 'No power words detected',
      suggestion: 'Add engaging words like "Ultimate", "Complete", "Best", or "Guide"',
      impact: 15,
    });
  }
  
  // Numbers recommendation
  if (!hasNumbers) {
    recommendations.push({
      id: `title-${idCounter++}`,
      priority: 'low' as const,
      category: 'title' as const,
      issue: 'No numbers in title',
      suggestion: 'Consider adding numbers (e.g., "10 Tips", "2024") to increase click-through rate',
      impact: 10,
    });
  }
  
  // Brackets recommendation
  if (!hasBrackets) {
    recommendations.push({
      id: `title-${idCounter++}`,
      priority: 'low' as const,
      category: 'title' as const,
      issue: 'No brackets or parentheses',
      suggestion: 'Consider using brackets for additional context (e.g., "[Tutorial]", "(2024)")',
      impact: 8,
    });
  }
  
  // Keyword placement recommendation
  if (keywordPlacement === 'none') {
    recommendations.push({
      id: `title-${idCounter++}`,
      priority: 'high' as const,
      category: 'title' as const,
      issue: 'Keywords not clearly positioned',
      suggestion: 'Place your main keyword at the beginning of the title',
      impact: 15,
    });
  } else if (keywordPlacement === 'end') {
    recommendations.push({
      id: `title-${idCounter++}`,
      priority: 'medium' as const,
      category: 'title' as const,
      issue: 'Main keyword appears at the end',
      suggestion: 'Move your main keyword to the beginning for better SEO',
      impact: 12,
    });
  }
  
  return recommendations;
}
