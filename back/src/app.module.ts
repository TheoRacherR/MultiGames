import { WordleDayModule } from './tables/wordle_day/wordle_day.module';
import { Module } from '@nestjs/common';
import { UserModule } from './tables/user/user.module';
import { RoomModule } from './tables/room/room.module';
import { BattleshipModule } from './tables/battleship/battleship.module';
import { BattleshipEloModule } from './tables/battleship_elo/battleship_elo.module';
import { MinesweeperModule } from './tables/minesweeper/minesweeper.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './tables/auth/auth.module';
import { QuizModule } from './tables/quiz/quiz.module';
import { WordleModule } from './tables/wordle/wordle.module';
import { TimeGameModule } from './tables/timegame/timegame.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DatabaseModule,
    UserModule,
    RoomModule,
    BattleshipModule,
    BattleshipEloModule,
    MinesweeperModule,
    AuthModule,
    QuizModule,
    WordleModule,
    WordleDayModule,
    TimeGameModule,
  ],
})
export class AppModule {}
