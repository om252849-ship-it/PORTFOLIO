import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'messages.json');

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Prepare message object
    const newMessage = {
      id: Date.now(),
      name,
      email,
      subject: subject || '(No subject)',
      message,
      timestamp: new Date().toISOString(),
    };

    // 1. Save message locally to data/messages.json (with serverless safe fallback)
    try {
      let messages = [];
      if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
        messages = JSON.parse(fileContent || '[]');
      }
      messages.push(newMessage);
      fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));
    } catch (fsErr) {
      console.warn('Note: Local file write skipped (serverless/read-only environment):', fsErr.message);
    }

    // 2. Optionally send email via Resend if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = require('resend');
        const resendClient = new Resend(process.env.RESEND_API_KEY);
        await resendClient.emails.send({
          from: 'Om Kumar Portfolio <onboarding@resend.dev>',
          to: ['omkumarind69@gmail.com'],
          subject: `Portfolio Contact: ${subject || '(No subject)'} from ${name}`,
          html: `
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || '(No subject)'}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
        });
      } catch (emailErr) {
        console.warn('Resend notification optional delivery notice:', emailErr.message);
      }
    }

    return NextResponse.json({ success: true, id: newMessage.id });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
