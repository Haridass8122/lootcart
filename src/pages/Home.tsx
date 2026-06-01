import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";
import {
  ArrowRight, Sparkles, Truck, Shield, RotateCcw, Headphones,
  TrendingUp, Award, Zap, Glasses,
} from "lucide-react";
import headphonesImage from "@/assets/headphones.jpg";
import coffeeMakerImage from "@/assets/coffee-maker.jpg";
import fitnessWatchImage from "@/assets/fitness-watch.jpg";
import electronicsCategory from "@/assets/category-electronics.jpg";
import homeKitchenCategory from "@/assets/category-home-kitchen.jpg";
import sportsFitnessCategory from "@/assets/category-sports-fitness.jpg";

const Home = () => {
  const featured = products.slice(0, 4);
  const trending = products.slice(4, 8);

  return (
    <Layout>
      {/* HERO — bento grid */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto px-4 py-10 md:py-16">
          {/* Marquee strip */}
          <div className="mb-8 overflow-hidden rounded-full border border-border/60 bg-secondary/40 py-2.5">
            <div className="flex gap-12 marquee whitespace-nowrap text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {Array.from({ length: 2 }).flatMap((_, k) =>
                ["Free shipping over ₹4,000", "✦", "30-day returns", "✦", "Luxury curated", "✦", "Premium support", "✦", "Earn loot points", "✦"].map((t, i) => (
                  <span key={`${k}-${i}`} className="shrink-0">{t}</span>
                )),
              )}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-3 md:gap-4 auto-rows-[minmax(140px,auto)]">
            {/* Big hero card */}
            <div className="col-span-12 lg:col-span-8 row-span-2 relative overflow-hidden rounded-3xl bg-gradient-card border border-border/60 shadow-elegant p-8 md:p-12 group">
              <div className="absolute inset-0 grain pointer-events-none" />
              <div className="absolute -right-20 -bottom-20 w-[420px] h-[420px] rounded-full bg-gradient-gold opacity-20 blur-3xl" />
              <Badge className="bg-primary/10 text-primary border border-primary/30 hover:bg-primary/10">
                <Sparkles className="w-3 h-3 mr-1.5" /> New season drop
              </Badge>
              <h1 className="mt-5 font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
                Shop the <span className="text-gold">noir</span><br />
                edition.
              </h1>
              <p className="mt-5 max-w-md text-muted-foreground">
                A curated collection of premium electronics, lifestyle, and home goods — designed for those who notice the details.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/products">
                  <Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-button h-12 px-6 rounded-full">
                    Explore catalog <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/product/1">
                  <Button size="lg" variant="outline" className="h-12 px-6 rounded-full border-border">
                    Featured item
                  </Button>
                </Link>
              </div>
              <img
                src={headphonesImage}
                alt="Featured product"
                className="hidden md:block absolute -right-8 bottom-8 w-72 lg:w-96 rounded-2xl object-cover shadow-elegant rotate-6 animate-float-slow"
              />
            </div>

            {/* Stats card */}
            <div className="col-span-6 lg:col-span-4 rounded-3xl bg-card border border-border/60 p-6 flex flex-col justify-between shadow-card">
              <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
                <TrendingUp className="w-3.5 h-3.5 text-primary" /> This week
              </div>
              <div>
                <p className="font-display text-5xl md:text-6xl font-bold text-gold">10K+</p>
                <p className="text-sm text-muted-foreground mt-1">Happy shoppers across India</p>
              </div>
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-gold border-2 border-card" />
                ))}
                <div className="w-8 h-8 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-[10px] font-semibold">+9k</div>
              </div>
            </div>

            {/* Badge card */}
            <div className="col-span-6 lg:col-span-4 rounded-3xl bg-gradient-gold p-6 text-primary-foreground relative overflow-hidden shadow-button">
              <Award className="absolute -right-4 -bottom-4 w-32 h-32 opacity-20" />
              <p className="text-[10px] uppercase tracking-widest opacity-80">Reward unlocked</p>
              <p className="font-display text-2xl font-bold mt-2">First Purchase</p>
              <p className="text-sm opacity-90 mt-1">Earn 500 loot points on your first order.</p>
            </div>

            {/* Category — Electronics */}
            <CategoryTile colSpan="col-span-6 lg:col-span-4" name="Electronics" img={electronicsCategory} count={1234} />
            {/* Category — Home */}
            <CategoryTile colSpan="col-span-6 lg:col-span-4" name="Home & Kitchen" img={homeKitchenCategory} count={642} />
            {/* Category — Fitness */}
            <CategoryTile colSpan="col-span-12 lg:col-span-4" name="Sports & Fitness" img={sportsFitnessCategory} count={428} />
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="border-y border-border/60 bg-secondary/20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, label: "Free shipping", sub: "Orders over ₹4,000" },
              { icon: Shield, label: "Secure checkout", sub: "256-bit encryption" },
              { icon: RotateCcw, label: "30-day returns", sub: "Hassle-free" },
              { icon: Headphones, label: "24/7 support", sub: "Real humans" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center shrink-0">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold text-sm">{f.label}</p>
                  <p className="text-xs text-muted-foreground">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2">Curated picks</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold">Featured products</h2>
            </div>
            <Link to="/products" className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((p) => <ProductCard key={p.id} {...p} />)}
          </div>
        </div>
      </section>

      {/* AR/VR placeholder */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-card p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center shadow-card">
            <div className="absolute inset-0 grain pointer-events-none" />
            <div className="relative">
              <Badge className="bg-primary/10 text-primary border border-primary/30 hover:bg-primary/10">
                <Glasses className="w-3 h-3 mr-1.5" /> Coming soon
              </Badge>
              <h3 className="mt-4 font-display text-3xl md:text-4xl font-bold">Try before you buy — in AR.</h3>
              <p className="mt-3 text-muted-foreground max-w-md">
                Preview furniture in your living room and accessories on yourself with our upcoming AR experience.
              </p>
              <Button className="mt-6 bg-gradient-primary shadow-button rounded-full" size="lg">
                Join the waitlist <Zap className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative grid grid-cols-2 gap-4">
              <img src={fitnessWatchImage} alt="" className="rounded-2xl aspect-square object-cover shadow-elegant" />
              <img src={coffeeMakerImage} alt="" className="rounded-2xl aspect-square object-cover shadow-elegant mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2">Most wanted</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold">Trending now</h2>
            </div>
            <Link to="/products" className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trending.map((p) => <ProductCard key={p.id} {...p} />)}
          </div>
        </div>
      </section>
    </Layout>
  );
};

const CategoryTile = ({ colSpan, name, img, count }: { colSpan: string; name: string; img: string; count: number }) => (
  <Link
    to="/products"
    className={`${colSpan} relative overflow-hidden rounded-3xl bg-card border border-border/60 group shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all`}
  >
    <img src={img} alt={name} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition duration-500" />
    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
    <div className="relative p-6 h-full flex flex-col justify-end min-h-[180px]">
      <p className="font-display text-xl font-bold">{name}</p>
      <p className="text-xs text-muted-foreground mt-1">{count.toLocaleString("en-IN")} items</p>
    </div>
  </Link>
);

export default Home;
