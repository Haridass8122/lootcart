import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import { products, categories } from "@/data/products";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "low", label: "Price: Low to High" },
  { value: "high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const Products = () => {
  const [params] = useSearchParams();
  const [search, setSearch] = useState(params.get("q") ?? "");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    const q = params.get("q");
    if (q !== null) setSearch(q);
  }, [params]);

  const list = useMemo(() => {
    let l = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.name.toLowerCase().includes(search.toLowerCase()),
    );
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "rating") l = [...l].sort((a, b) => b.rating - a.rating);
    return l;
  }, [search, category, sort]);

  return (
    <Layout>
      <section className="relative bg-gradient-hero border-b border-border/60">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2">Catalog</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold">All products</h1>
          <p className="text-muted-foreground mt-2">Browse the full noir-and-gold collection.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="pl-10 h-11 rounded-full bg-secondary/40"
            />
          </div>
          <div className="relative">
            <SlidersHorizontal className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-11 pl-10 pr-8 rounded-full border border-input bg-secondary/40 text-sm w-full md:w-56"
            >
              {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c) => (
            <Button
              key={c}
              size="sm"
              variant={category === c ? "default" : "outline"}
              onClick={() => setCategory(c)}
              className={`rounded-full ${category === c ? "bg-gradient-primary text-primary-foreground" : ""}`}
            >
              {c}
            </Button>
          ))}
        </div>

        {list.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {list.map((p) => <ProductCard key={p.id} {...p} />)}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Products;
