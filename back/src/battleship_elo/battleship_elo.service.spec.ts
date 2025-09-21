import { Test, TestingModule } from '@nestjs/testing';
import { BattleshipEloService } from './battleship_elo.service';

describe('BattleshipEloService', () => {
  let service: BattleshipEloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BattleshipEloService],
    }).compile();

    service = module.get<BattleshipEloService>(BattleshipEloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
