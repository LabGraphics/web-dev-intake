import { motion } from"framer-motion";
import { useFormStore } from"@/store/useFormStore";
import { useForm } from"react-hook-form";
import { zodResolver } from"@hookform/resolvers/zod";
import { businessDetailsSchema } from"@/lib/schema";
import { z } from"zod";

type BusinessFormData = z.infer<typeof businessDetailsSchema>;

export function BusinessDetails() {
  const { formData, updateData, nextStep, prevStep } = useFormStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm<BusinessFormData>({
    resolver: zodResolver(businessDetailsSchema),
    defaultValues: {
      businessName: formData.businessName ||"",
      businessDescription: formData.businessDescription ||"",
      currentWebsite: formData.currentWebsite ||"",
    }
  });

  const onSubmit = (data: BusinessFormData) => {
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
          Business Details
        </h2>
        <p className="text-gray-600">Tell us a bit about your business and your current online presence.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700  mb-1">Name of your Business or Organization</label>
          <input
            {...register("businessName")}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-maroon focus:border-transparent outline-none transition-all text-slate-900 placeholder-slate-400"
            placeholder="Acme Corp"
          />
          {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700  mb-1">Description of Business</label>
          <textarea
            {...register("businessDescription")}
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-maroon focus:border-transparent outline-none transition-all resize-none text-slate-900 placeholder-slate-400"
            placeholder="We provide..."
          />
          {errors.businessDescription && <p className="text-red-500 text-sm mt-1">{errors.businessDescription.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700  mb-1">Current Website URL (Optional)</label>
          <input
            {...register("currentWebsite")}
            type="url"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-maroon focus:border-transparent outline-none transition-all text-slate-900 placeholder-slate-400"
            placeholder="https://yourwebsite.com"
          />
          {errors.currentWebsite && <p className="text-red-500 text-sm mt-1">{errors.currentWebsite.message}</p>}
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
