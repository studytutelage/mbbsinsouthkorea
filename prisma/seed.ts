import {
  ApplicationStatus,
  CountryDocType,
  LeadStatus,
  NeetStatus,
  UserRole,
} from "@prisma/client";
import { prisma } from "../src/lib/prisma";
import * as bcrypt from "bcryptjs";

const SHOULD_SEED_SAMPLE_LEADS =
  (process.env.SEED_SAMPLE_LEADS || "false").toLowerCase() === "true";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function upsertByWhere(
  delegate: any,
  where: Record<string, unknown>,
  data: Record<string, unknown>,
) {
  const existing = await delegate.findFirst({ where });
  if (existing) {
    return delegate.update({ where: { id: existing.id }, data });
  }
  return delegate.create({ data });
}

async function seedAdminUser() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be defined in your .env file');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.upsert({
    where: { email },
    update: {
      name: "Super Admin",
      role: UserRole.admin,
      password: hashedPassword,
      designation: "Administrator",
      description: "Platform administrator for MBBS in South Korea.",
      status: true,
    },
    create: {
      name: "Super Admin",
      email,
      role: UserRole.admin,
      password: hashedPassword,
      designation: "Administrator",
      description: "Platform administrator for MBBS in South Korea.",
      status: true,
    },
  });
}

async function seedWebsiteSettings() {
  const settings = [
    { key: "site_name", value: "MBBS in South Korea", type: "text", group: "general" },
    { key: "support_email", value: "admissions@mbbsinsouthkorea.com", type: "text", group: "contact" },
    { key: "support_phone", value: "+91-9667-667-331", type: "text", group: "contact" },
    { key: "stats_total_students", value: "2500+", type: "text", group: "stats" },
    { key: "stats_total_universities", value: "8+", type: "text", group: "stats" },
    { key: "stats_total_scholarships", value: "20+", type: "text", group: "stats" },
    { key: "stats_annual_aid", value: "$1.2M+", type: "text", group: "stats" },
    { key: "stats_admission_support", value: "100%", type: "text", group: "stats" },
    { key: "stats_merit_label", value: "Merit", type: "text", group: "stats" },
    { key: "stats_verified_label", value: "NMC / WHO", type: "text", group: "stats" },
  ];

  for (const item of settings) {
    await prisma.websiteSetting.upsert({
      where: { key: item.key },
      update: item,
      create: item,
    });
  }
}

async function seedReferenceData() {
  for (const name of ["Public", "Private", "Semi-Government"]) {
    await upsertByWhere(prisma.instituteType, { name }, { name, status: true });
  }

  const provinceNames = [
    "Seoul Special City",
    "Busan Metropolitan City",
    "Daegu Metropolitan City",
    "Incheon Metropolitan City",
    "Gwangju Metropolitan City",
    "Daejeon Metropolitan City",
    "Gyeonggi Province",
    "Jeju Special Self-Governing Province",
  ];
  const provinceIds = new Map<string, number>();
  for (const name of provinceNames) {
    const p = await upsertByWhere(prisma.province, { name }, { name, status: true });
    provinceIds.set(name, p.id);
  }

  const cities = [
    { name: "Seoul", province: "Seoul Special City" },
    { name: "Busan", province: "Busan Metropolitan City" },
    { name: "Daegu", province: "Daegu Metropolitan City" },
    { name: "Incheon", province: "Incheon Metropolitan City" },
    { name: "Gwangju", province: "Gwangju Metropolitan City" },
    { name: "Daejeon", province: "Daejeon Metropolitan City" },
    { name: "Suwon", province: "Gyeonggi Province" },
    { name: "Jeju City", province: "Jeju Special Self-Governing Province" },
  ];

  for (const item of cities) {
    const provinceId = provinceIds.get(item.province);
    if (!provinceId) continue;
    await upsertByWhere(
      prisma.city,
      { name: item.name, provinceId },
      { name: item.name, provinceId, status: true },
    );
  }

  const levels = [
    {
      name: "Undergraduate",
      slug: "undergraduate",
      description: "Bachelor-level programs including MBBS.",
      status: true,
    },
    {
      name: "Postgraduate",
      slug: "postgraduate",
      description: "Advanced clinical and research pathways.",
      status: true,
    },
  ];
  for (const item of levels) {
    await prisma.level.upsert({
      where: { slug: item.slug },
      update: item,
      create: item,
    });
  }

  for (const name of [
    "Indian Mess",
    "Multicultural Food Court",
    "24x7 Campus Security",
    "Simulation Labs",
    "On-campus Hostel",
  ]) {
    await upsertByWhere(prisma.facility, { name }, { name, status: true });
  }

  const hospitals = [
    { name: "Seoul National University Hospital", city: "Seoul", beds: 1800 },
    { name: "Severance Hospital - Yonsei University", city: "Seoul", beds: 2400 },
    { name: "Pusan National University Hospital", city: "Busan", beds: 1400 },
  ];
  for (const item of hospitals) {
    const slug = slugify(item.name);
    await prisma.hospital.upsert({
      where: { slug },
      update: { ...item, slug, state: "South Korea", status: true },
      create: { ...item, slug, state: "South Korea", status: true },
    });
  }

  for (const studyMode of ["Full-time", "On-campus", "English Medium"]) {
    await upsertByWhere(prisma.studyMode, { studyMode }, { studyMode });
  }
}

async function seedCountryAndEducationPages() {
  const aboutCountry = await prisma.aboutCountryPage.upsert({
    where: { id: 1 },
    update: {
      name: "South Korea",
      tagline: "World-Class Medical Education in the Heart of East Asia",
      capital: "Seoul",
      population: "51.7 Million+",
      languages: "Korean, English (Academic)",
      currency: "KRW",
      location: "East Asia, Korean Peninsula",
      timezone: "UTC+9 (KST)",
      independenceDay: new Date("1945-08-15"),
      highestPeak: "Hallasan",
      highestPeakHeight: "1,947 m",
      whoRecognized: true,
      englishMedium: true,
      mbbsAffordableEducation:
        "Globally aligned medical education with practical fees and world-leading hospital infrastructure.",
      academicExcellence:
        "Structured curriculum with clinical exposure, advanced simulation, and modern robotic training.",
      studentLife:
        "Students benefit from an exceptionally safe, technologically advanced, and welcoming environment.",
      visaConnectivity: "Straightforward D-2 student visa process with dedicated international student advisory support.",
      publicHealthcare: "World-class National Health Insurance System (NHIS) providing comprehensive subsidized care.",
      privateHealthcare: "Top-tier private university hospitals with advanced medical equipment and English-speaking doctors.",
      studentHealthcare: "On-campus health centers and student health support across major university cities.",
      tourismGrowth: "A globally popular cultural destination with iconic palaces, vibrant cities, and scenic nature.",
      bannerImage: "/uploads/about-country/south-korea-banner.jpg",
    },
    create: {
      id: 1,
      name: "South Korea",
      tagline: "World-Class Medical Education in the Heart of East Asia",
      capital: "Seoul",
      population: "51.7 Million+",
      languages: "Korean, English (Academic)",
      currency: "KRW",
      location: "East Asia, Korean Peninsula",
      timezone: "UTC+9 (KST)",
      independenceDay: new Date("1945-08-15"),
      highestPeak: "Hallasan",
      highestPeakHeight: "1,947 m",
      whoRecognized: true,
      englishMedium: true,
      mbbsAffordableEducation:
        "Globally aligned medical education with practical fees and world-leading hospital infrastructure.",
      academicExcellence:
        "Structured curriculum with clinical exposure, advanced simulation, and modern robotic training.",
      studentLife:
        "Students benefit from an exceptionally safe, technologically advanced, and welcoming environment.",
      visaConnectivity: "Straightforward D-2 student visa process with dedicated international student advisory support.",
      publicHealthcare: "World-class National Health Insurance System (NHIS) providing comprehensive subsidized care.",
      privateHealthcare: "Top-tier private university hospitals with advanced medical equipment and English-speaking doctors.",
      studentHealthcare: "On-campus health centers and student health support across major university cities.",
      tourismGrowth: "A globally popular cultural destination with iconic palaces, vibrant cities, and scenic nature.",
      bannerImage: "/uploads/about-country/south-korea-banner.jpg",
    },
  });

  const cityCards = [
    { cityName: "Seoul", description: "Capital city and primary healthcare innovation hub with top university hospitals.", population: "9.7 Million+" },
    { cityName: "Busan", description: "Premier coastal metropolis and maritime education center.", population: "3.4 Million+" },
    { cityName: "Daegu", description: "Korea's specialized medical city featuring advanced health complexes.", population: "2.4 Million+" },
  ];
  for (const item of cityCards) {
    await upsertByWhere(
      prisma.countryMajorCity,
      { pageId: aboutCountry.id, cityName: item.cityName },
      { ...item, pageId: aboutCountry.id },
    );
  }

  const cuisines = [
    { dishName: "Kimchi", dishDescription: "Iconic fermented vegetable dish rich in vitamins and probiotics.", dishImage: "/uploads/about-country/kimchi.jpg" },
    { dishName: "Bibimbap", dishDescription: "Nutritious traditional mixed rice bowl with seasoned vegetables and proteins.", dishImage: "/uploads/about-country/bibimbap.jpg" },
  ];
  for (const item of cuisines) {
    await upsertByWhere(
      prisma.countryCuisineLifestyle,
      { pageId: aboutCountry.id, dishName: item.dishName },
      { ...item, pageId: aboutCountry.id },
    );
  }

  const lifestyles = [
    { title: "Safe & Modern Society", description: "Consistently ranked among the world's safest countries with 24/7 vibrant city life." },
    { title: "High-Tech Educational Environment", description: "Smart campuses, 5G digital libraries, and advanced biomedical labs." },
  ];
  for (const item of lifestyles) {
    await upsertByWhere(
      prisma.countryLifestyleCulture,
      { pageId: aboutCountry.id, title: item.title },
      { ...item, pageId: aboutCountry.id },
    );
  }

  const attractions = [
    { attractionName: "Gyeongbokgung Palace", description: "Historic Joseon Dynasty royal palace in Seoul.", ordering: 1, isActive: true },
    { attractionName: "Jeju Island & Hallasan", description: "UNESCO World Heritage volcanic island and highest peak.", ordering: 2, isActive: true },
  ];
  for (const item of attractions) {
    await upsertByWhere(
      prisma.countryTouristAttraction,
      { pageId: aboutCountry.id, attractionName: item.attractionName },
      { ...item, pageId: aboutCountry.id },
    );
  }

  const educationSystem = await prisma.educationSystem.upsert({
    where: { id: 1 },
    update: {
      title: "Education System in South Korea",
      description:
        "South Korea follows a rigorous global medical framework with strong hospital immersion, simulation training, and research excellence.",
      introductionTitle: "A Global Benchmark in Medical Training",
      introductionDescription:
        "Medical education integrates foundation sciences, cutting-edge robotic simulation, and extensive hospital rotations.",
      literacyRate: 98.8,
      officialLanguage: "Korean",
      officialLanguagePercentage: 100,
      officialLanguageNote: "National language with English-medium medical tracks",
      foreignLanguage: "English",
      foreignLanguagePercentage: 85,
      foreignLanguageNote: "Widely used in medical journals, lectures, and international conferences",
      universitiesCount: 40,
      universitiesNote: "Accredited national and private medical colleges",
      higherEducationDescription: "World-ranked medical faculties offering globally recognized MBBS/MD degrees.",
    },
    create: {
      id: 1,
      title: "Education System in South Korea",
      description:
        "South Korea follows a rigorous global medical framework with strong hospital immersion, simulation training, and research excellence.",
      introductionTitle: "A Global Benchmark in Medical Training",
      introductionDescription:
        "Medical education integrates foundation sciences, cutting-edge robotic simulation, and extensive hospital rotations.",
      literacyRate: 98.8,
      officialLanguage: "Korean",
      officialLanguagePercentage: 100,
      officialLanguageNote: "National language with English-medium medical tracks",
      foreignLanguage: "English",
      foreignLanguagePercentage: 85,
      foreignLanguageNote: "Widely used in medical journals, lectures, and international conferences",
      universitiesCount: 40,
      universitiesNote: "Accredited national and private medical colleges",
      higherEducationDescription: "World-ranked medical faculties offering globally recognized MBBS/MD degrees.",
    },
  });

  const exams = [
    { examName: "CSAT (Suneung)", gradeLevel: "High School Grade 3", type: "National university entrance exam", subjects: "Korean; Mathematics; English; Korean History; Science / Social Studies Inquiry" },
    { examName: "KMLE", gradeLevel: "Final year of medical school", type: "National medical licensing exam (KHPLEI)", subjects: "Written examination; Clinical skills assessment" },
  ];
  for (const item of exams) {
    await upsertByWhere(
      prisma.educationExamination,
      { pageId: educationSystem.id, examName: item.examName },
      { ...item, pageId: educationSystem.id },
    );
  }

  const schoolLevels = [
    { level: "Elementary", ageRange: "6-12", durationYears: 6, isCompulsory: true, title: "Elementary School (Chodeung Hakgyo)" },
    { level: "Middle School", ageRange: "12-15", durationYears: 3, isCompulsory: true, title: "Middle School (Jung Hakgyo)" },
    { level: "High School", ageRange: "15-18", durationYears: 3, isCompulsory: false, title: "High School and CSAT" },
    { level: "University", ageRange: "18+", durationYears: 6, isCompulsory: false, title: "Medical School (2 pre-med + 4 medicine)" },
  ];
  for (const item of schoolLevels) {
    await upsertByWhere(
      prisma.educationSchoolLevel,
      { pageId: educationSystem.id, level: item.level },
      { ...item, pageId: educationSystem.id },
    );
  }

  const degrees = [
    { degree: "MD / MBBS", duration: "6 Years", recognition: "Listed in WHO World Directory of Medical Schools" },
    { degree: "BSc Nursing", duration: "4 Years", recognition: "Professional healthcare degree" },
  ];
  for (const item of degrees) {
    await upsertByWhere(
      prisma.educationDegree,
      { pageId: educationSystem.id, degree: item.degree },
      { ...item, pageId: educationSystem.id },
    );
  }

  const fields = [
    { field: "Medicine", description: "Primary track for MBBS aspirants.", numberOfInstitutions: "40", durationYears: "6" },
    { field: "Allied Health", description: "Growing options in nursing and therapy fields.", numberOfInstitutions: "7+", durationYears: "3-4" },
  ];
  for (const item of fields) {
    await upsertByWhere(
      prisma.educationPopularField,
      { pageId: educationSystem.id, field: item.field },
      { ...item, pageId: educationSystem.id },
    );
  }

  await prisma.aboutUs.upsert({
    where: { id: 1 },
    update: {
      heroTitle: "Your Trusted MBBS in South Korea Advisory Team",
      heroDescription:
        "We guide students from profile assessment to admission and pre-departure support.",
      partnerUniversities: 8,
      studentsPlaced: 2500,
      channelPartners: 35,
      yearsExperience: 10,
      mission: "Ethical and transparent MBBS counseling for students and parents.",
      vision: "To be the most trusted South Korea medical admission support platform.",
      contact1: "+91-9667-667-331",
      contact2: "+82-2-3456-7890",
      email1: "admissions@mbbsinsouthkorea.com",
      email2: "support@mbbsinsouthkorea.com",
      address: "Gurugram, India and Gangnam-gu, Seoul, South Korea",
    },
    create: {
      id: 1,
      heroTitle: "Your Trusted MBBS in South Korea Advisory Team",
      heroDescription:
        "We guide students from profile assessment to admission and pre-departure support.",
      partnerUniversities: 8,
      studentsPlaced: 2500,
      channelPartners: 35,
      yearsExperience: 10,
      mission: "Ethical and transparent MBBS counseling for students and parents.",
      vision: "To be the most trusted South Korea medical admission support platform.",
      contact1: "+91-9667-667-331",
      contact2: "+82-2-3456-7890",
      email1: "admissions@mbbsinsouthkorea.com",
      email2: "support@mbbsinsouthkorea.com",
      address: "Gurugram, India and Gangnam-gu, Seoul, South Korea",
    },
  });

  await upsertByWhere(
    prisma.educationSystemPage,
    { title: "MBBS Curriculum Overview" },
    {
      title: "MBBS Curriculum Overview",
      subtitle: "Pre-clinical to internship progression",
      description: "A structured progression from foundation sciences to clinical rotations.",
      highlights: ["Anatomy", "Physiology", "Pathology", "Clinical postings"],
      position: 1,
      status: true,
    },
  );
}

async function seedContentAndMisc(adminId: number) {
  const staticSeoPages = [
    { page: "home", metaTitle: "Study MBBS in South Korea 2026", metaDescription: "Admission guidance, fee insights, and university comparison." },
    { page: "about-us", metaTitle: "About MBBS in South Korea Team", metaDescription: "Meet the counselors and operations team supporting students." },
    { page: "about-south-korea", metaTitle: "About South Korea for Students", metaDescription: "Understand lifestyle, safety, and healthcare ecosystem." },
    { page: "education-system", metaTitle: "Education System in South Korea", metaDescription: "Academic structure and MBBS training overview." },
    { page: "universities", metaTitle: "Medical Universities in South Korea", metaDescription: "Compare colleges, tuition, and support facilities." },
    { page: "blog", metaTitle: "MBBS South Korea Blog", metaDescription: "Guides for admission, visa, and student life." },
    { page: "news", metaTitle: "MBBS South Korea News", metaDescription: "Education and policy updates for aspirants." },
    { page: "articles", metaTitle: "MBBS South Korea Articles", metaDescription: "Long-form practical planning guides." },
    { page: "contact-us", metaTitle: "Contact MBBS South Korea Advisors", metaDescription: "Book counseling with India and South Korea teams." },
    { page: "scholarships", metaTitle: "MBBS Scholarships in South Korea", metaDescription: "Merit and tuition support opportunities." },
  ];
  for (const item of staticSeoPages) {
    await prisma.staticPageSeo.upsert({
      where: { page: item.page },
      update: { ...item, status: true, ogImagePath: "/og-default.jpg" },
      create: { ...item, status: true, ogImagePath: "/og-default.jpg" },
    });
  }

  for (const item of [
    "universities/[slug]",
    "blog/[categorySlug]/[blogSlug]",
    "news/[categorySlug]/[slug]",
    "articles/[categorySlug]/[slug]",
    "scholarships/[slug]",
  ]) {
    await prisma.dynamicPageSeo.upsert({
      where: { page: item },
      update: {
        page: item,
        metaTitle: "MBBS in South Korea",
        metaDescription: "Dynamic page SEO baseline for South Korea-focused content.",
        status: true,
      },
      create: {
        page: item,
        metaTitle: "MBBS in South Korea",
        metaDescription: "Dynamic page SEO baseline for South Korea-focused content.",
        status: true,
      },
    });
  }

  await upsertByWhere(prisma.defaultOgImage, { name: "South Korea Default OG" }, {
    name: "South Korea Default OG",
    imageName: "og-default.jpg",
    imagePath: "/og-default.jpg",
    status: true,
  });

  const faqCategory = await prisma.faqCategory.upsert({
    where: { slug: "homepage" },
    update: { name: "Homepage", slug: "homepage", status: true },
    create: { name: "Homepage", slug: "homepage", status: true },
  });
  await upsertByWhere(prisma.faq, { question: "Is MBBS in South Korea taught in English?" }, {
    question: "Is MBBS in South Korea taught in English?",
    answer: "Yes, most international MBBS pathways in South Korea are delivered in English.",
    categoryId: faqCategory.id,
    position: 1,
    status: true,
  });

  await upsertByWhere(prisma.office, { name: "India Head Office" }, {
    name: "India Head Office",
    address: "B-16 Ground Floor, Mayfield Garden, Sector 50",
    city: "Gurugram",
    state: "Haryana",
    country: "India",
    phone: "+91-9667-667-331",
    email: "india@mbbsinsouthkorea.com",
    mapEmbed: "https://maps.google.com/?q=Mayfield+Garden+Sector+50+Gurugram",
    imageName: "office-india.jpg",
    imagePath: "/uploads/offices/india-head-office.jpg",
    position: 1,
    status: true,
  });
  await upsertByWhere(prisma.office, { name: "South Korea Support Office" }, {
    name: "South Korea Support Office",
    address: "Gangnam-gu",
    city: "Seoul",
    state: "Seoul Special City",
    country: "South Korea",
    phone: "+82-2-3456-7890",
    email: "korea@mbbsinsouthkorea.com",
    mapEmbed: "https://maps.google.com/?q=Gangnam-gu+Seoul+South+Korea",
    imageName: "office-south-korea.jpg",
    imagePath: "/uploads/offices/south-korea-office.jpg",
    position: 2,
    status: true,
  });

  await upsertByWhere(prisma.expertTeam, { name: "Dr. Meera Nair" }, {
    name: "Dr. Meera Nair",
    designation: "Senior Admission Counselor",
    description: "Supports profile evaluation and admission planning for MBBS aspirants.",
    photoName: "dr-meera-nair.jpg",
    photoPath: "/uploads/experts/dr-meera-nair.jpg",
    position: 1,
    status: true,
  });

  const links = [
    {
      name: "World Health Organization (WHO)",
      url: "https://www.who.int",
      category: "global-health",
      position: 1,
    },
    {
      name: "National Medical Commission (NMC) - India",
      url: "https://www.nmc.org.in",
      category: "india-regulatory",
      position: 2,
    },
    {
      name: "Ministry of Health and Welfare (MOHW) - South Korea",
      url: "https://www.mohw.go.kr",
      category: "south-korea-government",
      position: 3,
    },
  ];
  for (const item of links) {
    await upsertByWhere(prisma.officialGovernmentLink, { name: item.name }, {
      ...item,
      description: "Official reference link.",
      status: true,
    });
  }

  await upsertByWhere(prisma.countryDocument, { country: "South Korea", type: CountryDocType.embassy_letter }, {
    country: "South Korea",
    type: CountryDocType.embassy_letter,
    title: "Embassy Student Letter Template",
    fileName: "embassy-student-letter.pdf",
    filePath: "/uploads/country-documents/embassy-student-letter.pdf",
    isActive: true,
  });
  await upsertByWhere(prisma.countryDocument, { country: "South Korea", type: CountryDocType.nmc_guidelines }, {
    country: "South Korea",
    type: CountryDocType.nmc_guidelines,
    title: "NMC Guidelines Reference",
    fileName: "nmc-guidelines-reference.pdf",
    filePath: "/uploads/country-documents/nmc-guidelines-reference.pdf",
    isActive: true,
  });

  await upsertByWhere(prisma.pageContent, { pageSlug: "about-us", title: "Why South Korea" }, {
    pageSlug: "about-us",
    title: "Why South Korea",
    content: "Affordable medical education, English-medium instruction, and practical hospital exposure.",
    position: 1,
    status: true,
  });

  const blogCategory = await prisma.blogCategory.upsert({
    where: { slug: "admission-guides" },
    update: { name: "Admission Guides", slug: "admission-guides", status: true },
    create: { name: "Admission Guides", slug: "admission-guides", status: true },
  });
  const blog = await upsertByWhere(prisma.blog, { slug: "mbbs-in-south-korea-admission-roadmap-2026" }, {
    categoryId: blogCategory.id,
    authorId: adminId,
    title: "MBBS in South Korea Admission Roadmap 2026",
    slug: "mbbs-in-south-korea-admission-roadmap-2026",
    shortnote: "A practical timeline from counseling to visa.",
    description: "Stepwise checklist for profile review, documents, application, and travel readiness.",
    status: true,
    homeView: true,
    trending: true,
  });
  await upsertByWhere(prisma.blogContent, { blogId: blog.id, slug: "profile-review" }, {
    blogId: blog.id,
    title: "Profile Review",
    slug: "profile-review",
    description: "Start with eligibility checks and shortlist relevant universities.",
    position: 1,
  });
  await upsertByWhere(prisma.blogFaq, { blogId: blog.id, question: "When should I start applying?" }, {
    blogId: blog.id,
    question: "When should I start applying?",
    answer: "Start planning at least 6-8 months before your target intake.",
    position: 1,
    status: true,
  });

  const newsCategory = await prisma.newsCategory.upsert({
    where: { slug: "policy-and-admissions" },
    update: { name: "Policy and Admissions", slug: "policy-and-admissions", status: true },
    create: { name: "Policy and Admissions", slug: "policy-and-admissions", status: true },
  });
  const news = await upsertByWhere(prisma.news, { slug: "south-korea-intake-advisory-2026" }, {
    categoryId: newsCategory.id,
    authorId: adminId,
    title: "South Korea Intake Advisory for 2026 Applicants",
    slug: "south-korea-intake-advisory-2026",
    description: "Applicants are advised to complete document checks early.",
    status: true,
    homeView: true,
  });
  await upsertByWhere(prisma.newsContent, { newsId: news.id, slug: "timeline-advisory" }, {
    newsId: news.id,
    title: "Timeline Advisory",
    slug: "timeline-advisory",
    description: "Begin shortlisting and application preparation before intake opens.",
    position: 1,
  });
  await upsertByWhere(prisma.newsFaq, { newsId: news.id, question: "Do all universities have the same intake schedule?" }, {
    newsId: news.id,
    question: "Do all universities have the same intake schedule?",
    answer: "No, intake windows vary by institution and must be checked individually.",
    position: 1,
    status: true,
  });

  const articleCategory = await prisma.articleCategory.upsert({
    where: { slug: "mbbs-planning" },
    update: { name: "MBBS Planning", slug: "mbbs-planning", status: true },
    create: { name: "MBBS Planning", slug: "mbbs-planning", status: true },
  });
  const article = await upsertByWhere(prisma.article, { slug: "realistic-cost-breakdown-mbbs-south-korea" }, {
    categoryId: articleCategory.id,
    authorId: adminId,
    title: "Realistic Cost Breakdown for MBBS in South Korea",
    slug: "realistic-cost-breakdown-mbbs-south-korea",
    description: "Understand tuition, living costs, and annual budget planning.",
    status: true,
    homeView: true,
  });
  await upsertByWhere(prisma.articleContent, { articleId: article.id, slug: "tuition-and-living" }, {
    articleId: article.id,
    title: "Tuition and Living",
    slug: "tuition-and-living",
    description: "Budget should include tuition, rent, food, transport, and misc costs.",
    position: 1,
  });
  await upsertByWhere(prisma.articleFaq, { articleId: article.id, question: "Is shared accommodation common?" }, {
    articleId: article.id,
    question: "Is shared accommodation common?",
    answer: "Yes, many students choose shared housing to optimize living expenses.",
    position: 1,
    status: true,
  });

  const scholarship = await prisma.scholarship.upsert({
    where: { slug: "south-korea-merit-scholarship-mbbs" },
    update: {
      title: "South Korea Merit Scholarship for MBBS",
      slug: "south-korea-merit-scholarship-mbbs",
      scholarshipType: "Merit-based",
      amountMin: 1500,
      amountMax: 4000,
      discountPercentage: 20,
      availableSeats: 40,
      program: "MBBS",
      applicationMode: "Online",
      shortnote: "Partial tuition support for qualified students.",
      isActive: true,
    },
    create: {
      title: "South Korea Merit Scholarship for MBBS",
      slug: "south-korea-merit-scholarship-mbbs",
      scholarshipType: "Merit-based",
      amountMin: 1500,
      amountMax: 4000,
      discountPercentage: 20,
      availableSeats: 40,
      program: "MBBS",
      applicationMode: "Online",
      shortnote: "Partial tuition support for qualified students.",
      isActive: true,
    },
  });
  await upsertByWhere(prisma.scholarshipFaq, { scholarshipId: scholarship.id, question: "Can I apply before final admission?" }, {
    scholarshipId: scholarship.id,
    question: "Can I apply before final admission?",
    answer: "You can initiate eligibility review, but award confirmation follows admission compliance.",
    position: 1,
    status: true,
  });

  await upsertByWhere(prisma.testimonial, { name: "Arjun Sharma", designation: "MBBS Graduate" }, {
    name: "Arjun Sharma",
    designation: "MBBS Graduate",
    description: "Smooth admission support and strong post-arrival coordination in South Korea.",
    rating: 4.8,
    position: 1,
    status: true,
  });

  await upsertByWhere(prisma.gallery, { imagePath: "/uploads/gallery/campus-orientation.jpg" }, {
    title: "Campus Orientation",
    imageName: "campus-orientation.jpg",
    imagePath: "/uploads/gallery/campus-orientation.jpg",
    position: 1,
    status: true,
  });

  await upsertByWhere(prisma.partnerInquiry, { email: "partners@globalcareerpathways.com" }, {
    name: "Global Career Pathways",
    email: "partners@globalcareerpathways.com",
    phone: "+91-98100-45678",
    company: "Global Career Pathways",
    city: "Ahmedabad",
    partnerType: "Counseling Partner",
    message: "Interested in channel partnership for MBBS counseling.",
    status: "converted",
    studentsPlaced: 180,
    experience: 7,
    rating: 4.6,
  });
}

async function seedUniversityDependentData() {
  const university = await prisma.university.findFirst({
    where: { status: true },
    orderBy: { id: "asc" },
  });

  if (!university) {
    console.log("No university records found. Skipping university-dependent supplemental tables.");
    return { universityProgramId: null as number | null };
  }

  await upsertByWhere(
    prisma.universityFaq,
    { universityId: university.id, question: "Is there clinical training in affiliated hospitals?" },
    {
      universityId: university.id,
      question: "Is there clinical training in affiliated hospitals?",
      answer: "Yes, students generally receive clinical exposure in affiliated teaching hospitals.",
      position: 1,
      status: true,
    },
  );

  await upsertByWhere(
    prisma.universityReview,
    { universityId: university.id, name: "Student Review - Batch 2025" },
    {
      universityId: university.id,
      name: "Student Review - Batch 2025",
      designation: "MBBS Student",
      description: "Strong faculty support and practical learning environment.",
      rating: 4.7,
      position: 1,
      status: true,
    },
  );

  await upsertByWhere(
    prisma.universityTestimonial,
    { universityId: university.id, name: "Parent Testimonial - 2025" },
    {
      universityId: university.id,
      name: "Parent Testimonial - 2025",
      designation: "Parent",
      description: "Transparent process and timely student support.",
      rating: 4.8,
      position: 1,
      status: true,
    },
  );

  await upsertByWhere(
    prisma.universityStudent,
    { universityId: university.id, email: "intl.batch@mbbsinsouthkorea.com" },
    {
      universityId: university.id,
      name: "International Student Cohort",
      email: "intl.batch@mbbsinsouthkorea.com",
      phone: "+82-10-5555-0101",
      country: "India",
      numberOfStudents: 120,
      course: "MBBS",
      year: "2026",
      status: true,
    },
  );

  const simulationLab = await prisma.facility.findFirst({
    where: { name: "Simulation Labs" },
    orderBy: { id: "asc" },
  });
  if (simulationLab) {
    await upsertByWhere(
      prisma.universityFacility,
      { universityId: university.id, facilityId: simulationLab.id },
      {
        universityId: university.id,
        facilityId: simulationLab.id,
        description: "Simulation-driven practical training modules for MBBS students.",
        status: true,
      },
    );
  }

  const hospital = await prisma.hospital.findFirst({
    where: { status: true },
    orderBy: { id: "asc" },
  });
  if (hospital) {
    await upsertByWhere(
      prisma.universityHospital,
      { universityId: university.id, hospitalId: hospital.id },
      {
        universityId: university.id,
        hospitalId: hospital.id,
      },
    );
  }

  const program = await prisma.universityProgram.findFirst({
    where: { universityId: university.id, isActive: true },
    orderBy: { id: "asc" },
  });

  return { universityProgramId: program?.id ?? null };
}

async function seedOptionalLeadData(adminId: number, universityProgramId: number | null) {
  if (!SHOULD_SEED_SAMPLE_LEADS) {
    console.log("Skipping sample leads. Set SEED_SAMPLE_LEADS=true to include them.");
    return;
  }

  const lead = await prisma.lead.upsert({
    where: { email: "ravi.kumar@studentmail.com" },
    update: {
      name: "Ravi Kumar",
      phone: "9876501234",
      city: "Pune",
      state: "Maharashtra",
      source: "website",
      sourcePath: "/contact-us",
      status: LeadStatus.active,
      country: "India",
      interestedProgram: "MBBS",
      neetQualificationStatus: NeetStatus.qualified,
      neetScore: 545,
      assignedTo: adminId,
      emailVerified: true,
      emailVerifiedAt: new Date(),
    },
    create: {
      name: "Ravi Kumar",
      email: "ravi.kumar@studentmail.com",
      phone: "9876501234",
      city: "Pune",
      state: "Maharashtra",
      source: "website",
      sourcePath: "/contact-us",
      status: LeadStatus.active,
      country: "India",
      interestedProgram: "MBBS",
      neetQualificationStatus: NeetStatus.qualified,
      neetScore: 545,
      assignedTo: adminId,
      emailVerified: true,
      emailVerifiedAt: new Date(),
    },
  });

  await upsertByWhere(
    prisma.studentSchool,
    { leadId: lead.id, institutionName: "St. Xavier Higher Secondary School" },
    {
      leadId: lead.id,
      levelOfEducation: "Higher Secondary",
      countryOfEducation: "India",
      institutionName: "St. Xavier Higher Secondary School",
      gradeAverage: "82%",
    },
  );

  await upsertByWhere(
    prisma.studentDocument,
    { leadId: lead.id, documentType: "passport" },
    {
      leadId: lead.id,
      documentType: "passport",
      fileName: "ravi-passport.pdf",
      filePath: "/uploads/student-documents/ravi-passport.pdf",
      isVerified: true,
    },
  );

  await upsertByWhere(
    prisma.leadInquiry,
    { leadId: lead.id, source: "website", message: "Need counseling for September intake." },
    {
      leadId: lead.id,
      universityName: "South Korea MBBS options",
      message: "Need counseling for September intake.",
      source: "website",
      status: "pending",
      agentId: adminId,
    },
  );

  if (universityProgramId) {
    await upsertByWhere(
      prisma.studentApplication,
      { leadId: lead.id, universityProgramId },
      {
        leadId: lead.id,
        universityProgramId,
        status: ApplicationStatus.applied,
        notes: "Sample dashboard application record generated by seed.",
      },
    );
  } else {
    console.log("No university program found. Skipping sample StudentApplication seed.");
  }
}

async function main() {
  console.log("Starting South Korea baseline database seed...");
  console.log(
    "University bulk-upload tables are intentionally not seeded here (University, UniversityRanking, UniversityLink, UniversityIntake, UniversityProgram, UniversityDocument, UniversityPhoto, UniversityFmgeRate).",
  );

  const admin = await seedAdminUser();
  await seedWebsiteSettings();
  await seedReferenceData();
  await seedCountryAndEducationPages();
  await seedContentAndMisc(admin.id);
  const { universityProgramId } = await seedUniversityDependentData();
  await seedOptionalLeadData(admin.id, universityProgramId);

  console.log("South Korea baseline seed completed.");
}

main()
  .catch((error) => {
    console.error("Seed failed.", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
