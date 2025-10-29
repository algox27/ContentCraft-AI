import type { ValidationResult } from '../types';

/**
 * Validates video title
 * Requirements: 1.1 - Title length must be between 1 and 100 characters
 */
export function validateTitle(title: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!title || title.trim().length === 0) {
    errors.push('Title is required');
  } else if (title.length > 100) {
    errors.push('Title must not exceed 100 characters');
  }

  if (title.length > 0 && title.length < 30) {
    warnings.push('Title is too short. Aim for 50-70 characters for better SEO');
  } else if (title.length > 70) {
    warnings.push('Title may be truncated in search results');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validates video description
 * Requirements: 2.1 - Description must not exceed 5000 characters
 */
export function validateDescription(description: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (description.length > 5000) {
    errors.push('Description must not exceed 5000 characters');
  }

  if (description.length > 0 && description.length < 200) {
    warnings.push('Description is too short. Aim for at least 200 characters for better SEO');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validates video tags
 * Requirements: 3.1 - Total tag character count must not exceed 500 characters
 */
export function validateTags(tags: string[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const totalCharacters = tags.join('').length;

  if (totalCharacters > 500) {
    errors.push('Total tag characters must not exceed 500');
  }

  if (tags.length === 0) {
    warnings.push('No tags provided. Add tags to improve discoverability');
  } else if (tags.length < 5) {
    warnings.push('Consider adding more tags. Aim for 8-12 tags for optimal SEO');
  } else if (tags.length > 15) {
    warnings.push('Too many tags may dilute relevance. Consider focusing on 8-12 key tags');
  }

  // Check for empty tags
  const emptyTags = tags.filter(tag => !tag || tag.trim().length === 0);
  if (emptyTags.length > 0) {
    errors.push('Tags cannot be empty');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validates hashtags
 * Requirements: 4.1 - Hashtag count must be between 1 and 15
 */
export function validateHashtags(hashtags: string[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (hashtags.length === 0) {
    warnings.push('No hashtags provided. Add 3-5 hashtags for better discoverability');
  } else if (hashtags.length > 15) {
    errors.push('Maximum 15 hashtags allowed');
  }

  if (hashtags.length > 0 && hashtags.length < 3) {
    warnings.push('Consider adding more hashtags. Aim for 3-5 hashtags');
  } else if (hashtags.length > 5 && hashtags.length <= 15) {
    warnings.push('Using many hashtags may reduce effectiveness. Consider focusing on 3-5 key hashtags');
  }

  // Check for invalid hashtag format
  hashtags.forEach((hashtag, index) => {
    if (!hashtag.startsWith('#')) {
      errors.push(`Hashtag ${index + 1} must start with #`);
    }
    if (hashtag.length === 1) {
      errors.push(`Hashtag ${index + 1} cannot be empty`);
    }
    if (hashtag.includes(' ')) {
      errors.push(`Hashtag ${index + 1} cannot contain spaces`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validates all metadata fields
 */
export function validateMetadata(
  title: string,
  description: string,
  tags: string[],
  hashtags: string[]
): {
  title: ValidationResult;
  description: ValidationResult;
  tags: ValidationResult;
  hashtags: ValidationResult;
  isValid: boolean;
} {
  const titleValidation = validateTitle(title);
  const descriptionValidation = validateDescription(description);
  const tagsValidation = validateTags(tags);
  const hashtagsValidation = validateHashtags(hashtags);

  return {
    title: titleValidation,
    description: descriptionValidation,
    tags: tagsValidation,
    hashtags: hashtagsValidation,
    isValid:
      titleValidation.isValid &&
      descriptionValidation.isValid &&
      tagsValidation.isValid &&
      hashtagsValidation.isValid,
  };
}
