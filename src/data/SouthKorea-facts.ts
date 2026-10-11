/**
 * Static data for South Korea Quick Facts page.
 * Kept in a separate module to keep the page component lean.
 */
import {
  Building,
  Users,
  Languages,
  DollarSign,
  MapPin,
  Clock,
  Flag,
  Mountain,
  Stethoscope,
  Plane,
  Globe,
  Sun,
  Calendar,
  TreePine,
  Heart,
  Car,
  Wifi,
  Award,
  Compass,
  Landmark,
  Snowflake,
  SunMedium,
} from "lucide-react";

export const essentialFacts = [
  { icon: Building, color: "blue", label: "Capital", value: "Seoul" },
  { icon: Users, color: "green", label: "Population", value: "51.7 Million+" },
  {
    icon: Languages,
    color: "purple",
    label: "Languages",
    value: "Korean, English (Academic)",
  },
  {
    icon: DollarSign,
    color: "orange",
    label: "Currency",
    value: "South Korean Won (KRW)",
  },
  { icon: MapPin, color: "red", label: "Location", value: "East Asia" },
  { icon: Clock, color: "teal", label: "Timezone", value: "UTC+9 (KST)" },
  {
    icon: Flag,
    color: "yellow",
    label: "National Day",
    value: "August 15, 1945 (Gwangbokjeol)",
  },
  {
    icon: Mountain,
    color: "indigo",
    label: "Highest Peak",
    value: "Hallasan (1,947 m)",
  },
];

export const geographyPoints = [
  {
    icon: Mountain,
    color: "text-red-600",
    text: "Mountainous Korean Peninsula bordered by Yellow Sea and Sea of Japan",
  },
  {
    icon: TreePine,
    color: "text-green-600",
    text: "Spectacular national parks, lush forests, and scenic subtropical islands",
  },
  {
    icon: Landmark,
    color: "text-purple-600",
    text: "Home to ancient royal palaces, temples, and UNESCO World Heritage sites",
  },
  {
    icon: Globe,
    color: "text-cyan-600",
    text: "Global high-tech innovation hub and economic powerhouse in East Asia",
  },
];

export const climateZones = [
  {
    icon: SunMedium,
    color: "text-orange-500",
    text: "Warm, sunny summers with pleasant coastal winds (23°C – 30°C)",
  },
  {
    icon: Snowflake,
    color: "text-red-500",
    text: "Crisp, snowy winters with modern heated campus facilities (-6°C – 3°C)",
  },
  {
    icon: Calendar,
    color: "text-green-500",
    text: "Four picturesque seasons: Cherry blossoms in Spring to colorful Autumn",
  },
  {
    icon: Sun,
    color: "text-red-600",
    text: "Comfortable seasonal weather — ideal for vibrant international student life",
  },
];

export const attractions = [
  {
    icon: Landmark,
    color: "text-slate-600",
    name: "Gyeongbokgung Palace",
    desc: "Grand Joseon dynasty royal palace located in central Seoul",
  },
  {
    icon: Landmark,
    color: "text-green-200",
    name: "N Seoul Tower & Namsan",
    desc: "Iconic landmark offering panoramic skyline views of Seoul",
  },
  {
    icon: Compass,
    color: "text-purple-200",
    name: "Jeju Island (Hallasan)",
    desc: "UNESCO World Natural Heritage volcanic island with pristine waterfalls",
  },
  {
    icon: Mountain,
    color: "text-red-600",
    name: "Bukchon Hanok Village",
    desc: "Historic village featuring hundreds of traditional Korean hanok houses",
  },
];

export const majorCities = [
  {
    name: "Seoul",
    gradient: " ",
    textMain: "text-slate-600",
    textSub: "text-slate-600",
    desc: "The hyper-modern capital city and primary hub of world-ranked medical universities, research hospitals, and global culture.",
    pop: "9,700,000+",
    highlight: "Capital & Medical Hub",
  },
  {
    name: "Busan",
    gradient: " ",
    textMain: "text-green-100",
    textSub: "text-green-200",
    desc: "South Korea's premier coastal metropolis and second-largest city, known for world-class universities and beachside lifestyle.",
    pop: "3,400,000+",
    highlight: "Maritime & Academic Center",
  },
  {
    name: "Daegu",
    gradient: " ",
    textMain: "text-orange-100",
    textSub: "text-orange-200",
    desc: "Major educational hub renowned as Korea's medical city with specialized teaching hospitals and advanced medical technology complexes.",
    pop: "2,400,000+",
    highlight: "Medical City & Education Hub",
  },
];

export const defaultCuisines = [
  {
    id: 0,
    iconClass: "🥬",
    dishName: "Kimchi",
    dishDescription:
      "Korea's iconic fermented vegetable side dish packed with probiotics and essential nutrients",
    dishImage: null,
  },
  {
    id: 1,
    iconClass: "🍲",
    dishName: "Bibimbap",
    dishDescription:
      "Nutritious warm rice bowl served with seasoned vegetables, egg, chili paste, and sliced protein",
    dishImage: null,
  },
  {
    id: 2,
    iconClass: "🥩",
    dishName: "Bulgogi",
    dishDescription:
      "Marinated grilled tender beef or chicken stir-fried with sesame, soy, and garlic",
    dishImage: null,
  },
  {
    id: 3,
    iconClass: "🍲",
    dishName: "Samgyetang (Ginseng Soup)",
    dishDescription:
      "Traditional nourishing chicken soup stuffed with Korean ginseng, jujubes, and sweet rice",
    dishImage: null,
  },
];

export const transportOptions = [
  {
    icon: Plane,
    color: "text-red-600",
    text: "Incheon International Airport (ICN) — world top-rated global airport hub",
  },
  {
    icon: MapPin,
    color: "text-orange-600",
    text: "KTX high-speed bullet train connecting major cities in under 2.5 hours",
  },
  {
    icon: Car,
    color: "text-purple-600",
    text: "Seoul Metropolitan Subway — one of the world's most extensive, punctual transit systems",
  },
  {
    icon: Wifi,
    color: "text-green-600",
    text: "Kakao T and T-Money card integration for seamless transit across Korea",
  },
];

export const visaFacts = [
  {
    icon: Award,
    color: "text-green-600",
    text: "D-2 Student Visa provided after university acceptance certificate",
  },
  {
    icon: Calendar,
    color: "text-orange-600",
    text: "Streamlined online application with comprehensive embassy assistance",
  },
  {
    icon: Plane,
    color: "text-red-600",
    text: "Alien Registration Card (ARC) issued upon arrival for residence authorization",
  },
  {
    icon: Heart,
    color: "text-red-600",
    text: "Permission to work part-time up to 20 hrs/week during academic semesters",
  },
];

export const mbbsHighlights = [
  {
    icon: Stethoscope,
    label: "International Recognition",
    desc: "Degrees recognized by NMC, WHO (WDOMS), ECFMG, and global medical licensing councils.",
  },
  {
    icon: DollarSign,
    label: "Affordable High-Tech Education",
    desc: "State-of-the-art robotic surgery, advanced simulation, and subsidized tuition.",
  },
  {
    icon: Languages,
    label: "Medium of Instruction",
    desc: "Pre-clinical and international MBBS medical tracks taught in English.",
  },
];

export const economyStats = [
  { label: "Stability", value: "Top 10 Global Economy" },
  { label: "Main Industries", value: "Bio-Pharma, High-Tech, Medical Devices, Robotics" },
  { label: "Health Hub", value: "World Leader in Healthcare Technology" },
  { label: "Quality of Life", value: "Highest Global Safety Ranking & Modern Living" },
];

export const quickFacts = [
  {
    icon: Calendar,
    label: "National Day",
    value: "August 15, 1945",
    color: "text-indigo-200",
  },
  {
    icon: Mountain,
    label: "Land Area",
    value: "100,410 km²",
    color: "text-slate-600",
  },
  {
    icon: Globe,
    label: "Region",
    value: "East Asia",
    color: "text-green-200",
  },
  {
    icon: Award,
    label: "Healthcare System",
    value: "Top 5 Global Health Index",
    color: "text-red-600",
  },
];

export const healthcare = [
  {
    title: "National Health Insurance (NHIS)",
    desc: "International students are covered under NHIS with access to premium medical care at subsidized rates.",
    color: "border-gray-200",
  },
  {
    title: "World-Class Tertiary Hospitals",
    desc: "Renowned teaching hospitals like SNU Hospital, Severance Hospital, and Asan Medical Center.",
    color: "border-green-200",
  },
  {
    title: "Robotic & Precision Medicine Exposure",
    desc: "Direct practical rotations in advanced robotic surgery, smart ICUs, and digital pathology.",
    color: "border-purple-200",
  },
];

export const mbbsWhyStats = [
  { val: "6 Years", label: "Course Duration" },
  { val: "NMC + WHO", label: "Recognition" },
  { val: "Top Tier", label: "Hospital Infrastructure" },
  { val: "English", label: "Instruction Medium" },
];

export const studentLifeCards = [
  {
    icon: Heart,
    label: "Exceptional Safety",
    desc: "South Korea consistently ranks among the top 3 safest nations worldwide with 24/7 security.",
  },
  {
    icon: Building,
    label: "Hyper-Modern Campuses",
    desc: "Smart labs, cutting-edge medical libraries, high-speed 5G connectivity, and on-campus international dorms.",
  },
  {
    icon: Users,
    label: "Global Community",
    desc: "Over 200,000 international students with active Indian student associations and cultural events.",
  },
];
