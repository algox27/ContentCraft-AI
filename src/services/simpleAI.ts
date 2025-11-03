// Simple AI Service - Works in all browsers without Chrome AI APIs
// Provides intelligent content generation using rule-based algorithms

interface AIResponse {
  title: string;
  description: string;
}

// Advanced title templates with dynamic content
const titleTemplates = [
  // Tutorial formats
  "{topic} Tutorial - Complete Guide {year}",
  "How to {action} {topic} - Step by Step",
  "Master {topic} in {time} - {adjective} Guide",
  "{topic} for Beginners - Everything You Need",
  "Learn {topic} - {adjective} Tutorial {year}",
  
  // Engaging formats
  "{number} {topic} Tips That Actually Work",
  "The Ultimate {topic} Guide - {adjective} Results",
  "{topic} Secrets Nobody Tells You",
  "Why {topic} is {adjective} in {year}",
  "{adjective} {topic} Tricks You Must Know",
  
  // Question formats
  "What is {topic}? Complete Explanation",
  "Is {topic} Worth It? Honest Review",
  "How Does {topic} Work? Deep Dive",
  
  // Comparison formats
  "{topic} vs Alternatives - Which is Better?",
  "Best {topic} Methods Compared",
  
  // Time-sensitive
  "{topic} in {year} - What's New?",
  "Latest {topic} Updates You Need to Know"
];

const descriptionTemplates = [
  `Welcome to this comprehensive guide on {topic}! 

In this video, we'll cover everything you need to know about {topic_lower}. Whether you're a beginner or looking to advance your skills, this tutorial has something for everyone.

🎯 What You'll Learn:
• Understanding the basics of {topic_lower}
• Advanced techniques and best practices  
• Real-world examples and applications
• Tips and tricks from industry experts

📌 Timestamps:
0:00 - Introduction
2:30 - Getting Started
5:45 - Core Concepts
10:20 - Advanced Topics
15:00 - Practical Examples
20:00 - Conclusion

Don't forget to LIKE, SUBSCRIBE, and hit the BELL icon for more content!

#{hashtag} #Tutorial #Guide #HowTo #Learn #Tips #Tricks #{year}`,

  `🚀 Ready to master {topic}? This complete tutorial will take you from beginner to expert!

In today's video, I'll show you everything about {topic_lower} with step-by-step instructions and real examples.

✅ What's Covered:
• {topic} fundamentals
• Best practices and techniques
• Common mistakes to avoid
• Pro tips for better results

🔥 Why This Matters:
{topic} is essential for anyone looking to improve their skills in this area. This tutorial will save you hours of research!

⏰ Timestamps:
0:00 Intro
3:00 Basics
8:00 Advanced
15:00 Examples
22:00 Wrap-up

👍 Like if this helped you!
🔔 Subscribe for more tutorials!
💬 Comment your questions below!

#{hashtag} #Tutorial #{year} #StepByStep #Guide`,

  `Everything you need to know about {topic} in one complete video!

This {adjective_lower} tutorial covers all aspects of {topic_lower}, from basic concepts to advanced techniques. Perfect for beginners and experienced users alike.

📚 Course Outline:
1. Introduction to {topic_lower}
2. Setting up and getting started
3. Core features and functionality
4. Advanced tips and tricks
5. Real-world applications
6. Best practices and optimization

🎁 Bonus Content:
• Downloadable resources
• Practice exercises
• Community support

Join thousands of learners who have already mastered {topic_lower} with this tutorial!

LIKE 👍 | SUBSCRIBE 🔔 | SHARE 📤

#{hashtag} #Education #Tutorial #Learning #{year} #Skills`
];

const adjectives = [
  'Complete', 'Ultimate', 'Advanced', 'Professional', 'Expert', 'Comprehensive',
  'Detailed', 'In-Depth', 'Practical', 'Essential', 'Modern', 'Updated',
  'Beginner-Friendly', 'Step-by-Step', 'Easy', 'Quick', 'Effective', 'Proven'
];

const actions = [
  'master', 'learn', 'understand', 'use', 'implement', 'create', 'build',
  'optimize', 'improve', 'setup', 'configure', 'develop', 'design'
];

const timeframes = [
  '10 Minutes', '30 Minutes', '1 Hour', '24 Hours', '7 Days', '30 Days',
  'One Week', 'One Month', 'No Time', 'Minutes'
];

const numbers = ['5', '7', '10', '15', '20', '25', '50', '100'];

// Smart content generation
export async function generateTitleAndDescription(topic: string): Promise<AIResponse> {
  const cleanTopic = topic.trim();
  const topicLower = cleanTopic.toLowerCase();
  const hashtag = cleanTopic.replace(/\s+/g, '');
  const year = new Date().getFullYear().toString();
  
  // Select random templates
  const titleTemplate = titleTemplates[Math.floor(Math.random() * titleTemplates.length)];
  const descTemplate = descriptionTemplates[Math.floor(Math.random() * descriptionTemplates.length)];
  
  // Generate dynamic content
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const action = actions[Math.floor(Math.random() * actions.length)];
  const time = timeframes[Math.floor(Math.random() * timeframes.length)];
  const number = numbers[Math.floor(Math.random() * numbers.length)];
  
  // Replace placeholders in title
  let title = titleTemplate
    .replace(/{topic}/g, cleanTopic)
    .replace(/{topic_lower}/g, topicLower)
    .replace(/{adjective}/g, adjective)
    .replace(/{action}/g, action)
    .replace(/{time}/g, time)
    .replace(/{number}/g, number)
    .replace(/{year}/g, year);
  
  // Replace placeholders in description
  let description = descTemplate
    .replace(/{topic}/g, cleanTopic)
    .replace(/{topic_lower}/g, topicLower)
    .replace(/{adjective}/g, adjective)
    .replace(/{adjective_lower}/g, adjective.toLowerCase())
    .replace(/{action}/g, action)
    .replace(/{time}/g, time)
    .replace(/{number}/g, number)
    .replace(/{hashtag}/g, hashtag)
    .replace(/{year}/g, year);
  
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return { title, description };
}

// Smart text summarization
export async function summarizeText(text: string, length: 'short' | 'medium' = 'short'): Promise<string> {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const maxSentences = length === 'short' ? 2 : 4;
  
  // Score sentences by importance (keywords, length, position)
  const scoredSentences = sentences.map((sentence, index) => {
    let score = 0;
    
    // Position scoring (first and last sentences are important)
    if (index === 0) score += 3;
    if (index === sentences.length - 1) score += 2;
    
    // Length scoring (medium length sentences are better)
    const words = sentence.trim().split(/\s+/).length;
    if (words >= 10 && words <= 25) score += 2;
    
    // Keyword scoring
    const keywords = ['important', 'key', 'main', 'essential', 'crucial', 'significant'];
    keywords.forEach(keyword => {
      if (sentence.toLowerCase().includes(keyword)) score += 1;
    });
    
    return { sentence: sentence.trim(), score, index };
  });
  
  // Sort by score and take top sentences
  const topSentences = scoredSentences
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSentences)
    .sort((a, b) => a.index - b.index) // Maintain original order
    .map(item => item.sentence);
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return topSentences.join('. ') + '.';
}

// Smart text rewriting with different tones
export async function rewriteWithTone(text: string, tone: string): Promise<string> {
  const toneTransforms: Record<string, (text: string) => string> = {
    casual: (text) => {
      return text
        .replace(/\b(very|extremely|incredibly)\b/gi, 'super')
        .replace(/\b(excellent|outstanding)\b/gi, 'awesome')
        .replace(/\b(however|nevertheless)\b/gi, 'but')
        .replace(/\b(therefore|consequently)\b/gi, 'so')
        .replace(/\./g, '!')
        .replace(/!+/g, '!');
    },
    
    formal: (text) => {
      return text
        .replace(/\b(awesome|cool|great)\b/gi, 'excellent')
        .replace(/\b(super|really)\b/gi, 'very')
        .replace(/\b(but|so)\b/gi, 'however')
        .replace(/!/g, '.')
        .replace(/\b(can't|won't|don't)\b/gi, (match) => {
          const expansions: Record<string, string> = {
            "can't": "cannot",
            "won't": "will not", 
            "don't": "do not"
          };
          return expansions[match.toLowerCase()] || match;
        });
    },
    
    funny: (text) => {
      const funnyPhrases = [
        'LOL', '😂', 'No way!', 'Seriously?', 'Plot twist:', 
        'Spoiler alert:', 'Fun fact:', 'Pro tip:'
      ];
      const randomPhrase = funnyPhrases[Math.floor(Math.random() * funnyPhrases.length)];
      return `${randomPhrase} ${text}`.replace(/\./g, '! 😄');
    },
    
    clickbait: (text) => {
      const clickbaitWords = ['SHOCKING', 'AMAZING', 'INCREDIBLE', 'UNBELIEVABLE', 'SECRET'];
      const word = clickbaitWords[Math.floor(Math.random() * clickbaitWords.length)];
      return `${word}: ${text}`.replace(/\./g, '! You Won\'t Believe What Happens Next!');
    }
  };
  
  const transform = toneTransforms[tone.toLowerCase()] || ((t) => t);
  
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return transform(text);
}

// Smart translation (basic word replacement + structure)
export async function translateText(text: string, targetLanguage: string): Promise<string> {
  const translations: Record<string, Record<string, string>> = {
    hi: {
      'Hello': 'नमस्ते', 'Thank you': 'धन्यवाद', 'Subscribe': 'सब्सक्राइब करें',
      'Like': 'लाइक करें', 'Share': 'शेयर करें', 'Comment': 'कमेंट करें',
      'Tutorial': 'ट्यूटोरियल', 'Guide': 'गाइड', 'Learn': 'सीखें'
    },
    es: {
      'Hello': 'Hola', 'Thank you': 'Gracias', 'Subscribe': 'Suscríbete',
      'Like': 'Me gusta', 'Share': 'Compartir', 'Comment': 'Comentar',
      'Tutorial': 'Tutorial', 'Guide': 'Guía', 'Learn': 'Aprender'
    },
    fr: {
      'Hello': 'Bonjour', 'Thank you': 'Merci', 'Subscribe': 'S\'abonner',
      'Like': 'J\'aime', 'Share': 'Partager', 'Comment': 'Commenter',
      'Tutorial': 'Tutoriel', 'Guide': 'Guide', 'Learn': 'Apprendre'
    },
    de: {
      'Hello': 'Hallo', 'Thank you': 'Danke', 'Subscribe': 'Abonnieren',
      'Like': 'Gefällt mir', 'Share': 'Teilen', 'Comment': 'Kommentieren',
      'Tutorial': 'Tutorial', 'Guide': 'Anleitung', 'Learn': 'Lernen'
    },
    ja: {
      'Hello': 'こんにちは', 'Thank you': 'ありがとう', 'Subscribe': '登録',
      'Like': 'いいね', 'Share': 'シェア', 'Comment': 'コメント',
      'Tutorial': 'チュートリアル', 'Guide': 'ガイド', 'Learn': '学ぶ'
    },
    ko: {
      'Hello': '안녕하세요', 'Thank you': '감사합니다', 'Subscribe': '구독',
      'Like': '좋아요', 'Share': '공유', 'Comment': '댓글',
      'Tutorial': '튜토리얼', 'Guide': '가이드', 'Learn': '배우기'
    }
  };

  let result = text;
  const langTranslations = translations[targetLanguage] || {};
  
  // Replace common words
  Object.entries(langTranslations).forEach(([en, translated]) => {
    const regex = new RegExp(`\\b${en}\\b`, 'gi');
    result = result.replace(regex, translated);
  });
  
  // Add language prefix if no translations found
  if (result === text) {
    const langNames: Record<string, string> = {
      hi: 'हिंदी', es: 'Español', fr: 'Français', 
      de: 'Deutsch', ja: '日本語', ko: '한국어'
    };
    result = `[${langNames[targetLanguage] || targetLanguage.toUpperCase()}] ${text}`;
  }
  
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return result;
}

// Smart proofreading
export async function proofreadText(text: string): Promise<string> {
  let result = text;
  
  // Fix common grammar issues
  const corrections: Record<string, string> = {
    // Common typos
    'teh': 'the', 'adn': 'and', 'taht': 'that', 'thier': 'their',
    'recieve': 'receive', 'seperate': 'separate', 'definately': 'definitely',
    
    // Grammar fixes
    'alot': 'a lot', 'cant': 'can\'t', 'wont': 'won\'t', 'dont': 'don\'t',
    'its a': 'it\'s a', 'your welcome': 'you\'re welcome',
    
    // Capitalization
    'youtube': 'YouTube', 'instagram': 'Instagram', 'facebook': 'Facebook'
  };
  
  // Apply corrections
  Object.entries(corrections).forEach(([wrong, correct]) => {
    const regex = new RegExp(`\\b${wrong}\\b`, 'gi');
    result = result.replace(regex, correct);
  });
  
  // Fix spacing
  result = result
    .replace(/\s+/g, ' ') // Multiple spaces
    .replace(/\s+([.!?])/g, '$1') // Space before punctuation
    .replace(/([.!?])([A-Z])/g, '$1 $2') // Missing space after punctuation
    .trim();
  
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return result;
}

// Advanced prompt-based generation
export async function generateWithPromptAPI(prompt: string): Promise<string> {
  // Analyze prompt and generate contextual response
  const promptLower = prompt.toLowerCase();
  
  if (promptLower.includes('hashtag')) {
    const topic = prompt.replace(/.*hashtag.*for\s+/i, '').replace(/[.!?]/g, '');
    return generateHashtags(topic);
  }
  
  if (promptLower.includes('title')) {
    const topic = prompt.replace(/.*title.*for\s+/i, '').replace(/[.!?]/g, '');
    const result = await generateTitleAndDescription(topic);
    return result.title;
  }
  
  if (promptLower.includes('description')) {
    const topic = prompt.replace(/.*description.*for\s+/i, '').replace(/[.!?]/g, '');
    const result = await generateTitleAndDescription(topic);
    return result.description;
  }
  
  // Default creative response
  const responses = [
    `Here's a creative response to your prompt: "${prompt}"`,
    `Based on your request, I suggest focusing on the key elements you mentioned.`,
    `That's an interesting prompt! Consider exploring different angles and perspectives.`,
    `Great idea! You could expand on this by adding more specific details and examples.`
  ];
  
  await new Promise(resolve => setTimeout(resolve, 900));
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Helper function for hashtag generation
function generateHashtags(topic: string): string {
  const baseTopic = topic.replace(/\s+/g, '').toLowerCase();
  const hashtags = [
    `#${baseTopic}`,
    `#${baseTopic}tips`,
    `#${baseTopic}tutorial`,
    `#${baseTopic}guide`,
    `#learn${baseTopic}`,
    `#${baseTopic}2025`,
    '#tutorial',
    '#guide',
    '#howto',
    '#tips',
    '#learn',
    '#education'
  ];
  
  return hashtags.slice(0, 8).join(' ');
}

export default {
  generateTitleAndDescription,
  summarizeText,
  rewriteWithTone,
  translateText,
  proofreadText,
  generateWithPromptAPI
};