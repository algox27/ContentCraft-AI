import type { AnalysisResults, MetadataInput } from '../types';

export function exportToJSON(metadata: MetadataInput, analysis: AnalysisResults): string {
  const data = {
    metadata,
    analysis,
    exportedAt: new Date().toISOString(),
    version: '1.0.0',
  };
  return JSON.stringify(data, null, 2);
}

export function exportToCSV(metadata: MetadataInput, analysis: AnalysisResults): string {
  const rows = [
    ['Metric', 'Value', 'Score'],
    ['Title', metadata.title, analysis.title.score.toString()],
    ['Description Length', metadata.description.length.toString(), analysis.description.score.toString()],
    ['Tags Count', metadata.tags.length.toString(), analysis.tags.score.toString()],
    ['Hashtags Count', metadata.hashtags.length.toString(), analysis.hashtags.score.toString()],
    ['Overall Score', '', analysis.overall.score.toString()],
    ['Grade', analysis.overall.grade, ''],
    ['Status', analysis.overall.status, ''],
  ];

  return rows.map((row) => row.join(',')).join('\n');
}

export function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
