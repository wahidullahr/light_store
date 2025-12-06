import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend lazily to avoid build-time errors
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

// Sanitize HTML to prevent XSS attacks
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get Resend client
    const resend = getResend();
    if (!resend) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact the administrator.' },
        { status: 500 }
      );
    }

    // Sanitize user input to prevent XSS attacks
    const sanitizedName = escapeHtml(name);
    const sanitizedEmail = escapeHtml(email);
    const sanitizedSubject = escapeHtml(subject);
    const sanitizedMessage = escapeHtml(message).replace(/\n/g, '<br>');
    
    // Get current timestamp
    const timestamp = new Date().toLocaleString('nb-NO', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'Europe/Oslo',
    });

    // Determine the "from" email address
    // Use Resend's onboarding email for now (until domain is verified)
    // Once domain is verified, you can use: process.env.RESEND_FROM_EMAIL || 'Huslampe <noreply@huslampe.no>'
    const fromEmail = 'onboarding@resend.dev';
    
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: ['kontakt@huslampe.no'],
      replyTo: email,
      subject: `Ny henvendelse: ${sanitizedSubject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0B0B0B; color: #F6F3EC;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); border-radius: 12px 12px 0 0; padding: 30px; border-bottom: 2px solid #FFB703;">
              <h1 style="margin: 0; color: #FFB703; font-size: 24px; font-weight: 600;">
                Ny henvendelse fra nettsiden
              </h1>
              <p style="margin: 8px 0 0 0; color: #9ca3af; font-size: 14px;">
                ${timestamp}
              </p>
            </div>
            
            <!-- Content -->
            <div style="background-color: #1a1a1a; padding: 30px; border-radius: 0 0 12px 12px;">
              <!-- Contact Information -->
              <div style="margin-bottom: 30px;">
                <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #374151;">
                  <p style="margin: 0 0 8px 0; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                    Navn
                  </p>
                  <p style="margin: 0; color: #F6F3EC; font-size: 16px; font-weight: 500;">
                    ${sanitizedName}
                  </p>
                </div>
                
                <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #374151;">
                  <p style="margin: 0 0 8px 0; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                    E-post
                  </p>
                  <p style="margin: 0;">
                    <a href="mailto:${sanitizedEmail}" style="color: #FFB703; text-decoration: none; font-size: 16px; font-weight: 500;">
                      ${sanitizedEmail}
                    </a>
                  </p>
                </div>
                
                <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #374151;">
                  <p style="margin: 0 0 8px 0; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                    Emne
                  </p>
                  <p style="margin: 0; color: #F6F3EC; font-size: 16px; font-weight: 500;">
                    ${sanitizedSubject}
                  </p>
                </div>
              </div>
              
              <!-- Message -->
              <div>
                <p style="margin: 0 0 12px 0; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                  Melding
                </p>
                <div style="background-color: #0B0B0B; border-left: 3px solid #FFB703; padding: 20px; border-radius: 8px; color: #F6F3EC; line-height: 1.6; font-size: 15px;">
                  ${sanitizedMessage}
                </div>
              </div>
              
              <!-- Reply Button -->
              <div style="margin-top: 30px; padding-top: 30px; border-top: 1px solid #374151; text-align: center;">
                <a href="mailto:${sanitizedEmail}?subject=Re: ${sanitizedSubject}" 
                   style="display: inline-block; background: linear-gradient(135deg, #FFB703 0%, #E8A502 100%); color: #0B0B0B; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px;">
                  Svar på henvendelsen
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="margin-top: 20px; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                Denne e-posten ble sendt fra kontakt-skjemaet på huslampe.no
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Ny henvendelse fra nettsiden
${timestamp}

Navn: ${name}
E-post: ${email}
Emne: ${subject}

Melding:
${message}

---
Denne e-posten ble sendt fra kontakt-skjemaet på huslampe.no
      `.trim(),
    });

    if (error) {
      console.error('Resend error details:', JSON.stringify(error, null, 2));
      console.error('Resend error:', error);
      return NextResponse.json(
        { 
          error: 'Failed to send email. Please try again later.',
          details: process.env.NODE_ENV === 'development' ? error : undefined
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully',
        id: data?.id 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', errorMessage);
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}

