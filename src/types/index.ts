// Core Input Types
export interface MetadataInput {
  title: string;
  description: string;
  tags: string[];
  hashtags: string[];
  category?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// Analysis Result Types
export interface TitleAnalysis {
  score: number;
  length: number;
  hasNumbers: boolean;
  hasPowerWords: boolean;
  keywordPlacement: 'beginning' | 'middle' | 'end' | 'none';
  recommendations: Recommendation[];
}

export interface DescriptionAnalysis {
  score: number;
  length: number;
  keywordDensity: number;
  hasCallToAction: boolean;
  hasTimestamps: boolean;
  hasLinks: boolean;
  readabilityScore: number;
  recommendations: Recommendation[];
}

export interface TagAnalysis {
  score: number;
  totalCharacters: number;
  tagCount: number;
  hasBroadKeywords: boolean;
  hasSpecificKeywords: boolean;
  redundancyLevel: number;
  suggestedTags: string[];
  recommendations: Recommendation[];
}

export interface HashtagAnalysis {
  score: number;
  hashtagCount: number;
  popularityScore: number;
  relevanceScore: number;
  trendingHashtags: string[];
  recommendations: Recommendation[];
}

// Component Scores
export interface ComponentScores {
  title: number;
  description: number;
  tags: number;
  hashtags: number;
}

// Overall Score
export interface OverallScore {
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  status: 'excellent' | 'good' | 'needs-improvement' | 'poor';
  criticalIssues: string[];
}

// Recommendation Types
export interface Recommendation {
  id: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: 'title' | 'description' | 'tags' | 'hashtags';
  issue: string;
  suggestion: string;
  impact: number;
}

// Keyword Types
export interface KeywordSuggestion {
  keyword: string;
  searchVolume: 'high' | 'medium' | 'low';
  competition: 'high' | 'medium' | 'low';
  category: 'primary' | 'secondary' | 'long-tail';
  relevanceScore: number;
}

export interface KeywordDensity {
  keyword: string;
  count: number;
  density: number;
  positions: number[];
}

export interface CategorizedKeywords {
  primary: string[];
  secondary: string[];
  longTail: string[];
}

// Storage Types
export interface SavedAnalysis {
  id: string;
  timestamp: Date;
  version: string;
  metadata: MetadataInput;
  results: AnalysisResults;
  overallScore: OverallScore;
}

export interface AnalysisSummary {
  id: string;
  timestamp: Date;
  version: string;
  score: number;
  title: string;
}

export interface AnalysisComparison {
  version1: SavedAnalysis;
  version2: SavedAnalysis;
  scoreDifference: number;
  improvements: string[];
  regressions: string[];
}

// Complete Analysis Results
export interface AnalysisResults {
  title: TitleAnalysis;
  description: DescriptionAnalysis;
  tags: TagAnalysis;
  hashtags: HashtagAnalysis;
  overall: OverallScore;
  recommendations: Recommendation[];
  timestamp: Date;
}

export interface ComponentAnalyses {
  title: TitleAnalysis;
  description: DescriptionAnalysis;
  tags: TagAnalysis;
  hashtags: HashtagAnalysis;
}

// Engine Interfaces
export interface AnalysisEngine {
  analyzeTitle(title: string): TitleAnalysis;
  analyzeDescription(description: string): DescriptionAnalysis;
  analyzeTags(tags: string[]): TagAnalysis;
  analyzeHashtags(hashtags: string[]): HashtagAnalysis;
  calculateOverallScore(analyses: ComponentAnalyses): OverallScore;
}

export interface ScoringEngine {
  calculateTitleScore(analysis: TitleAnalysis): number;
  calculateDescriptionScore(analysis: DescriptionAnalysis): number;
  calculateTagScore(analysis: TagAnalysis): number;
  calculateHashtagScore(analysis: HashtagAnalysis): number;
  calculateOverallScore(componentScores: ComponentScores): number;
}

export interface KeywordEngine {
  extractKeywords(text: string): string[];
  suggestKeywords(topic: string): KeywordSuggestion[];
  analyzeKeywordDensity(text: string, keywords: string[]): KeywordDensity[];
  categorizeKeywords(keywords: string[]): CategorizedKeywords;
}

export interface StorageManager {
  saveAnalysis(analysis: SavedAnalysis): string;
  loadAnalysis(id: string): SavedAnalysis | null;
  listAnalyses(): AnalysisSummary[];
  deleteAnalysis(id: string): boolean;
  compareAnalyses(id1: string, id2: string): AnalysisComparison | null;
  exportAnalysis(id: string, format: 'json' | 'csv'): string;
}

export interface RecommendationEngine {
  generateRecommendations(analyses: ComponentAnalyses): Recommendation[];
  prioritizeRecommendations(recommendations: Recommendation[]): Recommendation[];
}

// Application State
export interface AppState {
  currentMetadata: MetadataInput;
  currentAnalysis: AnalysisResults | null;
  savedAnalyses: SavedAnalysis[];
  isAnalyzing: boolean;
  error: string | null;
}

// Error Types
export type ErrorType = 'VALIDATION_ERROR' | 'ANALYSIS_ERROR' | 'STORAGE_ERROR' | 'EXPORT_ERROR';

export interface AppError {
  type: ErrorType;
  message: string;
  field?: string;
  details?: any;
}

// Scoring Rules Configuration
export interface ScoringRules {
  title: {
    optimalLength: { min: number; max: number };
    powerWords: string[];
    weights: {
      length: number;
      keywords: number;
      powerWords: number;
      numbers: number;
    };
  };
  description: {
    optimalLength: { min: number; max: number };
    optimalKeywordDensity: { min: number; max: number };
    weights: {
      length: number;
      keywordDensity: number;
      callToAction: number;
      structure: number;
    };
  };
  tags: {
    optimalCount: { min: number; max: number };
    maxCharacters: number;
    weights: {
      count: number;
      diversity: number;
      relevance: number;
    };
  };
  hashtags: {
    optimalCount: { min: number; max: number };
    weights: {
      count: number;
      popularity: number;
      relevance: number;
    };
  };
}
