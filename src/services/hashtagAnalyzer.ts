import type { HashtagAnalysis } from '../types';

// Popular/trending hashtags by category
const POPULAR_HASHTAGS = [
  '#youtube', '#youtuber', '#subscribe', '#viral', '#trending', '#fyp',
  '#tutorial', '#howto', '#tips', '#guide', '#learn', '#education',
  '#tech', '#technology', '#gaming', '#music', '#vlog', '#lifestyle',
  '#fitness', '#health', '#beauty', '#fashion', '#food', '#cooking',
  '#travel', '#adventure', '#photography', '#art', '#diy', '#crafts',
  '#business', '#entrepreneur', '#marketing', '#seo', '#socialmedia',
  '#motivation', '#inspiration', '#success', '#money', '#finance',
  '#comedy', '#funny', '#entertainment', '#movie', '#review',
  '#news', '#politics', '#sports', '#football', '#basketball',
];

/**
 * Analyzes hashtags and provides SEO score
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5
 */
export function analyzeHashtags(hashtags: string[]): HashtagAnalysis {
  const hashtagCount = hashtags.length;
  
  // Calculate popularity score (Requirements: 4.2)
  const popularityScore = calculatePopularityScore(hashtags);
  
  // Calculate relevance score (Requirements: 4.2)
  const relevanceScore = calculateRelevanceScore(hashtags);
  
  // Detect generic vs specific (Requirements: 4.4)
  const hasGeneric = hashtags.some(h => isGenericHashtag(h));
  const hasSpecific = hashtags.some(h => !isGenericHashtag(h));
  
  // Generate trending hashtags (Requirements: 4.3)
  const trendingHashtags = generateTrendingHashtags(hashtags);
  
  // Calculate score
  const countScore = calculateCountScore(hashtagCount);
  const popularityScorePoints = popularityScore * 0.3;
  const relevanceScorePoints = relevanceScore * 0.3;
  const diversityScore = (hasGeneric && hasSpecific) ? 20 : 10;
  
  const score = Math.min(100, countScore + popularityScorePoints + relevanceScorePoints + diversityScore);
  
  const recommendations = generateHashtagRecommendations(
    hashtagCount,
    popularityScore,
    relevanceScore,
    hasGeneric,
    hasSpecific
  );
  
  return {
    score: Math.round(score),
    hashtagCount,
    popularityScore: Math.round(popularityScore),
    relevanceScore: Math.round(relevanceScore),
    trendingHashtags,
    recommendations,
  };
}

/**
 * Calculate score based on hashtag count
 * Optimal: 3-5 hashtags
 */
function calculateCountScore(count: number): number {
  if (count === 0) return 0;
  if (count >= 3 && count <= 5) return 30;
  if (count === 2 || count === 6) return 25;
  if (count === 1 || count === 7) return 20;
  if (count >= 8 && count <= 10) return 15;
  if (count > 10 && count <= 15) return 10;
  return 5;
}

/**
 * Calculate popularity score based on common hashtags
 */
function calculatePopularityScore(hashtags: string[]): number {
  if (hashtags.length === 0) return 0;
  
  const popularCount = hashtags.filter(h => 
    POPULAR_HASHTAGS.some(popular => 
      h.toLowerCase() === popular.toLowerCase()
    )
  ).length;
  
  const ratio = popularCount / hashtags.length;
  
  // Optimal is 30-50% popular hashtags
  if (ratio >= 0.3 && ratio <= 0.5) return 100;
  if (ratio >= 0.2 && ratio < 0.3) return 80;
  if (ratio > 0.5 && ratio <= 0.7) return 70;
  if (ratio < 0.2) return 50;
  return 40; // Too many popular hashtags
}

/**
 * Calculate relevance score
 * Based on hashtag length and specificity
 */
function calculateRelevanceScore(hashtags: string[]): number {
  if (hashtags.length === 0) return 0;
  
  let totalScore = 0;
  
  hashtags.forEach(hashtag => {
    const cleanTag = hashtag.replace('#', '').toLowerCase();
    
    // Longer, more specific hashtags are more relevant
    if (cleanTag.length > 15) {
      totalScore += 100;
    } else if (cleanTag.length > 10) {
      totalScore += 80;
    } else if (cleanTag.length > 5) {
      totalScore += 60;
    } else {
      totalScore += 40;
    }
    
    // Multi-word hashtags are more specific
    if (cleanTag.includes('_') || /[A-Z]/.test(hashtag.slice(1))) {
      totalScore += 20;
    }
  });
  
  return totalScore / hashtags.length;
}

/**
 * Check if hashtag is generic
 */
function isGenericHashtag(hashtag: string): boolean {
  const cleanTag = hashtag.replace('#', '').toLowerCase();
  return cleanTag.length <= 8 || POPULAR_HASHTAGS.some(p => 
    p.toLowerCase() === hashtag.toLowerCase()
  );
}

/**
 * Generate trending hashtag suggestions
 */
function generateTrendingHashtags(hashtags: string[]): string[] {
  const suggestions: string[] = [];
  const lowerHashtags = hashtags.map(h => h.toLowerCase());
  
  // Suggest popular hashtags not already used
  const popularSuggestions = POPULAR_HASHTAGS.filter(popular => 
    !lowerHashtags.includes(popular.toLowerCase())
  );
  
  // Add year-specific hashtag
  const currentYear = new Date().getFullYear();
  if (!lowerHashtags.some(h => h.includes(currentYear.toString()))) {
    suggestions.push(`#${currentYear}`);
  }
  
  // Add general suggestions
  if (!lowerHashtags.includes('#youtube')) {
    suggestions.push('#youtube');
  }
  if (!lowerHashtags.includes('#viral')) {
    suggestions.push('#viral');
  }
  if (!lowerHashtags.includes('#trending')) {
    suggestions.push('#trending');
  }
  
  // Add category-specific suggestions
  suggestions.push(...popularSuggestions.slice(0, 3));
  
  return [...new Set(suggestions)].slice(0, 10);
}

/**
 * Generate recommendations for hashtag improvement
 */
function generateHashtagRecommendations(
  hashtagCount: number,
  popularityScore: number,
  relevanceScore: number,
  hasGeneric: boolean,
  hasSpecific: boolean
): Array<{
  id: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: 'hashtags';
  issue: string;
  suggestion: string;
  impact: number;
}> {
  const recommendations = [];
  let idCounter = 1;
  
  // Count recommendations
  if (hashtagCount === 0) {
    recommendations.push({
      id: `hashtag-${idCounter++}`,
      priority: 'high' as const,
      category: 'hashtags' as const,
      issue: 'No hashtags provided',
      suggestion: 'Add 3-5 relevant hashtags to increase discoverability',
      impact: 25,
    });
  } else if (hashtagCount < 3) {
    recommendations.push({
      id: `hashtag-${idCounter++}`,
      priority: 'medium' as const,
      category: 'hashtags' as const,
      issue: 'Too few hashtags',
      suggestion: 'Add more hashtags. Aim for 3-5 hashtags for optimal reach',
      impact: 15,
    });
  } else if (hashtagCount > 10) {
    recommendations.push({
      id: `hashtag-${idCounter++}`,
      priority: 'medium' as const,
      category: 'hashtags' as const,
      issue: 'Too many hashtags',
      suggestion: 'Reduce to 3-5 most relevant hashtags to avoid appearing spammy',
      impact: 15,
    });
  }
  
  // Popularity recommendations
  if (popularityScore < 50) {
    recommendations.push({
      id: `hashtag-${idCounter++}`,
      priority: 'medium' as const,
      category: 'hashtags' as const,
      issue: 'Low popularity score',
      suggestion: 'Include 1-2 popular hashtags like #youtube or #viral',
      impact: 15,
    });
  } else if (popularityScore < 70) {
    recommendations.push({
      id: `hashtag-${idCounter++}`,
      priority: 'low' as const,
      category: 'hashtags' as const,
      issue: 'Could use more popular hashtags',
      suggestion: 'Consider adding one more trending hashtag',
      impact: 10,
    });
  }
  
  // Relevance recommendations
  if (relevanceScore < 60) {
    recommendations.push({
      id: `hashtag-${idCounter++}`,
      priority: 'high' as const,
      category: 'hashtags' as const,
      issue: 'Hashtags may be too generic',
      suggestion: 'Use more specific, niche hashtags related to your content',
      impact: 20,
    });
  }
  
  // Diversity recommendations
  if (!hasGeneric && hashtagCount > 0) {
    recommendations.push({
      id: `hashtag-${idCounter++}`,
      priority: 'low' as const,
      category: 'hashtags' as const,
      issue: 'No broad hashtags',
      suggestion: 'Add 1-2 popular broad hashtags for wider reach',
      impact: 10,
    });
  }
  
  if (!hasSpecific && hashtagCount > 0) {
    recommendations.push({
      id: `hashtag-${idCounter++}`,
      priority: 'medium' as const,
      category: 'hashtags' as const,
      issue: 'No specific niche hashtags',
      suggestion: 'Add specific hashtags that describe your unique content',
      impact: 15,
    });
  }
  
  return recommendations;
}
