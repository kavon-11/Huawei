// NEW: Plan type definition (TypeScript-like comment for clarity)
// type Plan = {
//   id: string;
//   name: "Starter" | "Growth" | "Pro" | "Enterprise";
//   price: number | null;
//   billing: string | null;
//   description: string;
//   maxCallsPerMonth: number;
//   maxNumbers: number;
//   maxTeamMembers: number;
//   features: {
//     liveCalls: boolean;
//     advancedAnalytics: boolean;
//     crmIntegrations: boolean;
//     notifications: boolean;
//     apiAccess: boolean;
//     customWebhooks: boolean;
//   };
// }

export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for getting started with Echo AI",
    price: 29,
    billing: "Per month",
    buttonText: "Start Free Trial",
    buttonStyle: "secondary",
    highlighted: false,
    maxCallsPerMonth: 500,
    maxNumbers: 1,
    maxTeamMembers: 1,
    features: [
      "Up to 500 calls/month",
      "1 phone number",
      "Basic analytics",
      "Email notifications",
      "FAQ management",
      "Business hours routing",
    ],
    featureFlags: {
      liveCalls: true,
      advancedAnalytics: false,
      crmIntegrations: false,
      notifications: true,
      apiAccess: false,
      customWebhooks: false,
    },
    subtitle: null,
  },
  {
    id: "growth",
    name: "Growth",
    description: "For growing businesses",
    price: 99,
    billing: "Per month billed annually, $119/month billed monthly",
    buttonText: "Try for free",
    buttonStyle: "primary",
    highlighted: true,
    maxCallsPerMonth: 5000,
    maxNumbers: 5,
    maxTeamMembers: 5,
    features: [
      "Everything in Starter, and:",
      "Up to 5,000 calls/month",
      "Up to 5 phone numbers",
      "Advanced analytics & reporting",
      "SMS & WhatsApp follow-up",
      "Live call monitoring",
      "Team collaboration (up to 5 members)",
      "CRM integration (HubSpot, Salesforce)",
      "Custom business rules",
    ],
    featureFlags: {
      liveCalls: true,
      advancedAnalytics: true,
      crmIntegrations: true,
      notifications: true,
      apiAccess: true,
      customWebhooks: false,
    },
    subtitle: "Everything in Starter, and:",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professional operations",
    price: 299,
    billing: "Per month billed annually, $349/month billed monthly",
    buttonText: "Try for free",
    buttonStyle: "secondary",
    highlighted: false,
    maxCallsPerMonth: 50000,
    maxNumbers: 20,
    maxTeamMembers: 20,
    features: [
      "Everything in Growth, and:",
      "Up to 50,000 calls/month",
      "Up to 20 phone numbers",
      "Dedicated support",
      "Advanced IVR & routing",
      "Custom webhook integrations",
      "n8n automation flows",
      "Priority escalations",
      "Monthly strategy consultation",
    ],
    featureFlags: {
      liveCalls: true,
      advancedAnalytics: true,
      crmIntegrations: true,
      notifications: true,
      apiAccess: true,
      customWebhooks: true,
    },
    subtitle: "Everything in Growth, and:",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large-scale operations with custom needs",
    price: null,
    billing: null,
    buttonText: "Contact sales",
    buttonStyle: "secondary",
    highlighted: false,
    maxCallsPerMonth: 999999,
    maxNumbers: 999,
    maxTeamMembers: 999,
    features: [
      "Everything in Pro, and:",
      "Unlimited calls/month",
      "Unlimited phone numbers",
      "Dedicated account manager",
      "Custom SLA",
      "White-label options",
      "On-premise deployment",
      "Advanced security & compliance",
      "Custom integrations & training",
    ],
    featureFlags: {
      liveCalls: true,
      advancedAnalytics: true,
      crmIntegrations: true,
      notifications: true,
      apiAccess: true,
      customWebhooks: true,
    },
    subtitle: "Everything in Pro, and:",
  },
];
