import { Skip } from '../types';
import SkipCard from './SkipCard';
import { useState, useEffect } from 'react';

interface SkipSelectionProps {
  skips: Skip[];
  selectedSkip: Skip | null;
  onSelectSkip: (skip: Skip) => void;
}

const SkipSelection = ({ skips, selectedSkip, onSelectSkip }: SkipSelectionProps) => {
  return (
    <div className="w-full pb-32 animate-fade-in">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold mb-2 gradient-text">Choose Your Skip Size</h2>
        <p className="text-slate-400 max-w-xl mx-auto">Select the skip size that best suits your needs for your waste removal project</p>
      </div>
      
      {/* Results count */}
      <div className="flex justify-between items-center mb-6 bg-slate-800/30 rounded-lg px-4 py-3 border border-slate-700/50">
        <p className="text-slate-300">
          <span className="text-white font-medium">{skips.length}</span> {skips.length === 1 ? 'skip' : 'skips'} available
        </p>
      </div>
      
      {skips.length === 0 ? (
        <div className="text-center py-16 glass rounded-xl border border-slate-700 animate-fade-in">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">No skips available</h3>
          <p className="text-slate-400 mb-4">We couldn't find any skips in your area</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skips.map((skip, index) => (
            <div 
              key={skip.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <SkipCard
                skip={skip}
                isSelected={selectedSkip?.id === skip.id}
                onSelect={() => onSelectSkip(skip)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkipSelection;