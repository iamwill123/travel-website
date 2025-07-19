import React, { useState } from 'react'

import { TravelRecommendation } from '../types'
import RecommendationCard from './RecommendationCard'

interface RecommendationsListProps {
  recommendations: TravelRecommendation[];
}

const RecommendationsList: React.FC<RecommendationsListProps> = ({ recommendations }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All', icon: '🌍' },
    { id: 'restaurant', name: 'Restaurants', icon: '🍽️' },
    { id: 'attraction', name: 'Attractions', icon: '🏛️' },
    { id: 'hotel', name: 'Hotels', icon: '🏨' },
    { id: 'activity', name: 'Activities', icon: '🎯' },
    { id: 'transport', name: 'Transport', icon: '🚗' },
    { id: 'other', name: 'Other', icon: '📝' }
  ];

  const filteredRecommendations = recommendations.filter(rec => {
    const matchesCategory = selectedCategory === 'all' || rec.category === selectedCategory;
    const matchesSearch = rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Search and Filter Section */}
      <div className="search-filter">
        <div className="search-filter-content">
          <div className="search-input">
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search destinations, places, or tips..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-header">
        <h2 className="results-title">
          Travel Recommendations
        </h2>
        <p className="results-count">
          {filteredRecommendations.length} recommendation{filteredRecommendations.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Recommendations Grid */}
      {filteredRecommendations.length === 0 ? (
        <div className="empty-state">
          <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
          </svg>
          <h3 className="empty-title">No recommendations found</h3>
          <p className="empty-description">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="recommendations-grid">
          {filteredRecommendations.map(recommendation => (
            <RecommendationCard key={recommendation.id} recommendation={recommendation} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationsList; 