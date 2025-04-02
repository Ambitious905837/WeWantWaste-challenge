import { useState } from 'react';
import { MapPin, Trash2, Truck, Shield, Calendar, CreditCard } from 'lucide-react';

const NavigationBar = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  
  const steps = [
    { icon: MapPin, label: 'Postcode', status: 'completed', onClick: () => console.log('Postcode clicked') },
    { icon: Trash2, label: 'Waste Type', status: 'completed', onClick: () => console.log('Waste Type clicked') },
    { icon: Truck, label: 'Select Skip', status: 'current', onClick: () => console.log('Select Skip clicked') },
    { icon: Shield, label: 'Permit Check', status: 'upcoming', onClick: null },
    { icon: Calendar, label: 'Choose Date', status: 'upcoming', onClick: null },
    { icon: CreditCard, label: 'Payment', status: 'upcoming', onClick: null },
  ];

  return (
    <div className="w-full overflow-x-auto custom-scrollbar py-6 mb-8">
      <div className="min-w-max max-w-7xl mx-auto px-4">
        <div className="glass rounded-xl border border-slate-600/50 p-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center relative">
                {/* Step item */}
                <div 
                  className={`relative flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition-all duration-300
                            ${hoverIndex === index ? 'scale-105' : ''}
                            ${
                              step.status === 'current' 
                                ? 'bg-primary-900/30 text-primary-400' 
                                : step.status === 'completed' 
                                  ? 'text-white' 
                                  : 'text-slate-500'
                            }`}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  onClick={step.status !== 'upcoming' && step.onClick ? step.onClick : undefined}
                >
                  <div className={`
                    flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                    ${
                      step.status === 'current' 
                        ? 'bg-primary-600 text-white shadow-glow' 
                        : step.status === 'completed' 
                          ? 'bg-primary-900/30 text-primary-400' 
                          : 'bg-slate-800 text-slate-500'
                    }
                    transition-all duration-300
                  `}>
                    <step.icon size={18} />
                  </div>
                  
                  <span className={`whitespace-nowrap transition-all
                                ${step.status === 'current' ? 'font-medium' : ''}
                                ${step.status === 'completed' ? 'hover:text-primary-400' : ''}`}>
                    {step.label}
                  </span>
                  
                  {/* Completed indicator */}
                  {step.status === 'completed' && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </div>
                
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="flex-grow px-3">
                    <div className={`relative h-0.5 w-12 rounded-full overflow-hidden ${
                      index < steps.findIndex(s => s.status === 'current')
                        ? 'bg-primary-500'
                        : index === steps.findIndex(s => s.status === 'current')
                          ? 'bg-gradient-to-r from-primary-500 to-slate-700'
                          : 'bg-slate-700'
                    }`}>
                      {index < steps.findIndex(s => s.status === 'current') && (
                        <div className="absolute top-0 left-0 h-full bg-white/30 w-1/3 animate-shimmer"></div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;