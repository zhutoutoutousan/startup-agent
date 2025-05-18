import { useState } from 'react';
import type { IndustryData } from '@startup-agent/shared-types';

export default function Home() {
  const [data, setData] = useState<IndustryData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchIndustryData = async () => {
    setLoading(true);
    try {
      // TODO: Implement API call to fetch industry data
      const response = await fetch('/api/industry-data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching industry data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Knowledge Acquisition System</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Sources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={fetchIndustryData}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Fetch Industry Data'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Acquired Data</h2>
          {data.length === 0 ? (
            <p className="text-gray-500">No data acquired yet. Click the button above to fetch data.</p>
          ) : (
            <div className="space-y-4">
              {data.map((item) => (
                <div key={item.id} className="border rounded p-4">
                  <h3 className="font-semibold">{item.source}</h3>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(item.metadata.date).toLocaleDateString()}
                  </p>
                  <p className="mt-2">{item.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 