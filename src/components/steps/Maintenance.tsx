import { motion } from "framer-motion";
import { useFormStore } from "@/store/useFormStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { maintenanceSchema } from "@/lib/schema";
import { z } from "zod";

type MaintenanceData = z.infer<typeof maintenanceSchema>;

const plans = [
  {
    title: "Professional Care Plan",
    description: "Includes security updates, hosting, and 1 hour of monthly content edits."
  },
  {
    title: "Self-Managed",
    description: "Client handles all updates and hosting after launch."
  }
];

export function Maintenance() {
  const { formData, updateData, nextStep, prevStep } = useFormStore();
  
  const { handleSubmit, watch, setValue, formState: { errors } } = useForm<MaintenanceData>({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: {
      maintenancePlan: formData.maintenancePlan || undefined,
    }
  });

  const selectedPlan = watch("maintenancePlan");

  const onSubmit = (data: MaintenanceData) => {
    updateData(data);
    nextStep();
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="space-y-6 py-4"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-brand-maroon mb-2">
          Long-term Support
        </h2>
        <p className="text-gray-600">How would you like to handle your website after launch?</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-4">
          {plans.map((plan) => (
            <button
              key={plan.title}
              type="button"
              onClick={() => setValue("maintenancePlan", plan.title as MaintenanceData["maintenancePlan"], { shouldValidate: true })}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center justify-between ${
                selectedPlan === plan.title 
                  ? "border-brand-maroon bg-brand-maroon/5 scale-[1.02]"
                  : "border-gray-200 hover:border-brand-maroon/50 bg-white"
              }`}
            >
              <div className="pr-4">
                <span className={`block font-semibold ${selectedPlan === plan.title ? "text-brand-maroon" : "text-gray-700"}`}>
                  {plan.title}
                </span>
                <span className={`block text-sm mt-1 ${selectedPlan === plan.title ? "text-brand-maroon/80" : "text-gray-500"}`}>
                  {plan.description}
                </span>
              </div>
              <div className={`w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center ${selectedPlan === plan.title ? "border-brand-maroon" : "border-gray-300"}`}>
                {selectedPlan === plan.title && <div className="w-3 h-3 bg-brand-maroon rounded-full" />}
              </div>
            </button>
          ))}
        </div>
        
        {errors.maintenancePlan && <p className="text-red-500 text-sm text-center font-medium">{errors.maintenancePlan.message}</p>}

        <div className="flex justify-between pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-brand-maroon text-white font-semibold rounded-full hover:bg-opacity-90 transition-all shadow-md active:scale-95"
          >
            Continue
          </button>
        </div>
      </form>
    </motion.div>
  );
}
