export function isInt(i) {
  return i !== '' && Number.isInteger(Number(i));
}

export function isString(s) {
  return typeof s === 'string';
}

export function setPagenumber(page) {
  const num = Number(page);

  if (Number.isNaN(num) || !Number.isInteger(num) || num < 1) {
    return 1;
  }

  return num;
}

export async function pagingInfo({
  page, offset, count, listLength, PAGE_SIZE, items, baseUrl = '', 
} = {}) {
  return {
    page,
    total: count,
    totalPages: Math.ceil(count / PAGE_SIZE),
    items,
    first: offset === 0,
    last: listLength < PAGE_SIZE,
    hasPrev: offset > 0,
    hasNext: listLength === PAGE_SIZE,
    prevUrl: `${baseUrl}/?page=${page - 1}`,
    nextUrl: `${baseUrl}/?page=${page + 1}`,
  };
}
