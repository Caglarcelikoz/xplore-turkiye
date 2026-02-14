#!/usr/bin/env node

/**
 * Generate Open Graph Images
 *
 * Creates 1200×630px OG images with logo overlay:
 * - og-homepage.jpg (logo + group travel image)
 * - og-default.jpg (logo + cappadocia image)
 * - og-contact.jpg (logo centered)
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

// Logo dimensions (will be resized proportionally)
const LOGO_MAX_WIDTH = 900;
const LOGO_POSITION = 'center'; // top, center, bottom

async function createOGImage({ backgroundImage, outputName, addGradient = true }) {
  console.log(`\n🎨 Creating ${outputName}...`);

  try {
    const backgroundPath = path.join(PUBLIC_DIR, backgroundImage);
    const logoPath = path.join(PUBLIC_DIR, 'logo-with-background.png');
    const outputPath = path.join(PUBLIC_DIR, outputName);

    // Check if files exist
    if (!fs.existsSync(backgroundPath)) {
      throw new Error(`Background image not found: ${backgroundPath}`);
    }
    if (!fs.existsSync(logoPath)) {
      throw new Error(`Logo not found: ${logoPath}`);
    }

    // Step 1: Resize and crop background to 1200×630
    let background = sharp(backgroundPath)
      .resize(OG_WIDTH, OG_HEIGHT, {
        fit: 'cover',
        position: 'center',
      });

    // Step 2: Add dark gradient overlay for readability (if requested)
    if (addGradient) {
      const gradient = Buffer.from(
        `<svg width="${OG_WIDTH}" height="${OG_HEIGHT}">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:rgb(0,0,0);stop-opacity:0.3" />
              <stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:0.6" />
            </linearGradient>
          </defs>
          <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#grad)" />
        </svg>`
      );

      background = background.composite([
        {
          input: gradient,
          top: 0,
          left: 0,
        },
      ]);
    }

    // Step 3: Prepare logo with proper sizing
    const logoMetadata = await sharp(logoPath).metadata();
    const logoAspectRatio = logoMetadata.width / logoMetadata.height;

    // Calculate logo dimensions (max 75% of canvas width)
    const logoWidth = Math.min(LOGO_MAX_WIDTH, OG_WIDTH * 0.75);
    const logoHeight = Math.round(logoWidth / logoAspectRatio);

    // Resize logo
    const resizedLogo = await sharp(logoPath)
      .resize(logoWidth, logoHeight, {
        fit: 'inside',
      })
      .toBuffer();

    // Calculate logo position
    let logoTop, logoLeft;
    logoLeft = Math.round((OG_WIDTH - logoWidth) / 2); // Always centered horizontally

    if (LOGO_POSITION === 'top') {
      logoTop = Math.round(OG_HEIGHT * 0.15); // 15% from top
    } else if (LOGO_POSITION === 'bottom') {
      logoTop = Math.round(OG_HEIGHT * 0.7 - logoHeight / 2); // Bottom third
    } else {
      logoTop = Math.round((OG_HEIGHT - logoHeight) / 2); // Centered vertically
    }

    // Step 4: Composite logo onto background
    const finalImage = await background
      .composite([
        {
          input: resizedLogo,
          top: logoTop,
          left: logoLeft,
        },
      ])
      .jpeg({ quality: 85 })
      .toFile(outputPath);

    const fileSizeKB = Math.round(finalImage.size / 1024);
    console.log(`   ✅ Created ${outputName} (${finalImage.width}×${finalImage.height}, ${fileSizeKB}KB)`);

    return outputPath;
  } catch (error) {
    console.error(`   ❌ Error creating ${outputName}:`, error.message);
    throw error;
  }
}

async function createSimpleLogoImage({ outputName }) {
  console.log(`\n🎨 Creating ${outputName} (logo only)...`);

  try {
    const logoPath = path.join(PUBLIC_DIR, 'logo-with-background.png');
    const outputPath = path.join(PUBLIC_DIR, outputName);

    // Get logo metadata
    const logoMetadata = await sharp(logoPath).metadata();
    const logoAspectRatio = logoMetadata.width / logoMetadata.height;

    // Calculate dimensions to fit logo in 1200×630 canvas
    let logoWidth = OG_WIDTH * 0.85;
    let logoHeight = Math.round(logoWidth / logoAspectRatio);

    // If logo is too tall, resize based on height
    if (logoHeight > OG_HEIGHT * 0.85) {
      logoHeight = OG_HEIGHT * 0.85;
      logoWidth = Math.round(logoHeight * logoAspectRatio);
    }

    // Create background with beige color (same as logo background)
    const background = sharp({
      create: {
        width: OG_WIDTH,
        height: OG_HEIGHT,
        channels: 4,
        background: { r: 250, g: 249, b: 247, alpha: 1 }, // #faf9f7
      }
    });

    // Resize and center logo
    const resizedLogo = await sharp(logoPath)
      .resize(Math.round(logoWidth), Math.round(logoHeight), {
        fit: 'inside',
      })
      .toBuffer();

    const logoTop = Math.round((OG_HEIGHT - logoHeight) / 2);
    const logoLeft = Math.round((OG_WIDTH - logoWidth) / 2);

    // Composite logo onto background
    const finalImage = await background
      .composite([
        {
          input: resizedLogo,
          top: logoTop,
          left: logoLeft,
        },
      ])
      .jpeg({ quality: 85 })
      .toFile(outputPath);

    const fileSizeKB = Math.round(finalImage.size / 1024);
    console.log(`   ✅ Created ${outputName} (${finalImage.width}×${finalImage.height}, ${fileSizeKB}KB)`);

    return outputPath;
  } catch (error) {
    console.error(`   ❌ Error creating ${outputName}:`, error.message);
    throw error;
  }
}

async function main() {
  console.log('🚀 Generating Open Graph Images...\n');
  console.log(`📁 Output directory: ${PUBLIC_DIR}`);

  try {
    // 1. Homepage - Logo + group travel background
    await createOGImage({
      backgroundImage: 'xplore-group.jpg',
      outputName: 'og-homepage.jpg',
      addGradient: true,
    });

    // 2. Default - Logo + Cappadocia background
    await createOGImage({
      backgroundImage: 'cappadocie1.jpg',
      outputName: 'og-default.jpg',
      addGradient: true,
    });

    // 3. Contact - Logo centered on beige background
    await createSimpleLogoImage({
      outputName: 'og-contact.jpg',
    });

    console.log('\n✨ All OG images generated successfully!\n');
    console.log('📸 Generated files:');
    console.log('   - og-homepage.jpg (1200×630)');
    console.log('   - og-default.jpg (1200×630)');
    console.log('   - og-contact.jpg (1200×630)');
    console.log('\n🧪 Test your OG tags:');
    console.log('   1. Start dev server: npm run dev');
    console.log('   2. Visit: http://localhost:3000');
    console.log('   3. View source and check for og:image tags');
    console.log('   4. After deployment: https://developers.facebook.com/tools/debug/');
    console.log('');
  } catch (error) {
    console.error('\n❌ Error generating OG images:', error);
    process.exit(1);
  }
}

main();
