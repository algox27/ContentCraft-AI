import type { TagAnalysis } from '../types';

// Common broad keywords by category
const BROAD_KEYWORDS = [
  'tutorial', 'guide', 'how', 'tips', 'tricks', 'best', 'top', 'review',
  'vlog', 'gaming', 'music', 'comedy', 'education', 'tech', 'food', 'travel',
  'fitness', 'beauty', 'fashion', 'diy', 'news', 'sports', 'entertainment',
];

/**
 * Analyzes video tags and provides SEO score
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5
 */
export function analyzeTags(tags: string[]): TagAnalysis {
  const tagCount = tags.length;
  const totalCharacters = tags.join('').length;
  
  // Check for broad vs specific keywords (Requirements: 3.3)
  const hasBroadKeywords = tags.some(tag => 
    BROAD_KEYWORDS.some(broad => tag.toLowerCase().includes(broad))
  );
  
  const hasSpecificKeywords = tags.some(tag => 
    tag.split(/\s+/).length > 1 || tag.length > 15
  );
  
  // Calculate redundancy level (Requirements: 3.4)
  const redundancyLevel = calculateRedundancy(tags);
  
  // Generate suggested tags (Requirements: 3.2)
  const suggestedTags = generateSuggestedTags(tags);
  
  // Calculate score
  const countScore = calculateCountScore(tagCount);
  const characterScore = totalCharacters <= 500 ? 20 : 0;
  const diversityScore = (hasBroadKeywords && hasSpecificKeywords) ? 30 : 15;
  const redundancyScore = calculateRedundancyScore(redundancyLevel);
  
  const score = Math.min(100, countScore + characterScore + diversityScore + redundancyScore);
  
  const recommendations = generateTagRecommendations(
    tagCount,
    totalCharacters,
    hasBroadKeywords,
    hasSpecificKeywords,
    redundancyLevel
  );
  
  return {
    score: Math.round(score),
    totalCharacters,
    tagCount,
    hasBroadKeywords,
    hasSpecificKeywords,
    redundancyLevel,
    suggestedTags,
    recommendations,
  };
}

/**
 * Calculate score based on tag count
 * Optimal: 8-12 tags
 */
function calculateCountScore(count: number): number {
  if (count === 0) return 0;
  if (count >= 8 && count <= 12) return 30;
  if (count >= 5 && count < 8) return 25;
  if (count > 12 && count <= 15) return 20;
  if (count < 5) return 15;
  return 10;
}

/**
 * Calculate redundancy level (0-100)
 * Higher means more duplicate/similar tags
 */
function calculateRedundancy(tags: string[]): number {
  if (tags.length === 0) return 0;
  
  const lowerTags = tags.map(t => t.toLowerCase());
  const uniqueTags = new Set(lowerTags);
  
  // Check for exact duplicates
  const duplicateRatio = 1 - (uniqueTags.size / tags.length);
  
  // Check for similar tags (containing same words)
  let similarityCount = 0;
  for (let i = 0; i < lowerTags.length; i++) {
    for (let j = i + 1; j < lowerTags.length; j++) {
      const words1 = lowerTags[i].split(/\s+/);
      const words2 = lowerTags[j].split(/\s+/);
      const commonWords = words1.filter(w => words2.includes(w));
      if (commonWords.length > 0) {
        similarityCount++;
      }
    }
  }
  
  const maxSimilarities = (tags.length * (tags.length - 1)) / 2;
  const similarityRatio = maxSimilarities > 0 ? similarityCount / maxSimilarities : 0;
  
  return Math.round((duplicateRatio * 50 + similarityRatio * 50));
}

/**
 * Calculate score based on redundancy
 */
function calculateRedundancyScore(redundancy: number): number {
  if (redundancy === 0) return 20;
  if (redundancy < 20) return 15;
  if (redundancy < 40) return 10;
  if (redundancy < 60) return 5;
  return 0;
}

/**
 * Generate suggested tags based on existing tags
 */
function generateSuggestedTags(tags: string[]): string[] {
  const suggestions: string[] = [];
  
  // Suggest related broad keywords
  const hasYouTube = tags.some(t => t.toLowerCase().includes('youtube'));
  if (!hasYouTube) {
    suggestions.push('youtube');
  }
  
  // Suggest year if not present
  const currentYear = new Date().getFullYear().toString();
  const hasYear = tags.some(t => t.includes(currentYear));
  if (!hasYear) {
    suggestions.push(currentYear);
  }
  
  // Suggest tutorial/guide if not present
  const hasTutorial = tags.some(t => 
    t.toLowerCase().includes('tutorial') || t.toLowerCase().includes('guide')
  );
  if (!hasTutorial && tags.length > 0) {
    suggestions.push('tutorial');
  }
  
  // Suggest beginner/advanced based on content
  const hasLevel = tags.some(t => 
    t.toLowerCase().includes('beginner') || 
    t.toLowerCase().includes('advanced') ||
    t.toLowerCase().includes('intermediate')
  );
  if (!hasLevel) {
    suggestions.push('beginner friendly');
  }
  
  return suggestions.slice(0, 5);
}

/**
 * Generate recommendations for tag improvement
 */
function generateTagRecommendations(
  tagCount: number,
  totalCharacters: number,
  hasBroadKeywords: boolean,
  hasSpecificKeywords: boolean,
  redundancyLevel: number
): Array<{
  id: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: 'tags';
  issue: string;
  suggestion: string;
  impact: number;
}> {
  const recommendations = [];
  let idCounter = 1;
  
  // Tag count recommendations
  if (tagCount === 0) {
    recommendations.push({
      id: `tag-${idCounter++}`,
      priority: 'critical' as const,
      category: 'tags' as const,
      issue: 'No tags provided',
      suggestion: 'Add 8-12 relevant tags to improve video discoverability',
      impact: 30,
    });
  } else if (tagCount < 5) {
    recommendations.push({
      id: `tag-${idCounter++}`,
      priority: 'high' as const,
      category: 'tags' as const,
      issue: 'Too few tags',
      suggestion: 'Add more tags. Aim for 8-12 tags for optimal SEO',
      impact: 20,
    });
  } else if (tagCount > 15) {
    recommendations.push({
      id: `tag-${idCounter++}`,
      priority: 'medium' as const,
      category: 'tags' as const,
      issue: 'Too many tags',
      suggestion: 'Reduce to 8-12 most relevant tags to avoid diluting relevance',
      impact: 15,
    });
  }
  
  // Character limit recommendation
  if (totalCharacters > 500) {
    recommendations.push({
      id: `tag-${idCounter++}`,
      priority: 'critical' as const,
      category: 'tags' as const,
      issue: 'Total tag characters exceed 500',
      suggestion: 'Remove or shorten tags to stay within the 500 character limit',
      impact: 25,
    });
  }
  
  // Diversity recommendations
  if (!hasBroadKeywords) {
    recommendations.push({
      id: `tag-${idCounter++}`,
      priority: 'medium' as const,
      category: 'tags' as const,
      issue: 'No broad keywords detected',
      suggestion: 'Add general category tags like "tutorial", "guide", or "tips"',
      impact: 15,
    });
  }
  
  if (!hasSpecificKeywords) {
    recommendations.push({
      id: `tag-${idCounter++}`,
      priority: 'medium' as const,
      category: 'tags' as const,
      issue: 'No specific long-tail keywords',
      suggestion: 'Add specific multi-word tags that describe your unique content',
      impact: 15,
    });
  }
  
  // Redundancy recommendations
  if (redundancyLevel > 40) {
    recommendations.push({
      id: `tag-${idCounter++}`,
      priority: 'high' as const,
      category: 'tags' as const,
      issue: 'High tag redundancy detected',
      suggestion: 'Remove duplicate or very similar tags to improve tag diversity',
      impact: 20,
    });
  } else if (redundancyLevel > 20) {
    recommendations.push({
      id: `tag-${idCounter++}`,
      priority: 'low' as const,
      category: 'tags' as const,
      issue: 'Some tag redundancy detected',
      suggestion: 'Consider replacing similar tags with more diverse keywords',
      impact: 10,
    });
  }
  
  return recommendations;
}
