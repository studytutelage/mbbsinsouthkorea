import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bus,
  Building2,
  CheckCircle,
  Clock3,
  DollarSign,
  Flag,
  Globe,
  Heart,
  Landmark,
  Languages,
  MapPinned,
  Mountain,
  Music,
  Plane,
  Stethoscope,
  Sparkles,
  Sun,
  Tent,
  Users,
  Utensils,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { getAboutCountryContent } from "@/lib/public-page-content";
import { replaceCurrencySymbol } from "@/lib/currency";
export const metadata: Promise<Metadata> = buildMetadata({
  title: "About South Korea - Culture, Lifestyle and Education | mbbsinsouthkorea.com",
  description:
    "Discover South Korea - a safe, culture-rich, and globally connected destination for MBBS aspirants with quality education and strong clinical exposure.",
  entitySeo: {
    metaKeyword:
      "about South Korea, South Korea culture, life in South Korea for students, mbbs South Korea environment, study MBBS in South Korea",
  },
  path: "/about-south-korea",
  pageKey: "about-south-korea",
});
const themeStyles = {
  red: {
    softPanel: "border-gray-200 bg-white/80",
    iconWrap: "bg-[#EAF1FB] text-red-600",
    iconHover: "group-hover:bg-red-600 group-hover:text-gray-900",
    titleHover: "group-hover:text-[#0047A0]",
    wash: " via-white/0 ",
    ringHover: "hover:border-gray-200 hover:",
    pill: "bg-[#EAF1FB] text-[#0047A0]",
  },
  blue: {
    softPanel: "border-gray-200 bg-white/80",
    iconWrap: "bg-[#EAF1FB] text-red-600",
    iconHover: "group-hover:bg-red-600 group-hover:text-gray-900",
    titleHover: "group-hover:text-[#0047A0]",
    wash: " via-white/0 ",
    ringHover: "hover:border-gray-200 hover:",
    pill: "bg-[#EAF1FB] text-[#0047A0]",
  },
  green: {
    softPanel: "border-green-100 bg-green-50/80",
    iconWrap: "bg-green-100 text-green-600",
    iconHover: "group-hover:bg-green-600 group-hover:text-gray-900",
    titleHover: "group-hover:text-green-700",
    wash: " via-white/0 ",
    ringHover: "hover:border-green-200 hover:",
    pill: "bg-green-100 text-green-700",
  },
  amber: {
    softPanel: "border-gray-200 bg-[#EAF1FB]/10",
    iconWrap: "bg-red-400 text-red-600",
    iconHover: "group-hover:bg-red-400 group-hover:text-gray-900",
    titleHover: "group-hover:text-[#0047A0]",
    wash: " via-white/0 ",
    ringHover: "hover:border-gray-200 hover:",
    pill: "bg-red-400 text-red-600",
  },
  purple: {
    softPanel: "border-purple-100 bg-purple-50/80",
    iconWrap: "bg-purple-100 text-purple-600",
    iconHover: "group-hover:bg-purple-600 group-hover:text-gray-900",
    titleHover: "group-hover:text-purple-700",
    wash: " via-white/0 ",
    ringHover: "hover:border-purple-200 hover:",
    pill: "bg-purple-100 text-purple-700",
  },
} as const;
const highlightIcons = [Globe, Sun, Utensils, Mountain, Music, Landmark];
const overviewIcons = [Sparkles, Globe, Landmark, Sun, Users, Mountain];
const comparisonRows = [
  {
    label: "Tuition Fees / Year",
    southKorea: replaceCurrencySymbol("$3,500 – $5,500"),
    india: replaceCurrencySymbol("$15,000 – $18,000"),
    uk: replaceCurrencySymbol("$60,000 – $80,000"),
  },
  {
    label: "Hostel / Year",
    southKorea: replaceCurrencySymbol("$600 – $1,200"),
    india: replaceCurrencySymbol("$1,500 – $3,000"),
    uk: replaceCurrencySymbol("$8,000 – $15,000"),
  },
  {
    label: "Food / Month",
    southKorea: replaceCurrencySymbol("$150 – $250"),
    india: replaceCurrencySymbol("$150 – $300"),
    uk: replaceCurrencySymbol("$800 – $1,200"),
  },
];
const geographyHighlights = [
  {
    icon: Mountain,
    iconColor: "text-red-600",
    text: "Mountainous Korean Peninsula in East Asia, surrounded by Yellow Sea and Sea of Japan",
  },
  {
    icon: Globe,
    iconColor: "text-emerald-600",
    text: "Dynamic East Asian global powerhouse with rich cultural heritage and high-tech urban centers",
  },
  {
    icon: Sun,
    iconColor: "text-violet-600",
    text: "Scenic natural landscapes, volcanic Jeju Island, and iconic peaks like Hallasan and Jirisan",
  },
  {
    icon: MapPinned,
    iconColor: "text-cyan-600",
    text: "Maritime proximity to Japan and China, serving as a prominent regional medical education gateway",
  },
];
const climateZones = [
  {
    icon: Sun,
    iconColor: "text-red-600",
    text: "Temperate climate with four distinct, vibrant seasons",
  },
  {
    icon: Clock3,
    iconColor: "text-red-500",
    text: "Warm, sunny summers with pleasant coastal sea breezes (22°C – 30°C)",
  },
  {
    icon: Sparkles,
    iconColor: "text-violet-500",
    text: "Crisp, snowy winters with heated modern campuses and scenic snowfalls (-6°C – 3°C)",
  },
  {
    icon: CheckCircle,
    iconColor: "text-emerald-500",
    text: "Pleasant spring cherry blossoms and colorful autumn leaves across university campuses",
  },
];
const southKoreaAttractions = [
  {
    icon: Landmark,
    title: "Gyeongbokgung Palace",
    description: "The grand Joseon royal palace and cultural heritage heart of Seoul",
  },
  {
    icon: Sun,
    title: "N Seoul Tower & Namsan",
    description:
      "Iconic panoramic tower overlooking Seoul's high-tech skyline",
  },
  {
    icon: Mountain,
    title: "Jeju Island (Hallasan)",
    description:
      "UNESCO World Heritage volcanic island featuring Korea's highest peak",
  },
  {
    icon: Globe,
    title: "Bukchon Hanok Village & Insadong",
    description:
      "Historic traditional Korean hanok villages and vibrant cultural craft alleys",
  },
];
const transportPoints = [
  {
    icon: Plane,
    iconColor: "text-red-600",
    text: "Incheon International Airport (ICN) connects Seoul directly with major Indian and global hubs",
  },
  {
    icon: Bus,
    iconColor: "text-orange-600",
    text: "Seoul Metropolitan Subway and KTX bullet trains provide ultra-fast, world-class daily transport",
  },
  {
    icon: Globe,
    iconColor: "text-violet-600",
    text: "Ride-hailing apps like Kakao T and rechargeable T-Money cards offer seamless transit across Korea",
  },
  {
    icon: MapPinned,
    iconColor: "text-emerald-600",
    text: "High-speed rail and intercity express buses connect university cities in under 2-3 hours",
  },
];
const visaOnboardingPoints = [
  {
    icon: CheckCircle,
    iconColor: "text-emerald-600",
    text: "Straightforward D-2 student visa and Alien Registration Card (ARC) process for international applicants",
  },
  {
    icon: Clock3,
    iconColor: "text-orange-600",
    text: "Quick visa issuance backed by official university Certificate of Admission (CoA)",
  },
  {
    icon: Plane,
    iconColor: "text-red-600",
    text: "Universities provide dedicated international student offices (OIA) for visa renewals and residence registration",
  },
  {
    icon: Heart,
    iconColor: "text-red-500",
    text: "Airport reception, modern campus dormitory allotment, and comprehensive arrival orientation",
  },
];
const healthcareCards = [
  {
    title: "National Health Insurance (NHIS)",
    description:
      "International students in South Korea are enrolled in the world-class National Health Insurance System, ensuring highly subsidized medical treatment.",
    accent: "border-sky-200",
  },
  {
    title: "Advanced Teaching Hospitals",
    description:
      "Leading tertiary medical centers (SNU Hospital, Severance, Asan) feature cutting-edge robotic surgery, digital diagnostics, and English-speaking faculty.",
    accent: "border-emerald-200",
  },
  {
    title: "Student Health & Wellness",
    description:
      "University campuses offer on-site medical clinics, multilingual counseling, and priority referrals to affiliated university hospitals.",
    accent: "border-violet-200",
  },
];
export default async function AboutSouthKoreaPage() {
  const content = await getAboutCountryContent();
  const stats = content.summaryStats.map((item, index) => {
    const icons = [Building2, Users, Languages, DollarSign];
    const eyebrows = ["City", "People", "Language", "Currency"];
    return {
      ...item,
      eyebrow: eyebrows[index % eyebrows.length],
      icon: icons[index % icons.length],
    };
  });
  const highlights = [
    {
      title: "First Christian Nation",
      description:
        "South Korea was the first country in the world to adopt Christianity as its official state religion in 301 AD.",
      theme: "blue" as const,
    },
    {
      title: "Ancient Heritage",
      description:
        "South Korea has an ancient civilization featuring a unique script created by Mesrop Mashtots in 405 AD.",
      theme: "green" as const,
    },
    {
      title: "High Literacy Rate",
      description:
        "South Korea boasts a 99.7% literacy rate with long-standing traditions in medical & scientific research.",
      theme: "amber" as const,
    },
    {
      title: "Geography & Nature",
      description:
        "Located in the Korean Peninsula of East Asia, South Korea features scenic mountains, volcanic Jeju Island, and picturesque coastlines.",
      theme: "purple" as const,
    },
    {
      title: "Safety & Hospitality",
      description:
        "Ranked among the safest countries in the world for international students with warm Korean hospitality and 24/7 safe public transport.",
      theme: "red" as const,
    },
    {
      title: "Continental Climate",
      description:
        "Enjoys four distinct seasons with warm sunny summers and snowy winters perfect for skiing.",
      theme: "blue" as const,
    },
  ].map((item, index) => ({
    ...item,
    icon: highlightIcons[index % highlightIcons.length],
    style: themeStyles[item.theme],
  }));
  const overviewCards = content.overviewCards
    .slice(0, 6)
    .map((item, index) => ({
      ...item,
      icon: overviewIcons[index % overviewIcons.length],
      style: themeStyles[item.theme],
    }));
  const attractions = content.attractions.slice(0, 5).map((item, index) => {
    const icons = [Mountain, Sun, Tent];
    return {
      ...item,
      icon: icons[index % icons.length],
      style: themeStyles[item.theme],
    };
  });
  const cuisines = content.cuisines.slice(0, 5).map((item, index) => {
    return { ...item, icon: Utensils, style: themeStyles[item.theme] };
  });
  const quickFacts = [
    {
      title: "Capital",
      value: stats.find((stat) => stat.label === "Capital")?.value || "Seoul",
      icon: Building2,
      style: themeStyles.blue,
    },
    {
      title: "Population",
      value:
        stats.find((stat) => stat.label === "Population")?.value ||
        "51.7 Million+",
      icon: Users,
      style: themeStyles.green,
    },
    {
      title: "Languages",
      value:
        stats.find((stat) => stat.label === "Languages")?.value ||
        "Korean, English (Academic)",
      icon: Languages,
      style: themeStyles.purple,
    },
    {
      title: "Currency",
      value:
        stats.find((stat) => stat.label === "Currency")?.value ||
        "KRW (South Korean Won)",
      icon: DollarSign,
      style: themeStyles.amber,
    },
    {
      title: "Location",
      value: content.location || "East Asia, Korean Peninsula",
      icon: MapPinned,
      style: themeStyles.red,
    },
    {
      title: "Timezone",
      value: content.timezone || "UTC+9 (KST)",
      icon: Clock3,
      style: themeStyles.green,
    },
    {
      title: "National Day",
      value: content.independenceDay || "August 15, 1945",
      icon: Flag,
      style: themeStyles.amber,
    },
    {
      title: "Highest Peak",
      value: `${content.highestPeak || "Hallasan"} (${content.highestPeakHeight || "1,947 m"})`,
      icon: Mountain,
      style: themeStyles.blue,
    },
  ];
  return (
    <div className="min-h-screen bg-white">
      {" "}
      <section className="relative overflow-hidden bg-[#EAF1FB] py-20 text-gray-900">
        {" "}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(153,27,27,0.18),transparent_32%)]" />{" "}
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          {" "}
          <div className="mb-6">
            {" "}
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-red-600/80 px-6 py-2.5 text-xl font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] ">
              {" "}
              <MapPinned className="h-5 w-5" /> About South Korea{" "}
            </span>{" "}
          </div>{" "}
          <h1 className="mb-6 text-4xl font-bold lg:text-6xl">
            {content.heroTitle || "Life and Study in South Korea"}
          </h1>{" "}
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600">
            {content.heroDescription ||
              "Discover why South Korea is a top choice for international medical students offering WHO & NMC recognized MBBS programs, low tuition fees, and rich cultural heritage."}
          </p>{" "}
        </div>{" "}
      </section>{" "}
      <section className="mx-auto max-w-7xl px-4 py-10">
        {" "}
        <div className="mb-8 text-center">
          {" "}
          <span className="text-sm font-semibold uppercase tracking-widest text-red-600">
            Country Snapshot
          </span>{" "}
          <h2 className="mt-2 text-3xl font-bold text-gray-900 lg:text-4xl">
            Quick Facts About South Korea
          </h2>{" "}
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            {" "}
            Capital, population, languages, currency, and student budget
            insights at a glance before you choose your MBBS university.{" "}
          </p>{" "}
        </div>{" "}
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {" "}
          {quickFacts.map((fact) => (
            <article
              key={fact.title}
              className={`group relative overflow-hidden rounded-2xl border p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${fact.style.softPanel} ${fact.style.ringHover}`}
            >
              {" "}
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${fact.style.wash}`}
              />{" "}
              <div className="relative">
                {" "}
                <div
                  className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${fact.style.iconWrap} ${fact.style.iconHover}`}
                >
                  {" "}
                  <fact.icon className="h-6 w-6" />{" "}
                </div>{" "}
                <h3
                  className={`text-lg font-bold text-gray-900 transition-colors duration-300 ${fact.style.titleHover}`}
                >
                  {fact.title}
                </h3>{" "}
                <p className="mt-2 text-sm leading-relaxed text-gray-900">
                  {fact.value}
                </p>{" "}
              </div>{" "}
            </article>
          ))}{" "}
        </div>{" "}
      </section>{" "}
      <section className="mx-auto max-w-7xl px-4 py-16">
        {" "}
        <div className="mb-12 text-center">
          {" "}
          <span className="text-sm font-semibold uppercase tracking-widest text-red-600">
            Why South Korea?
          </span>{" "}
          <h2 className="mt-2 text-3xl font-bold text-gray-900 lg:text-4xl">
            A Top Destination for MBBS Aspirants
          </h2>{" "}
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            {" "}
            South Korea offers globally accredited medical education with modern
            infrastructure, 100% English-medium instruction, and high clinical
            exposure.{" "}
          </p>{" "}
        </div>{" "}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {" "}
          {highlights.map((item) => (
            <article
              key={item.title}
              className={`group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${item.style.ringHover}`}
            >
              {" "}
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${item.style.wash}`}
              />{" "}
              <div className="relative">
                {" "}
                <div className="mb-4 flex items-center gap-4">
                  {" "}
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${item.style.iconWrap} ${item.style.iconHover}`}
                  >
                    {" "}
                    <item.icon className="h-6 w-6" />{" "}
                  </div>{" "}
                  <h3
                    className={`text-xl font-bold text-gray-900 transition-colors duration-300 ${item.style.titleHover}`}
                  >
                    {item.title}
                  </h3>{" "}
                </div>{" "}
                <p className="text-sm leading-relaxed text-gray-600">
                  {item.description}
                </p>{" "}
              </div>{" "}
            </article>
          ))}{" "}
        </div>{" "}
      </section>{" "}
      <section className="bg-gray-50 py-16">
        {" "}
        <div className="mx-auto max-w-7xl px-4">
          {" "}
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {" "}
            <div>
              {" "}
              <span className="text-sm font-semibold uppercase tracking-widest text-red-600">
                Did You Know?
              </span>{" "}
              <h2 className="mt-2 mb-8 text-3xl font-bold text-gray-900">
                South Korea Education Facts
              </h2>{" "}
              <div className="space-y-4">
                {" "}
                {[
                  "World-Class Medical Innovation: South Korea ranks #1 globally in health system efficiency and advanced robotic surgery.",
                  "Global Accreditation: Medical colleges are recognized by WHO (WDOMS), NMC (India), ECFMG (USA), and Ministry of Health and Welfare (MOHW).",
                  "English-Medium Medical Tracks: Complete preclinical MBBS/MD curriculum and clinical training options taught in English for international students.",
                  "Top Tier Clinical Exposure: Hands-on training in globally ranked tertiary university hospitals across Seoul, Busan, and Daegu.",
                  "High Return on Investment: Top-quality medical training with scholarship opportunities and extensive clinical research resources.",
                ].map((fact) => (
                  <div key={fact} className="flex items-start gap-3">
                    {" "}
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />{" "}
                    <p className="text-gray-700">{fact}</p>{" "}
                  </div>
                ))}{" "}
              </div>{" "}
            </div>{" "}
            <div className="rounded-3xl bg-white p-8">
              {" "}
              <h3 className="mb-6 text-xl font-bold text-gray-900">
                Cost Comparison
              </h3>{" "}
              <div className="space-y-4">
                {" "}
                {comparisonRows.map((row) => (
                  <div
                    key={row.label}
                    className="rounded-xl bg-white p-4 shadow-sm border border-gray-100"
                  >
                    {" "}
                    <div className="mb-3 text-sm font-bold text-gray-800">
                      {row.label}
                    </div>{" "}
                    <div className="grid grid-cols-3 gap-3 text-xs leading-normal">
                      {" "}
                      <div className="text-center">
                        {" "}
                        <div className="font-bold text-green-600 mb-1">
                          {row.southKorea}
                        </div>{" "}
                        <div className="text-[10px] uppercase font-medium tracking-wider text-gray-500">
                          South Korea
                        </div>{" "}
                      </div>{" "}
                      <div className="text-center border-l border-gray-100">
                        {" "}
                        <div className="font-bold text-gray-700 mb-1">
                          {row.india}
                        </div>{" "}
                        <div className="text-[10px] uppercase font-medium tracking-wider text-gray-500">
                          India (Pvt)
                        </div>{" "}
                      </div>{" "}
                      <div className="text-center border-l border-gray-100">
                        {" "}
                        <div className="font-bold text-gray-700 mb-1">
                          {row.uk}
                        </div>{" "}
                        <div className="text-[10px] uppercase font-medium tracking-wider text-gray-500">
                          UK
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>
                ))}{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {overviewCards.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 py-16">
          {" "}
          <div className="mb-12 text-center">
            {" "}
            <span className="text-sm font-semibold uppercase tracking-widest text-red-600">
              MBBS Education Hub
            </span>{" "}
            <h2 className="mt-2 text-3xl font-bold text-gray-900 lg:text-4xl">
              International recognition with modern medical training
            </h2>{" "}
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              {" "}
              South Korea is a preferred MBBS destination with globally aligned
              curriculum, English-medium pathways, and quality clinical
              exposure.{" "}
            </p>{" "}
          </div>{" "}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {" "}
            {overviewCards.map((item) => (
              <article
                key={item.title}
                className={`group relative overflow-hidden rounded-3xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${item.style.softPanel} ${item.style.ringHover}`}
              >
                {" "}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${item.style.wash}`}
                />{" "}
                <div className="relative">
                  {" "}
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${item.style.iconWrap} ${item.style.iconHover}`}
                  >
                    {" "}
                    <item.icon className="h-6 w-6" />{" "}
                  </div>{" "}
                  <h3
                    className={`text-xl font-bold text-gray-900 transition-colors duration-300 ${item.style.titleHover}`}
                  >
                    {item.title}
                  </h3>{" "}
                  <p className="mt-3 text-sm leading-7 text-gray-700">
                    {item.description}
                  </p>{" "}
                </div>{" "}
              </article>
            ))}{" "}
          </div>{" "}
        </section>
      ) : null}{" "}
      {content.universityCities.length > 0 ? (
        <section className="bg-gray-50 py-16">
          {" "}
          <div className="mx-auto max-w-7xl px-4">
            {" "}
            <div className="mb-12 text-center">
              {" "}
              <span className="text-sm font-semibold uppercase tracking-widest text-red-600">
                Major University Cities
              </span>{" "}
              <h2 className="mt-2 text-3xl font-bold text-gray-900 lg:text-4xl">
                Urban hubs for MBBS universities in South Korea
              </h2>{" "}
              <p className="mx-auto mt-4 max-w-3xl text-gray-600">
                {" "}
                City-level highlights based on active medical institutions and
                student-friendly environment.{" "}
              </p>{" "}
            </div>{" "}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {" "}
              {content.universityCities.slice(0, 3).map((city, index) => {
                const gradients = [" ", " ", " "];
                const gradient = gradients[index % gradients.length];
                return (
                  <article
                    key={city.city}
                    className={`rounded-[1.75rem] bg-gradient-to-br ${gradient} p-7 text-gray-900 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                  >
                    {" "}
                    <h3 className="text-2xl font-bold">
                      {" "}
                      {index === 0
                        ? "Seoul"
                        : index === 1
                          ? "Busan"
                          : city.city}{" "}
                    </h3>{" "}
                    {index === 0 ? (
                      <div className="mt-6 space-y-6 text-sm leading-relaxed text-gray-900/90">
                        {" "}
                        <section>
                          {" "}
                          <h4 className="flex items-center gap-2 text-md font-bold text-gray-900">
                            {" "}
                            <span>🏫</span> About Seoul & Medical Education{" "}
                          </h4>{" "}
                          <p className="mt-2">
                            {" "}
                            Seoul is South Korea's vibrant capital and a global healthcare innovation hub. It is home to prestigious medical institutions including Seoul National University College of Medicine, Yonsei University College of Medicine, and Korea University College of Medicine.{" "}
                          </p>{" "}
                          <p className="mt-2">
                            {" "}
                            Located in the dynamic heart of Korea, medical universities in Seoul offer state-of-the-art robotic surgery simulation labs, genomic research centers, and clinical rotations across world-renowned tertiary hospitals.{" "}
                          </p>{" "}
                        </section>{" "}
                        <section>
                          {" "}
                          <h5 className="flex items-center gap-2 font-bold text-gray-900">
                            {" "}
                            <span>📜</span> Academic Excellence & Innovation{" "}
                          </h5>{" "}
                          <ul className="mt-2 list-inside list-disc space-y-1">
                            {" "}
                            <li>
                              Top-ranked medical universities globally recognized for biomedical research
                            </li>{" "}
                            <li>
                              World leaders in precision medicine, robotic surgery, and clinical technologies
                            </li>{" "}
                            <li>
                              Attracts international medical students, researchers, and global scholars
                            </li>{" "}
                            <li>
                              Alumni practicing worldwide across NMC, WHO, USMLE, and PLAB jurisdictions
                            </li>{" "}
                          </ul>{" "}
                        </section>{" "}
                        <section>
                          {" "}
                          <h5 className="flex items-center gap-2 font-bold text-gray-900">
                            {" "}
                            <span>🎓</span> Courses & Duration{" "}
                          </h5>{" "}
                          <div className="mt-2 space-y-3">
                            {" "}
                            <div>
                              {" "}
                              <p className="font-semibold text-gray-900">
                                MD / MBBS General Medicine
                              </p>{" "}
                              <ul className="mt-1 list-inside list-disc space-y-1">
                                {" "}
                                <li>
                                  Duration: 6 years (2 years Pre-Medicine + 4 years Clinical Medicine & Internship)
                                </li>{" "}
                                <li>Medium of Instruction: English-taught preclinical tracks with clinical Korean support</li>{" "}
                                <li>
                                  Curriculum aligned with NEXT (India), USMLE (USA), and global standards
                                </li>{" "}
                              </ul>{" "}
                            </div>{" "}
                          </div>{" "}
                        </section>{" "}
                        <section>
                          {" "}
                          <h5 className="flex items-center gap-2 font-bold text-gray-900">
                            {" "}
                            <span>🌍</span> Recognition & Accreditation{" "}
                          </h5>{" "}
                          <ul className="mt-2 list-inside list-disc space-y-1">
                            {" "}
                            <li>World Health Organization (WHO - WDOMS)</li>{" "}
                            <li>National Medical Commission (NMC), India</li>{" "}
                            <li>
                              Educational Commission for Foreign Medical Graduates (ECFMG), USA
                            </li>{" "}
                            <li>
                              Ministry of Health and Welfare (MOHW), South Korea
                            </li>{" "}
                          </ul>{" "}
                        </section>{" "}
                        <section>
                          {" "}
                          <h5 className="flex items-center gap-2 font-bold text-gray-900">
                            {" "}
                            <span>🏥</span> Clinical Hospitals & Facilities{" "}
                          </h5>{" "}
                          <ul className="mt-2 list-inside list-disc space-y-1">
                            {" "}
                            <li>Seoul National University Hospital (SNUH)</li>{" "}
                            <li>Severance Hospital - Yonsei University Health System</li>{" "}
                            <li>
                              Asan Medical Center & Samsung Medical Center
                            </li>{" "}
                            <li>
                              Over 10,000 tertiary hospital beds for comprehensive clinical exposure
                            </li>{" "}
                          </ul>{" "}
                        </section>{" "}
                      </div>
                    ) : index === 1 ? (
                      <div className="mt-6 space-y-6 text-sm leading-relaxed text-gray-900/90">
                        {" "}
                        <section>
                          {" "}
                          <h4 className="flex items-center gap-2 text-md font-bold text-gray-900">
                            {" "}
                            <span>🏙️</span> About Busan{" "}
                          </h4>{" "}
                          <p className="mt-2">
                            {" "}
                            Busan is South Korea's second largest metropolis and primary maritime center, renowned for world-class universities like Pusan National University College of Medicine, scenic beaches, and international cultural festivals.{" "}
                          </p>{" "}
                        </section>{" "}
                        <section>
                          {" "}
                          <h5 className="flex items-center gap-2 font-bold text-gray-900">
                            {" "}
                            <span>🏥</span> Healthcare & Education Hub{" "}
                          </h5>{" "}
                          <ul className="mt-2 list-inside list-disc space-y-1">
                            {" "}
                            <li>
                              Pusan National University Hospital provides premier tertiary patient care
                            </li>{" "}
                            <li>
                              Safe, modern coastal environment with a student-friendly cost of living
                            </li>{" "}
                            <li>
                              Direct KTX bullet train connection to Seoul in approximately 2 hours
                            </li>{" "}
                          </ul>{" "}
                        </section>{" "}
                      </div>
                    ) : (
                      <p className="mt-4 text-sm leading-8 text-gray-900/90">
                        {city.description}
                      </p>
                    )}{" "}
                    {index !== 2 && (
                      <div className="mt-6 space-y-3 text-gray-900/90">
                        {" "}
                        <div className="flex items-center gap-2.5 text-sm">
                          {" "}
                          <Users className="h-5 w-5" />{" "}
                          <span>
                            {" "}
                            {city.universityCount} listed universit
                            {city.universityCount === 1 ? "y" : "ies"}{" "}
                          </span>{" "}
                        </div>{" "}
                        <div className="flex items-center gap-2.5 text-sm">
                          {" "}
                          <Sparkles className="h-5 w-5" />{" "}
                          <span>
                            {city.universityNames.slice(0, 2).join(" • ")}
                          </span>{" "}
                        </div>{" "}
                        {city.avgTuition ? (
                          <div className="flex items-center gap-2.5 text-sm">
                            {" "}
                            <DollarSign className="h-5 w-5" />{" "}
                            <span>Tuition: {city.avgTuition}</span>{" "}
                          </div>
                        ) : null}{" "}
                      </div>
                    )}{" "}
                  </article>
                );
              })}{" "}
            </div>{" "}
          </div>{" "}
        </section>
      ) : null}{" "}
      <section className="bg-slate-100 py-14">
        {" "}
        <div className="mx-auto max-w-7xl px-4">
          {" "}
          <div className="mx-auto max-w-4xl text-center">
            {" "}
            <h2 className="text-3xl font-bold text-slate-800 lg:text-4xl">
              Geography and Climate
            </h2>{" "}
            <p className="mt-4 text-base leading-7 text-slate-700">
              {" "}
              A vibrant peninsula in East Asia celebrated for picturesque four seasons,
              scenic mountains and coastal landscapes, and hyper-safe urban life.{" "}
            </p>{" "}
          </div>{" "}
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {" "}
            <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 lg:p-7">
              {" "}
              <h3 className="text-xl font-bold text-slate-900 lg:text-2xl">
                Geography Highlights
              </h3>{" "}
              <ul className="mt-6 space-y-4">
                {" "}
                {geographyHighlights.map((item) => (
                  <li key={item.text} className="flex items-start gap-3.5">
                    {" "}
                    <item.icon
                      className={`mt-0.5 h-6 w-6 shrink-0 ${item.iconColor}`}
                    />{" "}
                    <p className="text-base leading-7 text-slate-700">
                      {item.text}
                    </p>{" "}
                  </li>
                ))}{" "}
              </ul>{" "}
            </article>{" "}
            <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 lg:p-7">
              {" "}
              <h3 className="text-xl font-bold text-slate-900 lg:text-2xl">
                Climate Zones
              </h3>{" "}
              <ul className="mt-6 space-y-4">
                {" "}
                {climateZones.map((item) => (
                  <li key={item.text} className="flex items-start gap-3.5">
                    {" "}
                    <item.icon
                      className={`mt-0.5 h-6 w-6 shrink-0 ${item.iconColor}`}
                    />{" "}
                    <p className="text-base leading-7 text-slate-700">
                      {item.text}
                    </p>{" "}
                  </li>
                ))}{" "}
              </ul>{" "}
            </article>{" "}
          </div>{" "}
          <div className="mt-8 rounded-[2rem] border border-gray-200/20 bg-orange-500 px-6 py-8 text-gray-900 shadow-lg lg:px-10">
            {" "}
            <h3 className="text-center text-2xl font-bold lg:text-3xl">
              Top Attractions in South Korea
            </h3>{" "}
            <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {" "}
              {southKoreaAttractions.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl bg-gray-100 p-4 text-center ring-1 ring-white/15 "
                >
                  {" "}
                  <item.icon className="mx-auto h-8 w-8 text-red-600" />{" "}
                  <h4 className="mt-3 text-xl font-semibold">{item.title}</h4>{" "}
                  <p className="mt-2 text-sm leading-6 text-red-50">
                    {item.description}
                  </p>{" "}
                </article>
              ))}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="bg-slate-100 py-14">
        {" "}
        <div className="mx-auto max-w-7xl px-4">
          {" "}
          <div className="mx-auto max-w-4xl text-center">
            {" "}
            <Plane className="mx-auto h-10 w-10 text-red-600" />{" "}
            <h2 className="mt-4 text-3xl font-bold text-slate-800 lg:text-4xl">
              Travel and Connectivity
            </h2>{" "}
            <p className="mt-4 text-base leading-7 text-slate-700">
              {" "}
              Direct flights, modern transport infrastructure, and simple
              student visa guidelines make student onboarding seamless.{" "}
            </p>{" "}
          </div>{" "}
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {" "}
            <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 lg:p-7">
              {" "}
              <h3 className="text-xl font-bold text-slate-900 lg:text-2xl">
                Transportation
              </h3>{" "}
              <ul className="mt-6 space-y-4">
                {" "}
                {transportPoints.map((item) => (
                  <li key={item.text} className="flex items-start gap-3.5">
                    {" "}
                    <item.icon
                      className={`mt-0.5 h-6 w-6 shrink-0 ${item.iconColor}`}
                    />{" "}
                    <p className="text-base leading-7 text-slate-700">
                      {item.text}
                    </p>{" "}
                  </li>
                ))}{" "}
              </ul>{" "}
            </article>{" "}
            <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 lg:p-7">
              {" "}
              <h3 className="text-xl font-bold text-slate-900 lg:text-2xl">
                Visa and Onboarding
              </h3>{" "}
              <ul className="mt-6 space-y-4">
                {" "}
                {visaOnboardingPoints.map((item) => (
                  <li key={item.text} className="flex items-start gap-3.5">
                    {" "}
                    <item.icon
                      className={`mt-0.5 h-6 w-6 shrink-0 ${item.iconColor}`}
                    />{" "}
                    <p className="text-base leading-7 text-slate-700">
                      {item.text}
                    </p>{" "}
                  </li>
                ))}{" "}
              </ul>{" "}
            </article>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="bg-teal-50 py-14">
        {" "}
        <div className="mx-auto max-w-7xl px-4">
          {" "}
          <div className="mx-auto max-w-4xl text-center">
            {" "}
            <Stethoscope className="mx-auto h-11 w-11 text-emerald-600" />{" "}
            <h2 className="mt-4 text-3xl font-bold text-slate-800 lg:text-4xl">
              Healthcare System
            </h2>{" "}
            <p className="mt-4 text-base leading-7 text-slate-700">
              {" "}
              Healthcare access for students is supported through campus medical
              desks and city-wide healthcare networks.{" "}
            </p>{" "}
          </div>{" "}
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {" "}
            {healthcareCards.map((card) => (
              <article
                key={card.title}
                className={`rounded-3xl border-t-4 bg-white p-6 shadow-sm ring-1 ring-slate-100 ${card.accent}`}
              >
                {" "}
                <h3 className="text-2xl font-bold text-slate-900">
                  {card.title}
                </h3>{" "}
                <p className="mt-4 text-base leading-8 text-slate-700">
                  {card.description}
                </p>{" "}
              </article>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {cuisines.length > 0 || attractions.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 py-16">
          {" "}
          <div className="mb-12 text-center">
            {" "}
            <span className="text-sm font-semibold uppercase tracking-widest text-red-600">
              Cuisine and Student Life
            </span>{" "}
            <h2 className="mt-2 text-3xl font-bold text-gray-900 lg:text-4xl">
              Food, culture, and lifestyle across South Korea
            </h2>{" "}
          </div>{" "}
          <div className="grid gap-8 lg:grid-cols-2">
            {" "}
            <div>
              {" "}
              <div className="mb-5 flex items-center gap-3">
                {" "}
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF1FB] text-red-600">
                  {" "}
                  <Utensils className="h-5 w-5" />{" "}
                </div>{" "}
                <h3 className="text-2xl font-bold text-gray-900">
                  Popular cuisines
                </h3>{" "}
              </div>{" "}
              <div className="space-y-4">
                {" "}
                {cuisines.map((item) => (
                  <article
                    key={item.title}
                    className={`group relative overflow-hidden rounded-[2rem] border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${item.style.ringHover}`}
                  >
                    {" "}
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${item.style.wash}`}
                    />{" "}
                    <div className="relative">
                      {" "}
                      <div className="flex items-start gap-4 lg:gap-5">
                        {" "}
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 ${item.style.iconWrap} ${item.style.iconHover} shadow-sm`}
                        >
                          {" "}
                          <item.icon className="h-6 w-6" />{" "}
                        </div>{" "}
                        <div className="flex-1 pt-1">
                          {" "}
                          <h4
                            className={`text-xl font-bold text-gray-900 transition-colors duration-300 ${item.style.titleHover}`}
                          >
                            {item.title}
                          </h4>{" "}
                          <p className="mt-3 text-sm leading-relaxed text-gray-600">
                            {item.description}
                          </p>{" "}
                          {item.image && (
                            <div className="relative mt-4 h-40 w-full overflow-hidden rounded-2xl">
                              {" "}
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 400px"
                              />{" "}
                            </div>
                          )}{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </article>
                ))}{" "}
              </div>{" "}
            </div>{" "}
            <div>
              {" "}
              <div className="mb-5 flex items-center gap-3">
                {" "}
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-400 text-red-600">
                  {" "}
                  <Mountain className="h-5 w-5" />{" "}
                </div>{" "}
                <h3 className="text-2xl font-bold text-gray-900">
                  Places and experiences
                </h3>{" "}
              </div>{" "}
              <div className="space-y-4">
                {" "}
                {attractions.map((item) => (
                  <article
                    key={item.title}
                    className={`group relative overflow-hidden rounded-[2rem] border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${item.style.ringHover}`}
                  >
                    {" "}
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${item.style.wash}`}
                    />{" "}
                    <div className="relative">
                      {" "}
                      <div className="flex items-start gap-4 lg:gap-5">
                        {" "}
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 ${item.style.iconWrap} ${item.style.iconHover} shadow-sm`}
                        >
                          {" "}
                          <item.icon className="h-6 w-6" />{" "}
                        </div>{" "}
                        <div className="flex-1 pt-1">
                          {" "}
                          <h4
                            className={`text-xl font-bold text-gray-900 transition-colors duration-300 ${item.style.titleHover}`}
                          >
                            {item.title}
                          </h4>{" "}
                          <p className="mt-3 text-sm leading-relaxed text-gray-600">
                            {item.description}
                          </p>{" "}
                          {item.image && (
                            <div className="relative mt-4 h-40 w-full overflow-hidden rounded-2xl">
                              {" "}
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 400px"
                              />{" "}
                            </div>
                          )}{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </article>
                ))}{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </section>
      ) : null}{" "}
      <section className="bg-[#EAF1FB] py-16 text-gray-900">
        {" "}
        <div className="mx-auto max-w-4xl px-4 text-center">
          {" "}
          <h2 className="text-3xl font-bold lg:text-4xl">
            Ready to choose South Korea for your MBBS journey?
          </h2>{" "}
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            {" "}
            Compare top universities, tuition fees, and admission guidance to
            plan your MBBS journey in South Korea.{" "}
          </p>{" "}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {" "}
            <Link
              href="/universities"
              className="inline-flex items-center gap-2 rounded-full bg-yellow-500 text-black hover:bg-yellow-600 font-bold px-7 py-3 rounded-full transition-colors"
            >
              {" "}
              Explore Universities <ArrowRight className="h-4 w-4" />{" "}
            </Link>{" "}
            <Link
              href="/contact-us"
              className="rounded-full bg-green-600 text-white hover:bg-green-700 font-bold px-7 py-3 transition-colors"
            >
              {" "}
              Call Us{" "}
            </Link>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </div>
  );
}
