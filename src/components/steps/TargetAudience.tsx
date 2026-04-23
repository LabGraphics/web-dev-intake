import { motion } from"framer-motion";
import { useFormStore } from"@/store/useFormStore";
import { useForm } from"react-hook-form";
import { zodResolver } from"@hookform/resolvers/zod";
import { audienceSchema } from"@/lib/schema";
import { z } from"zod";

type AudienceData = z.infer<typeof audienceSchema>;

export function TargetAudience() {
  const { formData, updateData, nextStep, prevStep } = useFormStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm<AudienceData>({
    resolver: zodResolver(audienceSchema),
    defaultValues: {
      targetAudience: formData.targetAudience ||"",
    }
  });

  const onSubmit = (data: AudienceData) => {
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
          Target Audience
        </h2>
        <p className="text-gray-600">Who are you trying to reach with this project?</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <textarea
            {...register("targetAudience")}
            rows={6}
            placeholder="Describe your ideal customer or audience..."
            className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-maroon focus:border-transparent outline-none transition-all    resize-none text-lg leading-relaxed shadow-sm hover:shadow-md focus:shadow-md"
          />
          {errors.targetAudience && <p className="text-red-500 text-sm mt-2 ml-2">{errors.targetAudience.message}</p>}
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
            Continue
          </button>
        </div>
      </form>
    </motion.div>
  );
}
