import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, PhoneOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useConversation } from "@11labs/react";
import { useToast } from "@/hooks/use-toast";

const TerribleLindyBot = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to agent");
      setIsConnected(true);
      toast({
        title: "Connected",
        description: "You're now talking to the Terrible Lindy Bot!",
      });
    },
    onDisconnect: () => {
      console.log("Disconnected from agent");
      setIsConnected(false);
      toast({
        title: "Disconnected",
        description: "Call ended",
      });
    },
    onError: (error) => {
      console.error("Conversation error:", error);
      toast({
        title: "Error",
        description: "Failed to connect to the agent",
        variant: "destructive",
      });
    },
  });

  const startConversation = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: "agent_3901k9g7sb0qebs8bpyeq3zk3mn3",
      });
    } catch (error) {
      console.error("Error starting conversation:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to start conversation",
        variant: "destructive",
      });
    }
  };

  const endConversation = async () => {
    await conversation.endSession();
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="p-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold text-white">Terrible Lindy Bot</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <Button
          onClick={isConnected ? endConversation : startConversation}
          className={`w-48 h-48 rounded-full shadow-2xl transition-all ${
            isConnected
              ? "bg-destructive hover:bg-destructive/90"
              : "bg-success hover:bg-success/90"
          }`}
          size="lg"
        >
          {isConnected ? (
            <PhoneOff className="h-24 w-24 text-white" />
          ) : (
            <Phone className="h-24 w-24 text-white" />
          )}
        </Button>
      </div>

      {isConnected && conversation.isSpeaking && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-64 h-64 rounded-full bg-success/20 animate-ping" />
        </div>
      )}
    </div>
  );
};

export default TerribleLindyBot;
