import { Handler } from "@netlify/functions";
import { Resend } from 'resend';

// The main handler for the Netlify Function.
const handler: Handler = async (event) => {
  console.log("Notify function invoked.");

  const { RESEND_API_KEY, NOTIFICATION_EMAIL } = process.env;

  // Check for the required Resend credentials.
  if (!RESEND_API_KEY || !NOTIFICATION_EMAIL) {
    console.error("Resend credentials (RESEND_API_KEY, NOTIFICATION_EMAIL) environment variables not set.");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error: Missing email credentials.' }),
    };
  }

  // Only allow POST requests, which is what Supabase webhooks send.
  if (event.httpMethod !== 'POST') {
    console.warn(`Function called with incorrect method: ${event.httpMethod}`);
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: { 'Allow': 'POST' }
    };
  }

  try {
    console.log("Received raw payload:", event.body);
    const payload = JSON.parse(event.body || '{}');

    // Supabase sends a payload with a 'record' object for INSERT events.
    if (payload.type !== 'INSERT' || !payload.record) {
      console.log(`Webhook received a non-insert event type: "${payload.type}". Skipping.`);
      return { statusCode: 200, body: 'Event skipped.' };
    }
    
    const brief = payload.record;
    console.log("Processing new brief record:", brief);
    
    const clientName = brief.full_name || 'N/A';
    const clientEmail = brief.email || 'no-reply@example.com';

    // Format a clean HTML email body.
    const emailBody = `
      <h1>New Project Brief Submitted</h1>
      <p>A new brief has been submitted via the Cadence Digital intake portal.</p>
      <hr>
      <h2>Client Details</h2>
      <ul>
        <li><strong>Name:</strong> ${brief.full_name || 'Not Provided'}</li>
        <li><strong>Email:</strong> ${brief.email || 'Not Provided'}</li>
        <li><strong>Website:</strong> ${brief.website ? `<a href="${brief.website}">${brief.website}</a>` : 'Not Provided'}</li>
      </ul>
      <h2>Key Features</h2>
      <p>${brief.essential_info || 'Not Provided'}</p>
      <h2>Project Context</h2>
      <p><strong>Main Challenge:</strong><br>${brief.project_challenge || 'Not Provided'}</p>
      <p><strong>Success Outcome:</strong><br>${brief.project_success || 'Not Provided'}</p>
      <h2>Scope & Timeline</h2>
      <ul>
        <li><strong>Ideal Timeline:</strong> ${brief.timeline || 'Not Provided'}</li>
        <li><strong>Attachment:</strong> ${brief.attachment_url ? `<a href="${brief.attachment_url}">View File</a>` : 'No file attached'}</li>
      </ul>
    `;

    // Create a plain text version for better deliverability
    const textBody = `
      New Project Brief Submitted
      A new brief has been submitted via the Cadence Digital intake portal.
      
      ---
      
      Client Details
      - Name: ${brief.full_name || 'Not Provided'}
      - Email: ${brief.email || 'Not Provided'}
      - Website: ${brief.website || 'Not Provided'}
      
      Key Features
      ${brief.essential_info || 'Not Provided'}

      Project Context
      - Main Challenge: ${brief.project_challenge || 'Not Provided'}
      - Success Outcome: ${brief.project_success || 'Not Provided'}
      
      Scope & Timeline
      - Ideal Timeline: ${brief.timeline || 'Not Provided'}
      - Attachment: ${brief.attachment_url ? `View File at ${brief.attachment_url}` : 'No file attached'}
    `;


    const resend = new Resend(RESEND_API_KEY);
    
    const { data, error } = await resend.emails.send({
      // IMPORTANT: To send from your own domain, you must verify it in Resend first.
      // For now, this uses a default that works out of the box.
      from: `Cadence Digital <onboarding@resend.dev>`,
      to: NOTIFICATION_EMAIL, // Send the notification to yourself
      // FIX: Corrected property name from 'reply_to' to 'replyTo' as per Resend's API.
      replyTo: clientEmail,
      subject: `New Cadence Digital Brief: ${clientName}`,
      html: emailBody,
      text: textBody, // Add the plain text version
    });

    if (error) {
      console.error("Resend API error:", error);
      throw error;
    }

    console.log("Email sent successfully! Response:", data);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Notification sent successfully.' }),
    };

  } catch (error) {
    console.error('Error processing webhook:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send notification.', details: errorMessage }),
    };
  }
};

export { handler };