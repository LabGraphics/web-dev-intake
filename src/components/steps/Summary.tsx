import { useState } from "react";
import { motion } from "framer-motion";
import { useFormStore } from "@/store/useFormStore";
import { Edit2 } from "lucide-react";

export function Summary() {
  const { formData, updateData, nextStep, prevStep, setStep } = useFormStore();

  const [contactPreference, setContactPreference] = useState(formData.contactPreference || "Email");
  const [preferredDate, setPreferredDate] = useState(formData.preferredDate || "");
  const [preferredTime, setPreferredTime] = useState(formData.preferredTime || "");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEdit = (stepNumber: number) => {
    setStep(stepNumber);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    const finalData = { ...formData, contactPreference, preferredDate, preferredTime };
    updateData({ contactPreference, preferredDate, preferredTime });
    
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });
    } catch (error) {
      console.error('Submission failed', error);
    } finally {
      setIsSubmitting(false);
      nextStep();
    }
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
          Project Summary
        </h2>
        <p className="text-gray-600">Review your intake details before we proceed.</p>
      </div>

      <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
        {/* Contact Info (Step 2) */}
        <section className="bg-gray-50 p-5 rounded-2xl border border-gray-100 relative group">
          <button onClick={() => handleEdit(2)} className="absolute top-5 right-5 text-gray-500 hover:text-brand-maroon transition-colors">
            <Edit2 className="w-4 h-4"/>
          </button>
          <h3 className="text-sm font-bold uppercase text-brand-maroon tracking-wider mb-4">Contact Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-black font-semibold block">Name:</span> <span className="text-black font-medium">{formData.fullName || '—'}</span></div>
            <div><span className="text-black font-semibold block">Email:</span> <span className="text-black font-medium">{formData.email || '—'}</span></div>
            <div className="col-span-2"><span className="text-black font-semibold block">Phone:</span> <span className="text-black font-medium">{formData.phone || '—'}</span></div>
          </div>
        </section>

        {/* Business Details & Scope (Steps 3, 4, 5, 6) */}
        <section className="bg-gray-50 p-5 rounded-2xl border border-gray-100 relative group">
          <button onClick={() => handleEdit(3)} className="absolute top-5 right-5 text-gray-500 hover:text-brand-maroon transition-colors">
            <Edit2 className="w-4 h-4"/>
          </button>
          <h3 className="text-sm font-bold uppercase text-brand-maroon tracking-wider mb-4">Business & Scope</h3>
          <div className="space-y-3 text-sm">
            <div><span className="text-black font-semibold block">Name of your Business or Organization:</span> <span className="text-black font-medium">{formData.businessName || '—'}</span></div>
            <div><span className="text-black font-semibold block">Description:</span> <span className="text-black font-medium">{formData.businessDescription || '—'}</span></div>
            <div><span className="text-black font-semibold block">Current Website:</span> <span className="text-black font-medium">{formData.currentWebsite || '—'}</span></div>
            <div className="flex justify-between items-center pt-2">
              <div><span className="text-black font-semibold block">Goal:</span> <span className="text-black font-medium">{formData.primaryGoal || '—'}</span></div>
              <button onClick={() => handleEdit(5)} className="text-gray-500 hover:text-brand-maroon"><Edit2 className="w-3.5 h-3.5"/></button>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <div><span className="text-black font-semibold block">Budget:</span> <span className="font-bold text-brand-maroon">{formData.budgetRange || '—'}</span></div>
              <button onClick={() => handleEdit(4)} className="text-gray-500 hover:text-brand-maroon"><Edit2 className="w-3.5 h-3.5"/></button>
            </div>
          </div>
        </section>

        {/* Content, Pages & Features (Steps 7, 8, 9) */}
        <section className="bg-gray-50 p-5 rounded-2xl border border-gray-100 relative group">
          <button onClick={() => handleEdit(8)} className="absolute top-5 right-5 text-gray-500 hover:text-brand-maroon transition-colors">
            <Edit2 className="w-4 h-4"/>
          </button>
          <h3 className="text-sm font-bold uppercase text-brand-maroon tracking-wider mb-4">Requirements</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-black font-semibold block">Content Readiness:</span> 
                <span className="text-black font-medium">{formData.contentStatus || '—'}</span>
              </div>
              <button onClick={() => handleEdit(7)} className="text-gray-500 hover:text-brand-maroon"><Edit2 className="w-3.5 h-3.5"/></button>
            </div>
            <div>
              <span className="text-black font-semibold block">Pages Needed:</span> 
              <span className="text-black font-medium">
                {formData.pages?.length ? formData.pages.join(", ") : "None specified"}
              </span>
            </div>
            <div className="flex justify-between items-start pt-2">
              <div>
                <span className="text-black font-semibold block">Features:</span> 
                <span className="text-black font-medium">
                  {formData.features?.length ? formData.features.join(", ") : "None specified"}
                </span>
              </div>
              <button onClick={() => handleEdit(9)} className="text-gray-500 hover:text-brand-maroon"><Edit2 className="w-3.5 h-3.5"/></button>
            </div>
          </div>
        </section>

        {/* Technical & Addons (Steps 10, 11) */}
        <section className="bg-gray-50 p-5 rounded-2xl border border-gray-100 relative group">
          <button onClick={() => handleEdit(10)} className="absolute top-5 right-5 text-gray-500 hover:text-brand-maroon transition-colors">
            <Edit2 className="w-4 h-4"/>
          </button>
          <h3 className="text-sm font-bold uppercase text-brand-maroon tracking-wider mb-4">Technical & Extras</h3>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div><span className="text-black font-semibold block">Logo:</span> <span className="text-black font-medium">{formData.hasLogo || '—'}</span></div>
              <div><span className="text-black font-semibold block">Hosting:</span> <span className="text-black font-medium">{formData.hostingProvider || '—'}</span></div>
              <div><span className="text-black font-semibold block">Colors:</span> <span className="text-black font-medium">{formData.colorPreference || '—'}</span></div>
              <div><span className="text-black font-semibold block">Fonts:</span> <span className="text-black font-medium">{formData.fontPreference || '—'}</span></div>
            </div>
            <div className="flex justify-between items-start pt-2 border-t border-gray-200">
              <div>
                <span className="text-black font-semibold block">Extra Services:</span> 
                <span className="text-black font-medium">
                  {formData.serviceAddons?.length ? formData.serviceAddons.join(", ") : "None"}
                </span>
              </div>
              <button onClick={() => handleEdit(11)} className="text-gray-500 hover:text-brand-maroon"><Edit2 className="w-3.5 h-3.5"/></button>
            </div>
          </div>
        </section>

        {/* Contact Preferences & Scheduling */}
        <section className="bg-white p-6 rounded-2xl border border-brand-maroon/20 shadow-sm">
          <h3 className="text-lg font-bold text-brand-maroon mb-4">Final Details</h3>
          <div className="space-y-5 text-sm">
            <div>
              <label className="block font-semibold text-black mb-2">Preferred way to contact you</label>
              <div className="flex gap-4">
                {["Email", "Phone", "Text"].map(option => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="contactPreference" 
                      value={option} 
                      checked={contactPreference === option}
                      onChange={(e) => setContactPreference(e.target.value)}
                      className="text-brand-maroon focus:ring-brand-maroon accent-brand-maroon w-4 h-4" 
                    />
                    <span className="text-black font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-semibold text-black mb-2">Preferred date and time for us to call you</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="date" 
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-maroon focus:border-transparent outline-none transition-all text-slate-900 placeholder-slate-400 accent-brand-maroon"
                />
                <input 
                  type="time" 
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-maroon focus:border-transparent outline-none transition-all text-slate-900 placeholder-slate-400 accent-brand-maroon"
                />
              </div>
            </div>
          </div>
        </section>
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
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="px-8 py-3 bg-brand-maroon text-white font-semibold rounded-full hover:bg-opacity-90 transition-all shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Confirm & Proceed'}
        </button>
      </div>

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
