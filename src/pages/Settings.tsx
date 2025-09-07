import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layout } from "@/components/Layout";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Mail, 
  Smartphone, 
  Globe, 
  Moon, 
  Sun, 
  Volume2, 
  Shield,
  Download,
  Trash2,
  Eye,
  EyeOff
} from "lucide-react";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailPromotions: false,
    pushOrders: true,
    pushPromotions: true,
    smsOrders: false,
    smsPromotions: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    orderHistoryVisible: false,
    wishlistVisible: true,
    activityTracking: true,
  });

  const [preferences, setPreferences] = useState({
    language: "en",
    currency: "USD",
    theme: "system",
    soundEnabled: true,
  });

  const updateNotification = (key: keyof typeof notifications, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const updatePrivacy = (key: keyof typeof privacy, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const updatePreference = (key: string, value: string | boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Customize your app experience and preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Notifications Settings */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Notifications */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Mail className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold">Email Notifications</h3>
                </div>
                <div className="space-y-3 ml-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-orders" className="font-medium">Order Updates</Label>
                      <p className="text-sm text-muted-foreground">Get notified about order status changes</p>
                    </div>
                    <Switch
                      id="email-orders"
                      checked={notifications.emailOrders}
                      onCheckedChange={(checked) => updateNotification('emailOrders', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-promotions" className="font-medium">Promotions & Offers</Label>
                      <p className="text-sm text-muted-foreground">Receive special deals and discounts</p>
                    </div>
                    <Switch
                      id="email-promotions"
                      checked={notifications.emailPromotions}
                      onCheckedChange={(checked) => updateNotification('emailPromotions', checked)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Push Notifications */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Smartphone className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold">Push Notifications</h3>
                </div>
                <div className="space-y-3 ml-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-orders" className="font-medium">Order Updates</Label>
                      <p className="text-sm text-muted-foreground">Get instant notifications about your orders</p>
                    </div>
                    <Switch
                      id="push-orders"
                      checked={notifications.pushOrders}
                      onCheckedChange={(checked) => updateNotification('pushOrders', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-promotions" className="font-medium">Promotions & Offers</Label>
                      <p className="text-sm text-muted-foreground">Get notified about sales and discounts</p>
                    </div>
                    <Switch
                      id="push-promotions"
                      checked={notifications.pushPromotions}
                      onCheckedChange={(checked) => updateNotification('pushPromotions', checked)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* SMS Notifications */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Smartphone className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold">SMS Notifications</h3>
                  <Badge variant="secondary" className="text-xs">Premium</Badge>
                </div>
                <div className="space-y-3 ml-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-orders" className="font-medium">Order Updates</Label>
                      <p className="text-sm text-muted-foreground">Get SMS updates for critical order changes</p>
                    </div>
                    <Switch
                      id="sms-orders"
                      checked={notifications.smsOrders}
                      onCheckedChange={(checked) => updateNotification('smsOrders', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-promotions" className="font-medium">Flash Sales</Label>
                      <p className="text-sm text-muted-foreground">Get SMS alerts for time-sensitive deals</p>
                    </div>
                    <Switch
                      id="sms-promotions"
                      checked={notifications.smsPromotions}
                      onCheckedChange={(checked) => updateNotification('smsPromotions', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Privacy & Security</span>
              </CardTitle>
              <CardDescription>
                Control your privacy and data sharing preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="profile-visible" className="font-medium">Public Profile</Label>
                  <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                </div>
                <Switch
                  id="profile-visible"
                  checked={privacy.profileVisible}
                  onCheckedChange={(checked) => updatePrivacy('profileVisible', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="order-history-visible" className="font-medium">Order History</Label>
                  <p className="text-sm text-muted-foreground">Show purchase history in recommendations</p>
                </div>
                <Switch
                  id="order-history-visible"
                  checked={privacy.orderHistoryVisible}
                  onCheckedChange={(checked) => updatePrivacy('orderHistoryVisible', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="wishlist-visible" className="font-medium">Public Wishlist</Label>
                  <p className="text-sm text-muted-foreground">Allow others to see your wishlist</p>
                </div>
                <Switch
                  id="wishlist-visible"
                  checked={privacy.wishlistVisible}
                  onCheckedChange={(checked) => updatePrivacy('wishlistVisible', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="activity-tracking" className="font-medium">Activity Tracking</Label>
                  <p className="text-sm text-muted-foreground">Help us improve your experience with analytics</p>
                </div>
                <Switch
                  id="activity-tracking"
                  checked={privacy.activityTracking}
                  onCheckedChange={(checked) => updatePrivacy('activityTracking', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* App Preferences */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>App Preferences</span>
              </CardTitle>
              <CardDescription>
                Customize your app appearance and behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={preferences.language} onValueChange={(value) => updatePreference('language', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="it">Italiano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={preferences.currency} onValueChange={(value) => updatePreference('currency', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="CAD">CAD (C$)</SelectItem>
                      <SelectItem value="AUD">AUD (A$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={preferences.theme} onValueChange={(value) => updatePreference('theme', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center space-x-2">
                        <Sun className="w-4 h-4" />
                        <span>Light</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center space-x-2">
                        <Moon className="w-4 h-4" />
                        <span>Dark</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4" />
                        <span>System</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4 text-primary" />
                  <Label htmlFor="sound-enabled" className="font-medium">Sound Effects</Label>
                </div>
                <Switch
                  id="sound-enabled"
                  checked={preferences.soundEnabled}
                  onCheckedChange={(checked) => updatePreference('soundEnabled', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Data Management</span>
              </CardTitle>
              <CardDescription>
                Manage your personal data and account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div>
                  <h3 className="font-semibold">Download Your Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Get a copy of all your data including orders, wishlist, and profile
                  </p>
                </div>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div>
                  <h3 className="font-semibold">Clear Search History</h3>
                  <p className="text-sm text-muted-foreground">
                    Remove all your search history and browsing data
                  </p>
                </div>
                <Button variant="outline">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear History
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div>
                  <h3 className="font-semibold text-destructive">Delete Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <Button variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline">Reset to Defaults</Button>
            <Button className="bg-gradient-primary shadow-button">
              Save All Changes
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;