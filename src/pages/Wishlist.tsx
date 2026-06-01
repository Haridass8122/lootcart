import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const navigate = useNavigate();
  const [ids, setIds] = useState<string[]>(["1", "3", "7"]);
  const items = products.filter((p) => ids.includes(p.id));

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h1 className="font-display text-2xl mb-2">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-6">Tap the heart icon to save items you love.</p>
          <Button onClick={() => navigate("/products")} className="bg-gradient-primary rounded-full">Discover products</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2">Saved for later</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold">Your wishlist</h1>
        <p className="text-muted-foreground mt-1">{items.length} items waiting</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {items.map((p) => (
            <div key={p.id} className="relative">
              <ProductCard {...p} />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIds(ids.filter((id) => id !== p.id))}
                className="absolute -top-2 -left-2 z-20 rounded-full text-xs h-7"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
