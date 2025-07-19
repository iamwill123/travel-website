import React, { useState } from 'react'

import { TravelRecommendation } from '../types'

interface AddRecommendationProps {
  onAdd: (recommendation: Omit<TravelRecommendation, 'id' | 'date'>) => void;
  onCancel: () => void;
}

const AddRecommendation: React.FC<AddRecommendationProps> = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    category: 'other' as TravelRecommendation['category'],
    description: '',
    tips: '',
    rating: 5,
    author: '',
    imageUrl: '',
    tags: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const categories = [
    { value: 'restaurant', label: 'Restaurant', icon: '🍽️' },
    { value: 'attraction', label: 'Attraction', icon: '🏛️' },
    { value: 'hotel', label: 'Hotel', icon: '🏨' },
    { value: 'activity', label: 'Activity', icon: '🎯' },
    { value: 'transport', label: 'Transport', icon: '🚗' },
    { value: 'other', label: 'Other', icon: '📝' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.destination.trim()) newErrors.destination = 'Destination is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.tips.trim()) newErrors.tips = 'Travel tips are required';
    if (!formData.author.trim()) newErrors.author = 'Author name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const recommendation: Omit<TravelRecommendation, 'id' | 'date'> = {
      title: formData.title.trim(),
      destination: formData.destination.trim(),
      category: formData.category,
      description: formData.description.trim(),
      tips: formData.tips.trim(),
      rating: formData.rating,
      author: formData.author.trim(),
      imageUrl: formData.imageUrl.trim() || undefined,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    };

    onAdd(recommendation);
  };

  return (
    <div className="add-form">
      <div className="form-header">
        <h2 className="form-title">Share Your Travel Tip</h2>
        <button
          onClick={onCancel}
          className="close-btn"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Title */}
          <div className="form-group full-width">
            <label htmlFor="title" className="form-label">
              Recommendation Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`form-input ${errors.title ? 'error' : ''}`}
              placeholder="e.g., Amazing Street Food in Bangkok"
            />
            {errors.title && <p className="error-message">{errors.title}</p>}
          </div>

          {/* Destination */}
          <div className="form-group">
            <label htmlFor="destination" className="form-label">
              Destination *
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className={`form-input ${errors.destination ? 'error' : ''}`}
              placeholder="e.g., Bangkok, Thailand"
            />
            {errors.destination && <p className="error-message">{errors.destination}</p>}
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.icon} {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div className="form-group">
            <label htmlFor="rating" className="form-label">
              Rating (1-5)
            </label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="form-select"
            >
              {[5, 4, 3, 2, 1].map(rating => (
                <option key={rating} value={rating}>
                  {'⭐'.repeat(rating)} ({rating}/5)
                </option>
              ))}
            </select>
          </div>

          {/* Author */}
          <div className="form-group">
            <label htmlFor="author" className="form-label">
              Your Name *
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={`form-input ${errors.author ? 'error' : ''}`}
              placeholder="e.g., TravelLover123"
            />
            {errors.author && <p className="error-message">{errors.author}</p>}
          </div>

          {/* Image URL */}
          <div className="form-group">
            <label htmlFor="imageUrl" className="form-label">
              Image URL (optional)
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="form-input"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Tags */}
          <div className="form-group full-width">
            <label htmlFor="tags" className="form-label">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., street food, budget-friendly, local experience"
            />
          </div>

          {/* Description */}
          <div className="form-group full-width">
            <label htmlFor="description" className="form-label">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`form-textarea ${errors.description ? 'error' : ''}`}
              placeholder="Describe the place, experience, or recommendation..."
            />
            {errors.description && <p className="error-message">{errors.description}</p>}
          </div>

          {/* Travel Tips */}
          <div className="form-group full-width">
            <label htmlFor="tips" className="form-label">
              Travel Tips *
            </label>
            <textarea
              id="tips"
              name="tips"
              value={formData.tips}
              onChange={handleChange}
              rows={3}
              className={`form-textarea ${errors.tips ? 'error' : ''}`}
              placeholder="Share your insider tips, best times to visit, what to bring, etc..."
            />
            {errors.tips && <p className="error-message">{errors.tips}</p>}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Share Recommendation
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecommendation; 