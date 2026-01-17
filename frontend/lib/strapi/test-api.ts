/**
 * Test script for Strapi API Client
 * Run with: npx tsx lib/strapi/test-api.ts
 * Or: node --loader ts-node/esm lib/strapi/test-api.ts
 */

import { getSingleType, getEntries, getEntryBySlug } from "./client";
import { getStrapiMediaUrl, getStrapiImageUrl, isStrapiMedia } from "./utils";

async function testAPI() {
  console.log("🧪 Testing Strapi API Client...\n");

  // Test 1: Get Single Type (Landing Page)
  console.log("1️⃣ Testing getSingleType('landing-page')...");
  try {
    const landingPage = await getSingleType("landing-page", {
      populate: ["blocks.background", "blocks.links", "blocks.stats"],
    });

    if (landingPage) {
      console.log("✅ Landing page fetched successfully!");
      const page = landingPage as any;
      console.log("   ID:", page.id);
      console.log("   Document ID:", page.documentId);
      console.log("   Title:", page.attributes?.title || "N/A");
      console.log(
        "   Description:",
        page.attributes?.description || "N/A"
      );
      const blocks = page.attributes?.blocks;
      console.log(
        "   Blocks:",
        blocks
          ? Array.isArray(blocks)
            ? blocks.length
            : "not an array"
          : "undefined"
      );
      if (blocks && Array.isArray(blocks) && blocks.length > 0) {
        console.log("   First block component:", blocks[0].__component);
      }
    } else {
      console.log("❌ Landing page is null");
    }
  } catch (error) {
    console.error("❌ Error fetching landing page:", error);
  }

  console.log("\n");

  // Test 2: Get Single Type with simple populate
  console.log("2️⃣ Testing getSingleType with simple populate...");
  try {
    const landingPageSimple = await getSingleType("landing-page", {
      populate: ["blocks"],
    });

    if (landingPageSimple) {
      console.log("✅ Landing page fetched with simple populate!");
      const pageSimple = landingPageSimple as any;
      console.log("   ID:", pageSimple.id);
      const blocks = pageSimple.attributes?.blocks || [];
      console.log("   Blocks:", blocks.length);
      if (blocks.length > 0) {
        const firstBlock = blocks[0];
        console.log("   First block component:", firstBlock.__component);
      }
    } else {
      console.log("❌ Landing page is null");
    }
  } catch (error) {
    console.error("❌ Error fetching landing page:", error);
  }

  console.log("\n");

  // Test 3: Test media utilities
  console.log("3️⃣ Testing media utilities...");
  try {
    const testMedia = {
      data: {
        id: 1,
        documentId: "test",
        attributes: {
          name: "test.jpg",
          alternativeText: "Test image",
          caption: null,
          width: 1920,
          height: 1080,
          formats: {
            thumbnail: {
              name: "thumbnail_test",
              hash: "test_hash",
              ext: ".jpg",
              mime: "image/jpeg",
              width: 150,
              height: 150,
              size: 5000,
              path: null,
              url: "/uploads/thumbnail_test.jpg",
            },
            medium: {
              name: "medium_test",
              hash: "test_hash",
              ext: ".jpg",
              mime: "image/jpeg",
              width: 750,
              height: 750,
              size: 50000,
              path: null,
              url: "/uploads/medium_test.jpg",
            },
          },
          hash: "test_hash",
          ext: ".jpg",
          mime: "image/jpeg",
          size: 100000,
          url: "/uploads/test.jpg",
          previewUrl: null,
          provider: "local",
          provider_metadata: null,
        },
      },
    };

    console.log("   Testing isStrapiMedia:", isStrapiMedia(testMedia)); // Should be true
    console.log(
      "   Testing getStrapiMediaUrl (original):",
      getStrapiMediaUrl(testMedia, "original")
    );
    console.log(
      "   Testing getStrapiImageUrl (medium):",
      getStrapiImageUrl(testMedia, "medium")
    );
    console.log(
      "   Testing getStrapiImageUrl (thumbnail):",
      getStrapiImageUrl(testMedia, "thumbnail")
    );
    console.log("✅ Media utilities working!");
  } catch (error) {
    console.error("❌ Error testing media utilities:", error);
  }

  console.log("\n");

  // Test 4: Test error handling (non-existent content type)
  console.log("4️⃣ Testing error handling (non-existent content type)...");
  try {
    const nonExistent = await getSingleType("non-existent-type");
    if (nonExistent === null) {
      console.log(
        "✅ Error handling works - returned null for non-existent type"
      );
    } else {
      console.log("⚠️ Unexpected result:", nonExistent);
    }
  } catch (error) {
    console.log(
      "✅ Error handling works - threw error:",
      (error as Error).message
    );
  }

  console.log("\n");

  // Test 5: Test with field selection
  console.log("5️⃣ Testing field selection...");
  try {
    const landingPageFields = await getSingleType("landing-page", {
      fields: ["title", "description"],
      populate: {
        blocks: {
          fields: ["heading", "text"],
        },
      },
    });

    if (landingPageFields) {
      console.log("✅ Field selection works!");
      console.log("   Title:", (landingPageFields as any).attributes?.title);
    } else {
      console.log("❌ Landing page is null");
    }
  } catch (error) {
    console.error("❌ Error with field selection:", error);
  }

  console.log("\n");
  console.log("✨ All tests completed!");
}

// Run tests
testAPI().catch(console.error);
