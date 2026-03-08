import { useState, useRef, ReactNode } from "react";
import { GripVertical } from "lucide-react";

interface DraggableListProps<T> {
  items: T[];
  onReorder: (items: T[], fromIndex: number, toIndex: number) => void;
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor?: (item: T, index: number) => string;
}

function DraggableList<T>({ items, onReorder, renderItem, keyExtractor }: DraggableListProps<T>) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const dragNode = useRef<HTMLDivElement | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDragIndex(index);
    dragNode.current = e.currentTarget as HTMLDivElement;
    e.dataTransfer.effectAllowed = "move";
    // Make drag image semi-transparent
    setTimeout(() => {
      if (dragNode.current) dragNode.current.style.opacity = "0.4";
    }, 0);
  };

  const handleDragEnd = () => {
    if (dragNode.current) dragNode.current.style.opacity = "1";
    if (dragIndex !== null && overIndex !== null && dragIndex !== overIndex) {
      const newItems = [...items];
      const [moved] = newItems.splice(dragIndex, 1);
      newItems.splice(overIndex, 0, moved);
      onReorder(newItems, dragIndex, overIndex);
    }
    setDragIndex(null);
    setOverIndex(null);
    dragNode.current = null;
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setOverIndex(index);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={keyExtractor ? keyExtractor(item, index) : index}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnter={(e) => e.preventDefault()}
          className={`flex items-start gap-1 transition-all ${
            overIndex === index && dragIndex !== null && dragIndex !== index
              ? "border-t-2 border-primary/50"
              : ""
          }`}
        >
          <div className="cursor-grab active:cursor-grabbing pt-4 text-muted-foreground/50 hover:text-muted-foreground transition-colors">
            <GripVertical size={16} />
          </div>
          <div className="flex-1">{renderItem(item, index)}</div>
        </div>
      ))}
    </div>
  );
}

export default DraggableList;
