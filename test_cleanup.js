#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Running cleanup verification tests...\n');

let testsPassed = 0;
let testsTotal = 0;

function test(description, testFn) {
  testsTotal++;
  try {
    testFn();
    console.log(`✅ ${description}`);
    testsPassed++;
  } catch (error) {
    console.log(`❌ ${description}: ${error.message}`);
  }
}

// Test 1: Previous_Schedule_2024 directory should be removed
test('Previous_Schedule_2024 directory should be removed', () => {
  const previousSchedulePath = path.join(__dirname, 'pages', 'Previous_Schedule_2024');
  if (fs.existsSync(previousSchedulePath)) {
    throw new Error('Previous_Schedule_2024 directory still exists');
  }
});

// Test 2: _meta.json should not contain Previous_Schedule_2024 reference
test('_meta.json should not contain Previous_Schedule_2024 reference', () => {
  const metaPath = path.join(__dirname, 'pages', '_meta.json');
  const metaContent = fs.readFileSync(metaPath, 'utf8');
  if (metaContent.includes('Previous_Schedule_2024')) {
    throw new Error('_meta.json still contains Previous_Schedule_2024 reference');
  }
});

// Test 3: New banner.svg should exist
test('New banner.svg should exist', () => {
  const bannerSvgPath = path.join(__dirname, 'public', 'banner.svg');
  if (!fs.existsSync(bannerSvgPath)) {
    throw new Error('banner.svg does not exist');
  }
});

// Test 4: Old banner.gif should be removed
test('Old banner.gif should be removed', () => {
  const bannerGifPath = path.join(__dirname, 'public', 'banner.gif');
  if (fs.existsSync(bannerGifPath)) {
    throw new Error('banner.gif still exists');
  }
});

// Test 5: index.mdx should reference banner.svg instead of banner.gif
test('index.mdx should reference banner.svg instead of banner.gif', () => {
  const indexPath = path.join(__dirname, 'pages', 'index.mdx');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  if (!indexContent.includes('banner.svg')) {
    throw new Error('index.mdx does not reference banner.svg');
  }
  if (indexContent.includes('banner.gif')) {
    throw new Error('index.mdx still references banner.gif');
  }
});

// Test 6: Old CMU agent workshop tutorial PDF should be removed
test('Old CMU agent workshop tutorial PDF should be removed', () => {
  const tutorialPath = path.join(__dirname, 'public', 'cmu-agent-workshop-2024-tutorial.pdf');
  if (fs.existsSync(tutorialPath)) {
    throw new Error('cmu-agent-workshop-2024-tutorial.pdf still exists');
  }
});

// Test 7: Banner SVG should contain expected content
test('Banner SVG should contain expected content', () => {
  const bannerSvgPath = path.join(__dirname, 'public', 'banner.svg');
  const bannerContent = fs.readFileSync(bannerSvgPath, 'utf8');
  if (!bannerContent.includes('CMU AI for Science Workshop')) {
    throw new Error('Banner SVG does not contain expected title');
  }
  if (!bannerContent.includes('September 12, 2025')) {
    throw new Error('Banner SVG does not contain expected date');
  }
});

console.log(`\nTest Results: ${testsPassed}/${testsTotal} tests passed`);

if (testsPassed === testsTotal) {
  console.log('🎉 All tests passed! The cleanup was successful.');
  process.exit(0);
} else {
  console.log('❌ Some tests failed. Please check the issues above.');
  process.exit(1);
}