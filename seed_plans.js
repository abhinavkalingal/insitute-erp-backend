const { Client } = require('pg');
const crypto = require('crypto');

async function seedPlans() {
  const connectionString = 'postgresql://postgres:abhi9072@localhost:5432/erp_master';
  const client = new Client({ connectionString });
  await client.connect();

  const plans = [
    {
      id: crypto.randomUUID(),
      name: 'Starter',
      description: 'Essential tools for small institutes.',
      monthlyPrice: 2999,
      yearlyPrice: 29990,
      trialDays: 14,
      isActive: true,
      features: JSON.stringify(["Student Management", "Finance & Accounting", "Online Admissions"]),
      metadata: JSON.stringify({ colorHex: "#10b981", isRecommended: false })
    },
    {
      id: crypto.randomUUID(),
      name: 'Professional',
      description: 'Everything you need to grow your institute.',
      monthlyPrice: 5999,
      yearlyPrice: 59990,
      trialDays: 14,
      isActive: true,
      features: JSON.stringify(["Student Management", "Employee & HR", "Finance & Accounting", "Online Admissions", "Library Management", "Custom Domain"]),
      metadata: JSON.stringify({ colorHex: "#6366f1", isRecommended: true })
    },
    {
      id: crypto.randomUUID(),
      name: 'Enterprise',
      description: 'Advanced controls and unlimited scalability.',
      monthlyPrice: 14999,
      yearlyPrice: 149990,
      trialDays: 30,
      isActive: true,
      features: JSON.stringify(["Student Management", "Employee & HR", "Finance & Accounting", "Online Admissions", "Library Management", "Transport Management", "Hostel Management", "Live Classes (Zoom)", "Mobile App Access", "API Access", "Custom Domain", "Premium Support"]),
      metadata: JSON.stringify({ colorHex: "#8b5cf6", isRecommended: false })
    }
  ];

  try {
    for (const p of plans) {
      await client.query(
        `INSERT INTO "SubscriptionPlan" (id, name, description, "monthlyPrice", "yearlyPrice", "trialDays", "isActive", features, metadata, "updatedAt") 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())`,
        [p.id, p.name, p.description, p.monthlyPrice, p.yearlyPrice, p.trialDays, p.isActive, p.features, p.metadata]
      );
    }
    console.log("3 Professional plans seeded successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

seedPlans();
