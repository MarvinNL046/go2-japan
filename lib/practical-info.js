const path = require('path');
const fs = require('fs');

const dataDir = path.join(process.cwd(), 'data', 'practical-info');

function getAllPracticalInfo() {
  try {
    const indexPath = path.join(dataDir, 'index.json');
    if (!fs.existsSync(indexPath)) return [];
    return JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  } catch (error) {
    console.error('Error loading practical info index:', error.message);
    return [];
  }
}

function getPracticalInfoBySlug(slug) {
  try {
    const guidePath = path.join(dataDir, `${slug}.json`);
    if (fs.existsSync(guidePath)) {
      return JSON.parse(fs.readFileSync(guidePath, 'utf8'));
    }
  } catch (error) {
    console.error(`Error loading practical info for ${slug}:`, error.message);
  }

  // Fallback: search in index.json
  const all = getAllPracticalInfo();
  return all.find(item => item.slug === slug) || null;
}

function getPracticalInfoSlugs() {
  return getAllPracticalInfo().map(item => item.slug);
}

module.exports = { getAllPracticalInfo, getPracticalInfoBySlug, getPracticalInfoSlugs };
