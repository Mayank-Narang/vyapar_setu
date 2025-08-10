
import { useApp } from '../contexts/AppContext';

export function RegisterPage() {
  const { fontSize } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8" style={{ fontSize: `${fontSize}px` }}>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Register</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-gray-600 mb-4">Join our marketplace to start buying and selling.</p>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"
            className="bg-orange-400 text-white py-2 px-6 rounded hover:bg-orange-600 transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
