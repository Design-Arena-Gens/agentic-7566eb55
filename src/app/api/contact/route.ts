import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  service: z.string().optional(),
  message: z.string().min(8)
});

export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') || '';
  if (contentType.includes('application/x-www-form-urlencoded')) {
    const text = await req.text();
    const params = new URLSearchParams(text);
    const data = Object.fromEntries(params.entries());
    const parsed = ContactSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'Invalid submission' }, { status: 400 });
    }
    return NextResponse.redirect(new URL('/?sent=1', req.url));
  }

  const json = await req.json();
  const parsed = ContactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid submission' }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
