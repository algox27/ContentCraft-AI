// AI-powered suggestions based on title and hashtags

interface SuggestionResult {
  tags: string[];
  description: string;
  hashtags: string[];
}

// Common keywords database for different niches
const nicheKeywords: Record<string, string[]> = {
  tech: ['tutorial', 'guide', 'how to', 'review', 'tips', 'tricks', 'coding', 'programming', 'development', 'software'],
  gaming: ['gameplay', 'walkthrough', 'lets play', 'gaming', 'stream', 'highlights', 'montage', 'tips', 'guide'],
  vlog: ['vlog', 'daily', 'lifestyle', 'day in life', 'routine', 'travel', 'adventure', 'experience'],
  education: ['learn', 'tutorial', 'course', 'lesson', 'education', 'study', 'explained', 'guide', 'tips'],
  entertainment: ['funny', 'comedy', 'entertainment', 'fun', 'viral', 'trending', 'reaction', 'challenge'],
  music: ['music', 'song', 'cover', 'remix', 'beat', 'instrumental', 'lyrics', 'audio', 'sound'],
  fitness: ['workout', 'fitness', 'exercise', 'training', 'gym', 'health', 'diet', 'nutrition', 'bodybuilding'],
  cooking: ['recipe', 'cooking', 'food', 'kitchen', 'chef', 'meal', 'dish', 'cuisine', 'baking'],
};

// Popular hashtags by category
const popularHashtags: Record<string, string[]> = {
  tech: ['#Tech', '#Technology', '#Coding', '#Programming', '#Developer', '#Software', '#Tutorial'],
  gaming: ['#Gaming', '#Gamer', '#Gameplay', '#LetsPlay', '#GameReview', '#Streaming'],
  vlog: ['#Vlog', '#Vlogger', '#DailyVlog', '#Lifestyle', '#Travel', '#Adventure'],
  education: ['#Education', '#Learning', '#Tutorial', '#Study', '#Knowledge', '#Tips'],
  entertainment: ['#Entertainment', '#Funny', '#Comedy', '#Viral', '#Trending', '#Fun'],
  music: ['#Music', '#Song', '#Cover', '#Remix', '#NewMusic', '#MusicVideo'],
  fitness: ['#Fitness', '#Workout', '#Gym', '#Health', '#FitnessMotivation', '#Training'],
  cooking: ['#Cooking', '#Recipe', '#Food', '#Foodie', '#Chef', '#Delicious'],
};

function detectNiche(text: string): string {
  const lowerText = text.toLowerCase();
  let maxScore = 0;
  let detectedNiche = 'general';

  for (const [niche, keywords] of Object.entries(nicheKeywords)) {
    const score = keywords.filter(keyword => lowerText.includes(keyword)).length;
    if (score > maxScore) {
      maxScore = score;
      detectedNiche = niche;
    }
  }

  return detectedNiche;
}

function extractKeywords(text: string): string[] {
  // Remove special characters and split into words
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3);

  // Remove common stop words
  const stopWords = ['this', 'that', 'with', 'from', 'have', 'been', 'will', 'your', 'their', 'what', 'when', 'where', 'which', 'about'];
  return words.filter(word => !stopWords.includes(word));
}

export function generateSuggestions(input: string, _type: 'title' | 'hashtag'): SuggestionResult {
  const niche = detectNiche(input);
  const keywords = extractKeywords(input);

  // Generate tags
  const suggestedTags: string[] = [];
  
  // Add niche-specific keywords
  if (nicheKeywords[niche]) {
    suggestedTags.push(...nicheKeywords[niche].slice(0, 5));
  }

  // Add extracted keywords
  suggestedTags.push(...keywords.slice(0, 5));

  // Remove duplicates and limit to 10
  const uniqueTags = [...new Set(suggestedTags)].slice(0, 10);

  // Generate description
  const description = generateDescription(input, niche, keywords);

  // Generate hashtags
  const suggestedHashtags = popularHashtags[niche]?.slice(0, 5) || ['#YouTube', '#Video', '#Content', '#Creator', '#Viral'];

  return {
    tags: uniqueTags,
    description,
    hashtags: suggestedHashtags,
  };
}

function generateDescription(input: string, niche: string, keywords: string[]): string {
  const templates = [
    `Welcome to this amazing video about ${input}! In this video, we'll explore ${keywords.slice(0, 3).join(', ')} and much more. Don't forget to like, subscribe, and hit the bell icon for more content!`,
    `Hey everyone! Today we're diving into ${input}. We'll cover ${keywords.slice(0, 3).join(', ')} in detail. Make sure to watch till the end for some bonus tips!`,
    `In this video, you'll learn everything about ${input}. We'll discuss ${keywords.slice(0, 3).join(', ')} and provide practical examples. Subscribe for more ${niche} content!`,
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}

// Quick suggestions based on trending topics
export function getQuickSuggestions(category: string): SuggestionResult {
  const niche = category.toLowerCase();
  
  return {
    tags: nicheKeywords[niche]?.slice(0, 8) || ['video', 'content', 'youtube', 'creator'],
    description: `Check out this amazing ${category} content! Don't forget to like and subscribe for more!`,
    hashtags: popularHashtags[niche]?.slice(0, 5) || ['#YouTube', '#Video', '#Content'],
  };
}
