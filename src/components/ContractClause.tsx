import { useState, useRef, useEffect } from "react";
import { Heart, Pencil, Check } from "lucide-react";

interface ContractClauseProps {
  index: number;
  emoji: string;
  text: string;
  onUpdate: (text: string) => void;
}

const ContractClause = ({ index, emoji, text, onUpdate }: ContractClauseProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    onUpdate(editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  useEffect(() => {
    if (!isEditing) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleCancel();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditing, text]);

  return (
    <div ref={containerRef} className="group flex items-start gap-3 p-4 rounded-2xl bg-secondary/50 hover:bg-secondary transition-all duration-300 border border-border/50">
      <span className="text-2xl mt-0.5 animate-float" style={{ animationDelay: `${index * 0.3}s` }}>
        {emoji}
      </span>
      <div className="flex-1">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
          Điều {index + 1}
        </span>
        {isEditing ? (
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1 bg-card border border-input rounded-xl px-3 py-2 text-foreground font-handwriting text-lg focus:outline-none focus:ring-2 focus:ring-ring"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") handleCancel();
              }}
            />
            <button
              onClick={handleSave}
              className="p-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Check size={18} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 mt-1">
            <p className="font-handwriting text-lg text-foreground">{text}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all"
            >
              <Pencil size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractClause;
