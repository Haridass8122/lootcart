import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock, ShoppingCart } from "lucide-react";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Avatar Circle */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="w-32 h-32 sm:w-36 sm:h-36 bg-background rounded-full flex items-center justify-center shadow-elegant">
            <ShoppingCart className="w-12 h-12 sm:w-14 sm:h-14 text-primary" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Identifier */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="user name, phone num, mail id"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="pl-11 h-11 rounded-full bg-background border-0 text-sm shadow-card"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-11 h-11 rounded-full bg-background border-0 text-sm shadow-card"
              required
            />
          </div>

          {/* Login Button */}
          <div className="flex justify-center pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="h-10 px-10 rounded-full bg-background text-primary hover:bg-background/90 shadow-button font-medium"
            >
              {isLoading ? "..." : "log in"}
            </Button>
          </div>
        </form>

        {/* Divider + Register link */}
        <div className="mt-10 sm:mt-12">
          <div className="border-t border-primary-foreground/40 mb-4" />
          <p className="text-center text-sm text-primary-foreground">
            create an account with us.{" "}
            <Link to="/register" className="font-semibold underline">
              sing in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
