import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// This interface defines the "Informatics-grade" structure of your data
interface FormState {
    currentStep: number;
    formData: any;
    setStep: (step: number) => void;
    updateData: (data: any) => void;
    nextStep: () => void;
    prevStep: () => void;
    resetForm: () => void;
}

export const useFormStore = create<FormState>()(
    persist(
        (set) => ({
            currentStep: 1,
            formData: {},
            setStep: (step) => set({ currentStep: step }),
            updateData: (data) => set((state) => ({
                formData: { ...state.formData, ...data }
            })),
            nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
            prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
            resetForm: () => set({ currentStep: 1, formData: {} }),
        }),
        { 
            name: 'lab-graphics-form-storage',
            version: 1, // Added version to force state reset and ensure currentStep defaults to 1
        }
    )
);