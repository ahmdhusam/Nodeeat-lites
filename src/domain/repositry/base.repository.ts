import {
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export abstract class BaseRepository<T extends ObjectLiteral> {
  constructor(private readonly repo: Repository<T>) {}

  create(entity: DeepPartial<T>): T {
    return this.repo.create(entity);
  }

  async update(entityId: number, entity: QueryDeepPartialEntity<T>) {
    await this.repo.update(entityId, entity);
  }

  async findOneBy(where: FindOptionsWhere<T>): Promise<T | null> {
    return this.repo.findOneBy(where);
  }

  async findAll(): Promise<T[]> {
    return this.repo.find({
      // TODO: Pagination
      take: 20,
    });
  }

  async deleteById(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async save(entity: T): Promise<T> {
    return this.repo.save(entity);
  }

  async isExistBy(where: FindOptionsWhere<T>): Promise<boolean> {
    return this.repo.existsBy(where);
  }
}
