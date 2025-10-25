import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import { Layout } from "@/components/Layout";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Search, ArrowRight, TrendingUp, Gift, Truck, Shield } from "lucide-react";

// Import product images
import headphonesImage from "@/assets/headphones.jpg";
import coffeeMakerImage from "@/assets/coffee-maker.jpg";
import fitnessWatchImage from "@/assets/fitness-watch.jpg";
import phoneChargerImage from "@/assets/phone-charger.jpg";

// Import category images
import electronicsCategory from "@/assets/category-electronics.jpg";
import fashionCategory from "@/assets/category-fashion.jpg";
import homeKitchenCategory from "@/assets/category-home-kitchen.jpg";
import sportsFitnessCategory from "@/assets/category-sports-fitness.jpg";
import booksCategory from "@/assets/category-books.jpg";
import beautyCategory from "@/assets/category-beauty.jpg";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for featured products
  const featuredProducts = [
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
  ];

  const categories = [
    { name: "Electronics", count: 1234, color: "bg-primary", image: electronicsCategory },
    { name: "Fashion", count: 856, color: "bg-accent", image: fashionCategory },
    { name: "Home & Kitchen", count: 642, color: "bg-success", image: homeKitchenCategory },
    { name: "Sports & Fitness", count: 428, color: "bg-warning", image: sportsFitnessCategory },
    { name: "Books", count: 291, color: "bg-info", image: booksCategory },
    { name: "Beauty", count: 537, color: "bg-destructive", image: beautyCategory },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-12 sm:py-16 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/800')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto text-center relative z-10">
          <Badge variant="secondary" className="mb-3 sm:mb-4 text-xs sm:text-sm bg-background/20 backdrop-blur-sm text-primary-foreground border-0">
            <Gift className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Free shipping on orders over $50
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 sm:mb-6 px-2">
            Welcome to{" "}
            <span className="bg-background/20 px-3 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl backdrop-blur-sm inline-block mt-2 sm:mt-0">
              Loot Cart
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-primary-foreground/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Discover amazing products at unbeatable prices. Your next favorite item is just a click away.
          </p>
          
          {/* Hero Search */}
          <div className="max-w-md mx-auto mb-6 sm:mb-8 px-4">
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              <Input
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 sm:pl-12 pr-16 sm:pr-20 h-10 sm:h-12 text-sm sm:text-base bg-background/90 backdrop-blur-sm border-0 text-foreground"
              />
              <Button
                className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 h-7 sm:h-8 px-3 sm:px-4 text-xs sm:text-sm bg-gradient-primary shadow-button"
                size="sm"
              >
                Search
              </Button>
            </div>
          </div>

          <Button 
            size="lg" 
            className="bg-background text-primary hover:bg-background/90 shadow-elegant text-sm sm:text-base h-10 sm:h-11 px-6 sm:px-8"
            onClick={() => {
              document.getElementById('featured-products')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }}
          >
            Start Shopping
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Free Shipping</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Free shipping on all orders over $50</p>
            </div>
            <div className="text-center p-4 sm:p-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Secure Payment</h3>
              <p className="text-sm sm:text-base text-muted-foreground">100% secure payment processing</p>
            </div>
            <div className="text-center p-4 sm:p-6 sm:col-span-2 md:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Best Prices</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Competitive prices on all products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Shop by Category</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
              Explore our wide range of categories and find exactly what you're looking for
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl bg-gradient-card border border-border hover:shadow-card transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-xs sm:text-sm md:text-base text-center mb-0.5 sm:mb-1">{category.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground text-center">
                  {category.count} items
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products" className="py-12 sm:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Featured Products</h2>
              <p className="text-sm sm:text-base text-muted-foreground">Handpicked items just for you</p>
            </div>
            <Button variant="outline" className="hidden md:flex text-sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="text-center mt-6 sm:mt-8 md:hidden">
            <Button variant="outline" className="text-sm">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-3 sm:mb-4 px-4">
            Stay Updated with Loot Cart
          </h2>
          <p className="text-sm sm:text-base text-primary-foreground/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Subscribe to our newsletter and be the first to know about new products, sales, and exclusive offers.
          </p>
          
          <div className="max-w-md mx-auto px-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
              <Input
                placeholder="Enter your email"
                className="bg-background/90 backdrop-blur-sm border-0 text-foreground h-10 sm:h-10 text-sm sm:text-base"
              />
              <Button className="bg-background text-primary hover:bg-background/90 shadow-button h-10 sm:h-10 text-sm sm:text-base whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;