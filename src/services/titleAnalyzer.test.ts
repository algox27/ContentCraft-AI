import { describe, it, expect } from 'vitest';
import { analyzeTitle } from './titleAnalyzer';

describe('analyzeTitle', () => {
  it('should return high score for optimal title', () => {
    const result = analyzeTitle('10 Best SEO Tips for YouTube Success in 2024 [Complete Guide]');
    expect(result.score).toBeGreaterThan(80);
    expect(result.hasNumbers).toBe(true);
    expect(result.hasPowerWords).toBe(true);
  });

  it('should detect numbers in title', () => {
    const result = analyzeTitle('5 Ways to Improve Your Videos');
    expect(result.hasNumbers).toBe(true);
  });

  it('should detect power words', () => {
    const result = analyzeTitle('Ultimate Guide to Video Marketing');
    expect(result.hasPowerWords).toBe(true);
  });

  it('should return low score for empty title', () => {
    const result = analyzeTitle('');
    expect(result.score).toBeLessThan(20);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });

  it('should return low score for very short title', () => {
    const result = analyzeTitle('Short');
    expect(result.score).toBeLessThan(50);
    expect(result.length).toBe(5);
  });

  it('should detect keyword placement at beginning', () => {
    const result = analyzeTitle('Marketing Strategies for Small Business');
    expect(result.keywordPlacement).toBe('beginning');
  });

  it('should generate recommendations for missing elements', () => {
    const result = analyzeTitle('simple video');
    expect(result.recommendations.length).toBeGreaterThan(0);
    expect(result.recommendations.some(r => r.issue.includes('short'))).toBe(true);
  });

  it('should give high score for title with all elements', () => {
    const result = analyzeTitle('How to Master YouTube SEO: 10 Proven Tips [2024 Guide]');
    expect(result.score).toBeGreaterThan(75);
    expect(result.hasNumbers).toBe(true);
    expect(result.hasPowerWords).toBe(true);
    expect(result.length).toBeGreaterThan(40);
  });

  it('should handle title with optimal length', () => {
    const result = analyzeTitle('Complete Guide to YouTube SEO Optimization for Beginners');
    expect(result.length).toBeGreaterThanOrEqual(50);
    expect(result.length).toBeLessThanOrEqual(70);
  });

  it('should recommend improvements for title without power words', () => {
    const result = analyzeTitle('Video about cooking recipes for dinner tonight');
    const powerWordRec = result.recommendations.find(r => r.issue.includes('power words'));
    expect(powerWordRec).toBeDefined();
  });
});
