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
  page, offset, count, menuLength, PAGE_SIZE, baseUrl = '', 
} = {}) {
  return {
    page,
    total: count,
    totalPages: Math.ceil(count / PAGE_SIZE),
    first: offset === 0,
    last: menuLength < PAGE_SIZE,
    hasPrev: offset > 0,
    hasNext: menuLength === PAGE_SIZE,
    prevUrl: `${baseUrl}/?page=${page - 1}`,
    nextUrl: `${baseUrl}/?page=${page + 1}`,
  };
}
