import { Test, TestingModule } from '@nestjs/testing';
import { TelecallerService } from './telecaller.service';

describe('TelecallerService', () => {
  let service: TelecallerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelecallerService],
    }).compile();

    service = module.get<TelecallerService>(TelecallerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
