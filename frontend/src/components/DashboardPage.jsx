
import { useApp } from '../contexts/AppContext';

export function DashboardPage() {
  const { fontSize } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8" style={{ fontSize: `${fontSize}px` }}>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-gray-600">Welcome to your dashboard. Here you can manage your listings, view analytics, and track your business activities.</p>
      </div>
    </div>
  );
}
