import { IsBoolean, IsInt, IsOptional, Min } from "class-validator";
import { Transform } from 'class-transformer';

export class LoremIpsumRequestDTO{
    @IsInt()
    @Min(1)
    @IsOptional()
    @Transform(({ value }) => (value === '' ? undefined : Number(value)))
    words?: number;

    @IsInt()
    @Min(1)
    @IsOptional()
    @Transform(({ value }) => (value === '' ? undefined : Number(value)))
    sentences?: number;

    @IsInt()
    @Min(1)
    @IsOptional()
    @Transform(({ value }) => (value === '' ? undefined : Number(value)))
    paragraphs?: number;

    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => value === 'true' || value === true)
    startWithLorem?: boolean;

    @IsInt()
    @Min(1)
    @IsOptional()
    @Transform(({ value }) => (value === '' ? undefined : Number(value)))
    minWordsPerSentence?: number;

    @IsInt()
    @Min(1)
    @IsOptional()
    @Transform(({ value }) => (value === '' ? undefined : Number(value)))
    maxWordsPerSentence?: number;

    @IsInt()
    @Min(1)
    @IsOptional()
    @Transform(({ value }) => (value === '' ? undefined : Number(value)))
    minSentencesPerParagraph?: number;

    @IsInt()
    @Min(1)
    @IsOptional()
    @Transform(({ value }) => (value === '' ? undefined : Number(value)))
    maxSentencesPerParagraph?: number;
}