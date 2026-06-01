import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart, inr } from "@/hooks/use-cart";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CartDrawer = () => {
  const { items, isOpen, closeCart, update, remove, subtotal } = useCart();
  const navigate = useNavigate();
  const shipping = subtotal === 0 ? 0 : subtotal > 4000 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;
  const freeShipDelta = Math.max(0, 4000 - subtotal);
  const progress = Math.min(100, (subtotal / 4000) * 100);

  return (
    <Sheet open={isOpen} onOpenChange={(o) => (o ? null : closeCart())}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 bg-background border-l border-border">
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="font-display flex items-center gap-2 text-lg">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Your Cart
            <Badge variant="secondary" className="ml-auto">{items.length}</Badge>
          </SheetTitle>
        </SheetHeader>

        {/* Free shipping progress */}
        <div className="px-6 py-4 border-b border-border bg-secondary/40">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Truck className="h-3.5 w-3.5 text-primary" />
            {freeShipDelta > 0 ? (
              <span>Add <strong className="text-foreground">{inr(freeShipDelta)}</strong> for free shipping</span>
            ) : (
              <span className="text-primary font-medium">You unlocked free shipping ✨</span>
            )}
          </div>
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <div className="h-full bg-gradient-primary transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
                <ShoppingBag className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="font-display font-semibold mb-1">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mb-4">Start shopping to fill it with luxury.</p>
              <Button onClick={() => { closeCart(); navigate("/products"); }} className="bg-gradient-primary">
                Browse products
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 group">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover border border-border" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-widest text-primary/80">{item.category}</p>
                    <h4 className="text-sm font-medium truncate">{item.name}</h4>
                    <p className="font-display font-semibold text-sm mt-1">{inr(item.price)}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border rounded-full">
                        <button onClick={() => update(item.id, item.quantity - 1)} className="h-7 w-7 flex items-center justify-center hover:text-primary">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs">{item.quantity}</span>
                        <button onClick={() => update(item.id, item.quantity + 1)} className="h-7 w-7 flex items-center justify-center hover:text-primary">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button onClick={() => remove(item.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 bg-secondary/20 space-y-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span className="text-foreground">{inr(subtotal)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span className="text-foreground">{shipping === 0 ? "Free" : inr(shipping)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>GST (18%)</span><span className="text-foreground">{inr(tax)}</span></div>
            </div>
            <Separator />
            <div className="flex justify-between font-display font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">{inr(total)}</span>
            </div>
            <Button
              className="w-full h-11 bg-gradient-primary shadow-button"
              onClick={() => { closeCart(); navigate("/checkout"); }}
            >
              Checkout <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => { closeCart(); navigate("/cart"); }}>
              View full cart
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
