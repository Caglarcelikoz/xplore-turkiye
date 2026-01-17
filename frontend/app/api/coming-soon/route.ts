import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Ongeldig e-mailadres" },
        { status: 400 }
      );
    }

    // Send email to your address
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Xplore Turkiye <onboarding@resend.dev>";
    const toEmail = process.env.NOTIFICATION_EMAIL || "info@xploreturkiye.be";


    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: "Nieuwe aanmelding voor updates Xplore Turkiye & Beyond",
      html: `
        <h2>Nieuwe aanmelding voor updates Xplore Turkiye & Beyond</h2>
        <p><strong>E-mailadres:</strong> ${email}</p>
        <p><strong>Datum:</strong> ${new Date().toLocaleString("nl-BE")}</p>
      `,
    });

    if (error) {
      console.error("Resend error details:", JSON.stringify(error, null, 2));
      return NextResponse.json(
        { 
          error: "Kon e-mail niet versturen",
          details: error.message || "Onbekende fout",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Onbekende fout";
    return NextResponse.json(
      { 
        error: "Er ging iets mis",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
