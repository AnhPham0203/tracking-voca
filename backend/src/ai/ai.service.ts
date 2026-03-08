import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async analyzeSentence(sentence: string) {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are an English teacher assistant. Analyze the sentence and return a JSON object with:
            - vocabulary: list of key words with word, meaning, and partOfSpeech.
            - grammar: list of grammar patterns with pattern and explanation.
            
            Example output format:
            {
              "vocabulary": [{"word": "allocate", "meaning": "to set apart for a particular purpose", "partOfSpeech": "verb"}],
              "grammar": [{"pattern": "need to + verb", "explanation": "used to express necessity"}]
            }
            
            Only return the JSON object.`,
          },
          {
            role: 'user',
            content: sentence,
          },
        ],
        response_format: { type: 'json_object' },
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new InternalServerErrorException('AI returned empty content');
      }
      return JSON.parse(content);
    } catch (error) {
      console.error('AI Analysis Error:', error);
      throw new InternalServerErrorException('Failed to analyze sentence with AI');
    }
  }
}
