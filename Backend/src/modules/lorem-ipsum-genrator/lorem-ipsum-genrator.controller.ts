import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoremIpsumRequestDTO } from 'src/common/models/lorem-ipsum-genrator/lorem-ipsum-request.dto';
import { LoremIpsumResponseDTO } from 'src/common/models/lorem-ipsum-genrator/lorem-ipsum-response.dto';
import { PagedResponseDto } from 'src/common/models/shared/paged-response.dto';
import { LoremIpsumGenratorService } from './lorem-ipsum-genrator.service';

@Controller('lorem-ipsum-genrator')
export class LoremIpsumGenratorController {
  constructor(private readonly loremIpsumService: LoremIpsumGenratorService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  generateLoremIpsum(@Query() query: LoremIpsumRequestDTO): PagedResponseDto<LoremIpsumResponseDTO> {
    const content: LoremIpsumResponseDTO[] = this.loremIpsumService.generateLoremIpsum(query);
    return new PagedResponseDto<LoremIpsumResponseDTO>(
      'Lorem Ipsum generated successfully',
      content,
      200
    );
  }
}