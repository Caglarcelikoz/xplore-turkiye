/**
 * Quick test for query functions
 */

import { getLandingPage } from "./queries";

async function testQueries() {
  console.log("🧪 Testing Query Functions...\n");

  console.log("1️⃣ Testing getLandingPage()...");
  try {
    const landingPage = await getLandingPage();

    if (landingPage) {
      console.log("✅ Landing page fetched successfully!");
      console.log("   ID:", landingPage.id);
      console.log("   Title:", landingPage.attributes.title);
      console.log("   Description:", landingPage.attributes.description);
      console.log(
        "   Blocks count:",
        landingPage.attributes.blocks?.length || 0
      );
      if (landingPage.attributes.blocks && landingPage.attributes.blocks.length > 0) {
        const firstBlock = landingPage.attributes.blocks[0];
        console.log("   First block component:", firstBlock.__component);
        if (firstBlock.__component === "blocks.hero") {
          console.log("   Hero heading:", firstBlock.heading);
        }
      }
    } else {
      console.log("❌ Landing page is null");
    }
  } catch (error) {
    console.error("❌ Error fetching landing page:", error);
  }

  console.log("\n✨ Query test completed!");
}

testQueries().catch(console.error);









