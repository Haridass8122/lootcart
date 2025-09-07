import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Shield, 
  Camera,
  Edit,
  Plus,
  Trash2
} from "lucide-react";

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-01-15",
    avatar: "/api/placeholder/100/100",
  });

  const [addresses] = useState([
    {
      id: "1",
      type: "Home",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      isDefault: true,
    },
    {
      id: "2",
      type: "Work",
      street: "456 Business Ave",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "United States",
      isDefault: false,
    },
  ]);

  const [paymentMethods] = useState([
    {
      id: "1",
      type: "Visa",
      last4: "4242",
      expiryMonth: "12",
      expiryYear: "2025",
      isDefault: true,
    },
    {
      id: "2",
      type: "Mastercard",
      last4: "8888",
      expiryMonth: "06",
      expiryYear: "2026",
      isDefault: false,
    },
  ]);

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Handle save logic here
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Account</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="payments">Payment Methods</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and profile picture
                    </CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleSaveProfile}
                        className="bg-gradient-primary shadow-button"
                      >
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {/* Avatar Section */}
                <div className="flex items-center space-x-6 mb-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={userInfo.avatar} alt="Profile picture" />
                      <AvatarFallback>
                        {userInfo.firstName[0]}{userInfo.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {userInfo.firstName} {userInfo.lastName}
                    </h3>
                    <p className="text-muted-foreground">{userInfo.email}</p>
                    <Badge variant="secondary" className="mt-1">
                      Premium Member
                    </Badge>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        value={userInfo.firstName}
                        onChange={(e) => setUserInfo(prev => ({...prev, firstName: e.target.value}))}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={userInfo.lastName}
                      onChange={(e) => setUserInfo(prev => ({...prev, lastName: e.target.value}))}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo(prev => ({...prev, email: e.target.value}))}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo(prev => ({...prev, phone: e.target.value}))}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={userInfo.dateOfBirth}
                      onChange={(e) => setUserInfo(prev => ({...prev, dateOfBirth: e.target.value}))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Saved Addresses</h2>
                  <p className="text-muted-foreground">Manage your delivery addresses</p>
                </div>
                <Button className="bg-gradient-primary shadow-button">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Address
                </Button>
              </div>

              {addresses.map((address) => (
                <Card key={address.id} className="bg-gradient-card border-0 shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold">{address.type}</h3>
                            {address.isDefault && (
                              <Badge variant="secondary">Default</Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {address.street}<br />
                            {address.city}, {address.state} {address.zipCode}<br />
                            {address.country}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="payments">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Payment Methods</h2>
                  <p className="text-muted-foreground">Manage your saved payment methods</p>
                </div>
                <Button className="bg-gradient-primary shadow-button">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>

              {paymentMethods.map((payment) => (
                <Card key={payment.id} className="bg-gradient-card border-0 shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold">
                              {payment.type} ending in {payment.last4}
                            </h3>
                            {payment.isDefault && (
                              <Badge variant="secondary">Default</Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm">
                            Expires {payment.expiryMonth}/{payment.expiryYear}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Security Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Manage your password and security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div>
                      <h3 className="font-semibold">Password</h3>
                      <p className="text-sm text-muted-foreground">
                        Last changed 3 months ago
                      </p>
                    </div>
                    <Button variant="outline">Change Password</Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div>
                      <h3 className="font-semibold">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div>
                      <h3 className="font-semibold">Login Activity</h3>
                      <p className="text-sm text-muted-foreground">
                        Review your recent login activity
                      </p>
                    </div>
                    <Button variant="outline">View Activity</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Account;