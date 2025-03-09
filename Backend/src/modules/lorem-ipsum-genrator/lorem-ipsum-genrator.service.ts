import { Injectable, BadRequestException } from '@nestjs/common';
import { LoremIpsum } from 'lorem-ipsum';
import { LoremIpsumRequestDTO } from 'src/common/models/lorem-ipsum-genrator/lorem-ipsum-request.dto';
import { LoremIpsumResponseDTO } from 'src/common/models/lorem-ipsum-genrator/lorem-ipsum-response.dto';

@Injectable()
export class LoremIpsumGenratorService {
  generateLoremIpsum(query: LoremIpsumRequestDTO): LoremIpsumResponseDTO[] {
    // Provide default values to avoid undefined issues
    const {
      words = 0,
      sentences = 0,
      paragraphs = 0,
      startWithLorem = true,
      minWordsPerSentence = 5,
      maxWordsPerSentence = 15,
      minSentencesPerParagraph = 3,
      maxSentencesPerParagraph = 7,
    } = query;

    // Validate input
    this.validateQuery(query);

    // Create a new instance of LoremIpsum with the specified parameters
    const lorem = new LoremIpsum({
      wordsPerSentence: {
        min: minWordsPerSentence,
        max: maxWordsPerSentence,
      },
    });

    const result: LoremIpsumResponseDTO[] = [];

    // Generate text based on the input parameters
    if (words > 0) {
      result.push(new LoremIpsumResponseDTO(lorem.generateWords(words)));
    } else if (sentences > 0) {
      result.push(new LoremIpsumResponseDTO(lorem.generateSentences(sentences)));
    } else if (paragraphs > 0) {
      for (let i = 0; i < paragraphs; i++) {
        const numSentences = this.getRandomInt(minSentencesPerParagraph, maxSentencesPerParagraph);
        const paragraphText = lorem.generateSentences(numSentences);
        result.push(new LoremIpsumResponseDTO(paragraphText));
      }
    } else {
      const numSentences = this.getRandomInt(minSentencesPerParagraph, maxSentencesPerParagraph);
      const paragraphText = lorem.generateSentences(numSentences);
      result.push(new LoremIpsumResponseDTO(paragraphText));
    }

    // Prepend "Lorem ipsum" if required
    if (startWithLorem && result.length > 0) {
      result[0].genratedText = 'Lorem ipsum dolor sit amet, ' + result[0].genratedText; // Use the correct property name
    }

    return result;
  }

  private validateQuery(query: LoremIpsumRequestDTO): void {
    // Ensure that the properties are defined before checking their values
    if (query.words !== undefined && (query.words < 1 || !Number.isInteger(query.words))) {
      throw new BadRequestException('The "words" parameter must be a positive integer.');
    }
    if (query.sentences !== undefined && (query.sentences < 1 || !Number.isInteger(query.sentences))) {
      throw new BadRequestException('The "sentences" parameter must be a positive integer.');
    }
    if (query.paragraphs !== undefined && (query.paragraphs < 1 || !Number.isInteger(query.paragraphs))) {
      throw new BadRequestException('The "paragraphs" parameter must be a positive integer.');
    }
    if (query.minWordsPerSentence !== undefined && query.minWordsPerSentence < 1) {
      throw new BadRequestException('minWordsPerSentence must be a positive integer.');
    }
    if (query.maxWordsPerSentence !== undefined && query.maxWordsPerSentence < 1) {
      throw new BadRequestException('maxWordsPerSentence must be a positive integer.');
    }
    if (query.minSentencesPerParagraph !== undefined && query.minSentencesPerParagraph < 1) {
      throw new BadRequestException('minSentencesPerParagraph must be a positive integer.');
    }
    if (query.maxSentencesPerParagraph !== undefined && query.maxSentencesPerParagraph < 1) {
      throw new BadRequestException('maxSentencesPerParagraph must be a positive integer.');
    }
    if (query.minWordsPerSentence !== undefined && query.maxWordsPerSentence !== undefined && query.minWordsPerSentence > query.maxWordsPerSentence) {
      throw new BadRequestException('minWordsPerSentence cannot be greater than maxWordsPerSentence.');
    }
    if (query.minSentencesPerParagraph !== undefined && query.maxSentencesPerParagraph !== undefined && query.minSentencesPerParagraph > query.maxSentencesPerParagraph) {
      throw new BadRequestException('minSentencesPerParagraph cannot be greater than maxSentencesPerParagraph.');
    }
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}