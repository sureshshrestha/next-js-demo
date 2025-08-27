'use client';

import { useState, useEffect } from 'react';

export default function UnixEpochClock() {
  const [currentTime, setCurrentTime] = useState({
    epoch: 0,
    milliseconds: 0,
    humanDate: '',
    utcDate: ''
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const epoch = Math.floor(now.getTime() / 1000);
      const milliseconds = now.getTime();
      
      setCurrentTime({
        epoch,
        milliseconds,
        humanDate: now.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short'
        }),
        utcDate: now.toUTCString()
      });
    };

    // Update immediately
    updateTime();
    
    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Could add a toast notification here if needed
    });
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          🕰️ Unix Epoch Clock
        </h3>
        <div className="animate-pulse">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Epoch Seconds */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-600">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Epoch Seconds
              </div>
              <div className="font-mono text-2xl font-bold text-blue-600 dark:text-blue-400">
                {currentTime.epoch.toLocaleString()}
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(currentTime.epoch.toString())}
              className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              title="Copy to clipboard"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Epoch Milliseconds */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-600">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Epoch Milliseconds
              </div>
              <div className="font-mono text-lg font-bold text-purple-600 dark:text-purple-400">
                {currentTime.milliseconds.toLocaleString()}
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(currentTime.milliseconds.toString())}
              className="px-3 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
              title="Copy to clipboard"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Human Readable Local Time */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-600">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Local Time
          </div>
          <div className="text-sm text-gray-800 dark:text-gray-200">
            {currentTime.humanDate}
          </div>
        </div>

        {/* UTC Time */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-600">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            UTC Time
          </div>
          <div className="text-sm text-gray-800 dark:text-gray-200 font-mono">
            {currentTime.utcDate}
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
        Updates every second • Click &quot;Copy&quot; to copy timestamps
      </div>
    </div>
  );
}