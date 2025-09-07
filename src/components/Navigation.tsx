import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ShoppingCart,
  Heart,
  User,
  Search,
  Menu,
  Bell,
  Package,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

export const Navigation = () => {
  const location = useLocation();
  const [cartItems] = useState(3);
  const [wishlistItems] = useState(5);
  const [notifications] = useState(2);
  const [isLoggedIn] = useState(true);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Loot Cart
            </span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10 bg-secondary border-0 focus-visible:ring-primary"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isLoggedIn ? (
              <>
                {/* Cart */}
                <Link to="/cart">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`relative ${isActive("/cart") ? "text-primary" : ""}`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {cartItems > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs"
                      >
                        {cartItems}
                      </Badge>
                    )}
                  </Button>
                </Link>

                {/* Wishlist */}
                <Link to="/wishlist">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`relative ${isActive("/wishlist") ? "text-primary" : ""}`}
                  >
                    <Heart className="w-5 h-5" />
                    {wishlistItems > 0 && (
                      <Badge
                        variant="secondary"
                        className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs"
                      >
                        {wishlistItems}
                      </Badge>
                    )}
                  </Button>
                </Link>

                {/* Notifications */}
                <Link to="/notifications">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`relative ${isActive("/notifications") ? "text-primary" : ""}`}
                  >
                    <Bell className="w-5 h-5" />
                    {notifications > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs"
                      >
                        {notifications}
                      </Badge>
                    )}
                  </Button>
                </Link>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative">
                      <User className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link to="/account" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/orders" className="cursor-pointer">
                          <Package className="mr-2 h-4 w-4" />
                          <span>My Orders</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/settings" className="cursor-pointer">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/help" className="cursor-pointer">
                          <HelpCircle className="mr-2 h-4 w-4" />
                          <span>Help Center</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-gradient-primary shadow-button">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Navigate through the app</SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search products..." className="pl-10" />
                  </div>

                  {isLoggedIn ? (
                    <div className="space-y-2">
                      <Link to="/cart" className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary">
                        <div className="flex items-center space-x-3">
                          <ShoppingCart className="w-5 h-5" />
                          <span>Shopping Cart</span>
                        </div>
                        {cartItems > 0 && (
                          <Badge variant="destructive">{cartItems}</Badge>
                        )}
                      </Link>
                      <Link to="/wishlist" className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary">
                        <div className="flex items-center space-x-3">
                          <Heart className="w-5 h-5" />
                          <span>Wishlist</span>
                        </div>
                        {wishlistItems > 0 && (
                          <Badge variant="secondary">{wishlistItems}</Badge>
                        )}
                      </Link>
                      <Link to="/orders" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary">
                        <Package className="w-5 h-5" />
                        <span>My Orders</span>
                      </Link>
                      <Link to="/account" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary">
                        <User className="w-5 h-5" />
                        <span>My Account</span>
                      </Link>
                      <Link to="/notifications" className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary">
                        <div className="flex items-center space-x-3">
                          <Bell className="w-5 h-5" />
                          <span>Notifications</span>
                        </div>
                        {notifications > 0 && (
                          <Badge variant="destructive">{notifications}</Badge>
                        )}
                      </Link>
                      <Link to="/settings" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary">
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                      </Link>
                      <Link to="/help" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary">
                        <HelpCircle className="w-5 h-5" />
                        <span>Help Center</span>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link to="/login">
                        <Button variant="outline" className="w-full">
                          Login
                        </Button>
                      </Link>
                      <Link to="/register">
                        <Button className="w-full bg-gradient-primary shadow-button">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};