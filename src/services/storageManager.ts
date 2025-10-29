import type { SavedAnalysis, AnalysisSummary, AnalysisComparison } from '../types';

const STORAGE_KEY = 'youtube-seo-analyses';

/**
 * Save analysis to LocalStorage
 * Requirements: 7.1
 */
export function saveAnalysis(analysis: SavedAnalysis): string {
  try {
    const analyses = loadAllAnalyses();
    analyses.push(analysis);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(analyses));
    return analysis.id;
  } catch (error) {
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      throw new Error('Storage quota exceeded. Please delete some saved analyses.');
    }
    throw error;
  }
}

/**
 * Load analysis by ID
 * Requirements: 7.2
 */
export function loadAnalysis(id: string): SavedAnalysis | null {
  const analyses = loadAllAnalyses();
  const analysis = analyses.find(a => a.id === id);
  return analysis || null;
}

/**
 * List all saved analyses
 * Requirements: 7.2
 */
export function listAnalyses(): AnalysisSummary[] {
  const analyses = loadAllAnalyses();
  return analyses.map(a => ({
    id: a.id,
    timestamp: a.timestamp,
    version: a.version,
    score: a.overallScore.score,
    title: a.metadata.title || 'Untitled',
  }));
}

/**
 * Delete analysis by ID
 * Requirements: 7.2
 */
export function deleteAnalysis(id: string): boolean {
  try {
    const analyses = loadAllAnalyses();
    const filtered = analyses.filter(a => a.id !== id);
    
    if (filtered.length === analyses.length) {
      return false; // ID not found
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Compare two analyses
 * Requirements: 7.3, 7.4
 */
export function compareAnalyses(id1: string, id2: string): AnalysisComparison | null {
  const analysis1 = loadAnalysis(id1);
  const analysis2 = loadAnalysis(id2);
  
  if (!analysis1 || !analysis2) {
    return null;
  }
  
  const scoreDifference = analysis2.overallScore.score - analysis1.overallScore.score;
  const improvements: string[] = [];
  const regressions: string[] = [];
  
  // Compare component scores
  if (analysis2.results.title.score > analysis1.results.title.score) {
    improvements.push(`Title score improved by ${analysis2.results.title.score - analysis1.results.title.score} points`);
  } else if (analysis2.results.title.score < analysis1.results.title.score) {
    regressions.push(`Title score decreased by ${analysis1.results.title.score - analysis2.results.title.score} points`);
  }
  
  if (analysis2.results.description.score > analysis1.results.description.score) {
    improvements.push(`Description score improved by ${analysis2.results.description.score - analysis1.results.description.score} points`);
  } else if (analysis2.results.description.score < analysis1.results.description.score) {
    regressions.push(`Description score decreased by ${analysis1.results.description.score - analysis2.results.description.score} points`);
  }
  
  if (analysis2.results.tags.score > analysis1.results.tags.score) {
    improvements.push(`Tags score improved by ${analysis2.results.tags.score - analysis1.results.tags.score} points`);
  } else if (analysis2.results.tags.score < analysis1.results.tags.score) {
    regressions.push(`Tags score decreased by ${analysis1.results.tags.score - analysis2.results.tags.score} points`);
  }
  
  if (analysis2.results.hashtags.score > analysis1.results.hashtags.score) {
    improvements.push(`Hashtags score improved by ${analysis2.results.hashtags.score - analysis1.results.hashtags.score} points`);
  } else if (analysis2.results.hashtags.score < analysis1.results.hashtags.score) {
    regressions.push(`Hashtags score decreased by ${analysis1.results.hashtags.score - analysis2.results.hashtags.score} points`);
  }
  
  return {
    version1: analysis1,
    version2: analysis2,
    scoreDifference,
    improvements,
    regressions,
  };
}

/**
 * Export analysis to JSON or CSV
 * Requirements: 7.5
 */
export function exportAnalysis(id: string, format: 'json' | 'csv'): string {
  const analysis = loadAnalysis(id);
  
  if (!analysis) {
    throw new Error('Analysis not found');
  }
  
  if (format === 'json') {
    return JSON.stringify(analysis, null, 2);
  }
  
  // CSV format
  const csv = [
    'Category,Score,Details',
    `Overall,${analysis.overallScore.score},Grade: ${analysis.overallScore.grade}`,
    `Title,${analysis.results.title.score},Length: ${analysis.results.title.length}`,
    `Description,${analysis.results.description.score},Length: ${analysis.results.description.length}`,
    `Tags,${analysis.results.tags.score},Count: ${analysis.results.tags.tagCount}`,
    `Hashtags,${analysis.results.hashtags.score},Count: ${analysis.results.hashtags.hashtagCount}`,
  ].join('\n');
  
  return csv;
}

/**
 * Helper function to load all analyses from LocalStorage
 */
function loadAllAnalyses(): SavedAnalysis[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const analyses = JSON.parse(data);
    // Convert timestamp strings back to Date objects
    return analyses.map((a: any) => ({
      ...a,
      timestamp: new Date(a.timestamp),
      results: {
        ...a.results,
        timestamp: new Date(a.results.timestamp),
      },
    }));
  } catch (error) {
    console.error('Error loading analyses:', error);
    return [];
  }
}

/**
 * Clear all saved analyses
 */
export function clearAllAnalyses(): void {
  localStorage.removeItem(STORAGE_KEY);
}
