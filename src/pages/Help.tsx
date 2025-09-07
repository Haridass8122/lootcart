import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout } from "@/components/Layout";
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  Book, 
  HeadphonesIcon,
  Clock,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ArrowRight,
  Package,
  RotateCcw,
  CreditCard
} from "lucide-react";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      title: "Orders & Shipping",
      icon: Package,
      faqs: [
        {
          question: "How can I track my order?",
          answer: "You can track your order by going to 'My Orders' section in your account. Each order will show its current status and tracking information if available.",
        },
        {
          question: "What are the shipping costs?",
          answer: "We offer free shipping on orders over $50. For orders under $50, shipping costs $9.99. Premium members get free shipping on all orders.",
        },
        {
          question: "How long does delivery take?",
          answer: "Standard delivery takes 3-5 business days. Express delivery (available for premium members) takes 1-2 business days.",
        },
        {
          question: "Can I change my delivery address?",
          answer: "You can change your delivery address within 1 hour of placing the order, provided it hasn't been shipped yet. Contact customer support for assistance.",
        },
      ],
    },
    {
      title: "Returns & Refunds",
      icon: RotateCcw,
      faqs: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for most items. Items must be in original condition with tags attached. Some categories like electronics have a 14-day return window.",
        },
        {
          question: "How do I return an item?",
          answer: "Go to 'My Orders', find the item you want to return, and click 'Return Item'. Follow the instructions to print a return label and schedule pickup.",
        },
        {
          question: "When will I receive my refund?",
          answer: "Refunds are processed within 3-5 business days after we receive your returned item. The refund will be credited to your original payment method.",
        },
      ],
    },
    {
      title: "Account & Payment",
      icon: CreditCard,
      faqs: [
        {
          question: "How do I reset my password?",
          answer: "Click on 'Forgot Password' on the login page and enter your email address. You'll receive a password reset link in your email.",
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay.",
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use industry-standard SSL encryption and PCI DSS compliance to ensure your payment information is secure.",
        },
      ],
    },
  ];

  const contactMethods = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      availability: "24/7",
      action: "Start Chat",
      primary: true,
    },
    {
      title: "Phone Support",
      description: "Call us for immediate assistance",
      icon: Phone,
      availability: "Mon-Fri 9AM-6PM EST",
      action: "Call Now",
      primary: false,
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      icon: Mail,
      availability: "Response within 24 hours",
      action: "Send Email",
      primary: false,
    },
  ];

  const guides = [
    {
      title: "Getting Started with Loot Cart",
      description: "Learn how to create an account and make your first purchase",
      readTime: "5 min read",
      category: "Beginner",
    },
    {
      title: "Managing Your Wishlist",
      description: "Save items for later and organize your favorites",
      readTime: "3 min read",
      category: "Features",
    },
    {
      title: "Understanding Our Loyalty Program",
      description: "Earn points and unlock exclusive benefits",
      readTime: "7 min read",
      category: "Rewards",
    },
    {
      title: "Mobile App Guide",
      description: "Get the most out of our mobile app",
      readTime: "4 min read",
      category: "Mobile",
    },
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.faqs.length > 0);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Find answers to your questions or get in touch with our support team
          </p>
          
          {/* Search */}
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search for help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg bg-background border-border"
            />
          </div>
        </div>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="status">System Status</TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <div className="space-y-6">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((category, categoryIndex) => (
                  <Card key={categoryIndex} className="bg-gradient-card border-0 shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <HelpCircle className="w-5 h-5 text-primary" />
                        <span>{category.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {category.faqs.map((faq, faqIndex) => (
                          <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                            <AccordionTrigger className="text-left">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try different keywords or browse our guides below
                  </p>
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
                <p className="text-muted-foreground">
                  Choose the best way to reach our support team
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contactMethods.map((method, index) => (
                  <Card key={index} className={`bg-gradient-card border-0 shadow-card ${method.primary ? 'ring-2 ring-primary' : ''}`}>
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 ${method.primary ? 'bg-gradient-primary' : 'bg-secondary'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <method.icon className={`w-8 h-8 ${method.primary ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{method.description}</p>
                      <div className="flex items-center justify-center space-x-1 mb-4">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{method.availability}</span>
                      </div>
                      <Button 
                        className={method.primary ? 'bg-gradient-primary shadow-button w-full' : 'w-full'} 
                        variant={method.primary ? 'default' : 'outline'}
                      >
                        {method.action}
                      </Button>
                      {method.primary && (
                        <Badge variant="secondary" className="mt-2">Recommended</Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Contact Form */}
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Can't find what you're looking for? Send us a detailed message and we'll get back to you soon.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Subject</label>
                      <Input placeholder="What's this about?" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <select className="w-full h-10 px-3 py-2 bg-background border border-border rounded-md">
                        <option>Select a category</option>
                        <option>Orders & Shipping</option>
                        <option>Returns & Refunds</option>
                        <option>Account Issues</option>
                        <option>Technical Support</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea 
                      className="w-full h-32 px-3 py-2 bg-background border border-border rounded-md resize-none"
                      placeholder="Describe your issue in detail..."
                    />
                  </div>
                  <Button className="bg-gradient-primary shadow-button">
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Guides Tab */}
          <TabsContent value="guides">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Help Guides</h2>
                <p className="text-muted-foreground">
                  Step-by-step guides to help you get the most out of Loot Cart
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guides.map((guide, index) => (
                  <Card key={index} className="bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="secondary">{guide.category}</Badge>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {guide.description}
                      </p>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Book className="w-4 h-4" />
                        <span>{guide.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button variant="outline">
                  View All Guides
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* System Status Tab */}
          <TabsContent value="status">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">System Status</h2>
                <p className="text-muted-foreground">
                  Real-time status of our services and systems
                </p>
              </div>

              {/* Overall Status */}
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center space-x-3 mb-6">
                    <CheckCircle className="w-8 h-8 text-success" />
                    <div className="text-center">
                      <h3 className="text-xl font-semibold">All Systems Operational</h3>
                      <p className="text-muted-foreground">Last updated: 2 minutes ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Service Status */}
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle>Service Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Website", status: "operational" },
                      { name: "Mobile App", status: "operational" },
                      { name: "Payment Processing", status: "operational" },
                      { name: "Order Management", status: "operational" },
                      { name: "Customer Support", status: "operational" },
                      { name: "Email Notifications", status: "operational" },
                    ].map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                        <span className="font-medium">{service.name}</span>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span className="text-sm text-success">Operational</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Incidents */}
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle>Recent Incidents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Recent Incidents</h3>
                    <p className="text-muted-foreground">
                      All systems have been running smoothly with no reported issues in the past 30 days.
                    </p>
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

export default Help;