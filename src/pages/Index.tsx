import { useState } from "react";
import { Heart, Plus, Trash2, Sparkles, Clock } from "lucide-react";
import ContractClause from "@/components/ContractClause";
import FloatingHearts from "@/components/FloatingHearts";
import coupleImg from "@/assets/couple-illustration.png";
import borderImg from "@/assets/contract-border.png";

const defaultClauses = [
  { emoji: "💕", text: "Luôn lắng nghe và thấu hiểu nhau, dù bất đồng cũng không la mắng" },
  { emoji: "🌅", text: "Mỗi sáng thức dậy sẽ nhắn tin chúc ngày mới tốt lành" },
  { emoji: "🫂", text: "Ôm nhau ít nhất 3 lần mỗi ngày (hoặc nhiều hơn càng tốt!)" },
  { emoji: "🍽️", text: "Mỗi tuần cùng nhau nấu ít nhất 1 bữa ăn ngon" },
  { emoji: "💌", text: "Không bao giờ đi ngủ khi đang giận nhau" },
  { emoji: "🌙", text: "Chúc nhau ngủ ngon mỗi tối, kể cả khi xa nhau" },
  { emoji: "🎁", text: "Ghi nhớ mọi ngày kỷ niệm và luôn tạo bất ngờ cho nhau" },
  { emoji: "🌈", text: "Luôn nói \"Anh/Em yêu em/anh\" mỗi ngày, không bao giờ quên" },
];

const emojiOptions = ["💖", "🌸", "✨", "🦋", "🍰", "🎀", "💫", "🌺"];

interface HistoryEntry {
  action: string;
  timestamp: string;
}

const Index = () => {
  const [clauses, setClauses] = useState(defaultClauses);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const personA = "Trần Đức Liêm";
  const personB = "Tạ Quỳnh Trang";
  const [nicknameB, setNicknameB] = useState("");
  const today = new Date().toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const updateClause = (index: number, text: string) => {
    setClauses((prev) => prev.map((c, i) => (i === index ? { ...c, text } : c)));
  };

  const addClause = () => {
    const randomEmoji = emojiOptions[Math.floor(Math.random() * emojiOptions.length)];
    setClauses((prev) => [...prev, { emoji: randomEmoji, text: "Nhập điều khoản mới..." }]);
  };

  const removeClause = (index: number) => {
    setClauses((prev) => prev.filter((_, i) => i !== index));
  };

  const bothSigned = signatures.person1 && signatures.person2;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingHearts />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <img
            src={coupleImg}
            alt="Cute couple"
            className="w-28 h-28 mx-auto mb-4 animate-float"
          />
          <h1 className="font-handwriting text-5xl sm:text-6xl text-primary font-bold mb-2">
            Hợp Đồng Yêu Thương
          </h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Heart size={14} fill="currentColor" className="text-primary" />
            <span className="text-sm font-medium">{today}</span>
            <Heart size={14} fill="currentColor" className="text-primary" />
          </div>
        </div>

        {/* Contract Body */}
        <div className="relative">
          <img
            src={borderImg}
            alt=""
            className="absolute inset-0 w-full h-full object-contain opacity-20 pointer-events-none"
          />

          <div className="bg-card/80 backdrop-blur-sm rounded-3xl border-2 border-primary/20 shadow-xl p-6 sm:p-8 relative">
            {/* Preamble */}
            <div className="mb-8 pb-6 border-b border-dashed border-primary/20">
              <Sparkles className="mx-auto mb-3 text-accent text-center" size={28} />
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div className="flex flex-col items-center gap-2 bg-secondary/40 rounded-2xl p-4">
                  <span className="text-2xl">💙</span>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bên A</span>
                  <p className="w-full text-center font-handwriting text-xl text-foreground">{personA}</p>
                  {nicknameA && <p className="text-sm text-muted-foreground">{nicknameA}</p>}
                </div>
                <div className="flex flex-col items-center gap-2 bg-secondary/40 rounded-2xl p-4">
                  <span className="text-2xl">💗</span>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bên B</span>
                  <p className="w-full text-center font-handwriting text-xl text-foreground">{personB}</p>
                  {nicknameB && <p className="text-sm text-muted-foreground">{nicknameB}</p>}
                </div>
              </div>
              <p className="font-handwriting text-lg text-foreground leading-relaxed text-center">
                Hai bên đồng ý ký kết hợp đồng yêu thương này với tất cả tình yêu và sự chân thành 💕
              </p>
            </div>

            {/* Clauses */}
            <div className="space-y-3 mb-8">
              <h2 className="font-handwriting text-2xl text-primary font-semibold flex items-center gap-2">
                <Heart size={20} fill="currentColor" />
                Các Điều Khoản
              </h2>

              {clauses.map((clause, index) => (
                <div key={index} className="relative group">
                  <ContractClause
                    index={index}
                    emoji={clause.emoji}
                    text={clause.text}
                    onUpdate={(text) => updateClause(index, text)}
                  />
                  {clauses.length > 1 && (
                    <button
                      onClick={() => removeClause(index)}
                      className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 p-1.5 rounded-full bg-destructive text-destructive-foreground shadow-md hover:scale-110 transition-all"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={addClause}
                className="w-full p-3 rounded-2xl border-2 border-dashed border-primary/30 text-primary hover:bg-secondary/50 hover:border-primary/50 transition-all flex items-center justify-center gap-2 font-medium"
              >
                <Plus size={18} />
                Thêm điều khoản mới
              </button>
            </div>

            {/* Signatures */}
            <div className="border-t-2 border-dashed border-primary/20 pt-8">
              <h2 className="font-handwriting text-2xl text-primary font-semibold text-center mb-6 flex items-center justify-center gap-2">
                <Heart size={20} fill="currentColor" />
                Chữ Ký
                <Heart size={20} fill="currentColor" />
              </h2>

              <div className="grid grid-cols-2 gap-8">
                <SignaturePad
                  label="Bên A (Anh/Em) 💙"
                  onSign={(name) => setSignatures((s) => ({ ...s, person1: name }))}
                />
                <SignaturePad
                  label="Bên B (Anh/Em) 💗"
                  onSign={(name) => setSignatures((s) => ({ ...s, person2: name }))}
                />
              </div>

              {bothSigned && (
                <div className="mt-8 text-center animate-float">
                  <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-3">
                    <Sparkles className="text-primary" size={18} />
                    <span className="font-handwriting text-xl text-primary font-semibold">
                      Hợp đồng đã có hiệu lực! Yêu thương mãi mãi 💕
                    </span>
                    <Sparkles className="text-primary" size={18} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-muted-foreground text-xs mt-6 font-medium">
          ✨ Click vào từng điều khoản để chỉnh sửa • Thêm hoặc xóa tùy ý ✨
        </p>
      </div>
    </div>
  );
};

export default Index;
