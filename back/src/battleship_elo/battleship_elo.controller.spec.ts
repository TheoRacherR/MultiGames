import { Test, TestingModule } from '@nestjs/testing';
import { BattleshipEloController } from './battleship_elo.controller';
import { BattleshipEloService } from './battleship_elo.service';

describe('BattleshipEloController', () => {
  let controller: BattleshipEloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BattleshipEloController],
      providers: [BattleshipEloService],
    }).compile();

    controller = module.get<BattleshipEloController>(BattleshipEloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
