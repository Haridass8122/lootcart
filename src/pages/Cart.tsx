import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useCart, inr } from "@/hooks/use-cart";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ChevronLeft, Truck, Tag } from "lucide-react";
import { useState } from "react";

const Cart = () => {
  const { items, update, remove, subtotal } = useCart();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);

  const shipping = subtotal === 0 ? 0 : subtotal > 4000 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const discount = applied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping + tax - discount;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-secondary flex items-center justify-center mb-5">
            <ShoppingBag className="w-9 h-9 text-muted-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Browse our collection to find something special.</p>
          <Button onClick={() => navigate("/products")} className="bg-gradient-primary shadow-button rounded-full">
            Start shopping <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <button onClick={() => navigate(-1)} className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronLeft className="w-4 h-4 mr-1" /> Continue browsing
        </button>
        <h1 className="font-display text-3xl md:text-4xl font-bold">Your cart</h1>
        <p className="text-muted-foreground mt-1">{items.length} {items.length === 1 ? "item" : "items"} ready to ship</p>

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="rounded-2xl border border-border/60 bg-card p-4 sm:p-5 shadow-card flex gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 sm:w-28 sm:h-28 rounded-xl object-cover" />
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-widest text-primary/80">{item.category}</p>
                      <h3 className="font-display font-semibold truncate">{item.name}</h3>
                      <p className="font-display font-bold mt-1">{inr(item.price)}</p>
                    </div>
                    <button onClick={() => remove(item.id)} className="text-muted-foreground hover:text-destructive p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-auto pt-3 flex items-center justify-between">
                    <div className="flex items-center border border-border rounded-full">
                      <button onClick={() => update(item.id, item.quantity - 1)} className="h-8 w-8 flex items-center justify-center hover:text-primary">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => update(item.id, item.quantity + 1)} className="h-8 w-8 flex items-center justify-center hover:text-primary">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-medium text-sm">{inr(item.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="rounded-2xl border border-border/60 bg-card p-6 h-fit sticky top-24 shadow-card">
            <h2 className="font-display font-semibold text-lg mb-4">Order summary</h2>

            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  placeholder="Coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="pl-9 h-10 rounded-full bg-secondary/40"
                />
              </div>
              <Button variant="outline" className="rounded-full" onClick={() => setApplied(coupon.trim().length > 0)}>
                Apply
              </Button>
            </div>
            {applied && <Badge className="bg-success/15 text-success border-success/30 mb-3">10% off applied ✦</Badge>}

            <div className="space-y-2 text-sm">
              <Row label="Subtotal" value={inr(subtotal)} />
              <Row label="Shipping" value={shipping === 0 ? "Free" : inr(shipping)} />
              <Row label="GST (18%)" value={inr(tax)} />
              {discount > 0 && <Row label="Discount" value={`-${inr(discount)}`} accent />}
              <Separator className="my-2" />
              <div className="flex justify-between font-display text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">{inr(total)}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground p-3 rounded-xl bg-secondary/40">
              <Truck className="w-4 h-4 text-primary shrink-0" />
              <span>Estimated delivery 3–5 business days</span>
            </div>

            <Button className="w-full mt-5 h-11 bg-gradient-primary shadow-button rounded-full" onClick={() => navigate("/checkout")}>
              Checkout <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

const Row = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div className="flex justify-between">
    <span className="text-muted-foreground">{label}</span>
    <span className={accent ? "text-success" : ""}>{value}</span>
  </div>
);

export default Cart;
