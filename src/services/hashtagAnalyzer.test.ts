import { describe, it, expect } from 'vitest';
import { analyzeHashtags } from './hashtagAnalyzer';

describe('analyzeHashtags', () => {
  it('should return high score for optimal hashtags', () => {
    const result = analyzeHashtags(['#youtube', '#seo', '#tutorial', '#videomarketing']);
    expect(result.score).toBeGreaterThan(60);
  });

  it('should return low score for no hashtags', () => {
    const result = analyzeHashtags([]);
    expect(result.score).toBeLessThan(20);
  });

  it('should detect popular hashtags', () => {
    const result = analyzeHashtags(['#youtube', '#viral', '#trending']);
    expect(result.popularityScore).toBeGreaterThan(30);
  });

  it('should suggest trending hashtags', () => {
    const result = analyzeHashtags(['#seo']);
    expect(result.trendingHashtags.length).toBeGreaterThan(0);
  });

  it('should penalize too many hashtags', () => {
    const manyHashtags = Array(12).fill('#tag').map((t, i) => `${t}${i}`);
    const result = analyzeHashtags(manyHashtags);
    expect(result.recommendations.some(r => r.issue.includes('many'))).toBe(true);
  });
});
