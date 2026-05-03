import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

import headphonesImage from "@/assets/headphones.jpg";
import coffeeMakerImage from "@/assets/coffee-maker.jpg";
import fitnessWatchImage from "@/assets/fitness-watch.jpg";
import phoneChargerImage from "@/assets/phone-charger.jpg";

const allProducts = [
  { id: "1", name: "Wireless Bluetooth Headphones", price: 6499, originalPrice: 8299, image: headphonesImage, rating: 4.5, reviews: 128, isOnSale: true, salePercentage: 20, category: "Electronics" },
  { id: "2", name: "Premium Coffee Maker", price: 12499, image: coffeeMakerImage, rating: 4.8, reviews: 89, category: "Home & Kitchen" },
  { id: "3", name: "Fitness Tracker Watch", price: 16599, originalPrice: 20749, image: fitnessWatchImage, rating: 4.3, reviews: 205, isOnSale: true, salePercentage: 20, category: "Fitness" },
  { id: "4", name: "Portable Phone Charger", price: 2499, image: phoneChargerImage, rating: 4.6, reviews: 324, category: "Electronics" },
  { id: "5", name: "Noise Cancelling Earbuds", price: 4999, originalPrice: 6999, image: headphonesImage, rating: 4.4, reviews: 156, isOnSale: true, salePercentage: 28, category: "Electronics" },
  { id: "6", name: "Smart Coffee Grinder", price: 5499, image: coffeeMakerImage, rating: 4.2, reviews: 64, category: "Home & Kitchen" },
  { id: "7", name: "Sport Smartwatch Pro", price: 24999, image: fitnessWatchImage, rating: 4.7, reviews: 412, category: "Fitness" },
  { id: "8", name: "Fast Charging Power Bank", price: 1999, originalPrice: 2799, image: phoneChargerImage, rating: 4.5, reviews: 287, isOnSale: true, salePercentage: 28, category: "Electronics" },
];

const categories = ["All", "Electronics", "Home & Kitchen", "Fitness"];
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "low", label: "Price: Low to High" },
  { value: "high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  const products = useMemo(() => {
    let list = allProducts.filter(p =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, category, sort]);

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-10 sm:py-14 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-2">
            All Products
          </h1>
          <p className="text-sm sm:text-base text-primary-foreground/90">
            Browse our complete collection
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
          <div className="relative">
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-10 pl-10 pr-8 rounded-md border border-input bg-background text-sm w-full md:w-56"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
          {categories.map((c) => (
            <Button
              key={c}
              size="sm"
              variant={category === c ? "default" : "outline"}
              onClick={() => setCategory(c)}
              className={category === c ? "bg-gradient-primary shadow-button" : ""}
            >
              {c}
            </Button>
          ))}
        </div>

        {/* Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Products;
