import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/ProductCard";
import { TryOn } from "@/components/TryOn";
import { getProduct, products } from "@/data/products";
import { useCart, inr } from "@/hooks/use-cart";
import {
  Heart, ShoppingBag, Star, Truck, Shield, RotateCcw, Minus, Plus,
  ChevronLeft, Check, ZoomIn,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProduct(id ?? "");
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [zoom, setZoom] = useState(false);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="font-display text-2xl mb-3">Product not found</h1>
          <Button onClick={() => navigate("/products")}>Back to shop</Button>
        </div>
      </Layout>
    );
  }

  const imgs = product.images ?? [product.image];
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <Link to="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="space-y-3">
            <div
              className="relative aspect-square rounded-3xl overflow-hidden bg-secondary border border-border/60 group cursor-zoom-in"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
            >
              <img
                src={imgs[activeImg]}
                alt={product.name}
                className={cn("w-full h-full object-cover transition-transform duration-500", zoom && "scale-150")}
              />
              <div className="absolute top-3 right-3 bg-background/70 backdrop-blur-sm rounded-full p-2 text-xs flex items-center gap-1">
                <ZoomIn className="w-3.5 h-3.5" /> Hover to zoom
              </div>
              {product.isOnSale && (
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">−{product.salePercentage}%</Badge>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {imgs.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "aspect-square rounded-xl overflow-hidden border-2 transition",
                    activeImg === i ? "border-primary shadow-glow" : "border-border opacity-70 hover:opacity-100",
                  )}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2">{product.category}</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight">{product.name}</h1>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("w-4 h-4", i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground/40")} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} • {product.reviews} reviews</span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-4xl font-bold text-gold">{inr(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">{inr(product.originalPrice)}</span>
              )}
            </div>

            <p className="mt-5 text-muted-foreground leading-relaxed">{product.description}</p>

            <ul className="mt-5 grid grid-cols-2 gap-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex items-center gap-3">
              <div className="flex items-center border border-border rounded-full">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-11 w-11 flex items-center justify-center hover:text-primary">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="h-11 w-11 flex items-center justify-center hover:text-primary">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button
                size="lg"
                className="flex-1 h-12 bg-gradient-primary shadow-button rounded-full"
                onClick={() => add(
                  { id: product.id, name: product.name, price: product.price, originalPrice: product.originalPrice, image: product.image, category: product.category },
                  qty,
                )}
              >
                <ShoppingBag className="w-4 h-4 mr-2" /> Add to cart
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-12 w-12 rounded-full"
                onClick={() => setFavorite(!favorite)}
                aria-label="Wishlist"
              >
                <Heart className={cn("w-5 h-5", favorite && "fill-primary text-primary")} />
              </Button>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
              {[
                { icon: Truck, label: "Free shipping over ₹4,000" },
                { icon: Shield, label: "2-year warranty" },
                { icon: RotateCcw, label: "30-day returns" },
              ].map((b) => (
                <div key={b.label} className="rounded-xl border border-border/60 bg-secondary/40 p-3 flex flex-col items-center text-center gap-1">
                  <b.icon className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="bg-secondary/40">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
              <TabsTrigger value="qa">Q&amp;A</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <div className="max-w-3xl text-muted-foreground leading-relaxed space-y-3">
                <p>{product.description}</p>
                <p>
                  Engineered with premium materials and a relentless focus on craft. Every detail — from the
                  tactile finish to the carefully tuned interactions — is meant to delight.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6 space-y-4 max-w-3xl">
              {[
                { name: "Aarav P.", rating: 5, body: "Worth every rupee. Build quality is exceptional." },
                { name: "Sneha M.", rating: 4, body: "Love it. Minor learning curve but the result is fantastic." },
                { name: "Rahul S.", rating: 5, body: "Better than the brand-name alternative I had before." },
              ].map((r) => (
                <div key={r.name} className="rounded-2xl border border-border/60 bg-card p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{r.name}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("w-3.5 h-3.5", i < r.rating ? "fill-primary text-primary" : "text-muted-foreground/40")} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{r.body}</p>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="qa" className="mt-6 max-w-3xl space-y-4">
              {[
                { q: "Is this compatible with iOS and Android?", a: "Yes — works seamlessly with both." },
                { q: "What's in the box?", a: "The product, a USB-C cable, carrying pouch, and quick-start guide." },
              ].map((it) => (
                <div key={it.q} className="rounded-2xl border border-border/60 bg-card p-5">
                  <p className="font-medium mb-1">Q. {it.q}</p>
                  <p className="text-sm text-muted-foreground">A. {it.a}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => <ProductCard key={p.id} {...p} />)}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
