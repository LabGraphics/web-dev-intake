import { motion } from"framer-motion";
import { useFormStore } from"@/store/useFormStore";
import { useForm } from"react-hook-form";
import { zodResolver } from"@hookform/resolvers/zod";
import { contactSchema } from"@/lib/schema";
import { z } from"zod";

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactInfo() {
  const { formData, updateData, nextStep, prevStep } = useFormStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: formData.fullName || "",
      email: formData.email || "",
      phone: formData.phone || "",
    }
  });

  const onSubmit = (data: ContactFormData) => {
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
          Contact Information
        </h2>
        <p className="text-gray-600">Please provide your details so we can reach you.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700  mb-1">Full Name</label>
          <input
            {...register("fullName")}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-maroon focus:border-transparent outline-none transition-all text-slate-900 placeholder-slate-400"
            placeholder="Jane Doe"
          />
          {errors.fullName && <p className="text-brand-maroon text-sm mt-1">{errors.fullName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700  mb-1">Email Address</label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-maroon focus:border-transparent outline-none transition-all text-slate-900 placeholder-slate-400"
            placeholder="jane@example.com"
          />
          {errors.email && <p className="text-brand-maroon text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700  mb-1">Phone Number</label>
          <input
            {...register("phone")}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-maroon focus:border-transparent outline-none transition-all text-slate-900 placeholder-slate-400"
            placeholder="(555) 123-4567"
          />
          {errors.phone && <p className="text-brand-maroon text-sm mt-1">{errors.phone.message}</p>}
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
