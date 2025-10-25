import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isOnSale?: boolean;
  salePercentage?: number;
  isFavorite?: boolean;
  category: string;
}

export const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  isOnSale = false,
  salePercentage,
  isFavorite = false,
  category,
}: ProductCardProps) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  return (
    <Card className="group relative overflow-hidden border-0 bg-gradient-card shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
      {/* Sale Badge */}
      {isOnSale && salePercentage && (
        <Badge 
          variant="destructive" 
          className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 font-semibold text-xs"
        >
          -{salePercentage}%
        </Badge>
      )}

      {/* Favorite Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 h-7 w-7 sm:h-8 sm:w-8 bg-background/80 backdrop-blur-sm hover:bg-background"
        onClick={toggleFavorite}
      >
        <Heart
          className={cn(
            "h-3 w-3 sm:h-4 sm:w-4 transition-colors",
            favorite ? "fill-destructive text-destructive" : "text-muted-foreground"
          )}
        />
      </Button>

      {/* Product Image */}
      <div className="relative overflow-hidden bg-secondary">
        <img
          src={image}
          alt={name}
          className="h-40 sm:h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Hover Overlay - Hidden on mobile */}
        <div className="hidden sm:flex absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
          <Button
            variant="secondary"
            size="sm"
            className="bg-background/90 backdrop-blur-sm text-xs"
          >
            <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Quick View
          </Button>
        </div>
      </div>

      <CardContent className="p-3 sm:p-4">
        {/* Category */}
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
          {category}
        </p>

        {/* Product Name */}
        <h3 className="font-semibold text-xs sm:text-sm mb-2 line-clamp-2 leading-tight min-h-[2.5rem] sm:min-h-[2.8rem]">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-2.5 w-2.5 sm:h-3 sm:w-3",
                  i < Math.floor(rating)
                    ? "fill-primary text-primary"
                    : "text-muted-foreground"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 flex-wrap">
          <span className="font-bold text-base sm:text-lg text-primary">
            ₹{price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-xs sm:text-sm text-muted-foreground line-through">
              ₹{originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-3 sm:p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={isLoading}
          className="w-full bg-gradient-primary shadow-button hover:shadow-primary text-xs sm:text-sm h-8 sm:h-10"
        >
          {isLoading ? (
            "Adding..."
          ) : (
            <>
              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};