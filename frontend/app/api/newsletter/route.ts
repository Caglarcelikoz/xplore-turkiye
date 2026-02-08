import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: "E-mailadres is verplicht" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Ongeldig e-mailadres" },
        { status: 400 }
      );
    }

    // Check if Mailchimp is configured
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
    const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX; // e.g., "us1", "us2", etc.

    if (!apiKey || !audienceId || !serverPrefix) {
      console.error("Mailchimp configuration missing");
      return NextResponse.json(
        {
          error:
            "Nieuwsbrief service is niet geconfigureerd. Neem contact met ons op.",
        },
        { status: 500 }
      );
    }

    // Mailchimp API endpoint
    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

    // Subscribe to Mailchimp
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed", // or "pending" for double opt-in
        tags: ["Website Footer"],
      }),
    });

    const data = await response.json();

    // Handle Mailchimp errors
    if (!response.ok) {
      // Check for specific Mailchimp errors
      if (data.title === "Member Exists") {
        return NextResponse.json(
          { error: "Dit e-mailadres is al ingeschreven" },
          { status: 400 }
        );
      }

      if (data.title === "Invalid Resource") {
        return NextResponse.json(
          { error: "Ongeldig e-mailadres" },
          { status: 400 }
        );
      }

      console.error("Mailchimp API error:", data);
      return NextResponse.json(
        { error: "Er is iets misgegaan. Probeer het later opnieuw." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Je bent succesvol ingeschreven voor onze nieuwsbrief!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "Er is een onverwachte fout opgetreden" },
      { status: 500 }
    );
  }
}
