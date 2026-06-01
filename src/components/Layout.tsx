import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { CartDrawer } from "@/components/CartDrawer";
import { Sparkles, Instagram, Twitter, Facebook } from "lucide-react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <CartDrawer />
      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/60 bg-secondary/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
            <div className="col-span-2">
              <Link to="/" className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-gold flex items-center justify-center">
                  <Sparkles className="w-4.5 h-4.5 text-primary-foreground" strokeWidth={2.5} />
                </div>
                <span className="font-display text-xl font-bold">Loot<span className="text-gold">Cart</span></span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-sm">
                A modern shopping experience in noir & gold — curated electronics, home goods, and lifestyle.
              </p>
              <div className="flex gap-2 mt-4">
                {[Instagram, Twitter, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            <FooterCol title="Shop" links={[["All Products", "/products"], ["Electronics", "/products"], ["Home & Kitchen", "/products"], ["Fitness", "/products"]]} />
            <FooterCol title="Account" links={[["Profile", "/account"], ["Orders", "/orders"], ["Wishlist", "/wishlist"], ["Settings", "/settings"]]} />
            <FooterCol title="Support" links={[["Help Center", "/help"], ["Contact", "/help"], ["Shipping", "/help"], ["Returns", "/help"]]} />
          </div>
          <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>© 2026 LootCart. Crafted with care.</p>
            <p>Free shipping over ₹4,000 • Secure payments • 30-day returns</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FooterCol = ({ title, links }: { title: string; links: [string, string][] }) => (
  <div>
    <h3 className="font-display font-semibold text-sm mb-3">{title}</h3>
    <ul className="space-y-2 text-sm text-muted-foreground">
      {links.map(([label, href]) => (
        <li key={label}>
          <Link to={href} className="hover:text-primary transition">{label}</Link>
        </li>
      ))}
    </ul>
  </div>
);
