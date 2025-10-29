import type { KeywordSuggestion, CategorizedKeywords } from '../types';

// Stop words to exclude
const STOP_WORDS = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
    'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should',
    'could', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those',
]);

// Keyword database by category
const KEYWORD_DATABASE: Record<string, KeywordSuggestion[]> = {
    tech: [
        { keyword: 'tutorial', searchVolume: 'high', competition: 'high', category: 'primary', relevanceScore: 90 },
        { keyword: 'how to', searchVolume: 'high', competition: 'high', category: 'primary', relevanceScore: 95 },
        { keyword: 'programming', searchVolume: 'high', competition: 'medium', category: 'primary', relevanceScore: 85 },
        { keyword: 'coding tutorial', searchVolume: 'medium', competition: 'medium', category: 'secondary', relevanceScore: 80 },
        { keyword: 'web development', searchVolume: 'high', competition: 'high', category: 'primary', relevanceScore: 88 },
    ],
    gaming: [
        { keyword: 'gameplay', searchVolume: 'high', competition: 'high', category: 'primary', relevanceScore: 92 },
        { keyword: 'walkthrough', searchVolume: 'high', competition: 'medium', category: 'primary', relevanceScore: 87 },
        { keyword: 'gaming tips', searchVolume: 'medium', competition: 'medium', category: 'secondary', relevanceScore: 75 },
        { keyword: 'lets play', searchVolume: 'high', competition: 'high', category: 'primary', relevanceScore: 90 },
    ],
    education: [
        { keyword: 'learn', searchVolume: 'high', competition: 'high', category: 'primary', relevanceScore: 93 },
        { keyword: 'course', searchVolume: 'high', competition: 'high', category: 'primary', relevanceScore: 88 },
        { keyword: 'lesson', searchVolume: 'medium', competition: 'medium', category: 'secondary', relevanceScore: 82 },
        { keyword: 'explained', searchVolume: 'high', competition: 'medium', category: 'primary', relevanceScore: 86 },
    ],
    general: [
        { keyword: 'tips', searchVolume: 'high', competition: 'high', category: 'primary', relevanceScore: 85 },
        { keyword: 'guide', searchVolume: 'high', competition: 'high', category: 'primary', relevanceScore: 90 },
        { keyword: 'best', searchVolume: 'high', competition: 'high', category: 'primary', relevanceScore: 88 },
        { keyword: 'review', searchVolume: 'high', competition: 'medium', category: 'primary', relevanceScore: 83 },
    ],
};

/**
 * Extract keywords from text
 * Requirements: 6.1
 */
export function extractKeywords(text: string): string[] {
    const words = text
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 3 && !STOP_WORDS.has(word));

    // Count frequencies
    const wordCount: Record<string, number> = {};
    words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });

    // Sort by frequency and return top keywords
    return Object.entries(wordCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([word]) => word);
}

/**
 * Suggest keywords based on topic
 * Requirements: 6.2, 6.3, 6.4
 */
export function suggestKeywords(topic: string): KeywordSuggestion[] {
    const lowerTopic = topic.toLowerCase();
    const suggestions: KeywordSuggestion[] = [];

    // Match topic to category
    if (lowerTopic.includes('tech') || lowerTopic.includes('programming') || lowerTopic.includes('code')) {
        suggestions.push(...KEYWORD_DATABASE.tech);
    }
    if (lowerTopic.includes('game') || lowerTopic.includes('gaming')) {
        suggestions.push(...KEYWORD_DATABASE.gaming);
    }
    if (lowerTopic.includes('learn') || lowerTopic.includes('education') || lowerTopic.includes('tutorial')) {
        suggestions.push(...KEYWORD_DATABASE.education);
    }

    // Always add general keywords
    suggestions.push(...KEYWORD_DATABASE.general);

    // Remove duplicates and sort by relevance
    const uniqueSuggestions = Array.from(
        new Map(suggestions.map(s => [s.keyword, s])).values()
    );

    return uniqueSuggestions
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, 15);
}

/**
 * Categorize keywords into primary, secondary, and long-tail
 * Requirements: 6.3
 */
export function categorizeKeywords(keywords: string[]): CategorizedKeywords {
    const primary: string[] = [];
    const secondary: string[] = [];
    const longTail: string[] = [];

    keywords.forEach(keyword => {
        const wordCount = keyword.split(/\s+/).length;

        if (wordCount === 1 && keyword.length <= 8) {
            primary.push(keyword);
        } else if (wordCount === 2 || (wordCount === 1 && keyword.length > 8)) {
            secondary.push(keyword);
        } else {
            longTail.push(keyword);
        }
    });

    return { primary, secondary, longTail };
}
