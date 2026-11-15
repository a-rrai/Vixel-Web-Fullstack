import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  private games: Game[] = [];
  private currentId = 1;

  create(createGameDto: CreateGameDto): Game {
    // Error Scenario 1: Cek duplikat judul
    const isExist = this.games.some(
      (item) => item.title.toLowerCase() === createGameDto.title.toLowerCase(),
    );
    if (isExist) {
      throw new ConflictException(`Game dengan judul "${createGameDto.title}" sudah ada.`);
    }

    const newGame: Game = {
      id: this.currentId++,
      isCompleted: false,
      ...createGameDto,
    };
    this.games.push(newGame);
    return newGame;
  }

  findAll(): Game[] {
    return this.games;
  }

  findOne(id: number): Game {
    const game = this.games.find((item) => item.id === id);
    // Error Scenario 2: Data tidak ditemukan
    if (!game) {
      throw new NotFoundException(`Game dengan ID ${id} tidak ditemukan.`);
    }
    return game;
  }

  update(id: number, updateGameDto: UpdateGameDto): Game {
    const game = this.findOne(id); // Otomatis melempar NotFoundException jika tidak ada
    Object.assign(game, updateGameDto);
    return game;
  }

  remove(id: number): { message: string } {
    const index = this.games.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Game dengan ID ${id} tidak ditemukan.`);
    }
    this.games.splice(index, 1);
    return { message: `Game dengan ID ${id} berhasil dihapus.` };
  }
}