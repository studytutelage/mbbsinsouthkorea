import { prisma } from '../src/lib/prisma';
import * as bcrypt from 'bcryptjs';

async function main() {
  console.log('🌱 Starting Comprehensive South Korea Seeding...');

  // 1. Initialize Admin User
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error(
      'ADMIN_EMAIL and ADMIN_PASSWORD must be defined in your .env file'
    );
  }

  const hashedPassword = await bcrypt.hash(adminPassword as string, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: 'Super Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      status: true,
    },
  });
  console.log(`✅ Admin initialized: ${admin.email}`);

  // 2. Seed Institute Types
  const instituteTypes = ['Public / National', 'Private', 'Specialized Medical Institute'];
  for (const name of instituteTypes) {
    await prisma.instituteType.upsert({
      where: { id: instituteTypes.indexOf(name) + 1 },
      update: { name },
      create: { name },
    });
  }
  console.log('✅ Institute types seeded.');

  // 3. Seed Provinces / Special Metropolitan Cities of South Korea
  const provinces = [
    'Seoul Special City',
    'Busan Metropolitan City',
    'Daegu Metropolitan City',
    'Incheon Metropolitan City',
    'Gwangju Metropolitan City',
    'Daejeon Metropolitan City',
    'Gyeonggi Province',
    'Gangwon Province',
    'Jeju Special Self-Governing Province',
  ];

  for (const name of provinces) {
    await prisma.province.upsert({
      where: { id: provinces.indexOf(name) + 1 },
      update: { name },
      create: { name },
    });
  }
  console.log('✅ Provinces seeded.');

  // 4. Seed Cities
  const cities = [
    { name: 'Seoul', provinceId: 1 },
    { name: 'Busan', provinceId: 2 },
    { name: 'Daegu', provinceId: 3 },
    { name: 'Incheon', provinceId: 4 },
    { name: 'Gwangju', provinceId: 5 },
    { name: 'Daejeon', provinceId: 6 },
    { name: 'Suwon', provinceId: 7 },
    { name: 'Seongnam', provinceId: 7 },
    { name: 'Goyang', provinceId: 7 },
    { name: 'Wonju', provinceId: 8 },
    { name: 'Chuncheon', provinceId: 8 },
    { name: 'Jeju City', provinceId: 9 },
  ];

  for (const [index, city] of cities.entries()) {
    await prisma.city.upsert({
      where: { id: index + 1 },
      update: { name: city.name, provinceId: city.provinceId },
      create: { name: city.name, provinceId: city.provinceId },
    });
  }
  console.log('✅ Cities seeded.');

  // 5. Seed About Country Page
  const aboutSouthKorea = await prisma.aboutCountryPage.upsert({
    where: { id: 1 },
    update: {
      name: 'South Korea',
      tagline: 'World-Class Medical Education in the Heart of East Asia',
      capital: 'Seoul',
      population: '51.7 Million+',
      languages: 'Korean, English (Academic)',
      currency: 'KRW',
      location: 'East Asia, Korean Peninsula',
      timezone: 'UTC+9 (KST)',
      independenceDay: new Date('1945-08-15'),
      highestPeak: 'Hallasan',
      highestPeakHeight: '1,947 m',
      whoRecognized: true,
      mbbsAffordableEducation: 'World-leading healthcare infrastructure, precision medicine, and NMC/WHO recognized medical programs.',
      englishMedium: true,
      academicExcellence: 'South Korea boasts top 100 global universities equipped with cutting-edge robotic surgery and advanced simulation laboratories.',
      studentLife: 'Ultra-safe, vibrant, and technologically advanced living environment with high-speed bullet trains and international student hostels.',
      visaConnectivity: 'Fast D-2 student visa processing backed by official university admission certificates and direct global flights.',
      publicHealthcare: 'World-renowned National Health Insurance System (NHIS) providing comprehensive healthcare coverage for international students.',
      tourismGrowth: 'Globally celebrated cultural destination with iconic royal palaces, modern skylines, and pristine subtropical islands.',
    },
    create: {
      id: 1,
      name: 'South Korea',
      tagline: 'World-Class Medical Education in the Heart of East Asia',
      capital: 'Seoul',
      population: '51.7 Million+',
      languages: 'Korean, English (Academic)',
      currency: 'KRW',
      location: 'East Asia, Korean Peninsula',
      timezone: 'UTC+9 (KST)',
      independenceDay: new Date('1945-08-15'),
      highestPeak: 'Hallasan',
      highestPeakHeight: '1,947 m',
      whoRecognized: true,
      mbbsAffordableEducation: 'World-leading healthcare infrastructure, precision medicine, and NMC/WHO recognized medical programs.',
      englishMedium: true,
      academicExcellence: 'South Korea boasts top 100 global universities equipped with cutting-edge robotic surgery and advanced simulation laboratories.',
      studentLife: 'Ultra-safe, vibrant, and technologically advanced living environment with high-speed bullet trains and international student hostels.',
      visaConnectivity: 'Fast D-2 student visa processing backed by official university admission certificates and direct global flights.',
      publicHealthcare: 'World-renowned National Health Insurance System (NHIS) providing comprehensive healthcare coverage for international students.',
      tourismGrowth: 'Globally celebrated cultural destination with iconic royal palaces, modern skylines, and pristine subtropical islands.',
    },
  });

  // Seed Major Cities in About Country
  const majorCitiesAbout = [
    { cityName: 'Seoul', description: 'The bustling capital and medical education hub featuring SNU, Yonsei, and major tertiary hospitals.', population: '9.7 Million+' },
    { cityName: 'Busan', description: 'South Korea’s premier coastal metropolis and second-largest city, home to Pusan National University.', population: '3.4 Million+' },
    { cityName: 'Daegu', description: 'Korea’s dedicated Medi-City hub renowned for biomedical research and specialized teaching centers.', population: '2.4 Million+' },
  ];

  for (const city of majorCitiesAbout) {
    await prisma.countryMajorCity.upsert({
      where: { id: majorCitiesAbout.indexOf(city) + 1 },
      update: { ...city, pageId: aboutSouthKorea.id },
      create: { ...city, pageId: aboutSouthKorea.id },
    });
  }

  // Seed Cuisines
  const cuisines = [
    { dishName: 'Kimchi', dishDescription: 'Korea’s iconic traditional fermented side dish packed with essential probiotics and vitamins.' },
    { dishName: 'Bibimbap', dishDescription: 'Nutritious bowl of warm white rice topped with seasoned namul vegetables, egg, and gochujang.' },
    { dishName: 'Bulgogi', dishDescription: 'Thin marinated slices of prime beef grilled to perfection in sweet soy, garlic, and sesame.' },
  ];

  for (const cuisine of cuisines) {
    await prisma.countryCuisineLifestyle.upsert({
      where: { id: cuisines.indexOf(cuisine) + 1 },
      update: { ...cuisine, pageId: aboutSouthKorea.id },
      create: { ...cuisine, pageId: aboutSouthKorea.id },
    });
  }

  // Seed Attractions
  const attractions = [
    { attractionName: 'Gyeongbokgung Palace', description: 'The grand royal palace of the Joseon Dynasty set against Seoul’s majestic mountains.' },
    { attractionName: 'N Seoul Tower', description: 'Iconic panoramic communication and observation tower offering 360-degree views of Seoul.' },
    { attractionName: 'Jeju Island & Hallasan', description: 'UNESCO World Natural Heritage volcanic island featuring Korea’s highest shield volcano.' },
  ];

  for (const attraction of attractions) {
    await prisma.countryTouristAttraction.upsert({
      where: { id: attractions.indexOf(attraction) + 1 },
      update: { ...attraction, pageId: aboutSouthKorea.id },
      create: { ...attraction, pageId: aboutSouthKorea.id },
    });
  }

  // Seed Lifestyles/Culture
  const lifestyles = [
    { title: 'World-Class Safety', description: 'Consistently ranked among the top 3 safest nations worldwide with 24/7 safe public transport.' },
    { title: 'High-Tech Innovation', description: 'Seamless 5G connectivity, smart digital campus libraries, and automated public services.' },
    { title: 'Vibrant Student Community', description: 'Active international student unions, dynamic K-culture, and scenic outdoor hiking trails.' },
  ];

  for (const lifestyle of lifestyles) {
    await prisma.countryLifestyleCulture.upsert({
      where: { id: lifestyles.indexOf(lifestyle) + 1 },
      update: { ...lifestyle, pageId: aboutSouthKorea.id },
      create: { ...lifestyle, pageId: aboutSouthKorea.id },
    });
  }
  console.log('✅ About South Korea content seeded.');

  // 6. Seed Education System
  const eduSystem = await prisma.educationSystem.upsert({
    where: { id: 1 },
    update: {
      title: 'Education System in South Korea',
      description: 'The South Korean medical education framework follows rigorous international standards aligned with WHO, NMC, and global medical licensing councils.',
      introductionTitle: 'A Global Benchmark in Medical Training',
      introductionDescription: 'South Korea provides world-class higher education with state-of-the-art clinical simulation, hospital rotations, and biomedical research.',
      literacyRate: 98.8,
      higherEducationDescription: 'The higher education sector includes prestigious national universities and top private medical schools offering globally recognized MBBS/MD degrees.',
      universitiesCount: 40,
      universitiesNote: 'Including 40 accredited medical schools and world-ranked university teaching hospitals.',
      officialLanguage: 'Korean',
      officialLanguageNote: 'Primary language with extensive English-medium international tracks in medical colleges.',
      foreignLanguage: 'English',
      foreignLanguageNote: 'Widely used in medical textbooks, international research journals, and campus lectures.',
    },
    create: {
      id: 1,
      title: 'Education System in South Korea',
      description: 'The South Korean medical education framework follows rigorous international standards aligned with WHO, NMC, and global medical licensing councils.',
      introductionTitle: 'A Global Benchmark in Medical Training',
      introductionDescription: 'South Korea provides world-class higher education with state-of-the-art clinical simulation, hospital rotations, and biomedical research.',
      literacyRate: 98.8,
      higherEducationDescription: 'The higher education sector includes prestigious national universities and top private medical schools offering globally recognized MBBS/MD degrees.',
      universitiesCount: 40,
      universitiesNote: 'Including 40 accredited medical schools and world-ranked university teaching hospitals.',
      officialLanguage: 'Korean',
      officialLanguageNote: 'Primary language with extensive English-medium international tracks in medical colleges.',
      foreignLanguage: 'English',
      foreignLanguageNote: 'Widely used in medical textbooks, international research journals, and campus lectures.',
    },
  });

  // Seed School Levels
  const schoolLevels = [
    { level: 'Pre-Medicine (Uiye-gwa)', ageRange: '18-20', durationYears: 2, title: 'Pre-Medical Science & Foundational Biology / Chemistry' },
    { level: 'Medicine (Bong-gwa)', ageRange: '20-24', durationYears: 4, title: 'Medical Sciences, Pathology, Pharmacology & Clinical Clerkship' },
    { level: 'Clinical Internship', ageRange: '24+', durationYears: 1, title: 'Hospital-based Rotating Internship & Licensure Preparation' },
  ];

  for (const level of schoolLevels) {
    await prisma.educationSchoolLevel.upsert({
      where: { id: schoolLevels.indexOf(level) + 1 },
      update: { ...level, pageId: eduSystem.id },
      create: { ...level, pageId: eduSystem.id },
    });
  }

  // Seed Degrees
  const degrees = [
    { degree: 'MD / MBBS General Medicine', duration: '6 Years', recognition: 'Recognized by NMC (India), WHO (WDOMS), ECFMG (USA), and GMC (UK)' },
    { degree: 'Doctor of Dental Surgery (DDS)', duration: '6 Years', recognition: 'Global Dental Council Accreditation' },
    { degree: 'Biomedical Science (BS/MS)', duration: '4-6 Years', recognition: 'Leading Biotech & Clinical Research Programs' },
  ];

  for (const deg of degrees) {
    await prisma.educationDegree.upsert({
      where: { id: degrees.indexOf(deg) + 1 },
      update: { ...deg, pageId: eduSystem.id },
      create: { ...deg, pageId: eduSystem.id },
    });
  }

  // Seed Popular Fields
  const fields = [
    { field: 'General Medicine & Surgery', description: 'Core MBBS/MD program with extensive clinical immersion in tertiary university hospitals.', durationYears: '6 Years', numberOfInstitutions: '40 Medical Colleges' },
    { field: 'Robotic & Precision Surgery', description: 'Specialized elective tracks utilizing Da Vinci robotic surgical systems and simulation centers.', durationYears: 'Specialization Track', numberOfInstitutions: 'Top University Hospitals' },
    { field: 'Biomedical Technology', description: 'Advanced training in genomics, immunology, and regenerative medicine.', durationYears: '4-6 Years', numberOfInstitutions: 'Leading Research Centers' },
  ];

  for (const field of fields) {
    await prisma.educationPopularField.upsert({
      where: { id: fields.indexOf(field) + 1 },
      update: { ...field, pageId: eduSystem.id },
      create: { ...field, pageId: eduSystem.id },
    });
  }

  console.log('✅ Education system content seeded.');
  console.log('🎉 Comprehensive South Korea Seeding Finished Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  });
