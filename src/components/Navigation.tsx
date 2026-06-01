import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ShoppingBag, Heart, User, Search, Menu, Bell, Package,
  Settings, HelpCircle, LogOut, Sun, Moon, Sparkles, ChevronRight,
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useCart } from "@/hooks/use-cart";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/wishlist", label: "Wishlist" },
  { to: "/orders", label: "Orders" },
];

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const { count, openCart } = useCart();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const isActive = (p: string) => location.pathname === p;

  const suggestions = query
    ? products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-gold flex items-center justify-center shadow-button">
                <Sparkles className="w-4.5 h-4.5 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-gold opacity-30 blur-md -z-10" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              Loot<span className="text-gold">Cart</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "px-3 py-2 rounded-full text-sm font-medium transition",
                  isActive(l.to) ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate(`/products?q=${encodeURIComponent(query)}`);
              }}
              placeholder="Search the catalog..."
              className="pl-10 pr-4 h-10 rounded-full bg-secondary/60 border-border/60 focus-visible:ring-primary"
            />
            {focused && suggestions.length > 0 && (
              <div className="absolute top-12 left-0 right-0 bg-popover border border-border rounded-xl shadow-elegant p-2 animate-fade-in z-50">
                {suggestions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => navigate(`/product/${s.id}`)}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-secondary text-left"
                  >
                    <img src={s.image} alt="" className="w-9 h-9 rounded-md object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.category}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={toggle} className="rounded-full" aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            <Link to="/notifications" className="hidden sm:block">
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
              </Button>
            </Link>

            <Link to="/wishlist" className="hidden sm:block">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Heart className="w-5 h-5" />
              </Button>
            </Link>

            <Button variant="ghost" size="icon" onClick={openCart} className="rounded-full relative">
              <ShoppingBag className="w-5 h-5" />
              {count > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-primary text-primary-foreground text-[10px]">
                  {count}
                </Badge>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:inline-flex rounded-full">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link to="/account"><User className="mr-2 h-4 w-4" />Profile</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/orders"><Package className="mr-2 h-4 w-4" />Orders</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/wishlist"><Heart className="mr-2 h-4 w-4" />Wishlist</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/settings"><Settings className="mr-2 h-4 w-4" />Settings</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/help"><HelpCircle className="mr-2 h-4 w-4" />Help</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link to="/login"><LogOut className="mr-2 h-4 w-4" />Sign out</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden rounded-full">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle className="font-display">Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-1">
                  {navLinks.map((l) => (
                    <Link key={l.to} to={l.to} className="block px-3 py-2.5 rounded-lg hover:bg-secondary">{l.label}</Link>
                  ))}
                  <div className="h-px bg-border my-2" />
                  <Link to="/account" className="block px-3 py-2.5 rounded-lg hover:bg-secondary">Account</Link>
                  <Link to="/settings" className="block px-3 py-2.5 rounded-lg hover:bg-secondary">Settings</Link>
                  <Link to="/help" className="block px-3 py-2.5 rounded-lg hover:bg-secondary">Help</Link>
                  <Link to="/login" className="block px-3 py-2.5 rounded-lg hover:bg-secondary">Sign in</Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && navigate(`/products?q=${encodeURIComponent(query)}`)}
              placeholder="Search..."
              className="pl-10 h-10 rounded-full bg-secondary/60"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
