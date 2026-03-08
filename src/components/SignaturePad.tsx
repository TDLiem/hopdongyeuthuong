import { useState } from "react";
import { Heart } from "lucide-react";

interface SignaturePadProps {
  label: string;
  onSign: (name: string) => void;
}

const SignaturePad = ({ label, onSign }: SignaturePadProps) => {
  const [name, setName] = useState("");
  const [signed, setSigned] = useState(false);

  const handleSign = () => {
    if (name.trim()) {
      setSigned(true);
      onSign(name);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      {signed ? (
        <div className="flex flex-col items-center gap-2">
          <p className="font-handwriting text-3xl text-primary">{name}</p>
          <div className="flex items-center gap-1 text-primary">
            <Heart size={14} fill="currentColor" />
            <span className="text-xs font-medium">Đã ký</span>
            <Heart size={14} fill="currentColor" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 w-full max-w-[200px]">
          <input
            type="text"
            placeholder="Nhập tên..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-center bg-transparent border-b-2 border-dashed border-primary/40 focus:border-primary px-2 py-2 font-handwriting text-2xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors"
            onKeyDown={(e) => e.key === "Enter" && handleSign()}
          />
          <button
            onClick={handleSign}
            disabled={!name.trim()}
            className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5"
          >
            <Heart size={14} />
            Ký tên
          </button>
        </div>
      )}
    </div>
  );
};

export default SignaturePad;
