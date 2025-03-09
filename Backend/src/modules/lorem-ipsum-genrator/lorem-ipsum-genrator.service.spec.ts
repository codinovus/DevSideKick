import { Test, TestingModule } from '@nestjs/testing';
import { LoremIpsumGenratorService } from './lorem-ipsum-genrator.service';

describe('LoremIpsumGenratorService', () => {
  let service: LoremIpsumGenratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoremIpsumGenratorService],
    }).compile();

    service = module.get<LoremIpsumGenratorService>(LoremIpsumGenratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
