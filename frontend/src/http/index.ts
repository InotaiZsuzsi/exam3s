import { safeFetch } from "../lib/http"
import { z } from "zod"

const MovieSchema = z.object({
  id: z.number(), title: z.string(), year: z.number()
})

export const getMovies = (after: number) =>
  safeFetch({
    method: "GET",
    url: `http://localhost:3000/api/movies?after=${after}`,
    schema: MovieSchema.array(),
  })


export const postMovie = async (movie: { title: string, year: number }) =>
  safeFetch({
    method: "POST",
    url: `http://localhost:3000/api/movies`,
    schema: MovieSchema,
    payload: movie,
  })

/* export const patchMovie = async (id: number, movie: { title: string, year: number }) =>
  safeFetch("PATCH", `http://localhost:3000/api/movies/${id}`, 3, movie)

export const deleteMovie = async (id: number) =>
  safeFetch("DELETE", `http://localhost:3000/api/movies/${id}`, "alma") */
