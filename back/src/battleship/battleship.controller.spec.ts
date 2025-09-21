import { Test, TestingModule } from '@nestjs/testing';
import { BattleshipController } from './battleship.controller';
import { BattleshipService } from './battleship.service';

describe('BattleshipController', () => {
  let controller: BattleshipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BattleshipController],
      providers: [BattleshipService],
    }).compile();

    controller = module.get<BattleshipController>(BattleshipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
