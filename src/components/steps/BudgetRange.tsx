import { motion } from"framer-motion";
import { useFormStore } from"@/store/useFormStore";
import { useForm } from"react-hook-form";
import { zodResolver } from"@hookform/resolvers/zod";
import { budgetSchema } from"@/lib/schema";
import { z } from"zod";

type BudgetData = z.infer<typeof budgetSchema>;

const budgetOptions = [
  { value:"Under $1,500"},
  { value:"$1,500–$3,500"},
  { value:"$3,500–$6,500"},
  { value:"$6,500–$10,000"},
  { value:"$10,000+"},
];

export function BudgetRange() {
  const { formData, updateData, nextStep, prevStep } = useFormStore();
  
  const { handleSubmit, setValue, watch, formState: { errors } } = useForm<BudgetData>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      budgetRange: formData.budgetRange || undefined,
    }
  });

  const selectedBudget = watch("budgetRange");

  const onSubmit = (data: BudgetData) => {
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
          Budget
        </h2>
        <p className="text-gray-600">Select a budget range for your project.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {budgetOptions.map((option) => {
            const isSelected = selectedBudget === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setValue("budgetRange", option.value as BudgetData["budgetRange"], { shouldValidate: true })}
                className={`p-6 rounded-2xl border-2 text-center transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-center h-full ${
                  isSelected 
                    ?"border-brand-maroon bg-brand-maroon/5  scale-[1.02] z-10"
                    :"border-gray-200 hover:border-brand-maroon/50  bg-white"
                }`}
              >
                <div className={`text-xl font-bold ${isSelected ?"text-brand-maroon":"text-gray-700"}`}>
                  {option.value}
                </div>
              </button>
            );
          })}
        </div>
        
        {errors.budgetRange && <p className="text-red-500 text-sm text-center font-medium mt-4">{errors.budgetRange.message}</p>}

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
