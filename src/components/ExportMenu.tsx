import { useState } from 'react';
import type { AnalysisResults, MetadataInput } from '../types';
import { exportToJSON, exportToCSV, downloadFile, copyToClipboard } from '../utils/export';

interface ExportMenuProps {
  metadata: MetadataInput;
  analysis: AnalysisResults;
  onClose: () => void;
}

export const ExportMenu = ({ metadata, analysis, onClose }: ExportMenuProps) => {
  const [copied, setCopied] = useState(false);

  const handleExportJSON = () => {
    const content = exportToJSON(metadata, analysis);
    downloadFile(content, `seo-analysis-${Date.now()}.json`, 'application/json');
    onClose();
  };

  const handleExportCSV = () => {
    const content = exportToCSV(metadata, analysis);
    downloadFile(content, `seo-analysis-${Date.now()}.csv`, 'text/csv');
    onClose();
  };

  const handleCopyJSON = async () => {
    const content = exportToJSON(metadata, analysis);
    await copyToClipboard(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleExportJSON}
        className="w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300 rounded-xl transition-all"
      >
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        <div className="flex-1 text-left">
          <div className="font-semibold text-gray-900">Export as JSON</div>
          <div className="text-xs text-gray-500">Download complete analysis data</div>
        </div>
      </button>

      <button
        onClick={handleExportCSV}
        className="w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-green-50 border-2 border-gray-200 hover:border-green-300 rounded-xl transition-all"
      >
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <div className="flex-1 text-left">
          <div className="font-semibold text-gray-900">Export as CSV</div>
          <div className="text-xs text-gray-500">Download spreadsheet format</div>
        </div>
      </button>

      <button
        onClick={handleCopyJSON}
        className="w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-purple-50 border-2 border-gray-200 hover:border-purple-300 rounded-xl transition-all"
      >
        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <div className="flex-1 text-left">
          <div className="font-semibold text-gray-900">
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </div>
          <div className="text-xs text-gray-500">Copy JSON data to clipboard</div>
        </div>
      </button>
    </div>
  );
};
