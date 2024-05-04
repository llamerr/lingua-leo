import { z } from 'zod';

export const BookSchema = z.object({
  username: z.string().nonempty(),
  body: z.string().nonempty(),
});

export const EditBookSchema = z.object({
  id: z.coerce.number(),
  username: z.string().min(1),
  body: z.string().min(1),
});

export const DeleteBookSchema = z.object({
  id: z.coerce.number(),
});
