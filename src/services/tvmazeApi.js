const BASE_URL = 'https://api.tvmaze.com'

const fetchJson = async (url, signal) => {
  const response = await fetch(url, { signal })

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Too many requests. Please wait a moment and try again.')
    }

    throw new Error('Could not load movies. Please try again.')
  }

  return response.json()
}

export const getShows = (signal) => fetchJson(`${BASE_URL}/shows`, signal)

export const searchShows = async (query, signal) => {
  const results = await fetchJson(
    `${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`,
    signal,
  )

  return results.map((result) => result.show)
}
