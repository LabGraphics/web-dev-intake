"use client";

import { useFormStore } from"@/store/useFormStore";
import Welcome from"./steps/Welcome";
import { ContactInfo } from"./steps/ContactInfo";
import { BusinessDetails } from"./steps/BusinessDetails";
import { BudgetRange } from"./steps/BudgetRange";
import { PrimaryGoal } from"./steps/PrimaryGoal";
import { TargetAudience } from"./steps/TargetAudience";
import { ContentReadiness } from"./steps/ContentReadiness";
import { Pages } from"./steps/Pages";
import { Features } from"./steps/Features";
import { Technical } from"./steps/Technical";
import { ServiceAddons } from"./steps/ServiceAddons";
import { Summary } from"./steps/Summary";
import { Success } from"./steps/Success";
import { AnimatePresence } from"framer-motion";

export function StepRenderer() {
  const currentStep = useFormStore((state) => state.currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Welcome key="step-1"/>;
      case 2:
        return <ContactInfo key="step-2"/>;
      case 3:
        return <BusinessDetails key="step-3"/>;
      case 4:
        return <BudgetRange key="step-4"/>;
      case 5:
        return <PrimaryGoal key="step-5"/>;
      case 6:
        return <TargetAudience key="step-6"/>;
      case 7:
        return <ContentReadiness key="step-7"/>;
      case 8:
        return <Pages key="step-8"/>;
      case 9:
        return <Features key="step-9"/>;
      case 10:
        return <Technical key="step-10"/>;
      case 11:
        return <ServiceAddons key="step-11"/>;
      case 12:
        return <Summary key="step-12"/>;
      case 13:
        return <Success key="step-13"/>;
      default:
        return (
          <div key="default"className="py-16 text-center">
            <h2 className="text-2xl font-bold text-brand-maroon">More steps coming soon...</h2>
            <button 
              onClick={() => useFormStore.getState().setStep(1)}
              className="mt-6 px-6 py-2 bg-brand-maroon text-white rounded-full"
            >
              Restart
            </button>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden relative min-h-[500px] flex flex-col justify-center">
      
      {/* Global Header */}
      <div className="flex flex-col items-center justify-center pt-8 pb-4 border-b border-gray-200 w-full">
        <img src="/Logo.svg" alt="LAB GRAPHICS Logo" className="h-12 mx-auto object-contain" />
        <div className="mt-1 text-sm font-bold tracking-widest text-[#999999] uppercase">
          LAB GRAPHICS
        </div>
      </div>

      {/* Progress indicator */}
      {currentStep > 1 && currentStep < 13 && (
        <div className="absolute top-8 left-0 right-0 px-8 flex items-center justify-center space-x-1 sm:space-x-1.5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((step) => (
            <div 
              key={step} 
              className={`h-2 rounded-full transition-all duration-300 ${
                step < currentStep ?"w-4 sm:w-6 bg-brand-maroon": 
                step === currentStep ?"w-6 sm:w-10 bg-brand-maroon":"w-4 sm:w-6 bg-gray-200"
              }`} 
            />
          ))}
        </div>
      )}

      <div className="pt-6 relative w-full">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </div>
  );
}
