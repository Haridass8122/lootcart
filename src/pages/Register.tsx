import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, Phone, ArrowRight, ChevronLeft } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-gold opacity-20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-gold opacity-10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        <button onClick={() => navigate(-1)} className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </button>
        <Link to="/" className="flex items-center justify-center gap-2.5 mb-6">
          <img src="/logo.png" alt="LootCart" className="w-10 h-10 rounded-xl object-cover shadow-button" />
          <span className="font-display text-2xl font-bold">Loot<span className="text-gold">Cart</span></span>
        </Link>

        <div className="rounded-3xl border border-border/60 bg-card/80 backdrop-blur-xl p-8 shadow-elegant">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2 text-center">Get started</p>
          <h1 className="font-display text-2xl font-bold text-center mb-1">Create your account</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">Earn 500 loot points on signup.</p>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate("/"); }}>
            <IconField icon={User} placeholder="Full name" />
            <IconField icon={Mail} placeholder="Email" type="email" />
            <IconField icon={Phone} placeholder="Phone" type="tel" />
            <IconField icon={Lock} placeholder="Password" type="password" />

            <Button type="submit" className="w-full h-11 bg-gradient-primary shadow-button rounded-full">
              Create account <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-4">
            By signing up you agree to our Terms and Privacy Policy.
          </p>
          <p className="text-sm text-center text-muted-foreground mt-4">
            Already a member? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const IconField = ({ icon: Icon, ...props }: { icon: typeof User } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <Label className="sr-only">{props.placeholder}</Label>
    <div className="relative">
      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input {...props} className="pl-10 h-11 rounded-xl bg-secondary/40" required />
    </div>
  </div>
);

export default Register;
