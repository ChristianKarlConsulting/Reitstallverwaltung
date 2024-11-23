import express from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { mollieClient } from '../lib/mollie.js';
import { sendEmail } from '../lib/email.js';

export const router = express.Router();

const createPaymentSchema = z.object({
  bookingId: z.string(),
  method: z.string(),
});

router.post('/', async (req, res, next) => {
  try {
    const { bookingId, method } = createPaymentSchema.parse(req.body);

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        user: {
          include: { profile: true },
        },
        facility: true,
      },
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Erstelle Mollie Zahlung
    const payment = await mollieClient.payments.create({
      amount: {
        currency: 'EUR',
        value: '10.00', // Beispielpreis
      },
      description: `Buchung: ${booking.facility.name}`,
      redirectUrl: `${process.env.FRONTEND_URL}/bookings/${booking.id}`,
      webhookUrl: `${process.env.BACKEND_URL}/api/payments/webhook`,
      metadata: {
        bookingId: booking.id,
      },
      method,
    });

    // Speichere Zahlungsinformationen
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        amount: 10.00, // Beispielpreis
        currency: 'EUR',
        method,
        status: 'pending',
        mollieId: payment.id,
      },
    });

    res.json({ checkoutUrl: payment.getCheckoutUrl() });
  } catch (error) {
    next(error);
  }
});

router.post('/webhook', async (req, res, next) => {
  try {
    const { id } = req.body;

    const payment = await mollieClient.payments.get(id);
    const { bookingId } = payment.metadata;

    await prisma.payment.update({
      where: { bookingId },
      data: { status: payment.status },
    });

    if (payment.isPaid()) {
      await prisma.booking.update({
        where: { id: bookingId },
        data: { status: 'confirmed' },
      });

      const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          user: {
            include: { profile: true },
          },
        },
      });

      if (booking?.user.email) {
        await sendEmail(
          booking.user.email,
          'Buchung bestätigt',
          `Ihre Buchung wurde erfolgreich bezahlt und bestätigt.`
        );
      }
    }

    res.status(200).end();
  } catch (error) {
    next(error);
  }
});