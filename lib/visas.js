const path = require('path');
const fs = require('fs');

const dataDir = path.join(process.cwd(), 'data', 'visas');

function getAllVisas() {
  try {
    const indexPath = path.join(dataDir, 'index.json');
    if (!fs.existsSync(indexPath)) return [];
    return JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  } catch (error) {
    console.error('Error loading visas index:', error.message);
    return [];
  }
}

function getVisaBySlug(slug) {
  try {
    const visaPath = path.join(dataDir, `${slug}.json`);
    if (fs.existsSync(visaPath)) {
      return JSON.parse(fs.readFileSync(visaPath, 'utf8'));
    }
  } catch (error) {
    console.error(`Error loading visa data for ${slug}:`, error.message);
  }
  return null;
}

function getVisaSlugs() {
  return getAllVisas().map(visa => visa.slug);
}

module.exports = { getAllVisas, getVisaBySlug, getVisaSlugs };
