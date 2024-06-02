export class PaginationService {
  constructor(private readonly take: number) {}

  calculatePaginationOptions(page: number) {
    const skip = page * this.take;
    return { take: this.take, skip };
  }
}

export const paginationService = new PaginationService(20);
