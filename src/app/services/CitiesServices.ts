/* eslint-disable class-methods-use-this */
import { getCustomRepository } from 'typeorm';
import CitiesRepository from '../repositories/CitiesRepository';
import '../../infra/db/postgres';
import City from '../interfaces/cityInterface';
import Pagination from '../interfaces/paginationInterface';
import Cities from '../entities/Cities';
import paginate from '../utils/paginate';

class CitiesServices {
  getRepo() {
    return getCustomRepository(CitiesRepository);
  }

  async Create(data: City) : Promise<Cities> {
    const checkUnique = await this.getRepo().findOne(data);
    if (checkUnique) throw new Error('Ja existe');
    const { id, cidade, estado } = await this.getRepo().save(data);
    return { id, cidade, estado };
  }

  async ListAll({ page = 1, limit = 10, ...query }): Promise<Pagination> {
    const filter = {
      take: limit,
      skip: (page - 1) * limit,
      where: query,
    };
    const [docs, total] = await this.getRepo().findAndCount(filter);
    const result = {
      docs, total, filter, page, pages: (total / limit) + 1,
    };
    const paginatedResults = await paginate(result);
    return paginatedResults;
  }
}

export default new CitiesServices();
