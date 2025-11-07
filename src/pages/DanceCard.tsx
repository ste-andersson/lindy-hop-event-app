import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Trash2, GripVertical, Pencil, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Dancer {
  id: string;
  name: string;
}

const DanceCard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dancers, setDancers] = useState<Dancer[]>([]);
  const [newDancerName, setNewDancerName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("danceCard");
    if (saved) {
      setDancers(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("danceCard", JSON.stringify(dancers));
  }, [dancers]);

  const addDancer = () => {
    if (!newDancerName.trim()) return;

    const newDancer: Dancer = {
      id: Date.now().toString(),
      name: newDancerName.trim(),
    };

    setDancers([...dancers, newDancer]);
    setNewDancerName("");
    toast({
      title: "Dancer added",
      description: `${newDancer.name} has been added to your dance card`,
    });
  };

  const deleteDancer = (id: string) => {
    const dancer = dancers.find((d) => d.id === id);
    setDancers(dancers.filter((d) => d.id !== id));
    toast({
      title: "Dancer removed",
      description: `${dancer?.name} has been removed from your dance card`,
    });
  };

  const startEditing = (dancer: Dancer) => {
    setEditingId(dancer.id);
    setEditingName(dancer.name);
  };

  const saveEdit = () => {
    if (!editingName.trim() || !editingId) return;

    setDancers(
      dancers.map((d) =>
        d.id === editingId ? { ...d, name: editingName.trim() } : d
      )
    );
    setEditingId(null);
    setEditingName("");
    toast({
      title: "Updated",
      description: "Dancer name has been updated",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const moveDancer = (index: number, direction: "up" | "down") => {
    const newDancers = [...dancers];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= dancers.length) return;

    [newDancers[index], newDancers[newIndex]] = [
      newDancers[newIndex],
      newDancers[index],
    ];

    setDancers(newDancers);
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
        <h1 className="text-2xl font-bold text-primary">Dance Card</h1>
        <div className="w-10" />
      </div>

      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Add a dancer..."
            value={newDancerName}
            onChange={(e) => setNewDancerName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addDancer()}
            className="flex-1"
          />
          <Button onClick={addDancer} className="bg-primary">
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-2">
          {dancers.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">Your dance card is empty</p>
              <p className="text-sm">Add dancers to get started!</p>
            </div>
          ) : (
            dancers.map((dancer, index) => (
              <div
                key={dancer.id}
                className="bg-card border border-border rounded-lg p-4 flex items-center gap-3"
              >
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-0"
                    onClick={() => moveDancer(index, "up")}
                    disabled={index === 0}
                  >
                    <GripVertical className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-0"
                    onClick={() => moveDancer(index, "down")}
                    disabled={index === dancers.length - 1}
                  >
                    <GripVertical className="h-4 w-4" />
                  </Button>
                </div>

                {editingId === dancer.id ? (
                  <>
                    <Input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit();
                        if (e.key === "Escape") cancelEdit();
                      }}
                      className="flex-1"
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={saveEdit}
                      className="text-success"
                    >
                      <Check className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={cancelEdit}
                      className="text-muted-foreground"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </>
                ) : (
                  <>
                    <span className="flex-1 font-medium text-foreground">
                      {dancer.name}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => startEditing(dancer)}
                      className="text-primary"
                    >
                      <Pencil className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteDancer(dancer.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DanceCard;
