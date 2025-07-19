import React, { useState } from 'react'

import AddRecommendation from './components/AddRecommendation'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import RecommendationsList from './components/RecommendationsList'
import { TravelRecommendation } from './types'

function App() {
  const [recommendations, setRecommendations] = useState<TravelRecommendation[]>([
    {
      id: '1',
      title: 'Amazing Street Food in Bangkok',
      destination: 'Bangkok, Thailand',
      category: 'restaurant',
      description: 'Discover the best street food spots in Bangkok\'s Chinatown area.',
      tips: 'Visit during evening hours for the best experience. Try the pad thai and mango sticky rice!',
      rating: 5,
      author: 'TravelLover123',
      date: '2024-01-15',
      imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tags: ['street food', 'thai cuisine', 'budget-friendly']
    },
    {
      id: '2',
      title: 'Hidden Beach Paradise in Bali',
      destination: 'Bali, Indonesia',
      category: 'attraction',
      description: 'A secluded beach that most tourists don\'t know about.',
      tips: 'Go early in the morning to avoid crowds. Bring your own snacks and water.',
      rating: 4,
      author: 'BeachExplorer',
      date: '2024-01-10',
      imageUrl: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tags: ['beach', 'hidden gem', 'nature']
    },
    {
      id: '3',
      title: 'Cozy Boutique Hotel in Paris',
      destination: 'Paris, France',
      category: 'hotel',
      description: 'A charming boutique hotel in the heart of Montmartre.',
      tips: 'Book the room with Eiffel Tower view. The breakfast is included and amazing!',
      rating: 5,
      author: 'ParisAdventurer',
      date: '2024-01-08',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      tags: ['boutique', 'romantic', 'central location']
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const addRecommendation = (recommendation: Omit<TravelRecommendation, 'id' | 'date'>) => {
    const newRecommendation: TravelRecommendation = {
      ...recommendation,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setRecommendations([newRecommendation, ...recommendations]);
    setShowAddForm(false);
  };

  return (
    <div>
      <Header onAddClick={() => setShowAddForm(true)} />
      <Hero />

      <main className="main">
        <div className="container">
          {showAddForm && (
            <AddRecommendation
              onAdd={addRecommendation}
              onCancel={() => setShowAddForm(false)}
            />
          )}

          <RecommendationsList recommendations={recommendations} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
