import headphonesImage from "@/assets/headphones.jpg";
import coffeeMakerImage from "@/assets/coffee-maker.jpg";
import fitnessWatchImage from "@/assets/fitness-watch.jpg";
import phoneChargerImage from "@/assets/phone-charger.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  isOnSale?: boolean;
  salePercentage?: number;
  category: string;
  description: string;
  highlights: string[];
  stock: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 6499,
    originalPrice: 8299,
    image: headphonesImage,
    images: [headphonesImage, headphonesImage, headphonesImage],
    rating: 4.5,
    reviews: 128,
    isOnSale: true,
    salePercentage: 22,
    category: "Electronics",
    description:
      "Studio-grade wireless headphones with adaptive noise cancellation, 40-hour battery, and plush memory-foam cushions. Tuned by Grammy-award engineers.",
    highlights: ["Active Noise Cancellation", "40h playback", "Hi-Res Audio", "Multipoint Bluetooth 5.3"],
    stock: 42,
  },
  {
    id: "2",
    name: "Premium Coffee Maker",
    price: 12499,
    image: coffeeMakerImage,
    images: [coffeeMakerImage, coffeeMakerImage],
    rating: 4.8,
    reviews: 89,
    category: "Home & Kitchen",
    description:
      "Barista-quality espresso at the touch of a button. PID temperature control, 15-bar pump, and integrated burr grinder for café-perfect crema.",
    highlights: ["15-bar pressure", "Burr grinder", "Milk frother", "Auto-clean"],
    stock: 18,
  },
  {
    id: "3",
    name: "Fitness Tracker Watch",
    price: 16599,
    originalPrice: 20749,
    image: fitnessWatchImage,
    images: [fitnessWatchImage, fitnessWatchImage],
    rating: 4.3,
    reviews: 205,
    isOnSale: true,
    salePercentage: 20,
    category: "Fitness",
    description:
      "AMOLED always-on display, 7-day battery, dual-band GPS, and 24/7 health insights with SpO2, ECG, and sleep tracking.",
    highlights: ["AMOLED display", "7-day battery", "Dual-band GPS", "ECG + SpO2"],
    stock: 73,
  },
  {
    id: "4",
    name: "Portable Phone Charger",
    price: 2499,
    image: phoneChargerImage,
    images: [phoneChargerImage],
    rating: 4.6,
    reviews: 324,
    category: "Electronics",
    description: "20,000mAh magnetic power bank with 65W USB-C PD. Charge a laptop, phone, and earbuds simultaneously.",
    highlights: ["20,000 mAh", "65W USB-C PD", "Magnetic snap", "Pass-through"],
    stock: 210,
  },
  {
    id: "5",
    name: "Noise Cancelling Earbuds",
    price: 4999,
    originalPrice: 6999,
    image: headphonesImage,
    rating: 4.4,
    reviews: 156,
    isOnSale: true,
    salePercentage: 28,
    category: "Electronics",
    description: "True wireless earbuds with adaptive ANC and 30-hour total battery in the case.",
    highlights: ["Adaptive ANC", "30h with case", "IPX5", "Wireless charging"],
    stock: 87,
  },
  {
    id: "6",
    name: "Smart Coffee Grinder",
    price: 5499,
    image: coffeeMakerImage,
    rating: 4.2,
    reviews: 64,
    category: "Home & Kitchen",
    description: "60-step micro-adjust burr grinder for espresso through French press perfection.",
    highlights: ["60 grind steps", "Conical burrs", "Dose by time", "Quiet motor"],
    stock: 26,
  },
  {
    id: "7",
    name: "Sport Smartwatch Pro",
    price: 24999,
    image: fitnessWatchImage,
    rating: 4.7,
    reviews: 412,
    category: "Fitness",
    description: "Titanium case, sapphire crystal, and a 14-day battery for athletes who push limits.",
    highlights: ["Titanium body", "Sapphire crystal", "14-day battery", "Recovery score"],
    stock: 12,
  },
  {
    id: "8",
    name: "Fast Charging Power Bank",
    price: 1999,
    originalPrice: 2799,
    image: phoneChargerImage,
    rating: 4.5,
    reviews: 287,
    isOnSale: true,
    salePercentage: 28,
    category: "Electronics",
    description: "Slim 10,000mAh with dual ports and a built-in cable. Pocket sized, plane safe.",
    highlights: ["10,000 mAh", "Built-in cable", "Dual ports", "Slim profile"],
    stock: 340,
  },
];

export const categories = ["All", "Electronics", "Home & Kitchen", "Fitness"];

export const getProduct = (id: string) => products.find((p) => p.id === id);
