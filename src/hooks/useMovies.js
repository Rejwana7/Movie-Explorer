import { useCallback, useEffect, useRef, useState } from 'react'
import { getShows, searchShows } from '../services/tvmazeApi'

const useMovies = () => {
  const controllerRef = useRef(null)
  const lastQueryRef = useRef('')
  const [state, setState] = useState({
    movies: [],
    isLoading: true,
    error: '',
    activeQuery: '',
  })

  const loadMovies = useCallback(async (query = '') => {
    const normalizedQuery = query.trim()

    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller
    lastQueryRef.current = normalizedQuery

    setState((currentState) => ({
      ...currentState,
      isLoading: true,
      error: '',
      activeQuery: normalizedQuery,
    }))

    try {
      const movies = normalizedQuery
        ? await searchShows(normalizedQuery, controller.signal)
        : await getShows(controller.signal)

      setState({
        movies,
        isLoading: false,
        error: '',
        activeQuery: normalizedQuery,
      })
    } catch (error) {
      if (error.name !== 'AbortError') {
        setState({
          movies: [],
          isLoading: false,
          error: error.message || 'Something went wrong. Please try again.',
          activeQuery: normalizedQuery,
        })
      }
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      loadMovies()
    }, 0)

    return () => {
      window.clearTimeout(timeoutId)
      controllerRef.current?.abort()
    }
  }, [loadMovies])

  const retry = useCallback(() => {
    loadMovies(lastQueryRef.current)
  }, [loadMovies])

  return {
    ...state,
    loadMovies,
    retry,
  }
}

export default useMovies
