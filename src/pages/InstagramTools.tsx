import { useState } from 'react';
import {
    trackInstagramCaptionGeneration,
    trackInstagramCaptionExport,
    trackInstagramHashtagSearch,
    trackInstagramHashtagExport,
    trackFavoriteSaved,
    trackCopyAction,
} from '../utils/analytics';

interface InstagramToolsProps {
    onBack?: () => void;
}

interface HashtagData {
    tag: string;
    category: 'trending' | 'popular' | 'niche';
    posts: string;
}

export default function InstagramTools({ onBack }: InstagramToolsProps) {
    const [activeTab, setActiveTab] = useState<'caption' | 'hashtags'>('caption');

    // Caption Generator State
    const [captionTopic, setCaptionTopic] = useState('');
    const [captionStyle, setCaptionStyle] = useState<'casual' | 'professional' | 'funny' | 'inspirational'>('casual');
    const [generatedCaption, setGeneratedCaption] = useState('');
    const [captionHashtags, setCaptionHashtags] = useState<string[]>([]);
    const [captionVariations, setCaptionVariations] = useState<string[]>([]);
    const [favorites, setFavorites] = useState<{ type: string; content: string; timestamp: Date }[]>([]);
    const [showFavorites, setShowFavorites] = useState(false);
    const [showBestTimes, setShowBestTimes] = useState(false);
    const [selectedNiche, setSelectedNiche] = useState<string>('general');

    // Hashtag Research State
    const [hashtagSearch, setHashtagSearch] = useState('');
    const [hashtagResults, setHashtagResults] = useState<HashtagData[]>([]);
    const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);

    // Character counter for caption
    const getCaptionCharCount = () => {
        return generatedCaption.length;
    };

    const getCharCountColor = () => {
        const count = getCaptionCharCount();
        if (count > 2200) return '#ef4444';
        if (count > 2000) return '#f59e0b';
        return '#10b981';
    };

    // Export functions
    const exportAsJSON = (data: any, filename: string) => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const exportAsText = (text: string, filename: string) => {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const exportCaption = () => {
        const data = {
            caption: generatedCaption,
            hashtags: captionHashtags,
            style: captionStyle,
            topic: captionTopic,
            timestamp: new Date().toISOString(),
        };
        exportAsJSON(data, `instagram-caption-${Date.now()}`);
        trackInstagramCaptionExport(generatedCaption.length);
    };

    const exportHashtags = () => {
        const text = selectedHashtags.join('\n');
        exportAsText(text, `instagram-hashtags-${Date.now()}`);
        trackInstagramHashtagExport(selectedHashtags.length);
    };

    // Save to favorites
    const saveToFavorites = (type: string, content: string) => {
        const newFavorite = {
            type,
            content,
            timestamp: new Date(),
        };
        setFavorites([newFavorite, ...favorites]);
        trackFavoriteSaved(type);
    };

    const removeFromFavorites = (index: number) => {
        setFavorites(favorites.filter((_, i) => i !== index));
    };

    // Best posting times data
    const bestTimesData: Record<string, {
        weekdays: { day: string; times: string[]; engagement: string }[];
        weekend: { day: string; times: string[]; engagement: string }[];
        tips: string[];
    }> = {
        general: {
            weekdays: [
                { day: 'Monday', times: ['11:00 AM', '1:00 PM', '7:00 PM'], engagement: 'High' },
                { day: 'Tuesday', times: ['10:00 AM', '2:00 PM', '6:00 PM'], engagement: 'Very High' },
                { day: 'Wednesday', times: ['11:00 AM', '1:00 PM', '7:00 PM'], engagement: 'High' },
                { day: 'Thursday', times: ['10:00 AM', '2:00 PM', '8:00 PM'], engagement: 'Very High' },
                { day: 'Friday', times: ['9:00 AM', '1:00 PM', '5:00 PM'], engagement: 'Medium' },
            ],
            weekend: [
                { day: 'Saturday', times: ['11:00 AM', '2:00 PM', '5:00 PM'], engagement: 'Medium' },
                { day: 'Sunday', times: ['10:00 AM', '1:00 PM', '4:00 PM'], engagement: 'High' },
            ],
            tips: [
                'Post consistently at the same times',
                'Avoid posting between 3-4 PM (low engagement)',
                'Wednesday and Thursday show highest engagement',
                'Test different times for your specific audience',
            ],
        },
        fitness: {
            weekdays: [
                { day: 'Monday', times: ['6:00 AM', '12:00 PM', '6:00 PM'], engagement: 'Very High' },
                { day: 'Tuesday', times: ['6:00 AM', '12:00 PM', '7:00 PM'], engagement: 'High' },
                { day: 'Wednesday', times: ['6:00 AM', '1:00 PM', '6:00 PM'], engagement: 'Very High' },
                { day: 'Thursday', times: ['6:00 AM', '12:00 PM', '7:00 PM'], engagement: 'High' },
                { day: 'Friday', times: ['6:00 AM', '12:00 PM', '5:00 PM'], engagement: 'Medium' },
            ],
            weekend: [
                { day: 'Saturday', times: ['8:00 AM', '11:00 AM', '4:00 PM'], engagement: 'High' },
                { day: 'Sunday', times: ['8:00 AM', '11:00 AM', '3:00 PM'], engagement: 'Very High' },
            ],
            tips: [
                'Early morning posts (6-8 AM) perform best',
                'Post workout motivation on Monday mornings',
                'Sunday is the best day for fitness content',
                'Avoid posting late evenings (after 9 PM)',
            ],
        },
        food: {
            weekdays: [
                { day: 'Monday', times: ['12:00 PM', '6:00 PM', '8:00 PM'], engagement: 'High' },
                { day: 'Tuesday', times: ['12:00 PM', '6:00 PM', '8:00 PM'], engagement: 'High' },
                { day: 'Wednesday', times: ['12:00 PM', '6:00 PM', '8:00 PM'], engagement: 'Very High' },
                { day: 'Thursday', times: ['12:00 PM', '6:00 PM', '8:00 PM'], engagement: 'Very High' },
                { day: 'Friday', times: ['12:00 PM', '7:00 PM', '9:00 PM'], engagement: 'Very High' },
            ],
            weekend: [
                { day: 'Saturday', times: ['11:00 AM', '1:00 PM', '7:00 PM'], engagement: 'Very High' },
                { day: 'Sunday', times: ['11:00 AM', '1:00 PM', '6:00 PM'], engagement: 'High' },
            ],
            tips: [
                'Lunch time (12-1 PM) is peak engagement',
                'Dinner time (6-8 PM) shows high interaction',
                'Friday and Saturday are best for food content',
                'Post recipes in the morning for dinner planning',
            ],
        },
        fashion: {
            weekdays: [
                { day: 'Monday', times: ['9:00 AM', '12:00 PM', '7:00 PM'], engagement: 'High' },
                { day: 'Tuesday', times: ['9:00 AM', '1:00 PM', '7:00 PM'], engagement: 'Very High' },
                { day: 'Wednesday', times: ['9:00 AM', '12:00 PM', '7:00 PM'], engagement: 'Very High' },
                { day: 'Thursday', times: ['9:00 AM', '1:00 PM', '8:00 PM'], engagement: 'High' },
                { day: 'Friday', times: ['9:00 AM', '2:00 PM', '6:00 PM'], engagement: 'Very High' },
            ],
            weekend: [
                { day: 'Saturday', times: ['10:00 AM', '2:00 PM', '6:00 PM'], engagement: 'High' },
                { day: 'Sunday', times: ['11:00 AM', '3:00 PM', '7:00 PM'], engagement: 'Medium' },
            ],
            tips: [
                'Morning posts (9-11 AM) get high engagement',
                'Friday is the best day for fashion content',
                'Post outfit ideas early in the week',
                'Evening posts (7-8 PM) work well for styling tips',
            ],
        },
        travel: {
            weekdays: [
                { day: 'Monday', times: ['8:00 AM', '12:00 PM', '8:00 PM'], engagement: 'Medium' },
                { day: 'Tuesday', times: ['8:00 AM', '1:00 PM', '8:00 PM'], engagement: 'High' },
                { day: 'Wednesday', times: ['8:00 AM', '12:00 PM', '8:00 PM'], engagement: 'High' },
                { day: 'Thursday', times: ['8:00 AM', '1:00 PM', '8:00 PM'], engagement: 'Very High' },
                { day: 'Friday', times: ['8:00 AM', '2:00 PM', '7:00 PM'], engagement: 'Very High' },
            ],
            weekend: [
                { day: 'Saturday', times: ['9:00 AM', '1:00 PM', '6:00 PM'], engagement: 'Very High' },
                { day: 'Sunday', times: ['9:00 AM', '2:00 PM', '7:00 PM'], engagement: 'Very High' },
            ],
            tips: [
                'Weekend posts get highest engagement',
                'Thursday-Sunday is the best window',
                'Post travel inspiration on Friday mornings',
                'Evening posts (7-9 PM) work well for wanderlust content',
            ],
        },
    };

    // Generate Caption with variations
    const generateCaption = () => {
        if (!captionTopic.trim()) return;

        const captions = {
            casual: [
                `Just vibing with ${captionTopic} 🌟\n\nLiving my best life and loving every moment! What's your favorite way to enjoy ${captionTopic}? Drop a comment below! 👇\n\n#${captionTopic.replace(/\s+/g, '')}`,
                `${captionTopic} kinda day ✨\n\nFeeling grateful for these little moments. Who else loves ${captionTopic}? Let me know! 💭\n\n#${captionTopic.replace(/\s+/g, '')}`,
                `Can't get enough of ${captionTopic} 💫\n\nThis is what happiness looks like! Tag someone who needs to see this 👥\n\n#${captionTopic.replace(/\s+/g, '')}`,
            ],
            professional: [
                `Exploring the world of ${captionTopic} 🎯\n\nSharing insights and experiences from my journey. What are your thoughts on ${captionTopic}? I'd love to hear your perspective.\n\n#${captionTopic.replace(/\s+/g, '')}`,
                `${captionTopic}: A Professional Perspective 📊\n\nDiving deep into what makes ${captionTopic} essential in today's landscape. Follow for more industry insights.\n\n#${captionTopic.replace(/\s+/g, '')}`,
                `Mastering ${captionTopic} 💼\n\nKey takeaways from my experience with ${captionTopic}. Swipe for actionable tips you can implement today.\n\n#${captionTopic.replace(/\s+/g, '')}`,
            ],
            funny: [
                `Me and ${captionTopic} = Best friends forever 😂\n\nIf you don't love ${captionTopic}, we can't be friends. Just kidding... or am I? 🤔\n\n#${captionTopic.replace(/\s+/g, '')}`,
                `${captionTopic} got me like 🤪\n\nWhen life gives you ${captionTopic}, you make... well, this post! Tag your partner in crime! 👯\n\n#${captionTopic.replace(/\s+/g, '')}`,
                `Plot twist: ${captionTopic} is actually amazing 🎭\n\nWho knew ${captionTopic} could be this entertaining? Definitely not me! 😅\n\n#${captionTopic.replace(/\s+/g, '')}`,
            ],
            inspirational: [
                `${captionTopic} taught me something beautiful today 🌅\n\nEvery moment with ${captionTopic} reminds me to stay present and grateful. What inspires you today?\n\n#${captionTopic.replace(/\s+/g, '')}`,
                `Finding magic in ${captionTopic} ✨\n\nLife is about creating moments that matter. ${captionTopic} is my reminder to chase dreams and embrace the journey.\n\n#${captionTopic.replace(/\s+/g, '')}`,
                `${captionTopic}: More than just a moment 🌟\n\nIt's about the memories we create and the lives we touch. Keep shining, keep growing.\n\n#${captionTopic.replace(/\s+/g, '')}`,
            ],
        };

        const selectedCaptions = captions[captionStyle];

        // Set main caption
        const randomCaption = selectedCaptions[Math.floor(Math.random() * selectedCaptions.length)];
        setGeneratedCaption(randomCaption);

        // Generate 2 more variations
        const variations = selectedCaptions
            .filter(c => c !== randomCaption)
            .slice(0, 2);
        setCaptionVariations(variations);

        // Generate relevant hashtags with AI improvements
        const baseHashtags = generateHashtagsForTopic(captionTopic);
        setCaptionHashtags(baseHashtags);

        // Track caption generation
        trackInstagramCaptionGeneration({
            topic: captionTopic,
            style: captionStyle,
            charCount: randomCaption.length,
        });
    };

    // Generate hashtags for topic with AI improvements
    const generateHashtagsForTopic = (topic: string): string[] => {
        const topicClean = topic.toLowerCase().replace(/\s+/g, '');
        const topicWords = topic.toLowerCase().split(' ');

        // Enhanced hashtag database with popularity scores
        const trendingHashtags = [
            '#instagood', '#photooftheday', '#instagram', '#love', '#instadaily',
            '#picoftheday', '#like4like', '#follow', '#instalike', '#instamood'
        ];

        const nicheSuffixes = [
            'life', 'love', 'daily', 'vibes', 'goals', 'inspiration',
            'community', 'lovers', 'addict', 'obsessed', 'gram', 'of',
            'photography', 'art', 'style', 'mood', 'aesthetic'
        ];

        const topicHashtags = [
            `#${topicClean}`,
            ...nicheSuffixes.map(suffix => `#${topicClean}${suffix}`),
            ...topicWords.map(word => `#${word}`),
            ...topicWords.map(word => `#${word}gram`),
            ...topicWords.map(word => `#insta${word}`),
        ];

        // Mix trending and niche hashtags (70% niche, 30% trending)
        const nicheCount = Math.floor(30 * 0.7);
        const trendingCount = 30 - nicheCount;

        const selectedNiche = [...new Set(topicHashtags)].slice(0, nicheCount);
        const selectedTrending = trendingHashtags.slice(0, trendingCount);

        return [...selectedNiche, ...selectedTrending];
    };

    // Search hashtags
    const searchHashtags = () => {
        if (!hashtagSearch.trim()) return;

        const query = hashtagSearch.toLowerCase();

        // Track hashtag search
        trackInstagramHashtagSearch({
            query: query,
            resultCount: 0, // Will update after results
        });

        // Simulated hashtag database
        const hashtagDatabase: Record<string, HashtagData[]> = {
            fitness: [
                { tag: '#fitness', category: 'trending', posts: '500M+' },
                { tag: '#fitnessmotivation', category: 'trending', posts: '150M+' },
                { tag: '#fitnessjourney', category: 'popular', posts: '80M+' },
                { tag: '#fitnesslife', category: 'popular', posts: '50M+' },
                { tag: '#fitnessgoals', category: 'popular', posts: '45M+' },
                { tag: '#fitfam', category: 'trending', posts: '120M+' },
                { tag: '#gymlife', category: 'trending', posts: '200M+' },
                { tag: '#workout', category: 'trending', posts: '300M+' },
                { tag: '#workoutmotivation', category: 'popular', posts: '90M+' },
                { tag: '#gym', category: 'trending', posts: '250M+' },
                { tag: '#bodybuilding', category: 'popular', posts: '100M+' },
                { tag: '#muscle', category: 'popular', posts: '70M+' },
                { tag: '#gains', category: 'niche', posts: '30M+' },
                { tag: '#shredded', category: 'niche', posts: '25M+' },
                { tag: '#fitlife', category: 'popular', posts: '60M+' },
            ],
            food: [
                { tag: '#food', category: 'trending', posts: '450M+' },
                { tag: '#foodie', category: 'trending', posts: '200M+' },
                { tag: '#foodporn', category: 'trending', posts: '250M+' },
                { tag: '#foodstagram', category: 'popular', posts: '100M+' },
                { tag: '#instafood', category: 'trending', posts: '180M+' },
                { tag: '#foodphotography', category: 'popular', posts: '90M+' },
                { tag: '#yummy', category: 'trending', posts: '150M+' },
                { tag: '#delicious', category: 'popular', posts: '120M+' },
                { tag: '#foodlover', category: 'popular', posts: '80M+' },
                { tag: '#tasty', category: 'popular', posts: '110M+' },
                { tag: '#homemade', category: 'popular', posts: '95M+' },
                { tag: '#cooking', category: 'popular', posts: '85M+' },
                { tag: '#recipe', category: 'niche', posts: '40M+' },
                { tag: '#chef', category: 'niche', posts: '35M+' },
                { tag: '#foodblogger', category: 'niche', posts: '45M+' },
            ],
            travel: [
                { tag: '#travel', category: 'trending', posts: '550M+' },
                { tag: '#travelgram', category: 'trending', posts: '180M+' },
                { tag: '#travelphotography', category: 'trending', posts: '200M+' },
                { tag: '#instatravel', category: 'popular', posts: '120M+' },
                { tag: '#wanderlust', category: 'trending', posts: '150M+' },
                { tag: '#adventure', category: 'trending', posts: '160M+' },
                { tag: '#explore', category: 'trending', posts: '140M+' },
                { tag: '#vacation', category: 'popular', posts: '100M+' },
                { tag: '#traveltheworld', category: 'popular', posts: '80M+' },
                { tag: '#travelblogger', category: 'niche', posts: '50M+' },
                { tag: '#traveling', category: 'popular', posts: '90M+' },
                { tag: '#traveler', category: 'popular', posts: '70M+' },
                { tag: '#trip', category: 'popular', posts: '85M+' },
                { tag: '#tourism', category: 'niche', posts: '40M+' },
                { tag: '#worldtraveler', category: 'niche', posts: '35M+' },
            ],
            fashion: [
                { tag: '#fashion', category: 'trending', posts: '800M+' },
                { tag: '#style', category: 'trending', posts: '400M+' },
                { tag: '#fashionista', category: 'trending', posts: '150M+' },
                { tag: '#ootd', category: 'trending', posts: '350M+' },
                { tag: '#instafashion', category: 'popular', posts: '120M+' },
                { tag: '#fashionblogger', category: 'popular', posts: '100M+' },
                { tag: '#outfit', category: 'trending', posts: '200M+' },
                { tag: '#fashionstyle', category: 'popular', posts: '90M+' },
                { tag: '#stylish', category: 'popular', posts: '110M+' },
                { tag: '#fashionable', category: 'niche', posts: '50M+' },
                { tag: '#fashionweek', category: 'niche', posts: '45M+' },
                { tag: '#streetstyle', category: 'popular', posts: '80M+' },
                { tag: '#fashiondesign', category: 'niche', posts: '40M+' },
                { tag: '#fashionmodel', category: 'niche', posts: '35M+' },
                { tag: '#fashiontrends', category: 'niche', posts: '30M+' },
            ],
        };

        let results: HashtagData[] = [];

        // Find matching category
        for (const [category, hashtags] of Object.entries(hashtagDatabase)) {
            if (query.includes(category) || category.includes(query)) {
                results = hashtags;
                break;
            }
        }

        // If no match, generate generic hashtags
        if (results.length === 0) {
            const genericHashtags = [
                `#${query}`,
                `#${query}gram`,
                `#${query}daily`,
                `#${query}life`,
                `#${query}love`,
                `#insta${query}`,
                `#${query}photography`,
                `#${query}blogger`,
                `#${query}community`,
                `#${query}vibes`,
            ];

            results = genericHashtags.map((tag, index) => ({
                tag,
                category: index < 3 ? 'trending' : index < 6 ? 'popular' : 'niche',
                posts: index < 3 ? '100M+' : index < 6 ? '50M+' : '10M+',
            }));
        }

        setHashtagResults(results);
    };

    const toggleHashtag = (hashtag: string) => {
        if (selectedHashtags.includes(hashtag)) {
            setSelectedHashtags(selectedHashtags.filter(h => h !== hashtag));
        } else {
            if (selectedHashtags.length < 30) {
                setSelectedHashtags([...selectedHashtags, hashtag]);
            }
        }
    };

    const copyCaption = () => {
        const fullText = `${generatedCaption}\n\n${captionHashtags.join(' ')}`;
        navigator.clipboard.writeText(fullText);
        trackCopyAction('caption');
    };

    const copyHashtags = () => {
        navigator.clipboard.writeText(selectedHashtags.join(' '));
        trackCopyAction('hashtags');
    };

    const clearHashtags = () => {
        setSelectedHashtags([]);
    };

    return (
        <div className="instagram-tools-page">
            {/* Back Button */}
            <div className="back-button-container">
                <button onClick={onBack} className="back-button">
                    ← Back to YouTube Tools
                </button>
            </div>

            {/* Header */}
            <div className="page-header">
                <div className="header-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
                        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                        <circle cx="18" cy="6" r="1.5" fill="currentColor" />
                    </svg>
                </div>
                <h1>Instagram Content Tools</h1>
                <p>Create engaging captions and find trending hashtags</p>
            </div>

            {/* Tabs */}
            <div className="main-tabs">
                <button
                    className={`main-tab ${activeTab === 'caption' ? 'active' : ''}`}
                    onClick={() => setActiveTab('caption')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                    Caption Generator
                </button>
                <button
                    className={`main-tab ${activeTab === 'hashtags' ? 'active' : ''}`}
                    onClick={() => setActiveTab('hashtags')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="4" y1="9" x2="20" y2="9" />
                        <line x1="4" y1="15" x2="20" y2="15" />
                        <line x1="10" y1="3" x2="8" y2="21" />
                        <line x1="16" y1="3" x2="14" y2="21" />
                    </svg>
                    Hashtag Research
                </button>
                <button
                    className={`main-tab ${showFavorites ? 'active' : ''}`}
                    onClick={() => { setShowFavorites(!showFavorites); setShowBestTimes(false); }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    Favorites ({favorites.length})
                </button>
                <button
                    className={`main-tab ${showBestTimes ? 'active' : ''}`}
                    onClick={() => { setShowBestTimes(!showBestTimes); setShowFavorites(false); }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                    Best Times
                </button>
            </div>

            {/* Caption Generator */}
            {activeTab === 'caption' && (
                <div className="tool-section">
                    <div className="input-section">
                        <h3>What's your post about?</h3>
                        <input
                            type="text"
                            value={captionTopic}
                            onChange={(e) => setCaptionTopic(e.target.value)}
                            placeholder="e.g., sunset, coffee, workout, travel"
                            className="topic-input"
                        />

                        <h3>Choose a style</h3>
                        <div className="style-buttons">
                            <button
                                className={`style-btn ${captionStyle === 'casual' ? 'active' : ''}`}
                                onClick={() => setCaptionStyle('casual')}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                    <line x1="9" y1="9" x2="9.01" y2="9" />
                                    <line x1="15" y1="9" x2="15.01" y2="9" />
                                </svg>
                                Casual
                            </button>
                            <button
                                className={`style-btn ${captionStyle === 'professional' ? 'active' : ''}`}
                                onClick={() => setCaptionStyle('professional')}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                </svg>
                                Professional
                            </button>
                            <button
                                className={`style-btn ${captionStyle === 'funny' ? 'active' : ''}`}
                                onClick={() => setCaptionStyle('funny')}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M8 15h8" />
                                    <line x1="9" y1="9" x2="9.01" y2="9" />
                                    <line x1="15" y1="9" x2="15.01" y2="9" />
                                </svg>
                                Funny
                            </button>
                            <button
                                className={`style-btn ${captionStyle === 'inspirational' ? 'active' : ''}`}
                                onClick={() => setCaptionStyle('inspirational')}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                                Inspirational
                            </button>
                        </div>

                        <button onClick={generateCaption} className="generate-btn" disabled={!captionTopic.trim()}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                            Generate Caption
                        </button>
                    </div>

                    {generatedCaption && (
                        <div className="result-section">
                            <div className="result-header">
                                <h3>Your Caption</h3>
                                <div className="header-actions">
                                    <button onClick={() => saveToFavorites('caption', generatedCaption)} className="save-btn">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                        </svg>
                                        Save
                                    </button>
                                    <button onClick={exportCaption} className="export-btn">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                        Export
                                    </button>
                                    <button onClick={copyCaption} className="copy-btn">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                        </svg>
                                        Copy
                                    </button>
                                </div>
                            </div>

                            <div className="char-counter" style={{ color: getCharCountColor() }}>
                                {getCaptionCharCount()} / 2,200 characters
                            </div>

                            <div className="caption-preview">
                                <p>{generatedCaption}</p>
                            </div>

                            <div className="hashtags-section">
                                <h4>Suggested Hashtags ({captionHashtags.length}/30)</h4>
                                <div className="hashtag-pills">
                                    {captionHashtags.map((tag, index) => (
                                        <span key={index} className="hashtag-pill">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {captionVariations.length > 0 && (
                                <div className="variations-section">
                                    <h4>More Variations</h4>
                                    {captionVariations.map((variation, index) => (
                                        <div key={index} className="variation-card">
                                            <p>{variation}</p>
                                            <button
                                                onClick={() => setGeneratedCaption(variation)}
                                                className="use-btn"
                                            >
                                                Use This
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Hashtag Research */}
            {activeTab === 'hashtags' && (
                <div className="tool-section">
                    <div className="search-section">
                        <h3>Search for hashtags</h3>
                        <div className="search-container">
                            <input
                                type="text"
                                value={hashtagSearch}
                                onChange={(e) => setHashtagSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && searchHashtags()}
                                placeholder="e.g., fitness, food, travel, fashion"
                                className="search-input"
                            />
                            <button onClick={searchHashtags} className="search-btn" disabled={!hashtagSearch.trim()}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.35-4.35" />
                                </svg>
                                Search
                            </button>
                        </div>
                    </div>

                    {hashtagResults.length > 0 && (
                        <div className="results-section">
                            <h3>Click to select (max 30)</h3>
                            <div className="hashtag-grid">
                                {hashtagResults.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`hashtag-card ${selectedHashtags.includes(item.tag) ? 'selected' : ''}`}
                                        onClick={() => toggleHashtag(item.tag)}
                                    >
                                        <div className="hashtag-info">
                                            <span className="hashtag-name">{item.tag}</span>
                                            <span className={`category-badge ${item.category}`}>
                                                {item.category === 'trending' && '🔥'}
                                                {item.category === 'popular' && '⭐'}
                                                {item.category === 'niche' && '💎'}
                                            </span>
                                        </div>
                                        <span className="post-count">{item.posts} posts</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {selectedHashtags.length > 0 && (
                        <div className="selected-section">
                            <div className="selected-header">
                                <h3>Selected Hashtags ({selectedHashtags.length}/30)</h3>
                                <div className="action-buttons">
                                    <button onClick={() => saveToFavorites('hashtags', selectedHashtags.join(' '))} className="save-btn">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                        </svg>
                                        Save
                                    </button>
                                    <button onClick={exportHashtags} className="export-btn">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                        Export
                                    </button>
                                    <button onClick={copyHashtags} className="copy-btn">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                        </svg>
                                        Copy
                                    </button>
                                    <button onClick={clearHashtags} className="clear-btn">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        </svg>
                                        Clear
                                    </button>
                                </div>
                            </div>
                            <div className="selected-textarea-container">
                                <textarea
                                    value={selectedHashtags.join(' ')}
                                    readOnly
                                    className="selected-textarea"
                                    rows={4}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Best Times Section */}
            {showBestTimes && (
                <div className="tool-section">
                    <div className="best-times-section">
                        <h3>📅 Best Time to Post on Instagram</h3>
                        <p className="section-subtitle">Optimize your posting schedule for maximum engagement</p>

                        <div className="niche-selector">
                            <label>Select Your Niche:</label>
                            <div className="niche-buttons">
                                {Object.keys(bestTimesData).map((niche) => (
                                    <button
                                        key={niche}
                                        className={`niche-btn ${selectedNiche === niche ? 'active' : ''}`}
                                        onClick={() => setSelectedNiche(niche)}
                                    >
                                        {niche.charAt(0).toUpperCase() + niche.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="times-grid">
                            <div className="times-column">
                                <h4>📆 Weekdays (Mon-Fri)</h4>
                                {bestTimesData[selectedNiche].weekdays.map((day, index) => (
                                    <div key={index} className="day-card">
                                        <div className="day-header">
                                            <span className="day-name">{day.day}</span>
                                            <span className={`engagement-badge ${day.engagement.toLowerCase().replace(' ', '-')}`}>
                                                {day.engagement}
                                            </span>
                                        </div>
                                        <div className="time-slots">
                                            {day.times.map((time, idx) => (
                                                <span key={idx} className="time-slot">
                                                    🕐 {time}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="times-column">
                                <h4>🎉 Weekend (Sat-Sun)</h4>
                                {bestTimesData[selectedNiche].weekend.map((day, index) => (
                                    <div key={index} className="day-card">
                                        <div className="day-header">
                                            <span className="day-name">{day.day}</span>
                                            <span className={`engagement-badge ${day.engagement.toLowerCase().replace(' ', '-')}`}>
                                                {day.engagement}
                                            </span>
                                        </div>
                                        <div className="time-slots">
                                            {day.times.map((time, idx) => (
                                                <span key={idx} className="time-slot">
                                                    🕐 {time}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="tips-section">
                            <h4>💡 Pro Tips for {selectedNiche.charAt(0).toUpperCase() + selectedNiche.slice(1)}</h4>
                            <ul className="tips-list">
                                {bestTimesData[selectedNiche].tips.map((tip, index) => (
                                    <li key={index}>{tip}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="timezone-note">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                            </svg>
                            <span>All times are based on your audience's timezone. Adjust according to your target location.</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Favorites Section */}
            {showFavorites && (
                <div className="tool-section">
                    <div className="favorites-section">
                        <h3>Your Saved Favorites</h3>
                        {favorites.length === 0 ? (
                            <div className="empty-favorites">
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                                <p>No favorites saved yet</p>
                                <span>Save captions and hashtags to access them later</span>
                            </div>
                        ) : (
                            <div className="favorites-list">
                                {favorites.map((fav, index) => (
                                    <div key={index} className="favorite-card">
                                        <div className="favorite-header">
                                            <span className="favorite-type">{fav.type}</span>
                                            <span className="favorite-date">
                                                {new Date(fav.timestamp).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="favorite-content">
                                            {fav.content}
                                        </div>
                                        <div className="favorite-actions">
                                            <button
                                                onClick={() => navigator.clipboard.writeText(fav.content)}
                                                className="fav-action-btn"
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                                </svg>
                                                Copy
                                            </button>
                                            <button
                                                onClick={() => removeFromFavorites(index)}
                                                className="fav-action-btn delete"
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="3 6 5 6 21 6" />
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                </svg>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style>{`
        .instagram-tools-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%);
          padding: 20px 20px 40px;
        }

        .back-button-container {
          max-width: 1000px;
          margin: 0 auto 20px;
        }

        .back-button {
          padding: 10px 20px;
          background: white;
          color: #475569;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .back-button:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }

        .page-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .header-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #e11d48 0%, #be123c 100%);
          border-radius: 20px;
          color: white;
          margin-bottom: 20px;
          box-shadow: 0 10px 30px rgba(225, 29, 72, 0.3);
        }

        .page-header h1 {
          font-size: 42px;
          font-weight: 800;
          margin: 0 0 12px 0;
          color: #1e293b;
          letter-spacing: -0.5px;
        }

        .page-header p {
          font-size: 18px;
          color: #64748b;
          margin: 0;
          font-weight: 500;
        }

        .main-tabs {
          max-width: 1000px;
          margin: 0 auto 40px;
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .main-tab {
          padding: 14px 32px;
          background: white;
          color: #64748b;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .main-tab:hover {
          border-color: #e11d48;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(225, 29, 72, 0.15);
        }

        .main-tab.active {
          background: linear-gradient(135deg, #e11d48 0%, #be123c 100%);
          color: white;
          border-color: #e11d48;
          box-shadow: 0 4px 16px rgba(225, 29, 72, 0.3);
        }

        .tool-section {
          max-width: 1000px;
          margin: 0 auto;
        }

        .input-section, .search-section {
          background: white;
          padding: 32px;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        }

        .input-section h3, .search-section h3 {
          margin: 0 0 16px 0;
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
        }

        .topic-input, .search-input {
          width: 100%;
          padding: 14px 20px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 16px;
          margin-bottom: 24px;
          transition: all 0.2s ease;
        }

        .topic-input:focus, .search-input:focus {
          outline: none;
          border-color: #e11d48;
          box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.1);
        }

        .style-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
          margin-bottom: 24px;
        }

        .style-btn {
          padding: 12px 20px;
          background: white;
          color: #475569;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .style-btn:hover {
          border-color: #e11d48;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(225, 29, 72, 0.1);
        }

        .style-btn.active {
          background: linear-gradient(135deg, #e11d48 0%, #be123c 100%);
          color: white;
          border-color: #e11d48;
          box-shadow: 0 4px 12px rgba(225, 29, 72, 0.3);
        }

        .generate-btn, .search-btn {
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, #e11d48 0%, #be123c 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 4px 16px rgba(225, 29, 72, 0.3);
        }

        .generate-btn:hover:not(:disabled), .search-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(225, 29, 72, 0.4);
        }

        .generate-btn:disabled, .search-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .search-container {
          display: flex;
          gap: 12px;
        }

        .search-container .search-input {
          margin-bottom: 0;
        }

        .search-btn {
          width: auto;
          padding: 14px 32px;
          white-space: nowrap;
        }

        .result-section, .results-section, .selected-section {
          background: white;
          padding: 32px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          margin-bottom: 24px;
        }

        .result-header, .selected-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .result-header h3, .selected-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
        }

        .header-actions {
          display: flex;
          gap: 8px;
        }

        .char-counter {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 12px;
          padding: 8px 12px;
          background: #f8fafc;
          border-radius: 8px;
          display: inline-block;
        }

        .copy-btn, .clear-btn, .save-btn, .export-btn {
          padding: 10px 16px;
          font-size: 13px;
          font-weight: 600;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: white;
          color: #475569;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .copy-btn:hover {
          background: linear-gradient(135deg, #e11d48 0%, #be123c 100%);
          color: white;
          border-color: #e11d48;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(225, 29, 72, 0.3);
        }

        .save-btn:hover {
          background: #10b981;
          color: white;
          border-color: #10b981;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .export-btn:hover {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .clear-btn:hover {
          background: #ef4444;
          color: white;
          border-color: #ef4444;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }

        .caption-preview {
          background: #f8fafc;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 24px;
          white-space: pre-wrap;
          line-height: 1.6;
        }

        .caption-preview p {
          margin: 0;
          color: #1e293b;
        }

        .hashtags-section {
          margin-top: 24px;
        }

        .hashtags-section h4 {
          margin: 0 0 16px 0;
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
        }

        .hashtag-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .hashtag-pill {
          padding: 6px 12px;
          background: #fce7f3;
          color: #be185d;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
        }

        .results-section h3 {
          margin: 0 0 20px 0;
          font-size: 16px;
          font-weight: 600;
          color: #64748b;
        }

        .hashtag-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
        }

        .hashtag-card {
          padding: 16px;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .hashtag-card:hover {
          border-color: #e11d48;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(225, 29, 72, 0.15);
        }

        .hashtag-card.selected {
          background: linear-gradient(135deg, #fce7f3 0%, #fdf2f8 100%);
          border-color: #e11d48;
          box-shadow: 0 4px 16px rgba(225, 29, 72, 0.2);
        }

        .hashtag-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .hashtag-name {
          font-size: 15px;
          font-weight: 700;
          color: #1e293b;
        }

        .category-badge {
          font-size: 16px;
        }

        .post-count {
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
        }

        .action-buttons {
          display: flex;
          gap: 10px;
        }

        .selected-textarea-container {
          margin-top: 20px;
        }

        .selected-textarea {
          width: 100%;
          padding: 16px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          font-family: inherit;
          resize: vertical;
          background: #f8fafc;
          color: #1e293b;
        }

        .selected-textarea:focus {
          outline: none;
          border-color: #e11d48;
          background: white;
        }

        .variations-section {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #e2e8f0;
        }

        .variations-section h4 {
          margin: 0 0 16px 0;
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
        }

        .variation-card {
          background: #f8fafc;
          padding: 16px;
          border-radius: 10px;
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .variation-card p {
          margin: 0;
          flex: 1;
          font-size: 14px;
          color: #475569;
          line-height: 1.6;
        }

        .use-btn {
          padding: 8px 16px;
          background: white;
          color: #e11d48;
          border: 2px solid #e11d48;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .use-btn:hover {
          background: #e11d48;
          color: white;
        }

        .favorites-section {
          background: white;
          padding: 32px;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        }

        .favorites-section h3 {
          margin: 0 0 24px 0;
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
        }

        .empty-favorites {
          text-align: center;
          padding: 60px 20px;
          color: #94a3b8;
        }

        .empty-favorites svg {
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .empty-favorites p {
          margin: 0 0 8px 0;
          font-size: 18px;
          font-weight: 600;
          color: #64748b;
        }

        .empty-favorites span {
          font-size: 14px;
        }

        .favorites-list {
          display: grid;
          gap: 16px;
        }

        .favorite-card {
          background: #f8fafc;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .favorite-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .favorite-type {
          padding: 4px 12px;
          background: #e11d48;
          color: white;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          text-transform: capitalize;
        }

        .favorite-date {
          font-size: 12px;
          color: #94a3b8;
        }

        .favorite-content {
          padding: 12px;
          background: white;
          border-radius: 8px;
          margin-bottom: 12px;
          font-size: 14px;
          color: #475569;
          line-height: 1.6;
          white-space: pre-wrap;
        }

        .favorite-actions {
          display: flex;
          gap: 8px;
        }

        .fav-action-btn {
          padding: 6px 12px;
          background: white;
          color: #475569;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .fav-action-btn:hover {
          background: #e11d48;
          color: white;
          border-color: #e11d48;
        }

        .fav-action-btn.delete:hover {
          background: #ef4444;
          border-color: #ef4444;
        }

        @media (max-width: 768px) {
          .page-header h1 {
            font-size: 32px;
          }

          .main-tabs {
            flex-direction: column;
          }

          .style-buttons {
            grid-template-columns: 1fr 1fr;
          }

          .search-container {
            flex-direction: column;
          }

          .search-btn {
            width: 100%;
          }

          .hashtag-grid {
            grid-template-columns: 1fr;
          }

          .result-header, .selected-header {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }

          .action-buttons, .header-actions {
            width: 100%;
            flex-wrap: wrap;
          }

          .copy-btn, .clear-btn, .save-btn, .export-btn {
            flex: 1;
            min-width: calc(50% - 4px);
          }

          .variation-card {
            flex-direction: column;
            align-items: flex-start;
          }

          .use-btn {
            width: 100%;
          }
        }
      `}</style>
        </div>
    );
}
