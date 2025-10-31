import { useState, useEffect } from 'react';
import KeywordSidebar from './components/KeywordSidebar';
import TagGenerator from './pages/TagGenerator';
import InstagramTools from './pages/InstagramTools';
import TestCredits from './pages/TestCredits';
import TermsAndConditions from './pages/TermsAndConditions';
import AdminPanel from './pages/AdminPanel';
import Pricing from './pages/Pricing';
import Footer from './components/Footer';
import SupportButton from './components/SupportButton';
import CreditBanner from './components/CreditBanner';
import UpgradeModal from './components/UpgradeModal';
import TermsModal from './components/TermsModal';
import { useCredits } from './hooks/useCredits';
import { initGA, trackPageView, trackNavigation, trackSessionStart } from './utils/analytics';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [hashtagInput, setHashtagInput] = useState('');
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [seoScore, setSeoScore] = useState(0);
  const [isAiGenerated, setIsAiGenerated] = useState(false);
  const [showKeywordSidebar, setShowKeywordSidebar] = useState(false);
  const [currentPage, setCurrentPage] = useState<'analyzer' | 'generator' | 'instagram' | 'test' | 'terms' | 'admin' | 'pricing'>('analyzer');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isFetchingVideo, setIsFetchingVideo] = useState(false);

  // Credit system
  const { credits, loading: creditsLoading, useCredit, hasCredits } = useCredits();

  // Check if terms have been accepted
  useEffect(() => {
    const accepted = localStorage.getItem('termsAccepted');
    if (accepted !== 'true') {
      setShowTermsModal(true);
    }
  }, []);

  const handleAcceptTerms = () => {
    localStorage.setItem('termsAccepted', 'true');
    setShowTermsModal(false);
  };

  // Extract video ID from YouTube URL
  const extractVideoId = (url: string): string | null => {
    const patterns = [
      // Regular YouTube URLs
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      // YouTube Shorts
      /youtube\.com\/shorts\/([^&\n?#]+)/,
      // YouTube Live streams
      /youtube\.com\/live\/([^&\n?#]+)/,
      // YouTube channel live streams
      /youtube\.com\/channel\/[^\/]+\/live/,
      /youtube\.com\/c\/[^\/]+\/live/,
      /youtube\.com\/@[^\/]+\/live/,
      // Mobile YouTube URLs
      /m\.youtube\.com\/watch\?v=([^&\n?#]+)/,
      // YouTube Music
      /music\.youtube\.com\/watch\?v=([^&\n?#]+)/,
      // Direct video ID (11 characters)
      /^([a-zA-Z0-9_-]{11})$/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1];
    }
    
    // Special handling for live streams (extract from page)
    if (url.includes('/live') || url.includes('youtube.com/watch') && url.includes('live')) {
      // Try to extract from various live URL formats
      const livePatterns = [
        /youtube\.com\/watch\?v=([^&\n?#]+).*live/,
        /youtube\.com\/.*live.*v=([^&\n?#]+)/
      ];
      
      for (const pattern of livePatterns) {
        const match = url.match(pattern);
        if (match && match[1]) return match[1];
      }
    }
    
    return null;
  };

  // Fetch YouTube video data
  const fetchYouTubeVideo = async () => {
    if (!youtubeUrl.trim()) return;

    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) {
      alert('❌ Invalid YouTube URL! Please enter a valid YouTube video, Shorts, or Live stream link.');
      return;
    }

    // Check credits
    if (!hasCredits()) {
      setShowUpgradeModal(true);
      return;
    }

    setIsFetchingVideo(true);

    try {
      // Use YouTube oEmbed API (no API key needed!)
      const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      
      if (!response.ok) {
        throw new Error('Video not found');
      }

      const data = await response.json();

      // Use credit
      await useCredit('fetch', 'YouTube Video Analyzer', { videoId });

      // Set title from oEmbed
      setTitle(data.title || '');
      
      // Generate mock description and tags based on title
      const mockDescription = `Check out this amazing video about ${data.title}!\n\nIn this video, we explore everything you need to know.\n\n🎯 Key Points:\n• Comprehensive guide\n• Step-by-step tutorial\n• Expert tips and tricks\n\nDon't forget to LIKE, SUBSCRIBE, and hit the BELL icon!\n\n#${data.title.replace(/\s+/g, '')}`;
      
      setDescription(mockDescription);

      // Generate tags from title
      const titleWords = data.title.toLowerCase().split(' ').filter((w: string) => w.length > 3);
      const generatedTags = [
        ...titleWords.slice(0, 5),
        `${titleWords[0]} tutorial`,
        `${titleWords[0]} guide`,
        'how to',
        '2025'
      ];
      setTags(generatedTags);

      // Generate hashtags
      const generatedHashtags = [
        `#${data.title.split(' ')[0]}`,
        '#YouTube',
        '#Tutorial',
        '#HowTo',
        '#Learn'
      ];
      setHashtags(generatedHashtags);

      setIsAiGenerated(false);
      setShowResults(false);
      setYoutubeUrl('');

    } catch (error) {
      console.error('Error fetching video:', error);
      alert('❌ Could not fetch video data. Please check the URL and try again.');
    } finally {
      setIsFetchingVideo(false);
    }
  };

  // Handle hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#terms') {
        setCurrentPage('terms');
      } else if (hash === '#admin') {
        setCurrentPage('admin');
      } else if (hash === '#generator') {
        setCurrentPage('generator');
      } else if (hash === '#instagram') {
        setCurrentPage('instagram');
      } else if (hash === '#pricing') {
        setCurrentPage('pricing');
      } else if (hash === '') {
        setCurrentPage('analyzer');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check on mount
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Initialize Google Analytics
  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (measurementId && measurementId !== 'G-XXXXXXXXXX') {
      initGA(measurementId);
      trackSessionStart();
      trackPageView('ContentCraft AI - Home');
    }
  }, []);

  // Track page changes
  useEffect(() => {
    const pageNames: Record<string, string> = {
      analyzer: 'ContentCraft AI - YouTube SEO',
      generator: 'ContentCraft AI - Tag Generator',
      instagram: 'ContentCraft AI - Instagram Tools',
      test: 'ContentCraft AI - Test',
      terms: 'ContentCraft AI - Terms & Conditions',
      admin: 'ContentCraft AI - Admin Panel',
      pricing: 'ContentCraft AI - Pricing',
    };
    trackPageView(pageNames[currentPage]);
  }, [currentPage]);



  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
      setIsAiGenerated(false); // Mark as manually edited
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const addHashtag = () => {
    const tag = hashtagInput.trim().startsWith('#') ? hashtagInput.trim() : `#${hashtagInput.trim()}`;
    if (tag.length > 1 && !hashtags.includes(tag)) {
      setHashtags([...hashtags, tag]);
      setHashtagInput('');
    }
  };

  const removeHashtag = (index: number) => {
    setHashtags(hashtags.filter((_, i) => i !== index));
  };

  const analyzeSEO = async () => {
    // Check if user has credits
    if (!hasCredits()) {
      setShowUpgradeModal(true);
      return;
    }

    // Use a credit
    const success = await useCredit('analyze', 'YouTube SEO Analyzer', {
      titleLength: title.length,
      descriptionLength: description.length,
      tagsCount: tags.length,
      hashtagsCount: hashtags.length,
    });

    if (!success) {
      setShowUpgradeModal(true);
      return;
    }

    // Calculate SEO score based on inputs
    let score = 0;

    // Title scoring (30 points)
    if (title.length >= 60 && title.length <= 70) {
      score += 30;
    } else if (title.length >= 50 && title.length <= 80) {
      score += 20;
    } else if (title.length > 0) {
      score += 10;
    }

    // Description scoring (30 points)
    if (description.length >= 150) {
      score += 30;
    } else if (description.length >= 100) {
      score += 20;
    } else if (description.length > 0) {
      score += 10;
    }

    // Tags scoring (20 points)
    if (tags.length >= 5 && tags.length <= 10) {
      score += 20;
    } else if (tags.length >= 3) {
      score += 15;
    } else if (tags.length > 0) {
      score += 5;
    }

    // Hashtags scoring (20 points)
    if (hashtags.length >= 3 && hashtags.length <= 5) {
      score += 20;
    } else if (hashtags.length >= 1) {
      score += 10;
    }

    setSeoScore(score);
    setShowResults(true);
  };

  const generateFromTopic = () => {
    if (!aiTopic.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      // AI-powered generation based on topic
      const topic = aiTopic.toLowerCase();

      // Generate optimized title
      const generatedTitle = `${aiTopic} | Complete Guide 2025`;

      // Generate description
      const generatedDescription = `Welcome to this comprehensive guide on ${aiTopic}! 

In this video, we'll cover everything you need to know about ${topic}. Whether you're a beginner or looking to advance your skills, this tutorial has something for everyone.

🎯 What You'll Learn:
• Understanding the basics of ${topic}
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

#${topic.replace(/\s+/g, '')} #Tutorial #Guide`;

      // Generate tags
      const generatedTags = [
        topic,
        `${topic} tutorial`,
        `${topic} guide`,
        `${topic} 2025`,
        `how to ${topic}`,
        `${topic} for beginners`,
        `${topic} tips`,
        `learn ${topic}`,
      ];

      // Generate hashtags
      const generatedHashtags = [
        `#${topic.replace(/\s+/g, '')}`,
        '#Tutorial',
        '#Guide',
        '#HowTo',
        '#Learn',
      ];

      setTitle(generatedTitle);
      setDescription(generatedDescription);
      setTags(generatedTags);
      setHashtags(generatedHashtags);
      setIsAiGenerated(true); // Mark as AI generated
      setShowResults(false); // Hide previous results

      setIsGenerating(false);
      setShowAiModal(false);
      setAiTopic('');
    }, 1500);
  };

  const handleKeywordSelect = (keyword: string, type: 'keyword' | 'tag' | 'hashtag') => {
    if (type === 'keyword') {
      // Keywords go to title
      if (!title.includes(keyword)) {
        setTitle(title ? `${title} ${keyword}` : keyword);
      }
    } else if (type === 'tag') {
      // Tags go to tags array
      if (!tags.includes(keyword)) {
        setTags([...tags, keyword]);
      }
    } else if (type === 'hashtag') {
      // Hashtags go to hashtags array
      const hashtagToAdd = keyword.startsWith('#') ? keyword : `#${keyword}`;
      if (!hashtags.includes(hashtagToAdd)) {
        setHashtags([...hashtags, hashtagToAdd]);
      }
    }
  };

  // Show Tag Generator page if selected
  if (currentPage === 'generator') {
    return (
      <>
        <TagGenerator onBack={() => setCurrentPage('analyzer')} />
        <CreditBanner credits={credits} loading={creditsLoading} />
        <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
      </>
    );
  }

  // Show Instagram Tools page if selected
  if (currentPage === 'instagram') {
    return (
      <>
        <InstagramTools onBack={() => setCurrentPage('analyzer')} />
        <CreditBanner credits={credits} loading={creditsLoading} />
        <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
      </>
    );
  }

  // Show Test Credits page
  if (currentPage === 'test') {
    return <TestCredits />;
  }

  // Show Terms & Conditions page
  if (currentPage === 'terms') {
    return (
      <>
        <TermsAndConditions />
        <Footer />
      </>
    );
  }

  // Show Admin Panel (secret page)
  if (currentPage === 'admin') {
    return <AdminPanel />;
  }

  // Show Pricing page
  if (currentPage === 'pricing') {
    return (
      <>
        <Pricing />
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Keyword Sidebar */}
      {showKeywordSidebar && (
        <div className="w-96 flex-shrink-0 border-r border-gray-200 overflow-hidden">
          <KeywordSidebar onSelectKeyword={handleKeywordSelect} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-900">ContentCraft AI</span>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => {
                  trackNavigation(currentPage, 'generator');
                  setCurrentPage('generator');
                }}
                className="px-4 py-2 text-sm font-semibold rounded-lg transition-colors text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              >
                🏷️ YouTube Tags
              </button>
              <button 
                onClick={() => {
                  trackNavigation(currentPage, 'instagram');
                  setCurrentPage('instagram');
                }}
                className="px-4 py-2 text-sm font-semibold rounded-lg transition-colors text-gray-600 hover:text-pink-600 hover:bg-pink-50"
              >
                📸 Instagram Tools
              </button>
              <button 
                onClick={() => {
                  trackNavigation(currentPage, 'pricing');
                  setCurrentPage('pricing');
                }}
                className="px-4 py-2 text-sm font-semibold rounded-lg transition-colors text-gray-600 hover:text-yellow-600 hover:bg-yellow-50"
              >
                💎 Pricing
              </button>
              <button 
                onClick={() => setShowKeywordSidebar(!showKeywordSidebar)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  showKeywordSidebar 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                🔍 Keywords
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-black text-white mb-4 drop-shadow-lg">
              ContentCraft AI
            </h1>
            <p className="text-xl text-indigo-100">
              AI-Powered Content Tools for YouTube & Instagram Creators
            </p>
          </div>
        </div>
      </div>

      {/* AI Generator Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 relative">
            <button
              onClick={() => setShowAiModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Content Generator</h2>
              <p className="text-gray-600">Enter your video topic and let AI create everything!</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Video Topic</label>
                <input
                  type="text"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && generateFromTopic()}
                  placeholder="e.g., React Hooks, Python Tutorial, Cooking Pasta"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-gray-900"
                  autoFocus
                />
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
                <p className="text-sm font-semibold text-indigo-900 mb-2">✨ AI will generate:</p>
                <ul className="space-y-1 text-sm text-indigo-700">
                  <li>• Optimized video title</li>
                  <li>• Complete description with timestamps</li>
                  <li>• 8 relevant tags</li>
                  <li>• 5 trending hashtags</li>
                </ul>
              </div>

              <button
                onClick={generateFromTopic}
                disabled={!aiTopic.trim() || isGenerating}
                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  '✨ Generate with AI'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* YouTube URL Input Card */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl shadow-lg border-2 border-red-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Analyze YouTube Video</h3>
                  <p className="text-sm text-gray-600">Paste a YouTube URL to auto-fill and analyze</p>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && fetchYouTubeVideo()}
                  placeholder="YouTube URL (Videos, Shorts, Live streams supported)"
                  className="flex-1 px-4 py-3 border-2 border-red-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all text-gray-900 placeholder-gray-400"
                  disabled={isFetchingVideo}
                />
                <button
                  onClick={fetchYouTubeVideo}
                  disabled={!youtubeUrl.trim() || isFetchingVideo}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-xl hover:from-red-700 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg"
                >
                  {isFetchingVideo ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Fetching...
                    </span>
                  ) : (
                    '🔍 Fetch & Analyze'
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">💡 Tip: Works with youtube.com/watch, youtu.be, or video ID</p>
            </div>

            {/* Title Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Video Title</h3>
                  <p className="text-sm text-gray-600 mt-1">Create an engaging title that captures attention</p>
                </div>
                <span className={`px-3 py-1.5 text-xs font-bold rounded-full ${title.length > 70 ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' :
                  title.length > 60 ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                    'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700'
                  }`}>
                  {title.length}/100
                </span>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setIsAiGenerated(false);
                }}
                maxLength={100}
                className="w-full px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                placeholder="e.g., How to Build Amazing React Apps in 2024"
              />
              <div className="mt-3 h-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${title.length > 70 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                    title.length > 60 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                      'bg-gradient-to-r from-indigo-500 to-purple-500'
                    }`}
                  style={{ width: `${(title.length / 100) * 100}%` }}
                />
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Description</h3>
                  <p className="text-sm text-gray-600 mt-1">Provide detailed information about your video</p>
                </div>
                <span className="px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full">
                  {description.length}/5000
                </span>
              </div>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setIsAiGenerated(false);
                }}
                maxLength={5000}
                rows={6}
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none text-gray-900 placeholder-gray-500"
                placeholder="Write a compelling description that includes relevant keywords..."
              />
            </div>

            {/* Tags Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-shadow">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">Tags</h3>
                <p className="text-sm text-gray-600 mt-1">Add relevant keywords to help viewers find your video</p>
              </div>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                  placeholder="Type a tag and press Enter"
                />
                <button
                  onClick={addTag}
                  disabled={!tagInput.trim()}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-bold rounded-xl hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-200 disabled:to-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/30"
                >
                  Add
                </button>
              </div>
              {tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-md"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(index)}
                        className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                  <svg className="w-10 h-10 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <p className="text-sm text-gray-500">No tags added yet</p>
                </div>
              )}
            </div>

            {/* Hashtags Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-6 hover:shadow-xl transition-shadow">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">Hashtags</h3>
                <p className="text-sm text-gray-600 mt-1">Use hashtags to increase discoverability (max 15)</p>
              </div>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={hashtagInput}
                  onChange={(e) => setHashtagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHashtag())}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                  placeholder="Type a hashtag and press Enter"
                />
                <button
                  onClick={addHashtag}
                  disabled={!hashtagInput.trim() || hashtags.length >= 15}
                  className="px-5 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-sm font-bold rounded-xl hover:from-pink-700 hover:to-purple-700 disabled:from-gray-200 disabled:to-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed transition-all shadow-lg shadow-pink-500/30"
                >
                  Add
                </button>
              </div>
              {hashtags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {hashtags.map((hashtag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-semibold rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all shadow-md"
                    >
                      {hashtag}
                      <button
                        onClick={() => removeHashtag(index)}
                        className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                  <svg className="w-10 h-10 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                  <p className="text-sm text-gray-500">No hashtags added yet</p>
                </div>
              )}
            </div>

            {/* AI Generated Warning */}
            {isAiGenerated && !showResults && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-yellow-900">AI Generated Content</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      This content was auto-generated. Please review and edit before analyzing for accurate SEO score.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Analyze Button */}
            <button
              onClick={analyzeSEO}
              disabled={!title.trim()}
              className="w-full px-6 py-4 bg-blue-600 text-white font-bold text-lg rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-lg"
            >
              {isAiGenerated ? 'Review & Analyze SEO' : 'Analyze SEO Performance'}
            </button>

            {/* Results Section */}
            {showResults && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full mb-4">
                    <div className="text-center">
                      <div className={`text-5xl font-black ${seoScore >= 80 ? 'text-green-600' :
                        seoScore >= 60 ? 'text-yellow-600' :
                          seoScore >= 40 ? 'text-orange-600' :
                            'text-red-600'
                        }`}>
                        {seoScore}
                      </div>
                      <div className="text-sm text-gray-500 font-semibold">/ 100</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {seoScore >= 80 ? 'Excellent!' :
                      seoScore >= 60 ? 'Good Job!' :
                        seoScore >= 40 ? 'Needs Work' :
                          'Poor'}
                  </h3>
                  <p className="text-gray-600">
                    {seoScore >= 80 ? 'Your content is well optimized!' :
                      seoScore >= 60 ? 'Your content is decent, but can be improved.' :
                        seoScore >= 40 ? 'Your content needs significant improvements.' :
                          'Your content needs major optimization.'}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-gray-700">Title</span>
                    <span className={`font-bold ${title.length >= 60 && title.length <= 70 ? 'text-green-600' : 'text-orange-600'
                      }`}>
                      {title.length >= 60 && title.length <= 70 ? '✓ Optimal' : '⚠ Improve'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-gray-700">Description</span>
                    <span className={`font-bold ${description.length >= 150 ? 'text-green-600' : 'text-orange-600'
                      }`}>
                      {description.length >= 150 ? '✓ Good' : '⚠ Too Short'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-gray-700">Tags</span>
                    <span className={`font-bold ${tags.length >= 5 && tags.length <= 10 ? 'text-green-600' : 'text-orange-600'
                      }`}>
                      {tags.length >= 5 && tags.length <= 10 ? '✓ Perfect' : `${tags.length}/5-10`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-gray-700">Hashtags</span>
                    <span className={`font-bold ${hashtags.length >= 3 && hashtags.length <= 5 ? 'text-green-600' : 'text-orange-600'
                      }`}>
                      {hashtags.length >= 3 && hashtags.length <= 5 ? '✓ Ideal' : `${hashtags.length}/3-5`}
                    </span>
                  </div>
                </div>

                {/* Detailed Recommendations */}
                <div className="mt-6 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl">
                  <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2 text-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Recommendations
                  </h4>
                  <div className="space-y-3">
                    {/* Title Recommendations */}
                    {title.length < 60 && (
                      <div className="flex gap-3 p-3 bg-white rounded-lg">
                        <span className="text-orange-500 font-bold">📝</span>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Expand Your Title</p>
                          <p className="text-xs text-gray-600 mt-1">Add {60 - title.length} more characters. Include keywords and make it engaging!</p>
                        </div>
                      </div>
                    )}
                    {title.length > 70 && (
                      <div className="flex gap-3 p-3 bg-white rounded-lg">
                        <span className="text-orange-500 font-bold">✂️</span>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Shorten Your Title</p>
                          <p className="text-xs text-gray-600 mt-1">Remove {title.length - 70} characters to avoid truncation in search results.</p>
                        </div>
                      </div>
                    )}

                    {/* Description Recommendations */}
                    {description.length < 150 && (
                      <div className="flex gap-3 p-3 bg-white rounded-lg">
                        <span className="text-orange-500 font-bold">📄</span>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Add More Description</p>
                          <p className="text-xs text-gray-600 mt-1">Write {150 - description.length} more characters. First 150 chars appear in search!</p>
                        </div>
                      </div>
                    )}
                    {description.length >= 150 && description.length < 300 && (
                      <div className="flex gap-3 p-3 bg-white rounded-lg">
                        <span className="text-blue-500 font-bold">💡</span>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Enhance Description</p>
                          <p className="text-xs text-gray-600 mt-1">Add timestamps, links, and more details for better engagement.</p>
                        </div>
                      </div>
                    )}

                    {/* Tags Recommendations */}
                    {tags.length < 5 && (
                      <div className="flex gap-3 p-3 bg-white rounded-lg">
                        <span className="text-orange-500 font-bold">🏷️</span>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Add More Tags</p>
                          <p className="text-xs text-gray-600 mt-1">Add {5 - tags.length} more tags. Mix broad and specific keywords!</p>
                        </div>
                      </div>
                    )}
                    {tags.length > 10 && (
                      <div className="flex gap-3 p-3 bg-white rounded-lg">
                        <span className="text-orange-500 font-bold">🎯</span>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Focus Your Tags</p>
                          <p className="text-xs text-gray-600 mt-1">Remove {tags.length - 10} tags. Keep only the most relevant ones.</p>
                        </div>
                      </div>
                    )}

                    {/* Hashtags Recommendations */}
                    {hashtags.length < 3 && (
                      <div className="flex gap-3 p-3 bg-white rounded-lg">
                        <span className="text-orange-500 font-bold">#️⃣</span>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Add Hashtags</p>
                          <p className="text-xs text-gray-600 mt-1">Add {3 - hashtags.length} more hashtags for better discoverability.</p>
                        </div>
                      </div>
                    )}
                    {hashtags.length > 5 && hashtags.length <= 15 && (
                      <div className="flex gap-3 p-3 bg-white rounded-lg">
                        <span className="text-blue-500 font-bold">💡</span>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Optimize Hashtags</p>
                          <p className="text-xs text-gray-600 mt-1">3-5 hashtags work best. Consider removing less relevant ones.</p>
                        </div>
                      </div>
                    )}
                    {hashtags.length > 15 && (
                      <div className="flex gap-3 p-3 bg-white rounded-lg">
                        <span className="text-red-500 font-bold">⚠️</span>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Too Many Hashtags!</p>
                          <p className="text-xs text-gray-600 mt-1">YouTube shows only first 15. Remove {hashtags.length - 15} hashtags.</p>
                        </div>
                      </div>
                    )}

                    {/* Success Message */}
                    {seoScore >= 80 && (
                      <div className="flex gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <span className="text-green-600 font-bold">🎉</span>
                        <div>
                          <p className="font-semibold text-green-900 text-sm">Excellent Work!</p>
                          <p className="text-xs text-green-700 mt-1">Your content is well optimized and ready to publish!</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* AI Generator Card */}
            <div className="bg-blue-600 rounded-2xl p-6 sticky top-24 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">AI Generator</h3>
              </div>
              <p className="text-blue-100 text-sm mb-4">Generate everything from just a topic name</p>
              <button
                onClick={() => setShowAiModal(true)}
                className="w-full px-4 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
              >
                Generate Content
              </button>
            </div>

            {/* Best Practices Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Best Practices</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Title Length</p>
                    <p className="text-xs text-gray-600 mt-0.5">Keep it between 60-70 characters for optimal display</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Keywords</p>
                    <p className="text-xs text-gray-600 mt-0.5">Place important keywords in the first 150 characters</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Tags</p>
                    <p className="text-xs text-gray-600 mt-0.5">Use 5-10 relevant tags for better categorization</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Hashtags</p>
                    <p className="text-xs text-gray-600 mt-0.5">Add 3-5 hashtags for maximum reach</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <SupportButton />
      <CreditBanner credits={credits} loading={creditsLoading} />
      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
      <TermsModal isOpen={showTermsModal} onAccept={handleAcceptTerms} />
      </div>
    </div>
  );
}

export default App;
