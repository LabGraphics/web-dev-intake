import { motion } from"framer-motion";
import { useFormStore } from"@/store/useFormStore";
import { useForm } from"react-hook-form";
import { zodResolver } from"@hookform/resolvers/zod";
import { addonsSchema } from"@/lib/schema";
import { z } from"zod";
import { Check } from"lucide-react";
import { useEffect } from"react";

type AddonsData = z.infer<typeof addonsSchema>;

const addonOptions = [
  "Posters",
  "Social Media Covers",
  "Business Cards",
  "Banners",
  "Apparel Printing",
  "Video/Image Editing",
  "Printing Services",
  "Graphic Design"
];

export function ServiceAddons() {
  const { formData, updateData, nextStep, prevStep } = useFormStore();
  
  const { handleSubmit, watch, setValue, formState: { errors } } = useForm<AddonsData>({
    resolver: zodResolver(addonsSchema),
    defaultValues: {
      serviceAddons: formData.serviceAddons || [],
    }
  });

  const selectedAddons = watch("serviceAddons");

  const toggleAddon = (addon: string) => {
    const isSelected = selectedAddons.includes(addon);
    if (isSelected) {
      setValue("serviceAddons", selectedAddons.filter(a => a !== addon), { shouldValidate: true });
    } else {
      setValue("serviceAddons", [...selectedAddons, addon], { shouldValidate: true });
    }
  };

  const onSubmit = (data: AddonsData) => {
    updateData(data);
    nextStep();
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.4, ease:"easeInOut"}}
      className="space-y-6 py-4"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-brand-maroon  mb-2">
          Do you need other services?
        </h2>
        <p className="text-gray-600">
          Select any additional design or printing services you may need.
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addonOptions.map((addon) => {
            const isSelected = selectedAddons.includes(addon);
            
            return (
              <button
                key={addon}
                type="button"
                onClick={() => toggleAddon(addon)}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center justify-between group ${
                  isSelected 
                    ?"border-brand-maroon bg-brand-maroon/5"
                    :"border-gray-200 hover:border-brand-maroon/50  bg-white"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected 
                      ?"border-brand-maroon bg-brand-maroon"
                      :"border-gray-300"
                  }`}>
                    {isSelected && <Check className="w-4 h-4 text-white"strokeWidth={3} />}
                  </div>
                  <span className={`font-semibold ${isSelected ?"text-brand-maroon":"text-gray-700"}`}>
                    {addon}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        
        {errors.serviceAddons && <p className="text-red-500 text-sm text-center font-medium">{errors.serviceAddons.message}</p>}

        <div className="flex justify-between pt-8">
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
            Next
          </button>
        </div>
      </form>
    </motion.div>
  );
}
