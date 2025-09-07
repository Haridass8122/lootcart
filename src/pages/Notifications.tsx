import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/Layout";
import { Switch } from "@/components/ui/switch";
import { 
  Bell, 
  Package, 
  Tag, 
  Heart, 
  Gift, 
  Star,
  Trash2,
  Settings,
  CheckCheck,
  Clock,
  ShoppingCart,
  AlertCircle
} from "lucide-react";

interface Notification {
  id: string;
  type: "order" | "promotion" | "wishlist" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  icon: any;
  priority: "low" | "medium" | "high";
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "order",
      title: "Order Shipped",
      message: "Your order #LC-2024-003 has been shipped and is on its way!",
      timestamp: "2024-01-25T10:30:00Z",
      read: false,
      actionUrl: "/orders",
      icon: Package,
      priority: "high",
    },
    {
      id: "2",
      type: "promotion",
      title: "Flash Sale Alert!",
      message: "50% off on electronics! Limited time offer ending in 6 hours.",
      timestamp: "2024-01-25T09:15:00Z",
      read: false,
      actionUrl: "/category/electronics",
      icon: Tag,
      priority: "medium",
    },
    {
      id: "3",
      type: "wishlist",
      title: "Price Drop Alert",
      message: "Wireless Bluetooth Headphones in your wishlist is now 20% off!",
      timestamp: "2024-01-25T08:45:00Z",
      read: true,
      actionUrl: "/wishlist",
      icon: Heart,
      priority: "medium",
    },
    {
      id: "4",
      type: "order",
      title: "Order Delivered",
      message: "Your order #LC-2024-002 has been delivered successfully.",
      timestamp: "2024-01-24T16:20:00Z",
      read: true,
      actionUrl: "/orders",
      icon: CheckCheck,
      priority: "high",
    },
    {
      id: "5",
      type: "promotion",
      title: "Welcome Bonus",
      message: "Welcome to Loot Cart! Enjoy 15% off your first purchase with code WELCOME15.",
      timestamp: "2024-01-24T14:00:00Z",
      read: true,
      actionUrl: "/",
      icon: Gift,
      priority: "low",
    },
    {
      id: "6",
      type: "system",
      title: "Account Security",
      message: "New login detected from Chrome on Windows. If this wasn't you, please secure your account.",
      timestamp: "2024-01-24T12:30:00Z",
      read: false,
      actionUrl: "/settings",
      icon: AlertCircle,
      priority: "high",
    },
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    orders: true,
    promotions: true,
    wishlist: true,
    system: true,
    email: true,
    push: true,
  });

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const notifTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - notifTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-destructive";
      case "medium": return "border-l-warning";
      default: return "border-l-primary";
    }
  };

  const filterNotifications = (type?: string) => {
    if (!type) return notifications;
    return notifications.filter(notif => notif.type === type);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const NotificationCard = ({ notification }: { notification: Notification }) => {
    const Icon = notification.icon;
    
    return (
      <Card className={`bg-gradient-card border-0 shadow-card border-l-4 ${getPriorityColor(notification.priority)} ${!notification.read ? 'bg-primary/5' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!notification.read ? 'bg-primary/20' : 'bg-secondary'}`}>
              <Icon className={`w-5 h-5 ${!notification.read ? 'text-primary' : 'text-muted-foreground'}`} />
            </div>
            
            <div className="flex-grow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`font-semibold text-sm ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {notification.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification.message}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {getTimeAgo(notification.timestamp)}
                    </span>
                    {!notification.read && (
                      <Badge variant="secondary" className="text-xs">New</Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                      className="h-8 px-2 text-xs"
                    >
                      Mark as read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteNotification(notification.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {notification.actionUrl && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3"
                  onClick={() => markAsRead(notification.id)}
                >
                  {notification.type === 'order' ? 'View Order' : 
                   notification.type === 'promotion' ? 'Shop Now' :
                   notification.type === 'wishlist' ? 'View Item' : 'Take Action'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (notifications.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">No notifications</h1>
            <p className="text-muted-foreground mb-6">
              You're all caught up! New notifications will appear here.
            </p>
            <Button className="bg-gradient-primary shadow-button">
              Continue Shopping
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
            <h1 className="text-3xl font-bold mb-2">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                <CheckCheck className="w-4 h-4 mr-2" />
                Mark all as read
              </Button>
            )}
            <Button variant="outline" onClick={clearAllNotifications}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear all
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="all">
              All ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="order">
              Orders ({filterNotifications('order').length})
            </TabsTrigger>
            <TabsTrigger value="promotion">
              Promotions ({filterNotifications('promotion').length})
            </TabsTrigger>
            <TabsTrigger value="wishlist">
              Wishlist ({filterNotifications('wishlist').length})
            </TabsTrigger>
            <TabsTrigger value="system">
              System ({filterNotifications('system').length})
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {notifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </TabsContent>

          <TabsContent value="order" className="space-y-4">
            {filterNotifications('order').map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </TabsContent>

          <TabsContent value="promotion" className="space-y-4">
            {filterNotifications('promotion').map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-4">
            {filterNotifications('wishlist').map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            {filterNotifications('system').map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Notification Types</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="font-medium">Order Updates</label>
                          <p className="text-sm text-muted-foreground">Get notified about order status changes</p>
                        </div>
                        <Switch
                          checked={notificationSettings.orders}
                          onCheckedChange={(checked) => 
                            setNotificationSettings(prev => ({...prev, orders: checked}))
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="font-medium">Promotions & Offers</label>
                          <p className="text-sm text-muted-foreground">Receive deals and discount notifications</p>
                        </div>
                        <Switch
                          checked={notificationSettings.promotions}
                          onCheckedChange={(checked) => 
                            setNotificationSettings(prev => ({...prev, promotions: checked}))
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="font-medium">Wishlist Alerts</label>
                          <p className="text-sm text-muted-foreground">Get notified about price drops on wishlist items</p>
                        </div>
                        <Switch
                          checked={notificationSettings.wishlist}
                          onCheckedChange={(checked) => 
                            setNotificationSettings(prev => ({...prev, wishlist: checked}))
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="font-medium">System Notifications</label>
                          <p className="text-sm text-muted-foreground">Important account and security updates</p>
                        </div>
                        <Switch
                          checked={notificationSettings.system}
                          onCheckedChange={(checked) => 
                            setNotificationSettings(prev => ({...prev, system: checked}))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4">Delivery Methods</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="font-medium">Email Notifications</label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Switch
                          checked={notificationSettings.email}
                          onCheckedChange={(checked) => 
                            setNotificationSettings(prev => ({...prev, email: checked}))
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="font-medium">Push Notifications</label>
                          <p className="text-sm text-muted-foreground">Receive instant browser notifications</p>
                        </div>
                        <Switch
                          checked={notificationSettings.push}
                          onCheckedChange={(checked) => 
                            setNotificationSettings(prev => ({...prev, push: checked}))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button className="bg-gradient-primary shadow-button">
                      Save Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Notifications;