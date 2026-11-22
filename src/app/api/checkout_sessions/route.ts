import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { MongoClient, ObjectId } from 'mongodb';

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const origin =
      headersList.get('origin') ||
      process.env.NEXT_PUBLIC_APP_URL ||
      'http://localhost:3000';

    let bookingId = '';
    let serviceTitle = 'Fixura Precision Repair Service';
    let amount = 50;

    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const body = await req.json();
      bookingId = body.bookingId || '';
      serviceTitle = body.serviceTitle || serviceTitle;
      if (body.amount) amount = Number(body.amount);
    } else if (contentType.includes('form')) {
      const formData = await req.formData();
      bookingId = (formData.get('bookingId') as string) || '';
      serviceTitle = (formData.get('serviceTitle') as string) || serviceTitle;
      if (formData.get('amount')) amount = Number(formData.get('amount'));
    }

    if (bookingId && ObjectId.isValid(bookingId)) {
      try {
        const uri = process.env.MONGODB_URI;
        if (uri) {
          const client = new MongoClient(uri);
          await client.connect();
          const db = client.db('fixmate');
          const booking = await db
            .collection('bookings')
            .findOne({ _id: new ObjectId(bookingId) });
          if (booking) {
            serviceTitle = booking.serviceTitle || serviceTitle;
            amount = Number(booking.finalAmount || booking.basePrice || amount);
          }
          await client.close();
        }
      } catch (dbErr: any) {
        console.warn('Notice loading booking for Stripe session:', dbErr.message);
      }
    }

    const unitAmountCents = Math.max(100, Math.round(amount * 100));

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Fixura: ${serviceTitle}`,
              description: 'Fixura Certified Hardware Restoration & Diagnostics',
            },
            unit_amount: unitAmountCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}&bookingId=${bookingId}`,
      cancel_url: `${origin}/payment/cancel?bookingId=${bookingId}`,
      metadata: {
        bookingId: String(bookingId),
      },
    });

    if (contentType.includes('form')) {
      return NextResponse.redirect(session.url as string, 303);
    }

    return NextResponse.json({
      success: true,
      url: session.url,
      sessionId: session.id,
    });
  } catch (err: any) {
    console.error('Error creating Stripe checkout session:', err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Unable to create Stripe checkout session',
      },
      { status: err.statusCode || 500 }
    );
  }
}
