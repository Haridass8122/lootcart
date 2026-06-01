import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { User, Award, Sparkles, Star, Crown, Gift, Edit3, Check } from "lucide-react";
import { inr } from "@/hooks/use-cart";

const badges = [
  { icon: Sparkles, name: "First Purchase", desc: "Unlocked", earned: true },
  { icon: Star, name: "Top Reviewer", desc: "5 reviews", earned: true },
  { icon: Crown, name: "VIP Member", desc: "10 orders", earned: false },
  { icon: Gift, name: "Gifter", desc: "Send 3 gifts", earned: false },
];

const Account = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({ name: "Aarav Kumar", email: "aarav@example.com", phone: "9876543210" });
  const points = 1480;
  const nextTier = 2500;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="rounded-3xl bg-gradient-card border border-border/60 p-6 md:p-8 shadow-card mb-8 grid md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center gap-4 md:col-span-2">
            <div className="w-20 h-20 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-button">
              <User className="w-10 h-10 text-primary-foreground" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-1">Member since 2024</p>
              <h1 className="font-display text-2xl md:text-3xl font-bold">{profile.name}</h1>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
            </div>
          </div>
          <div className="rounded-2xl bg-card border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground uppercase tracking-widest">Loot points</span>
              <Award className="w-4 h-4 text-primary" />
            </div>
            <p className="font-display text-3xl font-bold text-gold">{points.toLocaleString("en-IN")}</p>
            <div className="mt-3 h-1.5 rounded-full bg-secondary overflow-hidden">
              <div className="h-full bg-gradient-primary" style={{ width: `${(points / nextTier) * 100}%` }} />
            </div>
            <p className="text-[11px] text-muted-foreground mt-1.5">{nextTier - points} points to Gold tier</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile */}
          <Card className="lg:col-span-2 p-6 bg-card border-border/60">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-lg">Profile</h2>
              <Button variant="ghost" size="sm" onClick={() => setEditing(!editing)}>
                {editing ? <><Check className="w-3.5 h-3.5 mr-1" />Save</> : <><Edit3 className="w-3.5 h-3.5 mr-1" />Edit</>}
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} disabled={!editing} />
              <Field label="Email" value={profile.email} onChange={(v) => setProfile({ ...profile, email: v })} disabled={!editing} />
              <Field label="Phone" value={profile.phone} onChange={(v) => setProfile({ ...profile, phone: v })} disabled={!editing} />
              <Field label="Country" value="India" onChange={() => {}} disabled />
            </div>
          </Card>

          {/* Coupons */}
          <Card className="p-6 bg-card border-border/60">
            <h2 className="font-display font-semibold text-lg mb-4">Coupons</h2>
            <div className="space-y-3">
              {[
                { code: "LUXE10", desc: "10% off everything", color: "primary" },
                { code: "FREESHIP", desc: "Free shipping", color: "success" },
              ].map((c) => (
                <div key={c.code} className="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-3 flex items-center justify-between">
                  <div>
                    <p className="font-display font-bold text-primary">{c.code}</p>
                    <p className="text-xs text-muted-foreground">{c.desc}</p>
                  </div>
                  <Badge variant="outline" className="border-primary/40">Apply</Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Badges */}
          <Card className="lg:col-span-3 p-6 bg-card border-border/60">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-display font-semibold text-lg">Achievements</h2>
                <p className="text-sm text-muted-foreground">Earn badges as you shop and engage.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {badges.map((b) => (
                <div
                  key={b.name}
                  className={`rounded-2xl p-5 text-center border ${b.earned ? "border-primary/40 bg-gradient-card shadow-card" : "border-dashed border-border opacity-60"}`}
                >
                  <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${b.earned ? "bg-gradient-gold shadow-button" : "bg-secondary"}`}>
                    <b.icon className={`w-5 h-5 ${b.earned ? "text-primary-foreground" : "text-muted-foreground"}`} />
                  </div>
                  <p className="font-display font-semibold text-sm">{b.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{b.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Spend summary */}
          <Card className="lg:col-span-3 p-6 bg-card border-border/60 grid sm:grid-cols-3 gap-4">
            <Stat label="Lifetime spent" value={inr(48230)} />
            <Stat label="Orders placed" value="14" />
            <Stat label="Items saved" value="32" />
          </Card>
        </div>
      </div>
    </Layout>
  );
};

const Field = ({ label, value, onChange, disabled }: { label: string; value: string; onChange: (v: string) => void; disabled?: boolean }) => (
  <div>
    <Label className="text-xs text-muted-foreground mb-1.5 block">{label}</Label>
    <Input value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} className="h-11 rounded-xl bg-secondary/40 disabled:opacity-100" />
  </div>
);

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-border/60 bg-secondary/30 p-4">
    <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
    <p className="font-display text-2xl font-bold text-gold mt-1">{value}</p>
  </div>
);

export default Account;
