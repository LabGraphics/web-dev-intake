export function calculatePricing(data: any) {
  let points = 0;

  // 1. Foundation
  switch (data.primaryGoal) {
    case "Launch a New Business Website":
      points += 25;
      break;
    case "Redesign or Refresh Existing Site":
      points += 18;
      break;
    case "Organization or Membership Portal":
      points += 50;
      break;
    case "Digital Portfolio or Event Site":
      points += 12;
      break;
    case "Drive Sales & E-commerce":
      points += 40; // Assumed
      break;
  }

  // 2. Pages
  if (data.pages && Array.isArray(data.pages)) {
    points += data.pages.length * 5;
  }

  // 3. Features
  if (data.features && Array.isArray(data.features)) {
    if (data.features.includes("Contact/Lead Forms")) points += 5;
    if (data.features.includes("Online Booking/Scheduling")) points += 10;
    if (data.features.includes("Payment Processing (Stripe/PayPal)")) points += 15;
    if (data.features.includes("Member Login & Dashboards")) points += 25;
    if (data.features.includes("Social Media Integration")) points += 5; // Assumed
    if (data.features.includes("Basic SEO Setup")) points += 10;
  }

  // 4. Maintenance
  let monthlyFee = 0;
  if (data.maintenancePlan === "Professional Care Plan") {
    points += 10;
    monthlyFee = 150; // Requested amount
  }

  // 5. Calculation
  const baseEstimate = points * 40;
  
  // 7. Payment Splits
  const deposit = baseEstimate * 0.40;
  const midpoint = baseEstimate * 0.30;
  const finalSplit = baseEstimate * 0.30;

  // 6. Tier Evaluation
  let tierName = "Essential Build";
  if (baseEstimate > 1200 && baseEstimate <= 2500) {
    tierName = "Professional Growth";
  } else if (baseEstimate > 2500) {
    tierName = "Advanced Enterprise";
  }

  return {
    points,
    baseEstimate,
    tierName,
    monthlyFee,
    estimateRange: `$${baseEstimate.toLocaleString()}`,
    deposit,
    midpoint,
    finalSplit
  };
}
