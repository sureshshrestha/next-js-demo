'use client';

import { useState, useEffect } from 'react';

export default function EpochConverter() {
  const [epoch, setEpoch] = useState<string>('');
  const [humanDate, setHumanDate] = useState<string>('');
  const [currentEpoch, setCurrentEpoch] = useState<number>(0);

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    };

    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const epochToHuman = (epochValue: string) => {
    if (!epochValue) return '';
    
    const timestamp = parseInt(epochValue);
    if (isNaN(timestamp)) return 'Invalid epoch';

    // Handle both seconds and milliseconds
    const date = new Date(timestamp < 10000000000 ? timestamp * 1000 : timestamp);
    
    if (isNaN(date.getTime())) return 'Invalid epoch';

    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  };

  const humanToEpoch = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    
    return Math.floor(date.getTime() / 1000).toString();
  };

  const handleEpochChange = (value: string) => {
    setEpoch(value);
    const converted = epochToHuman(value);
    if (converted && !converted.includes('Invalid')) {
      const date = new Date(parseInt(value) < 10000000000 ? parseInt(value) * 1000 : parseInt(value));
      setHumanDate(date.toISOString().slice(0, 16));
    }
  };

  const handleHumanDateChange = (value: string) => {
    setHumanDate(value);
    const converted = humanToEpoch(value);
    if (converted && !converted.includes('Invalid')) {
      setEpoch(converted);
    }
  };

  const useCurrentTime = () => {
    const now = Math.floor(Date.now() / 1000);
    setEpoch(now.toString());
    setHumanDate(new Date().toISOString().slice(0, 16));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Epoch Time Converter
      </h2>

      {/* Current Time Display */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-200">
          Current Time
        </h3>
        <div className="text-sm text-blue-700 dark:text-blue-300">
          <div>Epoch: {currentEpoch}</div>
          <div>Human: {new Date().toLocaleString()}</div>
        </div>
        <button
          onClick={useCurrentTime}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
        >
          Use Current Time
        </button>
      </div>

      {/* Epoch to Human */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Epoch Timestamp (seconds or milliseconds)
        </label>
        <input
          type="text"
          value={epoch}
          onChange={(e) => handleEpochChange(e.target.value)}
          placeholder="e.g., 1234567890 or 1234567890123"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
        <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded text-sm">
          <strong>Result:</strong> {epochToHuman(epoch) || 'Enter epoch timestamp'}
        </div>
      </div>

      {/* Human to Epoch */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Human-Readable Date
        </label>
        <input
          type="datetime-local"
          value={humanDate}
          onChange={(e) => handleHumanDateChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
        <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded text-sm">
          <strong>Result:</strong> {humanToEpoch(humanDate) || 'Select date and time'}
        </div>
      </div>

      {/* Quick Examples */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
          Quick Examples
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { epoch: '0', desc: 'Unix Epoch Start' },
            { epoch: '1000000000', desc: 'Billion Seconds' },
            { epoch: '1234567890', desc: 'Common Example' },
            { epoch: '2147483647', desc: '32-bit Max Value' }
          ].map(({ epoch: exampleEpoch, desc }) => (
            <button
              key={exampleEpoch}
              onClick={() => handleEpochChange(exampleEpoch)}
              className="p-3 text-left bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="font-mono text-sm">{exampleEpoch}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{desc}</div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {epochToHuman(exampleEpoch)}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}