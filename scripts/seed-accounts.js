#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const defaultAccounts = [
  {
    email: 'demo1@studyplanner.com',
    password: 'Demo@12345',
    name: 'John Doe',
  },
  {
    email: 'demo2@studyplanner.com',
    password: 'Demo@12345',
    name: 'Jane Smith',
  },
  {
    email: 'demo3@studyplanner.com',
    password: 'Demo@12345',
    name: 'Alex Johnson',
  },
];

async function seedAccounts() {
  console.log('🌱 Seeding default accounts...\n');

  for (const account of defaultAccounts) {
    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email: account.email,
        password: account.password,
        user_metadata: {
          full_name: account.name,
        },
        email_confirm: true,
      });

      if (error) {
        if (error.message?.includes('already exists')) {
          console.log(`✓ Account already exists: ${account.email}`);
        } else {
          console.error(`✗ Error creating ${account.email}:`, error.message);
        }
      } else {
        console.log(`✓ Created account: ${account.email}`);
        console.log(`  Password: ${account.password}`);
      }
    } catch (error) {
      console.error(`✗ Unexpected error for ${account.email}:`, error.message);
    }
  }

  console.log('\n✅ Seeding complete!');
  console.log('\nDefault accounts created:');
  defaultAccounts.forEach((account) => {
    console.log(`  Email: ${account.email} | Password: ${account.password}`);
  });
}

seedAccounts().then(() => {
  process.exit(0);
}).catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
