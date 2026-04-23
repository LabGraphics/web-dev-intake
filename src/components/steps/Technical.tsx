import { motion } from"framer-motion";
import { useFormStore } from"@/store/useFormStore";
import { useForm } from"react-hook-form";
import { zodResolver } from"@hookform/resolvers/zod";
import { technicalSchema } from"@/lib/schema";
import { z } from"zod";

type TechnicalData = z.infer<typeof technicalSchema>;

const logoOptions = ["Yes, I have one","No, I need one","I need a redesign"];

export function Technical() {
  const { formData, updateData, nextStep, prevStep } = useFormStore();
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<TechnicalData>({
    resolver: zodResolver(technicalSchema),
    defaultValues: {
      hasLogo: formData.hasLogo || undefined,
      hostingProvider: formData.hostingProvider ||"",
      colorPreference: formData.colorPreference ||"",
      fontPreference: formData.fontPreference ||"",
    }
  });

  const selectedLogo = watch("hasLogo");

  const onSubmit = (data: TechnicalData) => {
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
          Technical & Branding Details
        </h2>
        <p className="text-gray-600">Tell us about your brand assets and technical preferences.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700  mb-3">Do you currently have a logo?</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {logoOptions.map((option) => {
              const isSelected = selectedLogo === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setValue("hasLogo", option as TechnicalData["hasLogo"], { shouldValidate: true })}
                  className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                    isSelected 
                      ?"border-brand-maroon bg-brand-maroon/5  text-brand-maroon"
                      :"border-gray-200 hover:border-brand-maroon/50  text-gray-700  bg-white"
                  }`}
                >
                  <span className="font-medium">{option}</span>
                </button>
              );
            })}
          </div>
          {errors.hasLogo && <p className="text-red-500 text-sm mt-2">{errors.hasLogo.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700  mb-1">Hosting Provider Name (Optional)</label>
          <input
            {...register("hostingProvider")}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-maroon focus:border-transparent outline-none transition-all text-slate-900 placeholder-slate-400"
            placeholder="e.g., GoDaddy, Bluehost"
          />
          {errors.hostingProvider && <p className="text-red-500 text-sm mt-1">{errors.hostingProvider.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700  mb-1">Color Preference (Optional)</label>
          <input
            {...register("colorPreference")}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-maroon focus:border-transparent outline-none transition-all text-slate-900 placeholder-slate-400"
            placeholder="e.g., Deep Maroon and Gold"
          />
          {errors.colorPreference && <p className="text-red-500 text-sm mt-1">{errors.colorPreference.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700  mb-1">Font Preference (Optional)</label>
          <input
            {...register("fontPreference")}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-maroon focus:border-transparent outline-none transition-all text-slate-900 placeholder-slate-400"
            placeholder="e.g., Modern, Serif, Inter"
          />
          {errors.fontPreference && <p className="text-red-500 text-sm mt-1">{errors.fontPreference.message}</p>}
        </div>

        <div className="flex justify-between pt-6">
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
