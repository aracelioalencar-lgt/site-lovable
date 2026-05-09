import { Share2, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ShareButtonProps {
  title: string;
  url?: string;
}

export function ShareButton({ title, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
        return;
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
      }
    }

    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      toast.success("Link copiado!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] px-4 py-2 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-colors"
    >
      {copied ? (
        <>
          <Check className="w-3 h-3" />
          Copiado
        </>
      ) : (
        <>
          <Share2 className="w-3 h-3" />
          Compartilhar
        </>
      )}
    </button>
  );
}
