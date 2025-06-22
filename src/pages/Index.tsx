
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';

const Index = () => {
  const [isActive, setIsActive] = useState(false);
  const [breatheIn, setBreatheIn] = useState(true);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
        // Switch between breathe in and breathe out every 4 seconds
        if (seconds % 8 === 0) {
          setBreatheIn(true);
        } else if (seconds % 8 === 4) {
          setBreatheIn(false);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      if (interval) clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  const handleStart = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setSeconds(0);
      setBreatheIn(true);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(0);
    setBreatheIn(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        {/* Breathing Circle */}
        <div className="mb-12 flex justify-center">
          <div 
            className={`w-48 h-48 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center transition-all duration-4000 ease-in-out ${
              isActive 
                ? breatheIn 
                  ? 'scale-110 shadow-2xl shadow-amber-200/50' 
                  : 'scale-90 shadow-lg shadow-orange-200/30'
                : 'scale-100 shadow-xl shadow-stone-200/40'
            }`}
          >
            <div className="w-32 h-32 rounded-full bg-stone-100/40 backdrop-blur-sm flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-amber-100/60 backdrop-blur-sm"></div>
            </div>
          </div>
        </div>

        {/* Breathing Text */}
        <div className="mb-12">
          {isActive ? (
            <div className="space-y-4">
              <h1 className={`text-4xl font-light text-stone-700 transition-all duration-1000 ${
                breatheIn ? 'opacity-100 transform translate-y-0' : 'opacity-60 transform translate-y-2'
              }`}>
                {breatheIn ? 'Breathe In' : 'Breathe Out'}
              </h1>
              <p className="text-stone-500 text-lg font-light">
                {breatheIn ? 'Fill your lungs slowly and deeply' : 'Release and let go gently'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h1 className="text-4xl font-light text-stone-700 mb-2">
                Mindful Breathing
              </h1>
              <p className="text-stone-500 text-lg font-light">
                Find your center through gentle breathing
              </p>
            </div>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center space-x-4">
          <Button
            onClick={handleStart}
            className={`px-8 py-3 rounded-full text-white font-medium transition-all duration-300 ${
              isActive 
                ? 'bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 shadow-lg hover:shadow-orange-200/50' 
                : 'bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 shadow-lg hover:shadow-amber-200/50'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Begin
              </>
            )}
          </Button>
          
          {(isActive || seconds > 0) && (
            <Button
              onClick={handleReset}
              variant="outline"
              className="px-6 py-3 rounded-full border-stone-300 text-stone-600 hover:bg-stone-50 transition-all duration-300"
            >
              Reset
            </Button>
          )}
        </div>

        {/* Session Timer */}
        {seconds > 0 && (
          <div className="mt-8 text-stone-400 text-sm font-light">
            Session: {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
