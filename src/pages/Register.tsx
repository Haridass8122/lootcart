import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Phone, Lock, ArrowLeft, ShoppingCart } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", mobile: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 relative">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        aria-label="Back"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 w-9 h-9 rounded-full bg-background/90 flex items-center justify-center shadow-card text-primary hover:bg-background transition"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="w-full max-w-sm">
        {/* Avatar Circle */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-28 h-28 sm:w-32 sm:h-32 bg-background rounded-full flex items-center justify-center shadow-elegant mb-3">
            <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
          </div>
          <p className="text-primary-foreground text-sm">creating a account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="pl-11 h-11 rounded-full bg-background border-0 text-sm shadow-card"
              required
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              name="mobile"
              type="tel"
              placeholder="mobile num"
              value={form.mobile}
              onChange={handleChange}
              className="pl-11 h-11 rounded-full bg-background border-0 text-sm shadow-card"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              name="password"
              type="password"
              placeholder="password"
              value={form.password}
              onChange={handleChange}
              className="pl-11 h-11 rounded-full bg-background border-0 text-sm shadow-card"
              required
            />
          </div>

          <div className="flex justify-center pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="h-10 px-10 rounded-full bg-background text-primary hover:bg-background/90 shadow-button font-medium"
            >
              {isLoading ? "..." : "sing in"}
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-primary-foreground mt-10">
          well come to our world
        </p>

        <p className="text-center text-xs text-primary-foreground/80 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold underline">
            log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
