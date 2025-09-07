import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/Layout";
import { Package, Truck, CheckCircle, Clock, Eye, RotateCcw } from "lucide-react";

// Import product images
import headphonesImage from "@/assets/headphones.jpg";
import coffeeMakerImage from "@/assets/coffee-maker.jpg";
import fitnessWatchImage from "@/assets/fitness-watch.jpg";
import phoneChargerImage from "@/assets/phone-charger.jpg";
import phoneCaseImage from "@/assets/phone-case.jpg";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
}

const Orders = () => {
  const [orders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "LC-2024-001",
      date: "2024-01-15",
      status: "delivered",
      total: 299.97,
      items: [
        {
          id: "1",
          name: "Wireless Bluetooth Headphones",
          image: headphonesImage,
          price: 79.99,
          quantity: 1,
        },
        {
          id: "2",
          name: "Premium Coffee Maker",
          image: coffeeMakerImage,
          price: 149.99,
          quantity: 1,
        },
      ],
    },
    {
      id: "2",
      orderNumber: "LC-2024-002",
      date: "2024-01-20",
      status: "shipped",
      total: 199.99,
      items: [
        {
          id: "3",
          name: "Fitness Tracker Watch",
          image: fitnessWatchImage,
          price: 199.99,
          quantity: 1,
        },
      ],
    },
    {
      id: "3",
      orderNumber: "LC-2024-003",
      date: "2024-01-25",
      status: "confirmed",
      total: 89.98,
      items: [
        {
          id: "4",
          name: "Portable Phone Charger",
          image: phoneChargerImage,
          price: 29.99,
          quantity: 2,
        },
        {
          id: "5",
          name: "Phone Case",
          image: phoneCaseImage,
          price: 29.99,
          quantity: 1,
        },
      ],
    },
  ]);

  const getStatusBadge = (status: Order["status"]) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, icon: Clock, label: "Pending" },
      confirmed: { variant: "default" as const, icon: CheckCircle, label: "Confirmed" },
      shipped: { variant: "default" as const, icon: Truck, label: "Shipped" },
      delivered: { variant: "default" as const, icon: Package, label: "Delivered" },
      cancelled: { variant: "destructive" as const, icon: RotateCcw, label: "Cancelled" },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center space-x-1">
        <Icon className="w-3 h-3" />
        <span>{config.label}</span>
      </Badge>
    );
  };

  const filterOrdersByStatus = (status?: Order["status"]) => {
    if (!status) return orders;
    return orders.filter(order => order.status === status);
  };

  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="bg-gradient-card border-0 shadow-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Ordered on {new Date(order.date).toLocaleDateString()}
            </p>
          </div>
          {getStatusBadge(order.status)}
        </div>
      </CardHeader>
      <CardContent>
        {/* Order Items */}
        <div className="space-y-3 mb-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center space-x-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-grow">
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Total */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="font-semibold">Total: ${order.total.toFixed(2)}</span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
            {order.status === "delivered" && (
              <Button variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reorder
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (orders.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">No orders yet</h1>
            <p className="text-muted-foreground mb-6">
              When you place your first order, it will appear here.
            </p>
            <Button className="bg-gradient-primary shadow-button">
              Start Shopping
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">
            Track and manage your orders
          </p>
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {orders.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Orders</div>
          </div>
          <div className="bg-gradient-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {filterOrdersByStatus("delivered").length}
            </div>
            <div className="text-sm text-muted-foreground">Delivered</div>
          </div>
          <div className="bg-gradient-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {filterOrdersByStatus("shipped").length}
            </div>
            <div className="text-sm text-muted-foreground">In Transit</div>
          </div>
          <div className="bg-gradient-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">Total Spent</div>
          </div>
        </div>

        {/* Order Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {filterOrdersByStatus("pending").map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>

          <TabsContent value="shipped" className="space-y-4">
            {filterOrdersByStatus("shipped").map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>

          <TabsContent value="delivered" className="space-y-4">
            {filterOrdersByStatus("delivered").map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {filterOrdersByStatus("cancelled").map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Orders;