import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Package, Truck, CheckCircle2, ChevronRight } from "lucide-react";
import { inr } from "@/hooks/use-cart";
import { useNavigate } from "react-router-dom";
import headphonesImage from "@/assets/headphones.jpg";
import coffeeMakerImage from "@/assets/coffee-maker.jpg";
import fitnessWatchImage from "@/assets/fitness-watch.jpg";

const orders = [
  {
    id: "LC-2026-0142",
    date: "May 28, 2026",
    status: "delivered",
    total: 14998,
    items: [
      { name: "Wireless Bluetooth Headphones", qty: 1, image: headphonesImage },
      { name: "Portable Phone Charger", qty: 2, image: coffeeMakerImage },
    ],
  },
  {
    id: "LC-2026-0118",
    date: "May 12, 2026",
    status: "shipped",
    total: 16599,
    items: [{ name: "Fitness Tracker Watch", qty: 1, image: fitnessWatchImage }],
  },
  {
    id: "LC-2026-0099",
    date: "Apr 30, 2026",
    status: "processing",
    total: 12499,
    items: [{ name: "Premium Coffee Maker", qty: 1, image: coffeeMakerImage }],
  },
];

const statusMap = {
  delivered: { label: "Delivered", color: "bg-success/15 text-success border-success/30", icon: CheckCircle2 },
  shipped: { label: "Shipped", color: "bg-info/15 text-info border-info/30", icon: Truck },
  processing: { label: "Processing", color: "bg-warning/15 text-warning border-warning/30", icon: Package },
};

const Orders = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2">History</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-6">Your orders</h1>

        <div className="space-y-4">
          {orders.map((o) => {
            const s = statusMap[o.status as keyof typeof statusMap];
            return (
              <Card key={o.id} className="p-5 bg-card border-border/60 hover:shadow-card transition">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Order {o.id}</p>
                    <p className="font-display font-semibold">{o.date}</p>
                  </div>
                  <Badge variant="outline" className={s.color}>
                    <s.icon className="w-3 h-3 mr-1" /> {s.label}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  {o.items.map((it, i) => (
                    <img key={i} src={it.image} alt={it.name} className="w-14 h-14 rounded-lg object-cover border border-border" />
                  ))}
                  <div className="text-sm text-muted-foreground">
                    {o.items.length} {o.items.length === 1 ? "item" : "items"}
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="font-display text-lg font-bold text-primary">{inr(o.total)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="rounded-full">Track</Button>
                    <Button variant="ghost" size="sm" className="rounded-full" onClick={() => navigate("/products")}>
                      Buy again <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
