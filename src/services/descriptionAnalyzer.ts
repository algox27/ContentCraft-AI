import type { DescriptionAnalysis } from '../types';

// Call-to-action phrases
const CTA_PHRASES = [
    'subscribe', 'like', 'comment', 'share', 'click', 'watch', 'check out',
    'visit', 'download', 'get', 'join', 'follow', 'learn more', 'sign up',
    'buy', 'shop', 'try', 'start', 'discover', 'explore', 'find out',
];

/**
 * Analyzes video description and provides SEO score
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5
 */
export function analyzeDescription(description: string): DescriptionAnalysis {
    const length = description.length;

    // Check for call-to-action in first 150 characters (Requirements: 2.3)
    const first150 = description.substring(0, 150).toLowerCase();
    const hasCallToAction = CTA_PHRASES.some(phrase => first150.includes(phrase));

    // Check for timestamps (Requirements: 2.4)
    const hasTimestamps = /\d{1,2}:\d{2}/.test(description);

    // Check for links (Requirements: 2.4)
    const hasLinks = /https?:\/\//.test(description) || /www\./.test(description);

    // Calculate keyword density (Requirements: 2.2)
    const keywordDensity = calculateKeywordDensity(description);

    // Calculate readability score (Requirements: 2.5)
    const readabilityScore = calculateReadabilityScore(description);

    // Calculate overall score
    const lengthScore = calculateLengthScore(length);
    const ctaScore = hasCallToAction ? 20 : 0;
    const timestampScore = hasTimestamps ? 15 : 0;
    const linkScore = hasLinks ? 10 : 0;
    const keywordScore = calculateKeywordScore(keywordDensity);
    const readabilityScorePoints = readabilityScore * 0.15;

    const score = Math.min(100, lengthScore + ctaScore + timestampScore + linkScore + keywordScore + readabilityScorePoints);

    const recommendations = generateDescriptionRecommendations(
        length,
        hasCallToAction,
        hasTimestamps,
        hasLinks,
        keywordDensity,
        readabilityScore
    );

    return {
        score: Math.round(score),
        length,
        keywordDensity,
        hasCallToAction,
        hasTimestamps,
        hasLinks,
        readabilityScore: Math.round(readabilityScore),
        recommendations,
    };
}

/**
 * Calculate score based on description length
 * Optimal: 200+ characters
 */
function calculateLengthScore(length: number): number {
    if (length === 0) return 0;
    if (length < 100) return 10;
    if (length >= 200 && length <= 1000) return 30; // Optimal range
    if (length >= 100 && length < 200) return 20;
    if (length > 1000 && length <= 3000) return 25;
    if (length > 3000) return 20;
    return 10;
}

/**
 * Calculate keyword density
 * Simple implementation - counts repeated words
 */
function calculateKeywordDensity(description: string): number {
    if (description.length === 0) return 0;

    const words = description.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 3); // Only count words longer than 3 chars

    if (words.length === 0) return 0;

    // Count word frequencies
    const wordCount: Record<string, number> = {};
    words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });

    // Find most common word
    const maxCount = Math.max(...Object.values(wordCount));
    const density = (maxCount / words.length) * 100;

    return Math.min(density, 10); // Cap at 10%
}

/**
 * Calculate keyword score based on density
 * Optimal: 1-3%
 */
function calculateKeywordScore(density: number): number {
    if (density >= 1 && density <= 3) return 20;
    if (density >= 0.5 && density < 1) return 15;
    if (density > 3 && density <= 5) return 15;
    if (density > 5) return 5; // Keyword stuffing penalty
    return 10;
}

/**
 * Calculate readability score (simplified Flesch Reading Ease)
 * Returns score 0-100 (higher is more readable)
 */
function calculateReadabilityScore(description: string): number {
    if (description.length === 0) return 0;

    const sentences = description.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = description.split(/\s+/).filter(w => w.length > 0);
    const syllables = words.reduce((count, word) => count + countSyllables(word), 0);

    if (sentences.length === 0 || words.length === 0) return 50;

    const avgWordsPerSentence = words.length / sentences.length;
    const avgSyllablesPerWord = syllables / words.length;

    // Simplified Flesch Reading Ease formula
    const score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);

    // Normalize to 0-100
    return Math.max(0, Math.min(100, score));
}

/**
 * Count syllables in a word (simplified)
 */
function countSyllables(word: string): number {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;

    const vowels = 'aeiouy';
    let count = 0;
    let previousWasVowel = false;

    for (let i = 0; i < word.length; i++) {
        const isVowel = vowels.includes(word[i]);
        if (isVowel && !previousWasVowel) {
            count++;
        }
        previousWasVowel = isVowel;
    }

    // Adjust for silent e
    if (word.endsWith('e')) {
        count--;
    }

    return Math.max(1, count);
}

/**
 * Generate recommendations for description improvement
 */
function generateDescriptionRecommendations(
    length: number,
    hasCallToAction: boolean,
    hasTimestamps: boolean,
    hasLinks: boolean,
    keywordDensity: number,
    readabilityScore: number
): Array<{
    id: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
    category: 'description';
    issue: string;
    suggestion: string;
    impact: number;
}> {
    const recommendations = [];
    let idCounter = 1;

    // Length recommendations
    if (length === 0) {
        recommendations.push({
            id: `desc-${idCounter++}`,
            priority: 'critical' as const,
            category: 'description' as const,
            issue: 'Description is empty',
            suggestion: 'Add a detailed description (at least 200 characters) explaining your video content',
            impact: 30,
        });
    } else if (length < 200) {
        recommendations.push({
            id: `desc-${idCounter++}`,
            priority: 'high' as const,
            category: 'description' as const,
            issue: 'Description is too short',
            suggestion: 'Expand your description to at least 200 characters for better SEO',
            impact: 25,
        });
    }

    // Call-to-action recommendation
    if (!hasCallToAction) {
        recommendations.push({
            id: `desc-${idCounter++}`,
            priority: 'high' as const,
            category: 'description' as const,
            issue: 'No call-to-action in first 150 characters',
            suggestion: 'Add a CTA like "Subscribe for more" or "Click the link below" at the beginning',
            impact: 20,
        });
    }

    // Timestamps recommendation
    if (!hasTimestamps && length > 200) {
        recommendations.push({
            id: `desc-${idCounter++}`,
            priority: 'medium' as const,
            category: 'description' as const,
            issue: 'No timestamps found',
            suggestion: 'Add timestamps (e.g., 0:00 Intro, 2:30 Main Topic) to improve user experience',
            impact: 15,
        });
    }

    // Links recommendation
    if (!hasLinks) {
        recommendations.push({
            id: `desc-${idCounter++}`,
            priority: 'medium' as const,
            category: 'description' as const,
            issue: 'No links detected',
            suggestion: 'Add relevant links (social media, website, resources) to increase engagement',
            impact: 10,
        });
    }

    // Keyword density recommendations
    if (keywordDensity < 0.5) {
        recommendations.push({
            id: `desc-${idCounter++}`,
            priority: 'medium' as const,
            category: 'description' as const,
            issue: 'Low keyword density',
            suggestion: 'Include your main keywords 2-3 times naturally throughout the description',
            impact: 15,
        });
    } else if (keywordDensity > 5) {
        recommendations.push({
            id: `desc-${idCounter++}`,
            priority: 'high' as const,
            category: 'description' as const,
            issue: 'Keyword density too high (possible keyword stuffing)',
            suggestion: 'Reduce keyword repetition to avoid penalties. Aim for 1-3% density',
            impact: 20,
        });
    }

    // Readability recommendations
    if (readabilityScore < 50) {
        recommendations.push({
            id: `desc-${idCounter++}`,
            priority: 'low' as const,
            category: 'description' as const,
            issue: 'Description may be difficult to read',
            suggestion: 'Use shorter sentences and simpler words to improve readability',
            impact: 10,
        });
    }

    return recommendations;
}
