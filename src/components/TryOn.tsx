import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Upload, User, Loader2, RotateCcw, Save, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const PROFILE_KEY = "lootcart:profile-photo";

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });

const urlToDataUrl = async (url: string) => {
  const res = await fetch(url);
  const blob = await res.blob();
  return await fileToDataUrl(new File([blob], "img", { type: blob.type }));
};

export const TryOn = ({
  productImage,
  productName,
  category,
}: { productImage: string; productName: string; category: string }) => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [savedProfile, setSavedProfile] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSavedProfile(localStorage.getItem(PROFILE_KEY));
  }, []);

  const handleFile = async (file: File) => {
    if (file.size > 8 * 1024 * 1024) {
      toast({ title: "Image too large", description: "Please use an image under 8 MB.", variant: "destructive" });
      return;
    }
    const data = await fileToDataUrl(file);
    setUserImage(data);
    setResult(null);
  };

  const saveAsProfile = () => {
    if (!userImage) return;
    try {
      localStorage.setItem(PROFILE_KEY, userImage);
      setSavedProfile(userImage);
      toast({ title: "Saved", description: "Photo saved to your profile for next time." });
    } catch {
      toast({ title: "Couldn't save", description: "Image too large to store locally.", variant: "destructive" });
    }
  };

  const useSaved = () => {
    if (savedProfile) {
      setUserImage(savedProfile);
      setResult(null);
    }
  };

  const generate = async () => {
    if (!userImage) return;
    setLoading(true);
    setResult(null);
    try {
      const productData = productImage.startsWith("data:") ? productImage : await urlToDataUrl(productImage);
      const { data, error } = await supabase.functions.invoke("try-on", {
        body: { userImage, productImage: productData, productName, category },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setResult((data as any).image);
    } catch (e: any) {
      toast({
        title: "Try-on failed",
        description: e?.message ?? "Please try a clearer photo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-5 md:p-6 shadow-card">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="font-display text-lg md:text-xl font-bold">AI Virtual Try-On</h3>
        <span className="ml-auto text-[10px] uppercase tracking-widest text-primary">Beta</span>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        See yourself with this product. Upload a clear, well-lit photo of yourself.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Your photo */}
        <div className="rounded-2xl border border-border/60 bg-secondary/40 p-3 flex flex-col">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Your photo</p>
          <div className={cn("relative flex-1 aspect-square rounded-xl overflow-hidden bg-background/40 flex items-center justify-center")}>
            {userImage ? (
              <img src={userImage} alt="You" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center text-muted-foreground text-sm px-4">
                <User className="w-8 h-8 mx-auto mb-2 opacity-60" />
                Upload your photo to start
              </div>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="rounded-full" onClick={() => inputRef.current?.click()}>
              <Upload className="w-3.5 h-3.5 mr-1" /> Upload
            </Button>
            {savedProfile && (
              <Button size="sm" variant="outline" className="rounded-full" onClick={useSaved}>
                <User className="w-3.5 h-3.5 mr-1" /> Use saved
              </Button>
            )}
            {userImage && userImage !== savedProfile && (
              <Button size="sm" variant="outline" className="rounded-full" onClick={saveAsProfile}>
                <Save className="w-3.5 h-3.5 mr-1" /> Save to profile
              </Button>
            )}
          </div>
        </div>

        {/* Result */}
        <div className="rounded-2xl border border-border/60 bg-secondary/40 p-3 flex flex-col">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Try-on preview</p>
          <div className="relative flex-1 aspect-square rounded-xl overflow-hidden bg-background/40 flex items-center justify-center">
            {loading ? (
              <div className="text-center text-muted-foreground text-sm">
                <Loader2 className="w-7 h-7 mx-auto mb-2 animate-spin text-primary" />
                Generating your look…
              </div>
            ) : result ? (
              <img src={result} alt="Try-on result" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center text-muted-foreground text-sm px-4">
                <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-60" />
                Your AI preview will appear here
              </div>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              size="sm"
              className="rounded-full bg-gradient-primary shadow-button flex-1"
              disabled={!userImage || loading}
              onClick={generate}
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 mr-1" />}
              {result ? "Regenerate" : "Generate"}
            </Button>
            {result && (
              <>
                <Button size="sm" variant="outline" className="rounded-full" onClick={() => setResult(null)}>
                  <RotateCcw className="w-3.5 h-3.5" />
                </Button>
                <Button size="sm" variant="outline" className="rounded-full" asChild>
                  <a href={result} download={`tryon-${productName}.png`}>
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
