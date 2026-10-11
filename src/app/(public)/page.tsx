import { Suspense } from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/homepage/HeroSection";
import UniversityGrid from "@/components/homepage/UniversityGrid";
import UniversityMapSection from "@/components/homepage/UniversityMapSection";
import AboutSouthKorea from "@/components/homepage/AboutSouthKorea";
import ScholarshipsSection from "@/components/homepage/ScholarshipsSection";
import EducationSystem from "@/components/homepage/EducationSystem";
import MinistryLinks from "@/components/homepage/MinistryLinks";
import CompareUniversities from "@/components/homepage/CompareUniversities";
import FmgeSection from "@/components/homepage/FmgeSection";
import HomepageFAQ from "@/components/homepage/HomepageFAQ";
import { homepageFaqs } from "@/lib/homepage-faqs";
import {
  organizationSchema,
  buildMetadata,
  faqSchema,
  APP_YEAR,
  ADMISSION_YEAR,
} from "@/lib/seo";
import { getHomepageStats, getHomepageFaqs } from "@/lib/public-page-content";

export const metadata: Promise<Metadata> = buildMetadata({
  title: `MBBS in South Korea ${APP_YEAR} | NMC Recognised Universities | Fees & Admission for Indian Students`,
  description: `Explore top NMC-recognised medical universities in South Korea. Compare fees, FMGE rates, and apply for MBBS ${APP_YEAR} admission. Free counselling for Indian students.`,
  path: "/",
  pageKey: "home",
  entitySeo: {
    metaKeyword: `MBBS in South Korea, study MBBS South Korea, medical university South Korea, NMC recognized South Korea, MBBS admission ${APP_YEAR}, low fee MBBS abroad`,
  },
});

const UniversityGridFallback = () => (
  <section className="py-8 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
          >
            <div className="h-48 bg-gray-200" />
            <div className="p-6 space-y-3">
              <div className="h-6 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-16 bg-gray-200 rounded" />
                <div className="h-16 bg-gray-200 rounded" />
              </div>
              <div className="h-10 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AdmissionProcess = () => (
  <section className="py-16 bg-[#F5F8FC]">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#002B5C]">Admission Process</h2>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative">
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-[#0047A0] -translate-y-1/2 z-0" />
        {[
          { step: "01", title: "Eligibility Assessment" },
          { step: "02", title: "University Selection" },
          { step: "03", title: "Application & Documentation" },
          { step: "04", title: "Admission Decision" },
          { step: "05", title: "Visa Guidance" },
          { step: "06", title: "Travel & Enrollment" },
        ].map((s, i) => (
          <div key={i} className="relative z-10 flex md:flex-col items-center gap-4 md:gap-2 mb-8 md:mb-0 bg-[#F5F8FC] md:px-2 group">
            <div className="w-12 h-12 rounded-full bg-[#0047A0] text-white flex items-center justify-center font-bold text-lg group-hover:bg-[#CD2E3A] transition-colors shadow-lg">
              {s.step}
            </div>
            <div className="text-[#002B5C] font-semibold md:text-center text-sm max-w-[120px]">
              {s.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const EligibilitySection = () => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#002B5C]">MBBS in South Korea – Eligibility</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {[
          { title: "Academic Requirements", desc: "10+2 or equivalent with Physics, Chemistry, and Biology." },
          { title: "Minimum Marks", desc: "At least 50% aggregate in PCB (40% for reserved categories)." },
          { title: "Age Limit", desc: "Must be 17 years old by December 31st of the admission year." },
          { title: "Language Proficiency", desc: "English proficiency. Some universities may require basic Korean language skills." },
        ].map((item, i) => (
          <div key={i} className="flex gap-4 p-6 rounded-2xl bg-[#EAF2FF] border border-[#0047A0]/20 hover:border-[#CD2E3A] transition-colors">
            <div className="w-6 h-6 rounded-full bg-[#0047A0] text-white flex items-center justify-center shrink-0 mt-1">✓</div>
            <div>
              <h3 className="font-bold text-[#002B5C] mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FeesSection = () => (
  <section className="py-16 bg-[#F5F8FC]">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#002B5C]">MBBS in South Korea Fees</h2>
        <p className="mt-4 text-gray-600">Estimated cost structure for international students.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="p-8 text-center">
            <div className="text-[#0047A0] font-semibold mb-2">Average Tuition Fee</div>
            <div className="text-3xl font-bold text-[#CD2E3A]">$5,000 - $10,000</div>
            <div className="text-sm text-gray-500 mt-1">Per Year</div>
          </div>
          <div className="p-8 text-center">
            <div className="text-[#0047A0] font-semibold mb-2">Living Expenses</div>
            <div className="text-3xl font-bold text-[#CD2E3A]">$400 - $800</div>
            <div className="text-sm text-gray-500 mt-1">Per Month</div>
          </div>
          <div className="p-8 text-center bg-[#EAF2FF]">
            <div className="text-[#002B5C] font-semibold mb-2">Total Estimated Budget</div>
            <div className="text-3xl font-bold text-[#002B5C]">Affordable</div>
            <div className="text-sm text-gray-600 mt-1">High ROI on Medical Education</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const StudentLifeSection = () => (
  <section className="py-16 bg-white overflow-hidden relative">
    <div className="absolute top-0 right-0 w-64 h-64 bg-[#EAF2FF] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFF0F2] rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#002B5C]">Experience Student Life in South Korea</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: "Modern Campus", desc: "State-of-the-art facilities and laboratories." },
          { title: "Cultural Integration", desc: "Experience the rich culture of South Korea." },
          { title: "International Community", desc: "Connect with students from across the globe." },
        ].map((item, i) => (
          <div key={i} className="bg-[#002B5C] rounded-2xl p-8 text-white relative overflow-hidden group border border-[#0047A0]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0047A0] rounded-full blur-2xl group-hover:bg-[#CD2E3A] transition-colors" />
            <h3 className="text-xl font-bold mb-3 relative z-10">{item.title}</h3>
            <p className="text-blue-100 relative z-10">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ConsultancyServicesSection = () => (
  <section className="py-16 bg-[#F5F8FC]">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#002B5C]">Our Consultancy Services</h2>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { title: "University Selection" },
          { title: "Application Assistance" },
          { title: "Documentation Guidance" },
          { title: "Admission Support" },
          { title: "Visa & Travel Guidance" },
          { title: "Post-Arrival Support" },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center group">
            <div className="w-14 h-14 bg-[#EAF2FF] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#CD2E3A] transition-colors">
              <span className="text-[#0047A0] font-bold text-xl group-hover:text-white transition-colors">{i+1}</span>
            </div>
            <h3 className="font-bold text-[#002B5C]">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CtaSection = () => (
  <section className="py-20 bg-[#002B5C] relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#0047A0] to-[#CD2E3A] rounded-full opacity-20 blur-3xl mix-blend-screen" />
    <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Start Your MBBS Journey in South Korea</h2>
      <p className="text-xl text-blue-100 mb-10">Get personalized guidance for choosing the right Korean medical university and planning your admission journey.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/apply" className="bg-[#CD2E3A] hover:bg-[#A3222C] text-white px-8 py-4 rounded-lg font-bold transition-colors">
          Get Free Counselling
        </a>
        <a href="/universities" className="bg-white hover:bg-gray-100 text-[#002B5C] px-8 py-4 rounded-lg font-bold transition-colors">
          Explore Universities
        </a>
      </div>
    </div>
  </section>
);

export default async function HomePage() {
  const [stats, faqs, visibility] = await Promise.all([
    getHomepageStats(),
    getHomepageFaqs(),
    prisma.websiteSetting
      .findUnique({ where: { key: "scholarship_visibility" } })
      .catch(() => null),
  ]);

  const showScholarship = visibility?.value !== "false";

  const jsonLd = [organizationSchema(), faqSchema(faqs)];

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Sections */}
      <HeroSection stats={stats} />
      <Suspense fallback={<UniversityGridFallback />}>
        <UniversityGrid />
      </Suspense>

      <Suspense fallback={<div className="py-16 bg-white mb-2" />}>
        <UniversityMapSection />
      </Suspense>

      <AboutSouthKorea />
      <AdmissionProcess />
      <EligibilitySection />
      <FeesSection />
      <StudentLifeSection />
      <ConsultancyServicesSection />

      <Suspense fallback={<div className="py-16 bg-gray-50" />}>
        <CompareUniversities />
      </Suspense>

      {showScholarship && (
        <Suspense fallback={<div className="py-16 bg-white" />}>
          <ScholarshipsSection stats={stats} />
        </Suspense>
      )}

      <Suspense fallback={<div className="py-16 bg-white" />}>
        <FmgeSection />
      </Suspense>
      <EducationSystem />
      <MinistryLinks />
      <HomepageFAQ dynamicFaqs={faqs} />
      <CtaSection />
    </>
  );
}
