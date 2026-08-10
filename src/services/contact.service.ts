import prisma from '../config/database';
import { ContactMessageData } from '../types/portfolio.types';

/**
 * Contact service — persists inbound contact messages to the database.
 * Validation is handled upstream in the controller via express-validator.
 */
export const contactService = {
  /**
   * Saves a contact message and returns the created record.
   */
  async saveContactMessage(data: ContactMessageData): Promise<{ id: string; createdAt: Date }> {
    const message = await prisma.contactMessage.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        subject: data.subject.trim(),
        message: data.message.trim(),
      },
      select: {
        id: true,
        createdAt: true,
      },
    });

    return message;
  },
};
