
import { z } from 'zod';

export const movieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(), // puede ser nulo en algunos casos
});

export const moviesArraySchema = z.object({
  results: z.array(movieSchema),
});