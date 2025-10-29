import { describe, it, expect } from 'vitest';
import { analyzeDescription } from './descriptionAnalyzer';

describe('analyzeDescription', () => {
  it('should return high score for optimal description', () => {
    const desc = `Subscribe now for more amazing content! 

In this video, we'll explore the best SEO strategies for YouTube success. Learn how to optimize your videos for maximum visibility and engagement.

Timestamps:
0:00 Introduction
2:30 Keyword Research
5:45 Title Optimization
8:20 Description Tips

Visit our website: https://example.com
Follow us on social media for daily tips and tricks.`;
    
    const result = analyzeDescription(desc);
    expect(result.score).toBeGreaterThan(70);
    expect(result.hasCallToAction).toBe(true);
    expect(result.hasTimestamps).toBe(true);
    expect(result.hasLinks).toBe(true);
  });

  it('should detect call-to-action in first 150 characters', () => {
    const result = analyzeDescription('Subscribe to our channel! This video covers important topics.');
    expect(result.hasCallToAction).toBe(true);
  });

  it('should not detect CTA if not in first 150 characters', () => {
    const longIntro = 'a'.repeat(160) + ' Subscribe now!';
    const result = analyzeDescription(longIntro);
    expect(result.hasCallToAction).toBe(false);
  });

  it('should detect timestamps', () => {
    const result = analyzeDescription('Video chapters: 0:00 Intro, 5:30 Main content, 10:45 Conclusion');
    expect(result.hasTimestamps).toBe(true);
  });

  it('should detect links', () => {
    const result = analyzeDescription('Check out https://example.com for more info');
    expect(result.hasLinks).toBe(true);
  });

  it('should detect www links', () => {
    const result = analyzeDescription('Visit www.example.com for details');
    expect(result.hasLinks).toBe(true);
  });

  it('should return low score for empty description', () => {
    const result = analyzeDescription('');
    expect(result.score).toBeLessThan(20);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });

  it('should return low score for very short description', () => {
    const result = analyzeDescription('Short description');
    expect(result.score).toBeLessThan(50);
    expect(result.length).toBeLessThan(200);
  });

  it('should calculate keyword density', () => {
    const result = analyzeDescription('SEO tips for YouTube. Best SEO practices. Learn SEO optimization.');
    expect(result.keywordDensity).toBeGreaterThan(0);
  });

  it('should generate recommendations for missing elements', () => {
    const result = analyzeDescription('Simple short text');
    expect(result.recommendations.length).toBeGreaterThan(0);
    expect(result.recommendations.some(r => r.issue.includes('short'))).toBe(true);
  });

  it('should recommend adding CTA', () => {
    const result = analyzeDescription('This is a video about cooking recipes. ' + 'a'.repeat(200));
    const ctaRec = result.recommendations.find(r => r.issue.includes('call-to-action'));
    expect(ctaRec).toBeDefined();
  });

  it('should handle long descriptions', () => {
    const longDesc = 'a'.repeat(3000);
    const result = analyzeDescription(longDesc);
    expect(result.length).toBe(3000);
    expect(result.score).toBeGreaterThan(0);
  });
});
