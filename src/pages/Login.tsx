import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-gold opacity-20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-gold opacity-10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2.5 mb-8">
          <img src="/logo.png" alt="LootCart" className="w-10 h-10 rounded-xl object-cover shadow-button" />
          <span className="font-display text-2xl font-bold">Loot<span className="text-gold">Cart</span></span>
        </Link>

        <div className="rounded-3xl border border-border/60 bg-card/80 backdrop-blur-xl p-8 shadow-elegant">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2 text-center">Welcome back</p>
          <h1 className="font-display text-2xl font-bold text-center mb-1">Sign in to LootCart</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">Continue your luxury shopping journey.</p>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate("/"); }}>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="email" required placeholder="you@example.com" className="pl-10 h-11 rounded-xl bg-secondary/40" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label className="text-xs text-muted-foreground">Password</Label>
                <Link to="#" className="text-xs text-primary hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type={show ? "text" : "password"} required placeholder="••••••••" className="pl-10 pr-10 h-11 rounded-xl bg-secondary/40" />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 bg-gradient-primary shadow-button rounded-full">
              Sign in <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center"><span className="bg-card px-3 text-xs text-muted-foreground">or</span></div>
          </div>

          <Button variant="outline" className="w-full h-11 rounded-full">Continue with Google</Button>

          <p className="text-sm text-center text-muted-foreground mt-6">
            New here? <Link to="/register" className="text-primary font-medium hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
