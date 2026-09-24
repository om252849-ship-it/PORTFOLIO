import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'content.json');

export async function GET() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Content read error:', error);
    return NextResponse.json(
      { error: 'Failed to read content.' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();

    // Read current content
    const currentData = fs.readFileSync(DATA_FILE, 'utf-8');
    const currentContent = JSON.parse(currentData);

    // Merge updates (shallow merge of top-level keys)
    const updatedContent = { ...currentContent, ...body };

    // Write back (safely handled for serverless/read-only hosts like Vercel)
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(updatedContent, null, 2));
    } catch (writeErr) {
      console.warn('Note: Persistent file write not available on read-only serverless host:', writeErr.message);
    }

    return NextResponse.json({ success: true, data: updatedContent });
  } catch (error) {
    console.error('Content update error:', error);
    return NextResponse.json(
      { error: 'Failed to update content.' },
      { status: 500 }
    );
  }
}
