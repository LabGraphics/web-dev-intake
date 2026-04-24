import { motion } from"framer-motion";
import { useFormStore } from"@/store/useFormStore";
import { useForm } from"react-hook-form";
import { zodResolver } from"@hookform/resolvers/zod";
import { pagesSchema } from"@/lib/schema";
import { z } from"zod";

type PagesData = z.infer<typeof pagesSchema>;

const pagesList = [
  "Home Page", 
  "About Us", 
  "Services/Products", 
  "Blog/News", 
  "Portfolio/Gallery", 
  "Contact Page", 
  "Custom Landing Page"
];

export function Pages() {
  const { formData, updateData, nextStep, prevStep } = useFormStore();
  
  const { handleSubmit, setValue, watch } = useForm<PagesData>({
    resolver: zodResolver(pagesSchema),
    defaultValues: {
      pages: formData.pages || [],
    }
  });

  const selectedPages = watch("pages");

  const togglePage = (page: string) => {
    if (selectedPages.includes(page)) {
      setValue("pages", selectedPages.filter(p => p !== page));
    } else {
      setValue("pages", [...selectedPages, page]);
    }
  };

  const onSubmit = (data: PagesData) => {
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
          Which pages do you need?
        </h2>
        <p className="text-gray-600">Select all the pages you anticipate needing for your project.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2 pb-4 custom-scrollbar">
          {pagesList.map((page) => {
            const isSelected = selectedPages.includes(page);
            return (
              <button
                key={page}
                type="button"
                onClick={() => togglePage(page)}
                className={`p-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 text-left ${
                  isSelected 
                    ?"border-brand-maroon bg-brand-maroon/10  text-brand-maroon"
                    :"border-gray-200 hover:border-brand-maroon/30  text-gray-700  bg-white"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${isSelected ?"border-brand-maroon bg-brand-maroon":"border-gray-300"}`}>
                    {isSelected && (
                      <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2.5 h-2.5 text-white"fill="none"viewBox="0 0 24 24"stroke="currentColor">
                        <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={3} d="M5 13l4 4L19 7"/>
                      </motion.svg>
                    )}
                  </div>
                  <span className="truncate">{page}</span>
                </div>
              </button>
            );
          })}
        </div>
        
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
            Next
          </button>
        </div>
      </form>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e5e7eb;
          border-radius: 20px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #374151;
        }
      `}} />
    </motion.div>
  );
}
