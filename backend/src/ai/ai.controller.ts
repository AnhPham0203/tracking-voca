import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { AiService } from './ai.service';
import { AnalyzeSentenceDto } from './dto/analyze-sentence.dto';
import { PrismaService } from '../prisma.service';

@Controller()
export class AiController {
  constructor(
    private readonly aiService: AiService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('analyze')
  async analyze(@Body() body: AnalyzeSentenceDto) {
    const { sentence } = body;

    // 1. Call AI Service
    const analysis = await this.aiService.analyzeSentence(sentence);

    // 2. Ensure a default user exists for MVP
    let user = await this.prisma.user.findFirst();
    if (!user) {
      user = await this.prisma.user.create({
        data: { email: 'default-user@example.com' },
      });
    }

    // 3. Store sentence in DB
    await this.prisma.sentence.create({
      data: {
        content: sentence,
        source: 'chrome-extension',
      },
    });

    // 4. Process Vocabulary
    const vocabularyList = analysis.vocabulary || [];
    for (const item of vocabularyList) {
      // Upsert vocabulary
      const vocab = await this.prisma.vocabulary.upsert({
        where: { word: item.word },
        update: {
          meaning: item.meaning,
          partOfSpeech: item.partOfSpeech,
        },
        create: {
          word: item.word,
          meaning: item.meaning,
          partOfSpeech: item.partOfSpeech,
        },
      });

      // Link to user (UserVocabulary) if not exists
      await this.prisma.userVocabulary.upsert({
        where: {
          userId_wordId: {
            userId: user.id,
            wordId: vocab.id,
          },
        },
        update: {}, // No update if exists
        create: {
          userId: user.id,
          wordId: vocab.id,
          easeFactor: 2.5,
          interval: 0,
          repetition: 0,
          nextReview: new Date(),
        },
      });
    }

    return {
      sentence,
      ...analysis,
    };
  }
}
