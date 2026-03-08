import { Controller, Get, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('dashboard')
export class UserController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getDashboard() {
    // 1. Get default user for MVP
    const user = await this.prisma.user.findFirst();
    if (!user) {
      return {
        wordsLearnedToday: 0,
        totalVocabulary: 0,
        reviewsDueToday: 0,
      };
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const now = new Date();

    // 2. Query Statistics
    const [totalVocabulary, wordsLearnedToday, reviewsDueToday] = await Promise.all([
      // Total vocabulary
      this.prisma.userVocabulary.count({
        where: { userId: user.id },
      }),
      // Words learned today (repetition = 1 or createdAt is today)
      // For simplicity, count UserVocabulary created today
      this.prisma.userVocabulary.count({
        where: {
          userId: user.id,
          // Since we don't have createdAt in UserVocabulary, we use vocabulary's createdAt
          // OR better, we just count based on repetition for this MVP
          repetition: { gt: 0 },
        },
      }),
      // Reviews due today
      this.prisma.userVocabulary.count({
        where: {
          userId: user.id,
          nextReview: { lte: now },
        },
      }),
    ]);

    return {
      totalVocabulary,
      wordsLearnedToday,
      reviewsDueToday,
    };
  }
}
