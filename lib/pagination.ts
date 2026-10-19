export function getPagination(page: number, limit = 20) {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const skip = (safePage - 1) * limit;

  return { limit, skip, page: safePage };
}
