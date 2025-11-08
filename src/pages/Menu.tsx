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
            className="w-full h-20 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all rounded-lg overflow-hidden flex items-center gap-4 p-4 group"
          >
            <div className="w-16 h-16 bg-primary-foreground/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="!h-8 !w-8 text-primary-foreground" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-2xl font-bold text-primary-foreground">BPM Counter</div>
            </div>
          </button>

          <button
            onClick={() => navigate("/terrible-lindy-bot")}
            className="w-full h-20 bg-accent hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all rounded-lg overflow-hidden flex items-center gap-4 p-4 group"
          >
            <div className="w-16 h-16 bg-accent-foreground/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bot className="!h-8 !w-8 text-accent-foreground" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-2xl font-bold text-accent-foreground">Terrible Lindy Bot</div>
            </div>
          </button>

          <button
            onClick={() => navigate("/dance-card")}
            className="w-full h-20 bg-secondary hover:bg-secondary/90 shadow-lg hover:shadow-xl transition-all rounded-lg overflow-hidden flex items-center gap-4 p-4 group"
          >
            <div className="w-16 h-16 bg-secondary-foreground/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="!h-8 !w-8 text-secondary-foreground" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-2xl font-bold text-secondary-foreground">Dance Card</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
