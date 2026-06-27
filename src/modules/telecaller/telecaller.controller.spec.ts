import { Test, TestingModule } from '@nestjs/testing';
import { TelecallerController } from './telecaller.controller';

describe('TelecallerController', () => {
  let controller: TelecallerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelecallerController],
    }).compile();

    controller = module.get<TelecallerController>(TelecallerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
