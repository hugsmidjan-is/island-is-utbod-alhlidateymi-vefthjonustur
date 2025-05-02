/**
 * Returns true IFF the provided search terms match the provided text field values.
 * This is useful for implementing search amongst in-memory objects.
 * @param searchTerms List of search terms.
 * @param textFieldValues List of text field values to search.
 * @returns true IFF the provided search terms match the provided text field values.
 */
export const textSearch = (
  searchTerms: string[],
  textFieldValues: string[],
): boolean => {
  const normalizeTextFieldValue = (value: string): string => {
    return value.trim().toLowerCase()
  }
  return searchTerms.every((searchTerm) =>
    textFieldValues.some((textFieldValue) =>
      normalizeTextFieldValue(textFieldValue).includes(searchTerm),
    ),
  )
}

export const getSortedAndFilteredList = <T>(
  list: T[],
  searchTerms: string[],
  keys: (keyof T)[],
): T[] => {
  const fullSearchString: string = searchTerms.join(' ')

  const startsWithFullSearchString = (item: T): boolean => {
    return keys.some((key) =>
      (item[key] as string)?.trim().toLowerCase().startsWith(fullSearchString),
    )
  }

  const containsAllTerms = (item: T): boolean => {
    return searchTerms.every((searchTerm) =>
      keys.some((key) =>
        (item[key] as string)?.trim().toLowerCase().includes(searchTerm),
      ),
    )
  }

  const itemsStartingWithFullSearchString: T[] = []
  const itemsContainingAllTerm: T[] = []

  for (const item of list) {
    if (startsWithFullSearchString(item)) {
      itemsStartingWithFullSearchString.push(item)
    } else if (containsAllTerms(item)) {
      itemsContainingAllTerm.push(item)
    }
  }

  // Items that start with the full search string are fist in the list and then comes the rest
  return itemsStartingWithFullSearchString.concat(itemsContainingAllTerm)
}

/**
 * Splits a given search string into normalized search terms.
 * @param searchString A string that will be normalized and split into terms.
 * @returns A list of normalized search terms.
 */
export const getNormalizedSearchTerms = (searchString: string): string[] => {
  const normalizedSearchTerms = searchString
    // In some operating systems, when the user is typing a diacritic letter (e.g. á, é, í) that requires two key presses,
    // the diacritic mark is added to the search string on the first key press and is then replaced with the diacritic letter
    // on the second key press. For the intermediate state, we remove the diacritic mark so that it does
    // not affect the search results.
    .replace('´', '')

    // Normalize the search string
    .trim()
    .toLowerCase()

    // Split the search string into terms.
    .split(' ')
  return normalizedSearchTerms
}
