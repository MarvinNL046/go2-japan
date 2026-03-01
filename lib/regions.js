const path = require('path');
const fs = require('fs');

const dataDir = path.join(process.cwd(), 'data', 'regions');

function getAllRegions() {
  try {
    const indexPath = path.join(dataDir, 'index.json');
    if (!fs.existsSync(indexPath)) return [];
    return JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  } catch (error) {
    console.error('Error loading regions index:', error.message);
    return [];
  }
}

function getRegionBySlug(slug) {
  try {
    const regionPath = path.join(dataDir, `${slug}.json`);
    if (fs.existsSync(regionPath)) {
      return JSON.parse(fs.readFileSync(regionPath, 'utf8'));
    }
  } catch (error) {
    console.error(`Error loading region data for ${slug}:`, error.message);
  }
  return null;
}

function getRegionSlugs() {
  return getAllRegions().map(region => region.slug);
}

module.exports = { getAllRegions, getRegionBySlug, getRegionSlugs };
