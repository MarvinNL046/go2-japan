const path = require('path');
const fs = require('fs');

const dataDir = path.join(process.cwd(), 'data', 'drinks');

function getAllDrinks() {
  try {
    const indexPath = path.join(dataDir, 'index.json');
    if (!fs.existsSync(indexPath)) return [];
    return JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  } catch (error) {
    console.error('Error loading drinks index:', error.message);
    return [];
  }
}

function getDrinkBySlug(slug) {
  try {
    const drinkPath = path.join(dataDir, `${slug}.json`);
    if (fs.existsSync(drinkPath)) {
      return JSON.parse(fs.readFileSync(drinkPath, 'utf8'));
    }
  } catch (error) {
    console.error(`Error loading drink data for ${slug}:`, error.message);
  }
  return null;
}

function getDrinkSlugs() {
  return getAllDrinks().map(drink => drink.slug);
}

function getDrinksByCategory(category) {
  return getAllDrinks().filter(drink => drink.category === category);
}

module.exports = { getAllDrinks, getDrinkBySlug, getDrinkSlugs, getDrinksByCategory };
