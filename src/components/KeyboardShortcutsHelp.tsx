interface Shortcut {
  keys: string[];
  description: string;
}

const shortcuts: Shortcut[] = [
  { keys: ['Ctrl', 'Enter'], description: 'Analyze SEO Score' },
  { keys: ['Ctrl', 'S'], description: 'Save Analysis' },
  { keys: ['Ctrl', 'E'], description: 'Export Results' },
  { keys: ['Ctrl', 'K'], description: 'Clear All Fields' },
  { keys: ['?'], description: 'Show Keyboard Shortcuts' },
];

export const KeyboardShortcutsHelp = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900">Keyboard Shortcuts</h3>
      <div className="space-y-2">
        {shortcuts.map((shortcut, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-700">{shortcut.description}</span>
            <div className="flex items-center gap-1">
              {shortcut.keys.map((key, i) => (
                <span key={i}>
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded shadow-sm">
                    {key}
                  </kbd>
                  {i < shortcut.keys.length - 1 && <span className="mx-1 text-gray-400">+</span>}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
