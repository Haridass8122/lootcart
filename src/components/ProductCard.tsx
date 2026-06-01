import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star, Eye, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart, inr } from "@/hooks/use-cart";
import type { Product } from "@/data/products";

interface Props extends Product {
  variant?: "default" | "compact";
}

export const ProductCard = ({ variant = "default", ...p }: Props) => {
  const [favorite, setFavorite] = useState(false);
  const { add } = useCart();

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-card shadow-card transition-all duration-300 hover:shadow-elegant hover:-translate-y-1 hover:border-primary/40",
      )}
    >
      {/* Sale badge */}
      {p.isOnSale && p.salePercentage && (
        <Badge className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground font-semibold">
          −{p.salePercentage}%
        </Badge>
      )}

      {/* Favorite */}
      <button
        onClick={() => setFavorite(!favorite)}
        aria-label="Toggle wishlist"
        className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-background/70 backdrop-blur-sm border border-border/50 flex items-center justify-center transition hover:bg-background hover:border-primary/40"
      >
        <Heart className={cn("h-4 w-4 transition-colors", favorite ? "fill-primary text-primary" : "text-muted-foreground")} />
      </button>

      {/* Image */}
      <Link to={`/product/${p.id}`} className="block relative overflow-hidden bg-secondary">
        <div className="aspect-square">
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="hidden sm:flex absolute inset-0 items-end justify-center pb-4 bg-gradient-to-t from-background/80 via-background/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="secondary" className="backdrop-blur-md text-xs">
            <Eye className="h-3.5 w-3.5 mr-1.5" /> Quick view
          </Button>
        </div>
      </Link>

      <div className="p-4">
        <p className="text-[10px] uppercase tracking-[0.18em] text-primary/80 mb-1">{p.category}</p>
        <Link to={`/product/${p.id}`}>
          <h3 className="font-display font-semibold text-sm sm:text-base line-clamp-2 leading-tight min-h-[2.5rem] hover:text-primary transition-colors">
            {p.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn("h-3 w-3", i < Math.floor(p.rating) ? "fill-primary text-primary" : "text-muted-foreground/40")}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({p.reviews})</span>
        </div>

        <div className="flex items-end justify-between mt-3 gap-2">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-display font-bold text-lg text-foreground">{inr(p.price)}</span>
            {p.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">{inr(p.originalPrice)}</span>
            )}
          </div>
          <Button
            size="icon"
            onClick={() => add({ id: p.id, name: p.name, price: p.price, originalPrice: p.originalPrice, image: p.image, category: p.category })}
            className="h-9 w-9 rounded-full bg-gradient-primary text-primary-foreground shadow-button hover:scale-110 transition-transform"
            aria-label="Add to cart"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
};
