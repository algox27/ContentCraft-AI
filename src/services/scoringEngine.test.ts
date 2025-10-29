import { describe, it, expect } from 'vitest';
import { calculateOverallScore, generatePrioritizedRecommendations, compareToBestPractices } from './scoringEngine';
import type { ComponentAnalyses } from '../types';

const mockAnalyses: ComponentAnalyses = {
  title: {
    score: 80,
    length: 60,
    hasNumbers: true,
    hasPowerWords: true,
    keywordPlacement: 'beginning',
    recommendations: [],
  },
  description: {
    score: 75,
    length: 300,
    keywordDensity: 2.5,
    hasCallToAction: true,
    hasTimestamps: true,
    hasLinks: true,
    readabilityScore: 70,
    recommendations: [],
  },
  tags: {
    score: 70,
    totalCharacters: 200,
    tagCount: 10,
    hasBroadKeywords: true,
    hasSpecificKeywords: true,
    redundancyLevel: 10,
    suggestedTags: [],
    recommendations: [],
  },
  hashtags: {
    score: 65,
    hashtagCount: 4,
    popularityScore: 70,
    relevanceScore: 60,
    trendingHashtags: [],
    recommendations: [],
  },
};

describe('calculateOverallScore', () => {
  it('should calculate weighted average correctly', () => {
    const result = calculateOverallScore(mockAnalyses);
    // (80*0.3 + 75*0.35 + 70*0.2 + 65*0.15) = 24 + 26.25 + 14 + 9.75 = 74
    expect(result.score).toBe(74);
  });

  it('should assign correct grade', () => {
    const result = calculateOverallScore(mockAnalyses);
    expect(result.grade).toBe('C');
  });

  it('should assign A grade for score >= 90', () => {
    const highScores = { ...mockAnalyses };
    highScores.title.score = 95;
    highScores.description.score = 95;
    highScores.tags.score = 95;
    highScores.hashtags.score = 95;
    const result = calculateOverallScore(highScores);
    expect(result.grade).toBe('A');
  });

  it('should determine status correctly', () => {
    const result = calculateOverallScore(mockAnalyses);
    expect(['good', 'excellent']).toContain(result.status);
  });

  it('should identify critical issues for low scores', () => {
    const lowScores: ComponentAnalyses = {
      ...mockAnalyses,
      title: { ...mockAnalyses.title, score: 30, length: 0 },
      description: { ...mockAnalyses.description, score: 20, length: 50 },
    };
    const result = calculateOverallScore(lowScores);
    expect(result.criticalIssues.length).toBeGreaterThan(0);
  });
});

describe('generatePrioritizedRecommendations', () => {
  it('should sort recommendations by priority', () => {
    const analyses: ComponentAnalyses = {
      ...mockAnalyses,
      title: {
        ...mockAnalyses.title,
        recommendations: [
          { id: '1', priority: 'low', category: 'title', issue: 'Low', suggestion: 'Fix', impact: 5 },
          { id: '2', priority: 'critical', category: 'title', issue: 'Critical', suggestion: 'Fix now', impact: 30 },
        ],
      },
    };
    
    const result = generatePrioritizedRecommendations(analyses);
    expect(result[0].priority).toBe('critical');
  });
});

describe('compareToBestPractices', () => {
  it('should compare all metrics', () => {
    const result = compareToBestPractices(mockAnalyses);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('category');
    expect(result[0]).toHaveProperty('current');
    expect(result[0]).toHaveProperty('bestPractice');
    expect(result[0]).toHaveProperty('status');
  });
});
