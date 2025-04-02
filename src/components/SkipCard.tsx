import { Skip } from '../types';
import { AlertTriangle, ArrowRight, Check, Info, Star } from 'lucide-react';
import { useState } from 'react';

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: () => void;
}

const SkipCard = ({ skip, isSelected, onSelect }: SkipCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const isDisabled = !skip.allowed_on_road && !skip.allows_heavy_waste;
  const priceWithVAT = Math.round(skip.price_before_vat * (1 + skip.vat / 100));
  
  // Generate a unique color based on skip size
  const getSkipColor = (size: number) => {
    const colors = [
      { bg: 'from-blue-600/20 to-blue-800/30', text: 'text-blue-400', accent: 'blue-500', border: 'border-blue-500/50' },
      { bg: 'from-purple-600/20 to-purple-800/30', text: 'text-purple-400', accent: 'purple-500', border: 'border-purple-500/50' },
      { bg: 'from-pink-600/20 to-pink-800/30', text: 'text-pink-400', accent: 'pink-500', border: 'border-pink-500/50' },
      { bg: 'from-teal-600/20 to-teal-800/30', text: 'text-teal-400', accent: 'teal-500', border: 'border-teal-500/50' },
      { bg: 'from-orange-600/20 to-orange-800/30', text: 'text-orange-400', accent: 'orange-500', border: 'border-orange-500/50' },
      { bg: 'from-amber-600/20 to-amber-800/30', text: 'text-amber-400', accent: 'amber-500', border: 'border-amber-500/50' },
      { bg: 'from-emerald-600/20 to-emerald-800/30', text: 'text-emerald-400', accent: 'emerald-500', border: 'border-emerald-500/50' },
    ];
    return colors[size % colors.length];
  };
  
  const skipColor = getSkipColor(skip.size);
  
  return (
    <div
      className={`
        group relative rounded-xl overflow-hidden transition-all duration-500 transform card-hover
        ${isSelected 
          ? `border-2 bg-gradient-to-br ${skipColor.bg} scale-[1.02] shadow-xl border-${skipColor.accent}` 
          : isDisabled 
            ? 'border border-slate-700 opacity-60 grayscale' 
            : `border border-slate-700 hover:${skipColor.border}`
        }
        ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}
      onClick={isDisabled ? undefined : onSelect}
      role={isDisabled ? "presentation" : "button"}
      aria-pressed={isSelected}
      aria-disabled={isDisabled}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Selection indicator - animated pulse line */}
      {isSelected && (
        <div className={`absolute top-0 left-0 w-full h-1 bg-${skipColor.accent} z-10 animate-pulse-subtle`} />
      )}
      
      {/* Selected checkmark with animation */}
      {isSelected && (
        <div className={`absolute top-3 right-3 md:top-4 md:right-4 z-10 bg-${skipColor.accent} rounded-full p-1
                     shadow-glow animate-fade-in`}>
          <Check className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </div>
      )}
      
      {/* Selected ribbon indicator for enhanced visibility */}
      {isSelected && (
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden z-20">
          <div className={`absolute top-0 right-0 w-24 h-24 bg-${skipColor.accent} opacity-90 rotate-45 translate-x-8 -translate-y-8 flex items-center justify-center`}></div>
        </div>
      )}
      
      <div className="p-4 md:p-5">
        {/* Image container with hover effects */}
        <div className="relative overflow-hidden rounded-xl transition-all duration-500 
                      group-hover:shadow-md h-52">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent z-10 opacity-70 
                        group-hover:opacity-90 transition-opacity duration-500" />
          
          <img 
            src={`https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&w=800&h=${350 + skip.size * 5}`}
            alt={`${skip.size} Yard Skip`} 
            className={`w-full h-full object-cover object-center transition-all duration-700 ease-in-out
                      ${isHovering && !isDisabled ? 'scale-110' : 'scale-100'}`}
          />
          
          {/* Size badge */}
          <div className={`absolute top-4 left-4 z-20 glass rounded-full px-3 py-1.5
                        shadow-lg transform transition-transform duration-300
                        group-hover:scale-110 ${isSelected ? `bg-${skipColor.accent}/30 border border-${skipColor.accent}/50` : ''}`}>
            <span className={`font-bold ${isSelected ? skipColor.text : 'text-white'}`}>{skip.size} YD</span>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full p-3 flex flex-col gap-2 z-20">
            {!skip.allowed_on_road && (
              <div className="glass px-2.5 py-1.5 rounded-lg inline-flex items-center
                            transform transition-all duration-300 group-hover:translate-y-0 translate-y-1
                            group-hover:opacity-100 opacity-90">
                <AlertTriangle className="w-4 h-4 text-amber-400 mr-2 shrink-0" />
                <span className="text-xs font-medium text-white">Private Property Only</span>
              </div>
            )}
            
            {!skip.allows_heavy_waste && (
              <div className="glass px-2.5 py-1.5 rounded-lg inline-flex items-center
                            transform transition-all duration-300 group-hover:translate-y-0 translate-y-1
                            group-hover:opacity-100 opacity-90">
                <AlertTriangle className="w-4 h-4 text-red-400 mr-2 shrink-0" />
                <span className="text-xs font-medium text-white">Not Suitable for Heavy Waste</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Content area */}
        <div className="pt-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className={`text-lg md:text-xl font-bold transition-colors duration-300
                          ${isSelected ? skipColor.text : `text-white group-hover:${skipColor.text}`}`}>
              {skip.size} Yard Skip
            </h3>
            
            {skip.size >= 20 && (
              <div className="relative overflow-hidden">
                <span className="bg-gradient-to-r from-green-900/70 to-green-800/50 text-green-400 text-xs 
                             font-medium px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  <span>Best value</span>
                </span>
                {/* Add subtle pulse animation */}
                <span className="absolute inset-0 bg-green-500/20 rounded-full blur-sm animate-pulse-subtle"></span>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-end mb-5">
            <div>
              <p className="text-sm text-slate-400 mb-1">{skip.hire_period_days} day hire period</p>
              <div className="flex items-baseline">
                <span className={`text-2xl md:text-3xl font-bold transition-all duration-300
                                ${isSelected ? skipColor.text : `text-white group-hover:${skipColor.text}`}`}>
                  £{priceWithVAT}
                </span>
                <span className="text-sm text-slate-400 ml-2">inc VAT</span>
              </div>
            </div>
            
            <div className="flex items-center text-xs text-slate-400 group-hover:text-slate-300 transition-colors cursor-pointer">
              <Info className="w-3 h-3 mr-1" />
              <span>More info</span>
            </div>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isDisabled) onSelect();
            }}
            disabled={isDisabled}
            className={`
              w-full py-3 md:py-3.5 px-4 rounded-md transition-all duration-300 
              flex items-center justify-center space-x-2 overflow-hidden relative cursor-pointer
              ${isSelected 
                ? `bg-${skipColor.accent} text-white hover:bg-${skipColor.accent}/90 hover:shadow-lg` 
                : 'bg-slate-800 text-white border border-slate-700 hover:bg-slate-700'
              }
              ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'transform group-hover:translate-y-0 hover:shadow-lg'}
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-900
            `}
          >
            {/* Button background animation */}
            {!isSelected && !isDisabled && (
              <span className="absolute inset-0 overflow-hidden">
                <span className="absolute inset-0 translate-x-full bg-gradient-to-r from-primary-500/0 via-primary-500/30 to-primary-500/0 
                              opacity-0 group-hover:opacity-100 -z-10 animate-shimmer"></span>
              </span>
            )}
            
            <span className="font-medium">{isSelected ? 'Selected' : 'Select This Skip'}</span>
            
            {!isSelected && (
              <ArrowRight className={`w-4 h-4 transition-all duration-300 
                                    ${isHovering && !isDisabled ? 'translate-x-1' : 'translate-x-0'}`} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkipCard;