import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Bot, ScrollText } from "lucide-react";

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2 mb-12">
          <h1 className="text-5xl font-bold text-primary tracking-tight">
            Fall Vibes
          </h1>
          <p className="text-muted-foreground text-lg">
            The official event app
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => navigate("/bpm-counter")}
            className="w-full h-24 text-2xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
            size="lg"
          >
            <Activity className="mr-3 h-8 w-8" />
            BPM Counter
          </Button>

          <Button
            onClick={() => navigate("/terrible-lindy-bot")}
            className="w-full h-24 text-2xl font-bold bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all"
            size="lg"
          >
            <Bot className="mr-3 h-8 w-8" />
            Terrible Lindy Bot
          </Button>

          <Button
            onClick={() => navigate("/dance-card")}
            className="w-full h-24 text-2xl font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl transition-all"
            size="lg"
          >
            <ScrollText className="mr-3 h-8 w-8" />
            Dance Card
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
