
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
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-neutral-100 to-rose-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        {/* Breathing Circle */}
        <div className="mb-12 flex justify-center">
          <div 
            className={`w-48 h-48 rounded-full bg-gradient-to-br from-stone-300 to-rose-300 flex items-center justify-center transition-all duration-4000 ease-in-out ${
              isActive 
                ? breatheIn 
                  ? 'scale-110 shadow-2xl shadow-stone-300/50' 
                  : 'scale-90 shadow-lg shadow-rose-300/30'
                : 'scale-100 shadow-xl shadow-neutral-300/40'
            }`}
          >
            <div className="w-32 h-32 rounded-full bg-stone-100/50 backdrop-blur-sm flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-neutral-200/60 backdrop-blur-sm"></div>
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
                ? 'bg-gradient-to-r from-rose-400 to-red-400 hover:from-rose-500 hover:to-red-500 shadow-lg hover:shadow-rose-200/50' 
                : 'bg-gradient-to-r from-stone-400 to-rose-400 hover:from-stone-500 hover:to-rose-500 shadow-lg hover:shadow-stone-200/50'
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
