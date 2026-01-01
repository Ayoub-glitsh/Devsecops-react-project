#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Running Security Checks...\n');

const securityIssues = [];

// Check 1: Look for eval usage
function checkForEval(filePath, content) {
  if (content.includes('eval(')) {
    securityIssues.push({
      file: filePath,
      issue: 'EVAL_USAGE',
      severity: 'CRITICAL',
      message: 'eval() function usage detected'
    });
  }
}

// Check 2: Look for innerHTML
function checkForInnerHTML(filePath, content) {
  if (content.includes('innerHTML') || content.includes('dangerouslySetInnerHTML')) {
    securityIssues.push({
      file: filePath,
      issue: 'INNER_HTML',
      severity: 'HIGH',
      message: 'Potential XSS vulnerability: innerHTML usage'
    });
  }
}

// Check 3: Look for hardcoded secrets
function checkForHardcodedSecrets(filePath, content) {
  const secretPatterns = [
    /api[_-]?key\s*=\s*["'][^"']{10,}["']/i,
    /secret\s*=\s*["'][^"']{8,}["']/i,
    /token\s*=\s*["'][^"']{8,}["']/i,
    /password\s*=\s*["'][^"']{6,}["']/i
  ];
  
  secretPatterns.forEach(pattern => {
    if (pattern.test(content)) {
      securityIssues.push({
        file: filePath,
        issue: 'HARDCODED_SECRET',
        severity: 'CRITICAL',
        message: 'Hardcoded secret detected'
      });
    }
  });
}

// Scan all TypeScript/JavaScript files
function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules')) {
      scanDirectory(filePath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js')) {
      const content = fs.readFileSync(filePath, 'utf8');
      checkForEval(filePath, content);
      checkForInnerHTML(filePath, content);
      checkForHardcodedSecrets(filePath, content);
    }
  });
}

// Run the scan
scanDirectory(path.join(__dirname, '../src'));

// Report results
console.log('📊 Security Scan Results:');
console.log('=========================\n');

if (securityIssues.length === 0) {
  console.log('✅ No security issues found!');
} else {
  console.log(`❌ Found ${securityIssues.length} security issue(s):\n`);
  
  securityIssues.forEach(issue => {
    console.log(`[${issue.severity}] ${issue.file}`);
    console.log(`  ${issue.message}`);
    console.log('');
  });
  
  process.exit(1);
}