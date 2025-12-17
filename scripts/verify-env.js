#!/usr/bin/env node

/**
 * Environment Variables Verification Script
 * Checks if all required environment variables are set without exposing their values
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Required environment variables
const requiredVars = [
  {
    name: 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    description: 'Clerk publishable key',
    pattern: /^pk_(test|live)_/,
    type: 'public'
  },
  {
    name: 'CLERK_SECRET_KEY',
    description: 'Clerk secret key',
    pattern: /^sk_(test|live)_/,
    type: 'secret'
  },
  {
    name: 'NEXT_PUBLIC_CLERK_SIGN_IN_URL',
    description: 'Clerk sign-in URL',
    expected: '/sign-in',
    type: 'config'
  },
  {
    name: 'NEXT_PUBLIC_CLERK_SIGN_UP_URL',
    description: 'Clerk sign-up URL',
    expected: '/sign-up',
    type: 'config'
  },
  {
    name: 'NEXT_PUBLIC_SUPABASE_URL',
    description: 'Supabase project URL',
    pattern: /^https:\/\/[a-z0-9]+\.supabase\.co$/,
    type: 'public'
  },
  {
    name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    description: 'Supabase anon key',
    pattern: /^eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/,
    type: 'public'
  },
  {
    name: 'SUPABASE_SERVICE_ROLE_KEY',
    description: 'Supabase service role key',
    pattern: /^eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/,
    type: 'secret'
  }
];

// Load .env.local file
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env.local');

  if (!fs.existsSync(envPath)) {
    console.error(`${colors.red}${colors.bold}✗ Error: .env.local file not found${colors.reset}`);
    console.error(`${colors.yellow}Expected location: ${envPath}${colors.reset}`);
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  const envVars = {};

  // Parse .env file
  envContent.split('\n').forEach(line => {
    line = line.trim();

    // Skip comments and empty lines
    if (!line || line.startsWith('#')) return;

    const [key, ...valueParts] = line.split('=');
    const value = valueParts.join('=').trim();

    if (key && value) {
      envVars[key.trim()] = value;
    }
  });

  return envVars;
}

// Verify environment variables
function verifyEnv() {
  console.log(`\n${colors.bold}${colors.blue}🔍 Verifying Environment Variables...${colors.reset}\n`);

  const envVars = loadEnvFile();
  let allValid = true;
  let errorCount = 0;
  let warningCount = 0;

  requiredVars.forEach(({ name, description, pattern, expected, type }) => {
    const value = envVars[name];

    // Check if variable exists
    if (!value) {
      console.error(`${colors.red}✗ ${name}${colors.reset}`);
      console.error(`  ${colors.red}Missing: ${description}${colors.reset}\n`);
      allValid = false;
      errorCount++;
      return;
    }

    // Check for placeholder values
    if (value.includes('your_') || value.includes('_here') || value.includes('xxxxx')) {
      console.error(`${colors.red}✗ ${name}${colors.reset}`);
      console.error(`  ${colors.red}Still contains placeholder value${colors.reset}\n`);
      allValid = false;
      errorCount++;
      return;
    }

    // Check pattern if provided
    if (pattern && !pattern.test(value)) {
      console.error(`${colors.red}✗ ${name}${colors.reset}`);
      console.error(`  ${colors.red}Invalid format for ${description}${colors.reset}`);
      console.error(`  ${colors.yellow}Expected pattern: ${pattern}${colors.reset}\n`);
      allValid = false;
      errorCount++;
      return;
    }

    // Check expected value if provided
    if (expected && value !== expected) {
      console.warn(`${colors.yellow}⚠ ${name}${colors.reset}`);
      console.warn(`  ${colors.yellow}Expected: "${expected}", got: "${value}"${colors.reset}\n`);
      warningCount++;
      return;
    }

    // Show success with masked value
    let displayValue;
    if (type === 'secret') {
      displayValue = value.substring(0, 10) + '...' + value.substring(value.length - 4);
    } else if (type === 'public' && value.length > 30) {
      displayValue = value.substring(0, 30) + '...';
    } else {
      displayValue = value;
    }

    console.log(`${colors.green}✓ ${name}${colors.reset}`);
    console.log(`  ${colors.blue}${displayValue}${colors.reset}\n`);
  });

  // Summary
  console.log(`${colors.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

  if (allValid && warningCount === 0) {
    console.log(`${colors.green}${colors.bold}✓ All environment variables are properly configured!${colors.reset}\n`);
    console.log(`${colors.blue}You're ready to proceed to Phase 2: Database Design & Setup${colors.reset}\n`);
    process.exit(0);
  } else if (allValid && warningCount > 0) {
    console.log(`${colors.green}${colors.bold}✓ All required variables are set${colors.reset}`);
    console.log(`${colors.yellow}⚠ ${warningCount} warning(s) found${colors.reset}\n`);
    console.log(`${colors.blue}You can proceed, but please review the warnings above.${colors.reset}\n`);
    process.exit(0);
  } else {
    console.error(`${colors.red}${colors.bold}✗ Environment configuration incomplete${colors.reset}`);
    console.error(`${colors.red}Found ${errorCount} error(s)${colors.reset}\n`);
    console.error(`${colors.yellow}Please update your .env.local file with the correct values.${colors.reset}`);
    console.error(`${colors.yellow}Refer to .claude/setup_guide.md for detailed instructions.${colors.reset}\n`);
    process.exit(1);
  }
}

// Run verification
try {
  verifyEnv();
} catch (error) {
  console.error(`\n${colors.red}${colors.bold}Error during verification:${colors.reset}`);
  console.error(error.message);
  process.exit(1);
}
