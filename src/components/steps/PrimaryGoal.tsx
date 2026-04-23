import { motion } from"framer-motion";
import { useFormStore } from"@/store/useFormStore";
import { useForm } from"react-hook-form";
import { zodResolver } from"@hookform/resolvers/zod";
import { goalSchema } from"@/lib/schema";
import { z } from"zod";

type GoalData = z.infer<typeof goalSchema>;

const goals = [
  "Launch a New Business Website",
  "Redesign or Refresh Existing Site",
  "Drive Sales & E-commerce",
  "Organization or Membership Portal",
  "Digital Portfolio or Event Site"
];

export function PrimaryGoal() {
  const { formData, updateData, nextStep, prevStep } = useFormStore();
  
  const { handleSubmit, watch, setValue, formState: { errors } } = useForm<GoalData>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      primaryGoal: formData.primaryGoal || undefined,
    }
  });

  const selectedGoal = watch("primaryGoal");

  const onSubmit = (data: GoalData) => {
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
          Primary Goal
        </h2>
        <p className="text-gray-600">What is the main objective of your project?</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-4">
          {goals.map((goal) => (
            <button
              key={goal}
              type="button"
              onClick={() => setValue("primaryGoal", goal as GoalData["primaryGoal"], { shouldValidate: true })}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center justify-between ${
                selectedGoal === goal 
                  ?"border-brand-maroon bg-brand-maroon/5  scale-[1.02]"
                  :"border-gray-200 hover:border-brand-maroon/50  bg-white"
              }`}
            >
              <span className={`font-semibold ${selectedGoal === goal ?"text-brand-maroon":"text-gray-700"}`}>
                {goal}
              </span>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedGoal === goal ?"border-brand-maroon":"border-gray-300"}`}>
                {selectedGoal === goal && <div className="w-3 h-3 bg-brand-maroon rounded-full"/>}
              </div>
            </button>
          ))}
        </div>
        
        {errors.primaryGoal && <p className="text-red-500 text-sm text-center font-medium">{errors.primaryGoal.message}</p>}

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
