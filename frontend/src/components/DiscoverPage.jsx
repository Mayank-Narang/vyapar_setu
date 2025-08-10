
import { useState, useEffect } from 'react';
import { Search, MapPin, Tag } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function DiscoverPage() {
  const { fontSize } = useApp();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  useEffect(() => {
    fetch('/api/discover')
      .then(res => res.json())
      .then(data => {
        setListings(data);
        setFilteredListings(data);
      })
      .catch(err => console.error('Error fetching listings:', err));
  }, []);

  useEffect(() => {
    let filtered = listings;

    if (searchTerm) {
      filtered = filtered.filter(listing =>
        listing.title?.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(listing => listing.category === selectedCategory);
    }

    if (selectedLocation !== 'All Locations') {
      filtered = filtered.filter(listing => listing.location === selectedLocation);
    }

    if (selectedStatus !== 'All Status') {
      filtered = filtered.filter(listing => listing.status === selectedStatus);
    }

    setFilteredListings(filtered);
  }, [listings, searchTerm, selectedCategory, selectedLocation, selectedStatus]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Under Discussion': return 'bg-yellow-100 text-yellow-800';
      case 'Booked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8" style={{ fontSize: `${fontSize}px` }}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Marketplace</h1>
        <p className="text-gray-600">
          Find warehouse space, transport fleet, and raw materials from verified MSMEs across Delhi/NCR
        </p>
      </div>

      {/* Search & Filter Section */}
      <div className="bg-white rounded-lg shadow-sm border-0 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Search size={20} className="text-orange-400" />
          <span className="font-medium text-gray-700">Search & Filter</span>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search listings by title, description, or location..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option>All Categories</option>
              <option>Warehouse Space</option>
              <option>Transport Fleet</option>
              <option>Raw Material Procurement</option>
              <option>Storage Unit</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option>All Locations</option>
              <option>Delhi</option>
              <option>Ghaziabad</option>
              <option>Faridabad</option>
              <option>Gurugram</option>
              <option>Noida</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option>All Status</option>
              <option>Available</option>
              <option>Under Discussion</option>
              <option>Booked</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredListings.length} of {listings.length} listings
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <div key={listing._id} className="bg-white rounded-lg shadow-sm border-0 overflow-hidden hover:shadow-md transition-shadow">
            {listing.image && (
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-48 object-cover"
              />
            )}
            
            <div className="p-4">
              {/* Status Badge */}
              <div className="flex justify-between items-start mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                  {listing.status}
                </span>
              </div>

              {/* Title and Description */}
              <h3 className="font-semibold text-gray-900 mb-2">{listing.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{listing.description}</p>

              {/* Details */}
              <div className="space-y-1 text-sm text-gray-600 mb-4">
                {listing.location && (
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{listing.location}</span>
                  </div>
                )}
                {listing.category && (
                  <div className="flex items-center gap-1">
                    <Tag size={14} />
                    <span>{listing.category}</span>
                  </div>
                )}
                {listing.openDate && (
                  <div className="text-xs">
                    Open: {new Date(listing.openDate).toLocaleDateString()}
                  </div>
                )}
              </div>

              {/* Contact Button */}
              <button className="w-full bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-500 transition-colors">
                Contact Seller
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredListings.length === 0 && listings.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No listings match your search criteria.</p>
        </div>
      )}
    </div>
  );
}
