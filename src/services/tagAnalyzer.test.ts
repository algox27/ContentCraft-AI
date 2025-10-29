import { describe, it, expect } from 'vitest';
import { analyzeTags } from './tagAnalyzer';

describe('analyzeTags', () => {
  it('should return high score for optimal tags', () => {
    const tags = [
      'youtube seo',
      'video optimization',
      'tutorial',
      'guide',
      'marketing tips',
      'content creation',
      'beginner friendly',
      '2024',
      'seo',
      'youtube'
    ];
    const result = analyzeTags(tags);
    expect(result.score).toBeGreaterThan(70);
    expect(result.hasBroadKeywords).toBe(true);
    expect(result.hasSpecificKeywords).toBe(true);
  });

  it('should detect broad keywords', () => {
    const result = analyzeTags(['tutorial', 'guide', 'tips']);
    expect(result.hasBroadKeywords).toBe(true);
  });

  it('should detect specific keywords', () => {
    const result = analyzeTags(['youtube seo optimization', 'video marketing strategy']);
    expect(result.hasSpecificKeywords).toBe(true);
  });

  it('should return low score for no tags', () => {
    const result = analyzeTags([]);
    expect(result.score).toBeLessThan(60);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });

  it('should detect redundancy in tags', () => {
    const result = analyzeTags(['seo', 'seo tips', 'seo guide', 'seo tutorial']);
    expect(result.redundancyLevel).toBeGreaterThan(0);
  });

  it('should suggest additional tags', () => {
    const result = analyzeTags(['seo', 'marketing']);
    expect(result.suggestedTags.length).toBeGreaterThan(0);
  });

  it('should penalize too many tags', () => {
    const manyTags = Array(20).fill('tag');
    const result = analyzeTags(manyTags);
    expect(result.recommendations.some(r => r.issue.includes('many tags'))).toBe(true);
  });

  it('should calculate total characters correctly', () => {
    const result = analyzeTags(['abc', 'def', 'ghi']);
    expect(result.totalCharacters).toBe(9);
  });
});
