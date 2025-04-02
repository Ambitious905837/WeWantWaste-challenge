import { useState, useEffect } from 'react';
import './App.css';
import SkipSelection from './components/SkipSelection';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import { Skip } from './types';
import { Loader2, AlertCircle, Truck } from 'lucide-react';

function App() {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
        if (!response.ok) {
          throw new Error('Failed to fetch skip data');
        }
        const data = await response.json();
        
        // Sort skips by size for better display
        const sortedSkips = [...data].sort((a, b) => a.size - b.size);
        setSkips(sortedSkips);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Custom gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 to-slate-900 -z-10">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-500/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary-500/5 blur-[150px] rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col min-h-screen">
        <NavigationBar />
        
        {loading ? (
          <div className="flex flex-col justify-center items-center flex-grow pb-32">
            <div className="glass rounded-xl p-8 flex flex-col items-center animate-fade-in">
              <div className="w-16 h-16 relative mb-6">
                <Loader2 className="w-16 h-16 text-primary-500 animate-spin" />
                <div className="absolute inset-0 bg-primary-500/10 blur-xl rounded-full"></div>
              </div>
              <h3 className="text-xl font-medium mb-2">Loading Available Skips</h3>
              <p className="text-slate-400">Searching for the best options in your area</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex-grow flex items-center justify-center pb-32">
            <div className="glass rounded-xl border border-red-500/30 p-8 max-w-md mx-auto animate-fade-in">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-medium text-center mb-3 text-red-400">Error Loading Data</h3>
              <p className="text-slate-300 mb-6 text-center">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="w-full py-3 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all flex items-center justify-center gap-2 hover:shadow-lg"
              >
                <span>Try Again</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ) : skips.length === 0 ? (
          <div className="flex-grow flex items-center justify-center pb-32">
            <div className="glass rounded-xl border border-slate-700 p-8 max-w-md mx-auto text-center animate-fade-in">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-medium mb-3">No Skips Available</h3>
              <p className="text-slate-400 mb-6">We couldn't find any skips available in your area at the moment</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-all hover:shadow-glow transform hover:-translate-y-1"
              >
                Search Again
              </button>
            </div>
          </div>
        ) : (
          <SkipSelection 
            skips={skips} 
            selectedSkip={selectedSkip} 
            onSelectSkip={setSelectedSkip} 
          />
        )}
      </div>
      
      {/* Always show footer, regardless of loading or selection state */}
      <Footer 
        selectedSkip={selectedSkip} 
        onBack={() => console.log('Back clicked')} 
        onContinue={() => console.log('Continue clicked')} 
      />
    </div>
  );
}

export default App;