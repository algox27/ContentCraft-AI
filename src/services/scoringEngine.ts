import type { OverallScore, ComponentAnalyses, Recommendation } from '../types';

/**
 * Calculate overall SEO score from component scores
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5
 * Weighted formula: Title (30%) + Description (35%) + Tags (20%) + Hashtags (15%)
 */
export function calculateOverallScore(analyses: ComponentAnalyses): OverallScore {
  // Calculate weighted score
  const titleWeight = 0.30;
  const descriptionWeight = 0.35;
  const tagsWeight = 0.20;
  const hashtagsWeight = 0.15;
  
  const score = Math.round(
    analyses.title.score * titleWeight +
    analyses.description.score * descriptionWeight +
    analyses.tags.score * tagsWeight +
    analyses.hashtags.score * hashtagsWeight
  );
  
  // Assign grade (Requirements: 5.2)
  const grade = assignGrade(score);
  
  // Determine status (Requirements: 5.2)
  const status = determineStatus(score);
  
  // Identify critical issues (Requirements: 5.3)
  const criticalIssues = identifyCriticalIssues(analyses, score);
  
  return {
    score,
    grade,
    status,
    criticalIssues,
  };
}

/**
 * Assign letter grade based on score
 */
function assignGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

/**
 * Determine status based on score
 */
function determineStatus(score: number): 'excellent' | 'good' | 'needs-improvement' | 'poor' {
  if (score >= 85) return 'excellent';
  if (score >= 70) return 'good';
  if (score >= 50) return 'needs-improvement';
  return 'poor';
}

/**
 * Identify critical issues that need immediate attention
 * Requirements: 5.3 - Highlight critical issues when score < 60
 */
function identifyCriticalIssues(analyses: ComponentAnalyses, overallScore: number): string[] {
  const issues: string[] = [];
  
  // Check if overall score is below 60
  if (overallScore < 60) {
    issues.push('Overall SEO score is below 60 - immediate optimization needed');
  }
  
  // Check individual component scores
  if (analyses.title.score < 50) {
    issues.push('Title score is critically low - needs major improvements');
  }
  
  if (analyses.description.score < 50) {
    issues.push('Description score is critically low - add more detailed content');
  }
  
  if (analyses.tags.score < 40) {
    issues.push('Tags score is critically low - add relevant tags');
  }
  
  if (analyses.hashtags.score < 40) {
    issues.push('Hashtags score is critically low - add appropriate hashtags');
  }
  
  // Check for missing critical elements
  if (analyses.title.length === 0) {
    issues.push('CRITICAL: Title is empty');
  }
  
  if (analyses.description.length < 100) {
    issues.push('CRITICAL: Description is too short or empty');
  }
  
  if (analyses.tags.tagCount === 0) {
    issues.push('CRITICAL: No tags provided');
  }
  
  return issues;
}

/**
 * Generate priority-ranked recommendations from all components
 * Requirements: 5.4 - Provide priority-ranked list of recommendations
 */
export function generatePrioritizedRecommendations(analyses: ComponentAnalyses): Recommendation[] {
  // Collect all recommendations
  const allRecommendations: Recommendation[] = [
    ...analyses.title.recommendations,
    ...analyses.description.recommendations,
    ...analyses.tags.recommendations,
    ...analyses.hashtags.recommendations,
  ];
  
  // Sort by priority and impact
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  
  return allRecommendations.sort((a, b) => {
    // First sort by priority
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    
    // Then by impact
    return b.impact - a.impact;
  });
}

/**
 * Compare current metadata against best practices
 * Requirements: 5.5 - Display comparison against best practices
 */
export function compareToBestPractices(analyses: ComponentAnalyses): {
  category: string;
  current: string;
  bestPractice: string;
  status: 'good' | 'needs-improvement' | 'poor';
}[] {
  const comparisons: {
    category: string;
    current: string;
    bestPractice: string;
    status: 'good' | 'needs-improvement' | 'poor';
  }[] = [];
  
  // Title length
  comparisons.push({
    category: 'Title Length',
    current: `${analyses.title.length} characters`,
    bestPractice: '50-70 characters',
    status: analyses.title.length >= 50 && analyses.title.length <= 70 ? 'good' : 'needs-improvement',
  });
  
  // Description length
  comparisons.push({
    category: 'Description Length',
    current: `${analyses.description.length} characters`,
    bestPractice: '200+ characters',
    status: analyses.description.length >= 200 ? 'good' : 'needs-improvement',
  });
  
  // Tag count
  comparisons.push({
    category: 'Tag Count',
    current: `${analyses.tags.tagCount} tags`,
    bestPractice: '8-12 tags',
    status: analyses.tags.tagCount >= 8 && analyses.tags.tagCount <= 12 ? 'good' : 'needs-improvement',
  });
  
  // Hashtag count
  comparisons.push({
    category: 'Hashtag Count',
    current: `${analyses.hashtags.hashtagCount} hashtags`,
    bestPractice: '3-5 hashtags',
    status: analyses.hashtags.hashtagCount >= 3 && analyses.hashtags.hashtagCount <= 5 ? 'good' : 'needs-improvement',
  });
  
  // Power words in title
  comparisons.push({
    category: 'Title Power Words',
    current: analyses.title.hasPowerWords ? 'Yes' : 'No',
    bestPractice: 'Yes',
    status: analyses.title.hasPowerWords ? 'good' : 'needs-improvement',
  });
  
  // Call-to-action in description
  comparisons.push({
    category: 'Description CTA',
    current: analyses.description.hasCallToAction ? 'Yes' : 'No',
    bestPractice: 'Yes (in first 150 chars)',
    status: analyses.description.hasCallToAction ? 'good' : 'needs-improvement',
  });
  
  // Timestamps in description
  comparisons.push({
    category: 'Timestamps',
    current: analyses.description.hasTimestamps ? 'Yes' : 'No',
    bestPractice: 'Yes',
    status: analyses.description.hasTimestamps ? 'good' : 'poor',
  });
  
  // Tag diversity
  comparisons.push({
    category: 'Tag Diversity',
    current: (analyses.tags.hasBroadKeywords && analyses.tags.hasSpecificKeywords) ? 'Good mix' : 'Limited',
    bestPractice: 'Mix of broad and specific',
    status: (analyses.tags.hasBroadKeywords && analyses.tags.hasSpecificKeywords) ? 'good' : 'needs-improvement',
  });
  
  return comparisons;
}
