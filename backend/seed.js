const fs = require('fs').promises;
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./src/models/product');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/manox', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Specific product prices - expanded to match cleaned product names
const PRODUCT_PRICES = {
  'Bangles': 4.00,
  'Jhumka': 2.50,
  'Mini Catcher': 1.50,
  'Gajray': 5.00,
  'Rings': 3.50,
  'Bottle Keychain': 1.50,
  'Jewelry Set': 15.00,
  'Baby Bracelet': 1.50,
  'Baby Bracelets': 1.50,
  'Beauty Blender': 6.00,
  'Eye Lash Curler': 4.00,
  'Eye Mask': 4.00,
  'Fancy Bangles': 8.00,
  'Shiffon Abaya': 4.00,
  'Bracelets': 4.00, // Corrected spelling from "Braclet"
  'Abaya': 4.00,
  'Catcher': 1.50,
  // Additional mappings for cleaned product names
  'Baby_bracelets': 1.50,
  'Beauty_blender': 6.00,
  'Eye_lash_curler': 4.00,
  'Eye_mask': 4.00,
  'Pearl_catcher': 1.50,
  'Artificial_nails_extenser': 4.00,
  'Bottle_keychain': 1.50,
  'Pony': 1.50,
  'Black_catcher': 1.50,
  // Additional mappings for jewelry products
  'Jhumkay': 2.50,
  'Braclet': 4.00,
  'Bangles': 4.00,
  'Rings': 3.50,
  'Ring': 3.50,
  'Ring_1': 3.50,
  'Ring_2': 3.50,
  'Ring_3': 3.50,
  'Ring_4': 3.50,
  'Ring_5': 3.50,
  'Ring_6': 3.50,
  'Ring_7': 3.50,
  'Ring_8': 3.50
};

// Helper function to extract product info from filename
function extractProductInfo(filename, category) {
  // Remove extension and any numbering at the end (e.g., _1, -2, etc.)
  // First remove the file extension
  let cleaned = filename.replace(/\.(jpg|jpeg|png|svg)$/i, '');
  // Then remove numbering patterns like _1, _2, -1, -2, etc.
  cleaned = cleaned.replace(/[_-]\d+$/, '');
  
  // Capitalize first letter of each word
  let title = cleaned.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  // Fix specific spelling corrections
  if (title === 'Braclet') {
    title = 'Bracelets';
  }
  
  // Generate SKU based on category and filename
  const base = filename.replace(/(_\d+)|(\-\d+)|(\.[^.]+)$/, '');
  const sku = `AUTO-${category.toUpperCase().slice(0,3)}-${filename.replace(/\.[^.]+$/, '').toUpperCase()}`;
  
  const titleLower = title.toLowerCase();
  
  // Assign subcategory based on title and category
  let subcategory = undefined;
  let subcategory_it = undefined;
  
  // Only set subcategories for specific product types
  const hasSpecificSubcategory = (category === 'jewelry' && (titleLower.includes('ring') || titleLower.includes('jhumkay') || titleLower.includes('bangles') || titleLower.includes('earring') || titleLower.includes('necklace'))) ||
    (category === 'hair_accessories' && (titleLower.includes('catcher') || titleLower.includes('pony') || titleLower.includes('pearl'))) ||
    (category === 'eye_care' && (titleLower.includes('mask') || titleLower.includes('curler'))) ||
    (category === 'beauty_tools' && (titleLower.includes('blender') || titleLower.includes('nail'))) ||
    (category === 'accessories' && titleLower.includes('baby')) ||
    (category === 'abayas') ||
    (category === 'floral' && titleLower.includes('gajray')) ||
    (category === 'keychains' && titleLower.includes('bottle'));
    
  if (!hasSpecificSubcategory) {
    subcategory = undefined;
    subcategory_it = undefined;
  }
  
  switch (category) {
    case 'keychains':
      if (titleLower.includes('bottle')) {
        subcategory = 'bottle_keychains';
        subcategory_it = 'portachiavi_bottiglia';
      }
      break;
    case 'jewelry':
      if (titleLower.includes('ring')) {
        subcategory = 'rings';
        subcategory_it = 'anelli';
      } else if (titleLower.includes('jhumkay') || titleLower.includes('jhumka')) {
        subcategory = 'jhumkay';
        subcategory_it = 'jhumkay';
      } else if (titleLower.includes('bangles') || titleLower.includes('bangle')) {
        subcategory = 'bangles';
        subcategory_it = 'bracciali';
      } else if (titleLower.includes('earring')) {
        subcategory = 'earrings';
        subcategory_it = 'orecchini';
      } else if (titleLower.includes('necklace')) {
        subcategory = 'necklaces';
        subcategory_it = 'collane';
      } else if (titleLower.includes('bracelet')) {
        subcategory = 'bracelets';
        subcategory_it = 'bracciali';
      }
      break;
    case 'hair_accessories':
      if (titleLower.includes('catcher')) {
        subcategory = 'hair_catchers';
        subcategory_it = 'raccoglitori_per_capelli';
      } else if (titleLower.includes('pony')) {
        subcategory = 'ponyties';
        subcategory_it = 'legacci_per_cavalli';
      } else if (titleLower.includes('pearl')) {
        subcategory = 'pearl_accessories';
        subcategory_it = 'accessori_di_perle';
      }
      break;
    case 'eye_care':
      if (titleLower.includes('mask')) {
        subcategory = 'eye_masks';
        subcategory_it = 'maschere_per_occhi';
      } else if (titleLower.includes('curler')) {
        subcategory = 'lash_curlers';
        subcategory_it = 'curler_per_ciglia';
      }
      break;
    case 'beauty_tools':
      if (titleLower.includes('blender')) {
        subcategory = 'blenders';
        subcategory_it = 'blender';
      } else if (titleLower.includes('nail')) {
        subcategory = 'nail_tools';
        subcategory_it = 'strumenti_per_unghie';
      }
      break;
    case 'accessories':
      if (titleLower.includes('baby')) {
        subcategory = 'baby_accessories';
        subcategory_it = 'accessori_per_bambini';
      }
      break;
    case 'abayas':
      subcategory = 'traditional_abayas';
      subcategory_it = 'abaya_tradizionali';
      break;
    case 'floral':
      if (titleLower.includes('gajray')) {
        subcategory = 'gajray';
        subcategory_it = 'gajray';
      }
      break;
  }
  
  return {
    title,
    title_en: title,
    title_it: title, // In a real app, this would be translated
    description: `${title} - MANOX quality product`,
    description_en: `${title} - MANOX quality product`,
    description_it: `${title} - Prodotto di qualita MANOX`, // Italian translation
    price: 0, // Will be updated with actual price from existing products
    category,
    category_it: category, // In a real app, this would be translated
    ...(subcategory !== undefined && { subcategory }),
    ...(subcategory_it !== undefined && { subcategory_it }),
    stock: 10, // Default stock
    sku,
    tags: [category, subcategory].filter(Boolean)
  };
}

async function seedProducts() {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('[INFO] Cleared existing products');
    
    // Define categories and their corresponding folders
    const categories = {
      'keychains': 'keychains',
      'jewelry': 'jewelry',
      'hair_accessories': 'hair_accessories',
      'eye_care': 'eye_care',
      'beauty_tools': 'beauty_tools',
      'accessories': 'accessories',
      'abayas': 'abayas',
      'floral': 'floral'
    };
    
    let productsToSeed = [];
    
    // Process each category
    for (const [categoryId, folderName] of Object.entries(categories)) {
      const categoryPath = path.join(__dirname, '..', 'frontend', 'public', 'assets', 'products', folderName);
      
      try {
        const files = await fs.readdir(categoryPath);
        const imageFiles = files.filter(file => 
          /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
        );
        
        // Create product entries for each image
        for (const file of imageFiles) {
          const productInfo = extractProductInfo(file, categoryId);
          const imagePath = `/assets/products/${folderName}/${file}`;
          
          // Use specific price if available, otherwise fallback to random
          let productPrice = PRODUCT_PRICES[productInfo.title] || 
                           PRODUCT_PRICES[productInfo.title_en] || 
                           (Math.random() * 50 + 5); // Fallback to random price if not found
          
          productsToSeed.push({
            ...productInfo,
            price: productPrice,
            images: [imagePath]
          });
        }
        
        console.log(`[INFO] Found ${imageFiles.length} images in ${folderName}`);
      } catch (err) {
        console.log(`[WARN] Could not access folder ${folderName}:`, err.message);
      }
    }
    
    // Insert all products
    if (productsToSeed.length > 0) {
      await Product.insertMany(productsToSeed);
      console.log(`[SUCCESS] Seeded ${productsToSeed.length} products with specific prices and corrected spelling.`);
    } else {
      console.log('[WARN] No products found to seed');
    }
    
    process.exit(0);
  } catch (err) {
    console.error('[ERROR] Seeding failed:', err);
    process.exit(1);
  }
}

seedProducts();