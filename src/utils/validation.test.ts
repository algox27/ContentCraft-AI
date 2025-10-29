import { describe, it, expect } from 'vitest';
import {
  validateTitle,
  validateDescription,
  validateTags,
  validateHashtags,
  validateMetadata,
} from './validation';

describe('validateTitle', () => {
  it('should pass for valid title', () => {
    const result = validateTitle('How to Build a YouTube SEO Tool in 2024');
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should fail for empty title', () => {
    const result = validateTitle('');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Title is required');
  });

  it('should fail for title exceeding 100 characters', () => {
    const longTitle = 'a'.repeat(101);
    const result = validateTitle(longTitle);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Title must not exceed 100 characters');
  });

  it('should warn for short title', () => {
    const result = validateTitle('Short');
    expect(result.isValid).toBe(true);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('too short');
  });

  it('should warn for long title', () => {
    const result = validateTitle('a'.repeat(75));
    expect(result.isValid).toBe(true);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('truncated');
  });
});

describe('validateDescription', () => {
  it('should pass for valid description', () => {
    const result = validateDescription('This is a valid description with enough content.');
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should fail for description exceeding 5000 characters', () => {
    const longDesc = 'a'.repeat(5001);
    const result = validateDescription(longDesc);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Description must not exceed 5000 characters');
  });

  it('should warn for short description', () => {
    const result = validateDescription('Short desc');
    expect(result.isValid).toBe(true);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('too short');
  });

  it('should pass for empty description', () => {
    const result = validateDescription('');
    expect(result.isValid).toBe(true);
  });
});

describe('validateTags', () => {
  it('should pass for valid tags', () => {
    const result = validateTags(['seo', 'youtube', 'tutorial', 'marketing']);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should fail for tags exceeding 500 total characters', () => {
    const longTags = Array(50).fill('a'.repeat(15));
    const result = validateTags(longTags);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Total tag characters must not exceed 500');
  });

  it('should warn for no tags', () => {
    const result = validateTags([]);
    expect(result.isValid).toBe(true);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('No tags provided');
  });

  it('should warn for too few tags', () => {
    const result = validateTags(['tag1', 'tag2']);
    expect(result.isValid).toBe(true);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('more tags');
  });

  it('should warn for too many tags', () => {
    const result = validateTags(Array(20).fill('tag'));
    expect(result.isValid).toBe(true);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('Too many tags');
  });

  it('should fail for empty tag strings', () => {
    const result = validateTags(['tag1', '', 'tag3']);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Tags cannot be empty');
  });
});

describe('validateHashtags', () => {
  it('should pass for valid hashtags', () => {
    const result = validateHashtags(['#seo', '#youtube', '#tutorial']);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should fail for more than 15 hashtags', () => {
    const manyHashtags = Array(16).fill('#tag');
    const result = validateHashtags(manyHashtags);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Maximum 15 hashtags allowed');
  });

  it('should warn for no hashtags', () => {
    const result = validateHashtags([]);
    expect(result.isValid).toBe(true);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('No hashtags provided');
  });

  it('should fail for hashtags without # symbol', () => {
    const result = validateHashtags(['seo', '#youtube']);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.includes('must start with #'))).toBe(true);
  });

  it('should fail for empty hashtags', () => {
    const result = validateHashtags(['#']);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.includes('cannot be empty'))).toBe(true);
  });

  it('should fail for hashtags with spaces', () => {
    const result = validateHashtags(['#seo tool']);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.includes('cannot contain spaces'))).toBe(true);
  });

  it('should warn for too few hashtags', () => {
    const result = validateHashtags(['#seo']);
    expect(result.isValid).toBe(true);
    expect(result.warnings.length).toBeGreaterThan(0);
  });
});

describe('validateMetadata', () => {
  it('should validate all fields correctly', () => {
    const result = validateMetadata(
      'Valid Title for YouTube Video',
      'This is a valid description with enough content to pass validation.',
      ['seo', 'youtube', 'tutorial'],
      ['#seo', '#youtube', '#tutorial']
    );

    expect(result.isValid).toBe(true);
    expect(result.title.isValid).toBe(true);
    expect(result.description.isValid).toBe(true);
    expect(result.tags.isValid).toBe(true);
    expect(result.hashtags.isValid).toBe(true);
  });

  it('should return false if any field is invalid', () => {
    const result = validateMetadata(
      '', // Invalid title
      'Valid description',
      ['tag1', 'tag2'],
      ['#hashtag']
    );

    expect(result.isValid).toBe(false);
    expect(result.title.isValid).toBe(false);
  });

  it('should collect all validation results', () => {
    const result = validateMetadata(
      'a'.repeat(101), // Too long
      'a'.repeat(5001), // Too long
      Array(50).fill('a'.repeat(15)), // Too many characters
      Array(20).fill('#tag') // Too many hashtags
    );

    expect(result.isValid).toBe(false);
    expect(result.title.errors.length).toBeGreaterThan(0);
    expect(result.description.errors.length).toBeGreaterThan(0);
    expect(result.tags.errors.length).toBeGreaterThan(0);
    expect(result.hashtags.errors.length).toBeGreaterThan(0);
  });
});
