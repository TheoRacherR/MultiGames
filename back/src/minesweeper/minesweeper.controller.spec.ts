import { Test, TestingModule } from '@nestjs/testing';
import { MinesweeperController } from './minesweeper.controller';
import { MinesweeperService } from './minesweeper.service';

describe('MinesweeperController', () => {
  let controller: MinesweeperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinesweeperController],
      providers: [MinesweeperService],
    }).compile();

    controller = module.get<MinesweeperController>(MinesweeperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
