import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Music, Phone, Users } from "lucide-react";
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
            className="w-full h-24 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all rounded-md overflow-hidden flex items-stretch group"
          >
            <div className="w-24 bg-primary/80 flex items-center justify-center">
              <Music className="!h-12 !w-12 text-primary-foreground" />
            </div>
            <div className="flex-1 flex items-center justify-center text-2xl font-bold text-primary-foreground">
              BPM Counter
            </div>
          </button>

          <button
            onClick={() => navigate("/terrible-lindy-bot")}
            className="w-full h-24 bg-accent hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all rounded-md overflow-hidden flex items-stretch group"
          >
            <div className="w-24 bg-accent/80 flex items-center justify-center">
              <Phone className="!h-12 !w-12 text-accent-foreground" />
            </div>
            <div className="flex-1 flex items-center justify-center text-2xl font-bold text-accent-foreground">
              Terrible Lindy Bot
            </div>
          </button>

          <button
            onClick={() => navigate("/dance-card")}
            className="w-full h-24 bg-secondary hover:bg-secondary/90 shadow-lg hover:shadow-xl transition-all rounded-md overflow-hidden flex items-stretch group"
          >
            <div className="w-24 bg-secondary/80 flex items-center justify-center">
              <Users className="!h-12 !w-12 text-secondary-foreground" />
            </div>
            <div className="flex-1 flex items-center justify-center text-2xl font-bold text-secondary-foreground">
              Dance Card
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
