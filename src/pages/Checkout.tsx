import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart, inr } from "@/hooks/use-cart";
import { useNavigate } from "react-router-dom";
import { Check, CreditCard, MapPin, ShoppingBag, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Address", icon: MapPin },
  { id: 2, label: "Payment", icon: CreditCard },
  { id: 3, label: "Confirm", icon: Check },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, clear } = useCart();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({ name: "", email: "", phone: "", line1: "", city: "", pincode: "" });
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvc: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shipping = subtotal > 4000 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const validateAddress = () => {
    const e: Record<string, string> = {};
    if (!address.name.trim()) e.name = "Name required";
    if (!/^\S+@\S+\.\S+$/.test(address.email)) e.email = "Valid email required";
    if (!/^\d{10}$/.test(address.phone)) e.phone = "10-digit phone required";
    if (!address.line1.trim()) e.line1 = "Address required";
    if (!address.city.trim()) e.city = "City required";
    if (!/^\d{6}$/.test(address.pincode)) e.pincode = "6-digit PIN required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e: Record<string, string> = {};
    if (!/^\d{13,19}$/.test(card.number.replace(/\s/g, ""))) e.number = "Valid card number required";
    if (!card.name.trim()) e.cname = "Name on card required";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) e.expiry = "MM/YY format";
    if (!/^\d{3,4}$/.test(card.cvc)) e.cvc = "CVC required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 1 && !validateAddress()) return;
    if (step === 2 && !validatePayment()) return;
    setStep(step + 1);
  };

  if (items.length === 0 && step !== 3) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h1 className="font-display text-2xl mb-2">Your cart is empty</h1>
          <Button onClick={() => navigate("/products")} className="bg-gradient-primary">Shop now</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Checkout</h1>
        <p className="text-muted-foreground mb-8">Complete your order in 3 easy steps.</p>

        {/* Stepper */}
        <div className="flex items-center justify-between max-w-2xl mb-10">
          {steps.map((s, i) => (
            <div key={s.id} className="flex-1 flex items-center">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition",
                    step >= s.id ? "bg-gradient-primary border-primary text-primary-foreground shadow-button" : "border-border bg-secondary text-muted-foreground",
                  )}
                >
                  {step > s.id ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                </div>
                <span className={cn("text-sm font-medium hidden sm:inline", step >= s.id ? "text-foreground" : "text-muted-foreground")}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn("flex-1 h-0.5 mx-3", step > s.id ? "bg-primary" : "bg-border")} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 rounded-3xl border border-border/60 bg-card p-6 md:p-8 shadow-card">
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="font-display text-xl font-semibold">Shipping address</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full name" value={address.name} onChange={(v) => setAddress({ ...address, name: v })} error={errors.name} />
                  <Field label="Email" type="email" value={address.email} onChange={(v) => setAddress({ ...address, email: v })} error={errors.email} />
                  <Field label="Phone" value={address.phone} onChange={(v) => setAddress({ ...address, phone: v.replace(/\D/g, "") })} maxLength={10} error={errors.phone} />
                  <Field label="PIN code" value={address.pincode} onChange={(v) => setAddress({ ...address, pincode: v.replace(/\D/g, "") })} maxLength={6} error={errors.pincode} />
                  <div className="sm:col-span-2">
                    <Field label="Address" value={address.line1} onChange={(v) => setAddress({ ...address, line1: v })} error={errors.line1} />
                  </div>
                  <Field label="City" value={address.city} onChange={(v) => setAddress({ ...address, city: v })} error={errors.city} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="font-display text-xl font-semibold flex items-center gap-2">
                  Payment <Lock className="w-4 h-4 text-primary" />
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Field
                      label="Card number"
                      value={card.number}
                      onChange={(v) => setCard({ ...card, number: v.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim() })}
                      maxLength={19}
                      error={errors.number}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Name on card" value={card.name} onChange={(v) => setCard({ ...card, name: v })} error={errors.cname} />
                  </div>
                  <Field
                    label="Expiry (MM/YY)"
                    value={card.expiry}
                    onChange={(v) => {
                      let s = v.replace(/\D/g, "");
                      if (s.length > 2) s = s.slice(0, 2) + "/" + s.slice(2, 4);
                      setCard({ ...card, expiry: s });
                    }}
                    maxLength={5}
                    error={errors.expiry}
                  />
                  <Field label="CVC" value={card.cvc} onChange={(v) => setCard({ ...card, cvc: v.replace(/\D/g, "") })} maxLength={4} error={errors.cvc} />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-primary flex items-center justify-center shadow-button mb-5 animate-pulse-glow">
                  <Check className="w-10 h-10 text-primary-foreground" />
                </div>
                <h2 className="font-display text-2xl font-bold">Order confirmed</h2>
                <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                  Thank you, {address.name || "friend"}. We've sent a confirmation to {address.email || "your inbox"}. Estimated delivery: 3–5 days.
                </p>
                <p className="font-display text-3xl text-gold mt-4">{inr(total)}</p>
                <div className="mt-6 flex justify-center gap-3">
                  <Button variant="outline" onClick={() => navigate("/orders")}>View orders</Button>
                  <Button onClick={() => { clear(); navigate("/"); }} className="bg-gradient-primary">Keep shopping</Button>
                </div>
              </div>
            )}

            {step !== 3 && (
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
                  Back
                </Button>
                <Button onClick={next} className="bg-gradient-primary shadow-button">
                  {step === 2 ? "Place order" : "Continue"}
                </Button>
              </div>
            )}
          </div>

          {/* Summary */}
          <aside className="rounded-3xl border border-border/60 bg-card p-6 h-fit sticky top-24 shadow-card">
            <h3 className="font-display font-semibold mb-4">Order summary</h3>
            <ul className="space-y-3 max-h-64 overflow-y-auto mb-4">
              {items.map((i) => (
                <li key={i.id} className="flex gap-3 text-sm">
                  <img src={i.image} alt={i.name} className="w-12 h-12 rounded-md object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium">{i.name}</p>
                    <p className="text-xs text-muted-foreground">Qty {i.quantity} · {inr(i.price)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-1.5 text-sm border-t border-border pt-4">
              <Row label="Subtotal" value={inr(subtotal)} />
              <Row label="Shipping" value={shipping === 0 ? "Free" : inr(shipping)} />
              <Row label="GST 18%" value={inr(tax)} />
              <div className="flex justify-between font-display font-bold text-lg pt-2 border-t border-border mt-2">
                <span>Total</span>
                <span className="text-primary">{inr(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

const Field = ({ label, value, onChange, type = "text", error, maxLength }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; error?: string; maxLength?: number;
}) => (
  <div>
    <Label className="text-xs text-muted-foreground mb-1.5 block">{label}</Label>
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={maxLength}
      className={cn("h-11 rounded-xl bg-secondary/40", error && "border-destructive")}
    />
    {error && <p className="text-xs text-destructive mt-1">{error}</p>}
  </div>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-muted-foreground">
    <span>{label}</span>
    <span className="text-foreground">{value}</span>
  </div>
);

export default Checkout;
