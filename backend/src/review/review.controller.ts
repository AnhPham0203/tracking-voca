import { Body, Controller, Post, NotFoundException } from '@nestjs/common';
import { ReviewService } from './review.service';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from '../prisma.service';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  async update(@Body() body: UpdateReviewDto) {
    // 1. Get default user for MVP
    const user = await this.prisma.user.findFirst();
    if (!user) throw new NotFoundException('User not found');

    // 2. Update review schedule
    return this.reviewService.updateReview(user.id, body.wordId, body.rating);
  }
}
