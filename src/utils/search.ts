export function linearSearch<T>(
  items: readonly T[],
  predicate: (item: T) => boolean,
): T | undefined {
  return items.find(predicate);
}

/**
 * Searches an ascending collection using the same ordering as its comparator.
 *
 * @param items Collection sorted according to `compare`.
 * @param target Value to find.
 * @param compare Returns zero for a match, a negative value before the target,
 * or a positive value after it.
 * @returns The matching item, or `undefined` if it is absent.
 */
export function binarySearch<T>(
  items: readonly T[],
  target: T,
  compare: (item: T, target: T) => number,
): T | undefined {
  let low = 0;
  let high = items.length - 1;

  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    const comparison = compare(items[middle], target);

    if (comparison === 0) {
      return items[middle];
    }

    if (comparison < 0) {
      low = middle + 1;
    } else {
      high = middle - 1;
    }
  }

  return undefined;
}