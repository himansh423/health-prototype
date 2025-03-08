import AIFinancingSection from "@/components/AIFinancingSection";
import BundledPackagesSection from "@/components/BundledPackagesSection";
import GenerateQRSection from "@/components/GenerateQRSection";
import GovernmentIntegrationSection from "@/components/GovernmentIntegrationSection";
import HealthOutcomesSection from "@/components/HealthOutcomeSection";
import HeroSection from "@/components/HeroSection";
import HospitalAndClinicSection from "@/components/HospitalAndClinicSection";
import MedicineSection from "@/components/MedicineSection";
import PersonlizedRecommendations from "@/components/PersonalizedRecommedation";
import ReviewSection from "@/components/ReviewSection";
import RuralAccessibilitySection from "@/components/RuralAccessibilitySection";
import SubscriptionSection from "@/components/SubscriptionSection";

const page = () => {
  return (
    <div>
      <HeroSection />
      <PersonlizedRecommendations/>
      <AIFinancingSection />
      <BundledPackagesSection />
      <HospitalAndClinicSection />
      <MedicineSection />
      <GenerateQRSection />
      <GovernmentIntegrationSection />
      <HealthOutcomesSection />
      <RuralAccessibilitySection />
      <SubscriptionSection />
      <ReviewSection />
    </div>
  );
};

export default page;
