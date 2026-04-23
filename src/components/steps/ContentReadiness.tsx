import { motion, AnimatePresence } from"framer-motion";
import { useFormStore } from"@/store/useFormStore";
import { useForm } from"react-hook-form";
import { zodResolver } from"@hookform/resolvers/zod";
import { contentSchema } from"@/lib/schema";
import { z } from"zod";
import { Info } from"lucide-react";

type ContentData = z.infer<typeof contentSchema>;

const contentOptions = [
  { value:"I have content", label:"I have all my content ready"},
  { value:"Partial", label:"I have some content, but need help"},
  { value:"I need help", label:"I need complete help with content"},
];

export function ContentReadiness() {
  const { formData, updateData, nextStep, prevStep } = useFormStore();
  
  const { handleSubmit, watch, setValue, formState: { errors } } = useForm<ContentData>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      contentStatus: formData.contentStatus || undefined,
    }
  });

  const selectedStatus = watch("contentStatus");

  const onSubmit = (data: ContentData) => {
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
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-maroon mb-2">
          Do you already have the content and photography for the project?
        </h2>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col gap-4">
          {contentOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setValue("contentStatus", option.value as ContentData["contentStatus"], { shouldValidate: true })}
              className={`p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                selectedStatus === option.value 
                  ?"border-brand-maroon bg-brand-maroon/5  scale-[1.02]"
                  :"border-gray-200 hover:border-brand-maroon/50  bg-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${selectedStatus === option.value ?"border-brand-maroon bg-brand-maroon":"border-gray-300"}`}>
                  {selectedStatus === option.value && (
                    <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 text-white"fill="none"viewBox="0 0 24 24"stroke="currentColor">
                      <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={3} d="M5 13l4 4L19 7"/>
                    </motion.svg>
                  )}
                </div>
                <span className={`font-medium ${selectedStatus === option.value ?"text-brand-maroon":"text-gray-700"}`}>
                  {option.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedStatus ==="I need help"&& (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height:"auto"}}
              exit={{ opacity: 0, height: 0 }}
              className="bg-brand-maroon/10 border border-brand-maroon/20 p-4 rounded-xl flex items-start space-x-3 text-brand-maroon"
            >
              <Info className="w-5 h-5 mt-0.5 flex-shrink-0"/>
              <p className="text-sm leading-relaxed">
                <strong className="font-semibold">Good news!</strong> We offer professional photography, website text, and graphic design services to help bring your vision to life perfectly.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {errors.contentStatus && <p className="text-red-500 text-sm text-center font-medium">{errors.contentStatus.message}</p>}

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
