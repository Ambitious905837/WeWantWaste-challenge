import { ArrowRight, ShoppingCart } from 'lucide-react';
import { Skip } from '../types';
import { useEffect, useState } from 'react';

interface FooterProps {
  selectedSkip: Skip | null;
  onBack: () => void;
  onContinue: () => void;
}

const Footer = ({ selectedSkip, onBack, onContinue }: FooterProps) => {
  const [animatePrice, setAnimatePrice] = useState(false);
  const priceWithVAT = selectedSkip 
    ? Math.round(selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100))
    : 0;
  
  useEffect(() => {
    if (selectedSkip) {
      setAnimatePrice(true);
      const timer = setTimeout(() => setAnimatePrice(false), 800);
      return () => clearTimeout(timer);
    }
  }, [selectedSkip]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Frosted glass effect background */}
      <div className="glass border-t border-slate-700 shadow-lg">
        <div className="max-w-7xl mx-auto">
          {/* Mobile view */}
          <div className="lg:hidden p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {selectedSkip && (
                  <div className="w-8 h-8 rounded-full bg-primary-600/20 flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 text-primary-400" />
                  </div>
                )}
                <h3 className="font-medium">
                  {selectedSkip ? `${selectedSkip.size} Yard Skip` : 'Choose a skip'}
                </h3>
              </div>
              <div>
                {selectedSkip ? (
                  <div className="flex flex-col items-end">
                    <span className={`text-xl font-bold text-primary-500 transition-all duration-500 ${animatePrice ? 'scale-125 text-primary-400' : ''}`}>
                      £{priceWithVAT}
                    </span>
                    <span className="text-xs text-slate-400">
                      {selectedSkip.hire_period_days} days hire
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-slate-400">Select a skip to continue</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={onBack}
                className="py-3 px-4 rounded-md bg-slate-700 text-white border border-slate-600 hover:bg-slate-600 hover:border-slate-500 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Back
              </button>
              <button
                onClick={onContinue}
                disabled={!selectedSkip}
                className={`
                  group py-3 px-4 rounded-md text-white transition-all duration-300 transform flex items-center justify-center gap-2
                  ${selectedSkip ? 'bg-primary-600 hover:bg-primary-700 hover:-translate-y-1 hover:shadow-glow' : 'bg-slate-700 opacity-50 cursor-not-allowed'}
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-900
                `}
              >
                <span>Continue</span>
                <ArrowRight className={`w-4 h-4 transition-all duration-300 ${selectedSkip ? 'group-hover:translate-x-1' : ''}`} />
                
                {/* Shimmer effect */}
                {selectedSkip && (
                  <span className="absolute inset-0 overflow-hidden rounded-md">
                    <span className="absolute inset-0 translate-x-full bg-white/10 skew-x-12 group-hover:animate-shimmer"></span>
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Desktop view */}
          <div className="hidden lg:flex items-center justify-between p-6">
            <div className="flex items-center gap-6">
              {selectedSkip ? (
                <>
                  <div className="h-16 w-16 bg-primary-600/20 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-primary-500">{selectedSkip.size}yd</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{selectedSkip.size} Yard Skip</h3>
                    <p className="text-sm text-slate-400">{selectedSkip.hire_period_days} day hire period</p>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-baseline">
                      <span className={`text-2xl font-bold text-primary-500 transition-all duration-500 ${animatePrice ? 'scale-125 text-primary-400' : ''}`}>
                        £{priceWithVAT}
                      </span>
                      <span className="text-sm text-slate-400 ml-2">including VAT</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse-subtle"></div>
                      <span className="text-xs text-green-400">Available for delivery within 24 hours</span>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <h3 className="text-lg font-medium">No skip selected</h3>
                  <p className="text-sm text-slate-400">Please select a skip to continue</p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="py-3 px-6 rounded-md bg-slate-700 text-white border border-slate-600 hover:bg-slate-600 hover:border-slate-500 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Back
              </button>
              <button
                onClick={onContinue}
                disabled={!selectedSkip}
                className={`
                  group py-3 px-6 rounded-md text-white transition-all duration-300 transform 
                  flex items-center gap-3 font-medium
                  ${selectedSkip ? 'bg-primary-600 hover:bg-primary-700 hover:-translate-y-1 hover:shadow-glow' : 'bg-slate-700 opacity-50 cursor-not-allowed'}
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-900
                `}
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                
                {/* Shimmer effect */}
                {selectedSkip && (
                  <span className="absolute inset-0 overflow-hidden rounded-md">
                    <span className="absolute inset-0 translate-x-full bg-white/10 skew-x-12 group-hover:animate-shimmer"></span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;