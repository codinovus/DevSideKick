import { Test, TestingModule } from '@nestjs/testing';
import { LoremIpsumGenratorController } from './lorem-ipsum-genrator.controller';

describe('LoremIpsumGenratorController', () => {
  let controller: LoremIpsumGenratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoremIpsumGenratorController],
    }).compile();

    controller = module.get<LoremIpsumGenratorController>(LoremIpsumGenratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
