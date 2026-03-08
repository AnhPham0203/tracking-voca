import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async updateReview(userId: string, wordId: string, rating: number) {
    const userVocab = await this.prisma.userVocabulary.findUnique({
      where: {
        userId_wordId: { userId, wordId },
      },
    });

    if (!userVocab) {
      throw new NotFoundException('Vocabulary not found for this user');
    }

    let { easeFactor, interval, repetition } = userVocab;

    // SM-2 Algorithm logic
    if (rating >= 3) {
      if (repetition === 0) {
        interval = 1;
      } else if (repetition === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetition++;
    } else {
      // Rating < 3: Forgot
      repetition = 0;
      interval = 1;
    }

    // Update Ease Factor: EF' = f(EF, q)
    // q = rating (0-5)
    easeFactor = easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;

    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    return this.prisma.userVocabulary.update({
      where: { id: userVocab.id },
      data: {
        easeFactor,
        interval,
        repetition,
        nextReview,
      },
    });
  }
}
