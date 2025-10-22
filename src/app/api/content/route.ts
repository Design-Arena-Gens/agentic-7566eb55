import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getContent, updateContent } from '../../../lib/content-store';

const ContentSchema = z.object({
  hero: z.object({
    headline: z.string().min(4),
    subheadline: z.string().min(4),
    ctaPrimary: z.string().min(2),
    ctaSecondary: z.string().min(2),
  }),
  services: z.array(z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    icon: z.string(),
  })),
  testimonials: z.array(z.object({
    name: z.string(),
    role: z.string(),
    quote: z.string(),
  })),
  contact: z.object({
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
  }),
  footerNote: z.string(),
});

export async function GET() {
  const data = await getContent();
  return NextResponse.json(data, { status: 200, headers: { 'Cache-Control': 'no-store' } });
}

export async function PUT(req: NextRequest) {
  const auth = req.headers.get('authorization');
  const token = auth?.startsWith('Bearer ')
    ? auth.slice('Bearer '.length)
    : null;
  if (!token || token !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  const parsed = ContentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid content', details: parsed.error.flatten() }, { status: 400 });
  }
  const saved = await updateContent(parsed.data);
  return NextResponse.json(saved);
}
