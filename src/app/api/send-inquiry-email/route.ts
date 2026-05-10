import { NextResponse } from "next/server";

import { transporter } from "@/lib/mailer";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    await transporter.sendMail({
      from:
        `"JustTheRoutes" <${process.env.SMTP_USER}>`,

      to:
        "justtheroutes@gmail.com",

      subject:
        "New Inquiry Received",

      html: `
        <h2>
        New Travel Inquiry
        </h2>

        <p>
        <strong>
            Inquiry ID:
        </strong>
        ${body.inquiry_number}
        </p>

        <p><strong>Name:</strong> ${body.name}</p>

        <p><strong>WhatsApp:</strong> ${body.phone}</p>

        <p><strong>Travel Month:</strong> ${body.travel_month}</p>

        <p><strong>Travelers:</strong> ${body.travelers}</p>

        <p><strong>Trip Type:</strong> ${body.trip_type}</p>

        <p><strong>Additional Details:</strong><br/>${body.notes}</p>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}