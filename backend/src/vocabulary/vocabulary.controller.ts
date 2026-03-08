import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('vocabulary')
export class VocabularyController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async findAll() {
    const user = await this.prisma.user.findFirst();
    if (!user) return [];

    const userVocabs = await this.prisma.userVocabulary.findMany({
      where: { userId: user.id },
      include: {
        vocabulary: true,
      },
    });

    return userVocabs.map((uv) => ({
      id: uv.vocabulary.id,
      word: uv.vocabulary.word,
      meaning: uv.vocabulary.meaning,
      partOfSpeech: uv.vocabulary.partOfSpeech,
      example: uv.vocabulary.example,
      nextReview: uv.nextReview,
      repetition: uv.repetition,
    }));
  }
}
