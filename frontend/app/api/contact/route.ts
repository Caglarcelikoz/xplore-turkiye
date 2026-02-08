import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  salutation: "Dhr" | "Mevr";
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  requestType: string;
  contactPreference: string;
  message: string;
  newsletterOptIn: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validation
    const {
      salutation,
      firstName,
      lastName,
      email,
      phone,
      requestType,
      contactPreference,
      message,
      newsletterOptIn,
    } = body;

    // Check required fields
    if (!salutation || !firstName || !lastName || !email || !requestType || !contactPreference || !message) {
      return NextResponse.json(
        { error: "Alle verplichte velden moeten ingevuld zijn" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Ongeldig e-mailadres" },
        { status: 400 }
      );
    }

    // Validate name lengths
    if (firstName.length < 2 || firstName.length > 50) {
      return NextResponse.json(
        { error: "Voornaam moet tussen 2 en 50 karakters zijn" },
        { status: 400 }
      );
    }

    if (lastName.length < 2 || lastName.length > 50) {
      return NextResponse.json(
        { error: "Achternaam moet tussen 2 en 50 karakters zijn" },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        { error: "Bericht moet tussen 10 en 2000 karakters zijn" },
        { status: 400 }
      );
    }

    // Send email via Resend
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Xplore Turkiye <onboarding@resend.dev>";
    const toEmail = process.env.NOTIFICATION_EMAIL || "info@xploreturkiye.be";

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `Nieuwe contactaanvraag - ${requestType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #294d54; border-bottom: 3px solid #d44e42; padding-bottom: 10px;">
            Nieuwe Contactaanvraag
          </h2>

          <div style="background-color: #faf9f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #182e32; margin-top: 0;">Contactgegevens</h3>
            <p><strong>Naam:</strong> ${salutation} ${firstName} ${lastName}</p>
            <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>Telefoon:</strong> <a href="tel:${phone}">${phone}</a></p>` : ""}
          </div>

          <div style="background-color: #faf9f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #182e32; margin-top: 0;">Details Aanvraag</h3>
            <p><strong>Type aanvraag:</strong> ${requestType}</p>
            <p><strong>Voorkeur contact:</strong> ${contactPreference}</p>
          </div>

          <div style="background-color: #faf9f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #182e32; margin-top: 0;">Bericht</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <div style="padding: 20px; background-color: #f0f0f0; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Nieuwsbrief:</strong> ${newsletterOptIn ? "✓ Ja, klant wil nieuwsbrief ontvangen" : "✗ Geen nieuwsbrief"}</p>
          </div>

          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            <strong>Verzonden op:</strong> ${new Date().toLocaleString("nl-BE")}<br>
            <strong>Bron:</strong> Website contactformulier
          </p>
        </div>
      `,
    });

    if (emailError) {
      console.error("Resend error:", emailError);
      return NextResponse.json(
        { error: "Kon e-mail niet versturen", details: emailError.message },
        { status: 500 }
      );
    }

    // Add to Mailchimp if newsletter opt-in is checked
    if (newsletterOptIn) {
      try {
        const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
        const mailchimpServerPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
        const mailchimpAudienceId = process.env.MAILCHIMP_AUDIENCE_ID;

        if (mailchimpApiKey && mailchimpServerPrefix && mailchimpAudienceId) {
          // Calculate MD5 hash of lowercase email for subscriber ID
          const crypto = require("crypto");
          const subscriberHash = crypto
            .createHash("md5")
            .update(email.toLowerCase())
            .digest("hex");

          const mailchimpUrl = `https://${mailchimpServerPrefix}.api.mailchimp.com/3.0/lists/${mailchimpAudienceId}/members/${subscriberHash}`;

          const mailchimpResponse = await fetch(mailchimpUrl, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${mailchimpApiKey}`,
            },
            body: JSON.stringify({
              email_address: email,
              status: "subscribed",
              merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
                PHONE: phone || "",
              },
              tags: ["website-contact"],
            }),
          });

          if (!mailchimpResponse.ok) {
            const mailchimpError = await mailchimpResponse.json();
            console.error("Mailchimp error:", mailchimpError);
            // Don't fail the entire request if Mailchimp fails
            // Email was already sent successfully
          }
        } else {
          console.warn("Mailchimp credentials not configured, skipping newsletter subscription");
        }
      } catch (mailchimpError) {
        console.error("Mailchimp integration error:", mailchimpError);
        // Don't fail the entire request if Mailchimp fails
      }
    }

    return NextResponse.json({
      success: true,
      message: "Bedankt! We nemen spoedig contact met je op.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    const errorMessage = error instanceof Error ? error.message : "Onbekende fout";
    return NextResponse.json(
      {
        error: "Er ging iets mis. Probeer het later opnieuw.",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
