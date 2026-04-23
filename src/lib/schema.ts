import { z } from "zod";

// Validates the Contact Info (Step 2)
export const contactSchema = z.object({
    fullName: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
});

// Validates Business Details (Step 3)
export const businessDetailsSchema = z.object({
    businessName: z.string().min(1, "Business name is required"),
    businessDescription: z.string().min(10, "Please provide a brief description"),
    currentWebsite: z.union([z.literal(""), z.string().url("Please enter a valid URL (e.g., https://example.com)")]).optional(),
});

// Validates Budget Range (Step 4)
export const budgetSchema = z.object({
    budgetRange: z.enum(["Under $1,500", "$1,500–$3,500", "$3,500–$6,500", "$6,500–$10,000", "$10,000+"], {
        error: "Please select a budget range",
    }),
});

// Validates the Primary Goal (Step 5)
export const goalSchema = z.object({
    primaryGoal: z.enum([
        "Launch a New Business Website",
        "Redesign or Refresh Existing Site",
        "Drive Sales & E-commerce",
        "Organization or Membership Portal",
        "Digital Portfolio or Event Site"
    ], {
        error: "Please select a primary goal",
    }),
});

// Validates Target Audience (Step 6)
export const audienceSchema = z.object({
    targetAudience: z.string().min(10, "Please provide a bit more detail about your audience"),
});

// Validates Content Readiness (Step 7)
export const contentSchema = z.object({
    contentStatus: z.enum(["I have content", "I need help", "Partial"], {
        error: "Please let us know your content status",
    }),
});

// Validates Pages (Step 8)
export const pagesSchema = z.object({
    pages: z.array(z.string()),
});

// Validates Features (Step 9)
export const featuresSchema = z.object({
    features: z.array(z.string()),
});

// Validates Technical (Step 10)
export const technicalSchema = z.object({
    hasLogo: z.enum(["Yes, I have one", "No, I need one", "I need a redesign"], {
        error: "Please let us know your logo status",
    }),
    hostingProvider: z.string().optional(),
    colorPreference: z.string().optional(),
    fontPreference: z.string().optional(),
});

// Validates Service Addons (Step 11)
export const addonsSchema = z.object({
    serviceAddons: z.array(z.string()),
});