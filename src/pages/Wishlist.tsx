import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Layout } from "@/components/Layout";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";

// Import product images
import headphonesImage from "@/assets/headphones.jpg";
import coffeeMakerImage from "@/assets/coffee-maker.jpg";
import fitnessWatchImage from "@/assets/fitness-watch.jpg";
import phoneChargerImage from "@/assets/phone-charger.jpg";
import smartSpeakerImage from "@/assets/smart-speaker.jpg";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isOnSale?: boolean;
  salePercentage?: number;
  category: string;
}

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "1",
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      originalPrice: 99.99,
      image: headphonesImage,
      rating: 4.5,
      reviews: 128,
      isOnSale: true,
      salePercentage: 20,
      category: "Electronics",
    },
    {
      id: "2",
      name: "Premium Coffee Maker",
      price: 149.99,
      image: coffeeMakerImage,
      rating: 4.8,
      reviews: 89,
      category: "Home & Kitchen",
    },
    {
      id: "3",
      name: "Fitness Tracker Watch",
      price: 199.99,
      originalPrice: 249.99,
      image: fitnessWatchImage,
      rating: 4.3,
      reviews: 205,
      isOnSale: true,
      salePercentage: 20,
      category: "Fitness",
    },
    {
      id: "4",
      name: "Portable Phone Charger",
      price: 29.99,
      image: phoneChargerImage,
      rating: 4.6,
      reviews: 324,
      category: "Electronics",
    },
    {
      id: "5",
      name: "Smart Home Speaker",
      price: 89.99,
      originalPrice: 119.99,
      image: smartSpeakerImage,
      rating: 4.4,
      reviews: 156,
      isOnSale: true,
      salePercentage: 25,
      category: "Electronics",
    },
  ]);

  const removeFromWishlist = (id: string) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const moveAllToCart = () => {
    // Simulate moving all items to cart
    setWishlistItems([]);
  };

  if (wishlistItems.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-6">
              Save items you love for later. Start adding products to your wishlist!
            </p>
            <Button className="bg-gradient-primary shadow-button">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
            <p className="text-muted-foreground">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>
          
          {wishlistItems.length > 0 && (
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={moveAllToCart}
                className="hidden md:flex"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Move All to Cart
              </Button>
              <Button className="bg-gradient-primary shadow-button">
                Continue Shopping
              </Button>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {wishlistItems.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Items</div>
          </div>
          <div className="bg-gradient-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              ${wishlistItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">Total Value</div>
          </div>
          <div className="bg-gradient-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {wishlistItems.filter(item => item.isOnSale).length}
            </div>
            <div className="text-sm text-muted-foreground">On Sale</div>
          </div>
        </div>

        {/* Mobile Action Button */}
        <div className="md:hidden mb-6">
          <Button
            variant="outline"
            onClick={moveAllToCart}
            className="w-full"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Move All to Cart
          </Button>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="relative">
              <ProductCard
                {...item}
                isFavorite={true}
              />
              {/* Remove button overlay */}
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 left-2 z-20 h-8 px-3"
                onClick={() => removeFromWishlist(item.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-4">
            <Button variant="outline" size="lg">
              Share Wishlist
            </Button>
            <Button 
              size="lg"
              className="bg-gradient-primary shadow-button"
            >
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;