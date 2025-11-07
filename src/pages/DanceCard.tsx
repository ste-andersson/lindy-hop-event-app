import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Trash2, GripVertical, Pencil, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Dancer {
  id: string;
  name: string;
}

interface SortableDancerProps {
  dancer: Dancer;
  index: number;
  editingId: string | null;
  editingName: string;
  setEditingName: (name: string) => void;
  startEditing: (dancer: Dancer) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  deleteDancer: (id: string) => void;
}

function SortableDancer({
  dancer,
  editingId,
  editingName,
  setEditingName,
  startEditing,
  saveEdit,
  cancelEdit,
  deleteDancer,
}: SortableDancerProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: dancer.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-card border border-border rounded-lg p-4 flex items-center gap-3"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing touch-none"
      >
        <GripVertical className="h-6 w-6 text-muted-foreground" />
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
  );
}

const DanceCard = () => {
  const navigate = useNavigate();
  const [dancers, setDancers] = useState<Dancer[]>([]);
  const [newDancerName, setNewDancerName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
  };

  const deleteDancer = (id: string) => {
    setDancers(dancers.filter((d) => d.id !== id));
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
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setDancers((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
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
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={dancers.map((d) => d.id)}
                strategy={verticalListSortingStrategy}
              >
                {dancers.map((dancer, index) => (
                  <SortableDancer
                    key={dancer.id}
                    dancer={dancer}
                    index={index}
                    editingId={editingId}
                    editingName={editingName}
                    setEditingName={setEditingName}
                    startEditing={startEditing}
                    saveEdit={saveEdit}
                    cancelEdit={cancelEdit}
                    deleteDancer={deleteDancer}
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  );
};

export default DanceCard;
