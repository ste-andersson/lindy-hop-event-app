import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Bot, Users } from "lucide-react";
import heroImage from "@/assets/fall-vibes-hero.png";

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight font-oswald whitespace-nowrap">
            LINDY HOP and FALL VIBES
          </h1>
          <p className="text-muted-foreground text-lg">
            The official event app
          </p>
        </div>

        <div className="w-full mb-8 rounded-lg overflow-hidden shadow-lg">
          <img 
            src={heroImage} 
            alt="Fall Vibes - Lindy Hop dancers" 
            className="w-full h-auto"
          />
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/bpm-counter")}
            className="w-full h-20 bg-card border-2 border-primary/20 hover:border-primary hover:bg-primary/5 shadow-md hover:shadow-lg transition-all rounded-lg overflow-hidden flex items-center gap-4 p-4 group"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Activity className="!h-8 !w-8 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-xl font-bold text-foreground">BPM Counter</div>
              <div className="text-sm text-muted-foreground">Track the tempo</div>
            </div>
          </button>

          <button
            onClick={() => navigate("/terrible-lindy-bot")}
            className="w-full h-20 bg-card border-2 border-accent/20 hover:border-accent hover:bg-accent/5 shadow-md hover:shadow-lg transition-all rounded-lg overflow-hidden flex items-center gap-4 p-4 group"
          >
            <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <Bot className="!h-8 !w-8 text-accent" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-xl font-bold text-foreground">Terrible Lindy Bot</div>
              <div className="text-sm text-muted-foreground">Chat with AI</div>
            </div>
          </button>

          <button
            onClick={() => navigate("/dance-card")}
            className="w-full h-20 bg-card border-2 border-secondary/20 hover:border-secondary hover:bg-secondary/5 shadow-md hover:shadow-lg transition-all rounded-lg overflow-hidden flex items-center gap-4 p-4 group"
          >
            <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
              <Users className="!h-8 !w-8 text-secondary" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-xl font-bold text-foreground">Dance Card</div>
              <div className="text-sm text-muted-foreground">Track your dances</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
