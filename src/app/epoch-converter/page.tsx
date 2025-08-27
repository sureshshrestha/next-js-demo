import EpochConverter from '@/components/EpochConverter';

export default function EpochConverterPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <EpochConverter />
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Epoch Time Converter | Next.js Demo',
  description: 'Convert between epoch timestamps and human-readable dates',
};