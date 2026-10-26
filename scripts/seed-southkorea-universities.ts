import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('🌱 Seeding 5 Top South Korean Medical Universities with Accurate Korean Coordinates...');

  const slugify = (text: string) => text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  const universities = [
    {
      name: 'Seoul National University College of Medicine (SNU)',
      uniqueId: 'KOR-SNU-001',
      city: 'Seoul',
      establishedYear: 1899,
      students: '28,000+',
      tuitionFee: '$8,500',
      globalRanking: 'Top 35 Globally (QS World University Rankings)',
      nationalRanking: '1',
      shortnote: 'South Korea’s premier national university and #1 ranked medical school with century-old clinical excellence.',
      aboutNote: 'Seoul National University College of Medicine is the nation’s foremost institution for medical education and research. Affiliated with Seoul National University Hospital (SNUH), it offers world-leading clinical rotations, robotic surgery facilities, and global medical research networks recognized by WHO and NMC.',
      tuitionFeeAnnual: '$8,500',
      courseDuration: '6 Years (2 Years Pre-Med + 4 Years Medicine)',
      mediumOfInstruction: 'English & Korean',
      eligibility: '12th Grade with PCB (60%+), NEET Qualified (for Indian students)',
      status: true,
      isFeatured: true,
      provinceId: 1, // Seoul Special City
      cityId: 1, // Seoul
      instituteTypeId: 1, // Public / National
      latitude: 37.5796,
      longitude: 126.9990,
    },
    {
      name: 'Yonsei University College of Medicine',
      uniqueId: 'KOR-YON-002',
      city: 'Seoul',
      establishedYear: 1885,
      students: '26,000+',
      tuitionFee: '$10,200',
      globalRanking: 'Top 70 Globally',
      nationalRanking: '2',
      shortnote: 'Home to Severance Hospital, Korea’s first modern hospital and a pioneer in international clinical training.',
      aboutNote: 'Yonsei University College of Medicine is one of Korea’s prestigious "SKY" universities. It operates Severance Hospital Health System, providing international medical students with exposure to world-class robotic surgery, multi-organ transplants, and international patient care centers.',
      tuitionFeeAnnual: '$10,200',
      courseDuration: '6 Years (2 Years Pre-Med + 4 Years Medicine)',
      mediumOfInstruction: 'English & Korean',
      eligibility: '12th Grade with PCB (60%+), NEET Qualified',
      status: true,
      isFeatured: true,
      provinceId: 1, // Seoul Special City
      cityId: 1, // Seoul
      instituteTypeId: 2, // Private
      latitude: 37.5623,
      longitude: 126.9408,
    },
    {
      name: 'Korea University College of Medicine',
      uniqueId: 'KOR-KOR-003',
      city: 'Seoul',
      establishedYear: 1928,
      students: '25,000+',
      tuitionFee: '$9,800',
      globalRanking: 'Top 100 Globally',
      nationalRanking: '3',
      shortnote: 'Renowned member of the SKY consortium with world-class Anam, Guro, and Ansan tertiary hospital network.',
      aboutNote: 'Korea University College of Medicine provides comprehensive clinical training across three university hospitals. It boasts a world-leading viral research center (discoverers of the Hantaan virus) and high-tech biomedical simulation hubs recognized by NMC, WHO, and ECFMG.',
      tuitionFeeAnnual: '$9,800',
      courseDuration: '6 Years',
      mediumOfInstruction: 'English & Korean',
      eligibility: '12th Grade with PCB (55%+), NEET Qualified',
      status: true,
      isFeatured: true,
      provinceId: 1, // Seoul Special City
      cityId: 1, // Seoul
      instituteTypeId: 2, // Private
      latitude: 37.5872,
      longitude: 127.0264,
    },
    {
      name: 'Pusan National University School of Medicine',
      uniqueId: 'KOR-PNU-004',
      city: 'Busan',
      establishedYear: 1953,
      students: '27,000+',
      tuitionFee: '$7,200',
      globalRanking: 'Top 500 World Universities',
      nationalRanking: 'Top Regional Flagship',
      shortnote: 'Leading national medical university located in Korea’s premier coastal city Busan, offering high ROI medical education.',
      aboutNote: 'Pusan National University School of Medicine is the foremost national medical school in southeastern Korea. It operates Pusan National University Hospital and the Yangsan Medical Campus, offering massive tertiary patient flow and clinical exposure in coastal Busan.',
      tuitionFeeAnnual: '$7,200',
      courseDuration: '6 Years',
      mediumOfInstruction: 'English & Korean',
      eligibility: '12th Grade with PCB (50%+), NEET Qualified',
      status: true,
      isFeatured: false,
      provinceId: 2, // Busan Metropolitan City
      cityId: 2, // Busan
      instituteTypeId: 1, // Public / National
      latitude: 35.1017,
      longitude: 129.0189,
    },
    {
      name: 'Kyungpook National University School of Medicine',
      uniqueId: 'KOR-KNU-005',
      city: 'Daegu',
      establishedYear: 1923,
      students: '30,000+',
      tuitionFee: '$6,900',
      globalRanking: 'Top 500 World Universities',
      nationalRanking: 'Premier Medical Hub',
      shortnote: 'Historic national medical institution located in Korea’s Medi-City Daegu with affordable tuition.',
      aboutNote: 'Kyungpook National University School of Medicine, founded in 1923, is one of Korea’s oldest medical schools. Located in Daegu, it offers cutting-edge medical centers including KNU Chilgok Hospital and an advanced clinical training center with low cost of living.',
      tuitionFeeAnnual: '$6,900',
      courseDuration: '6 Years',
      mediumOfInstruction: 'English & Korean',
      eligibility: '12th Grade with PCB (50%+), NEET Qualified',
      status: true,
      isFeatured: false,
      provinceId: 3, // Daegu Metropolitan City
      cityId: 3, // Daegu
      instituteTypeId: 1, // Public / National
      latitude: 35.8668,
      longitude: 128.6041,
    },
  ];

  // Reference IDs in the list above are hints only; resolve real IDs by name so
  // this script works whichever seed (prisma/seed.ts or comprehensive) ran first.
  const provinceNames: Record<number, string> = {
    1: 'Seoul Special City',
    2: 'Busan Metropolitan City',
    3: 'Daegu Metropolitan City',
  };

  for (const u of universities) {
    const slug = slugify(u.name);

    const province = await prisma.province.findFirst({ where: { name: provinceNames[u.provinceId] } });
    const city = await prisma.city.findFirst({ where: { name: u.city, ...(province ? { provinceId: province.id } : {}) } });
    const instituteType = await prisma.instituteType.findFirst({
      where: { name: { startsWith: u.instituteTypeId === 1 ? 'Public' : 'Private' } },
    });
    if (!province || !city || !instituteType) {
      throw new Error(`Missing reference data for ${u.name}. Run "npx prisma db seed" first.`);
    }
    const refs = { provinceId: province.id, cityId: city.id, instituteTypeId: instituteType.id };

    // 1. Create/Update University
    const university = await prisma.university.upsert({
      where: { slug },
      update: {
        name: u.name,
        uniqueId: u.uniqueId,
        city: u.city,
        establishedYear: u.establishedYear,
        students: u.students,
        tuitionFee: u.tuitionFee,
        globalRanking: u.globalRanking,
        nationalRanking: u.nationalRanking,
        shortnote: u.shortnote,
        aboutNote: u.aboutNote,
        courseDuration: u.courseDuration,
        mediumOfInstruction: u.mediumOfInstruction,
        eligibility: u.eligibility,
        status: u.status,
        isFeatured: u.isFeatured,
        provinceId: refs.provinceId,
        cityId: refs.cityId,
        instituteTypeId: refs.instituteTypeId,
        latitude: u.latitude,
        longitude: u.longitude,
      },
      create: {
        name: u.name,
        slug,
        uniqueId: u.uniqueId,
        city: u.city,
        establishedYear: u.establishedYear,
        students: u.students,
        tuitionFee: u.tuitionFee,
        globalRanking: u.globalRanking,
        nationalRanking: u.nationalRanking,
        shortnote: u.shortnote,
        aboutNote: u.aboutNote,
        courseDuration: u.courseDuration,
        mediumOfInstruction: u.mediumOfInstruction,
        eligibility: u.eligibility,
        status: u.status,
        isFeatured: u.isFeatured,
        provinceId: refs.provinceId,
        cityId: refs.cityId,
        instituteTypeId: refs.instituteTypeId,
        latitude: u.latitude,
        longitude: u.longitude,
      },
    });

    console.log(`✅ Seeded University: ${university.name} (${u.city}) [${u.latitude}, ${u.longitude}]`);
  }

  console.log('🎉 5 South Korean Universities with Real Coordinates seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding universities:', e);
    process.exit(1);
  });
