import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BpmCounter = () => {
  const navigate = useNavigate();
  const [taps, setTaps] = useState<number[]>([]);
  const [bpm, setBpm] = useState<number>(0);

  const handleTap = () => {
    const now = Date.now();
    const newTaps = [...taps, now];
    setTaps(newTaps);

    if (newTaps.length >= 2) {
      const firstTap = newTaps[0];
      const lastTap = newTaps[newTaps.length - 1];
      const timeDiff = (lastTap - firstTap) / 1000; // seconds
      const numberOfIntervals = newTaps.length - 1;
      const beatsPerSecond = numberOfIntervals / timeDiff;
      const calculatedBpm = Math.round(beatsPerSecond * 60);
      setBpm(calculatedBpm);
    }
  };

  const handleReset = () => {
    setTaps([]);
    setBpm(0);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-4 flex items-center justify-between border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="text-foreground"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-primary">BPM Counter</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleReset}
          className="text-foreground"
        >
          <RotateCcw className="h-6 w-6" />
        </Button>
      </div>

      <div
        className="flex-1 flex flex-col items-center justify-center p-8 cursor-pointer active:scale-95 transition-transform"
        onClick={handleTap}
      >
        <div className="text-center space-y-8">
          <div className="space-y-2">
            <p className="text-muted-foreground text-lg">Current BPM</p>
            <div className="text-8xl font-bold text-primary animate-pulse">
              {bpm || "--"}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground text-xl">
              Tap anywhere to the beat
            </p>
            {taps.length > 0 && (
              <p className="text-muted-foreground">
                Taps: {taps.length}
              </p>
            )}
          </div>

          {taps.length > 0 && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleReset();
              }}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-xl"
            >
              <RotateCcw className="h-6 w-6 mr-2" />
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BpmCounter;
