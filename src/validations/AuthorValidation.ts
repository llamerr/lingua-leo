import { z } from 'zod';

import { insertAuthorsDetailsSchema, insertAuthorsNamesSchema, insertAuthorsSchema } from '@/models/BooksSchema.tables';

export const AddAuthorSchema = z.object({
  id: insertAuthorsSchema.pick({ id: true }).shape.id,
  name: insertAuthorsNamesSchema.pick({ name: true }).shape.name.min(3),
  language: insertAuthorsNamesSchema.pick({ language: true }).shape.language,
  description: insertAuthorsDetailsSchema.pick({ description: true }).shape.description,
});
export const AddNewAuthorSchema = z.object({
  ...insertAuthorsNamesSchema.pick({ name: true, language: true }).shape,
  ...insertAuthorsDetailsSchema.pick({ description: true, language: true }).shape,
});

export const EditAuthorSchema = z.object({
  id: z.coerce.number(),
  username: z.string().min(1),
  body: z.string().min(1),
});

export const DeleteAuthorSchema = z.object({
  id: z.coerce.number(),
});
