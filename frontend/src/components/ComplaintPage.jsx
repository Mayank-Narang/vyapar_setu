
import { useApp } from '../contexts/AppContext';

export function ComplaintPage() {
  const { fontSize } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8" style={{ fontSize: `${fontSize}px` }}>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Raise a Complaint</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-gray-600 mb-4">Have an issue? Let us know and we'll help resolve it.</p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400"
              placeholder="Brief description of the issue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400"
              placeholder="Detailed description of your complaint"
            />
          </div>
          <button
            type="submit"
            className="bg-orange-400 text-white py-2 px-6 rounded hover:bg-orange-500 transition-colors"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}
