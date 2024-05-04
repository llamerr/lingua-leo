import { route, routeOperation, TypedNextResponse } from 'next-rest-framework';
import { z } from 'zod';

import { db } from '@/libs/DB';
import { authors } from '@/models/BooksSchema.tables';
import { AddAuthorSchema } from '@/validations/AuthorValidation';

// Example dynamic app router route handler with GET/DELETE handlers.
export const { POST } = route({
  createAuthor: routeOperation({
    method: 'POST',
    // Optional OpenAPI operation documentation.
    openApiOperation: {
      tags: ['author'],
    },
  })
    // Input schema for strictly-typed request, request validation and OpenAPI documentation.
    .input({
      contentType: 'application/json',
      body: AddAuthorSchema,
    })
    // Output schema for strictly-typed responses and OpenAPI documentation.
    .outputs([
      {
        status: 201,
        contentType: 'application/json',
        body: z.object({
          id: z.number().optional(),
        }),
      },
      {
        status: 401,
        contentType: 'application/json',
        body: z.string(),
      },
      {
        status: 422,
        contentType: 'application/json',
        body: z.string(),
      },
      {
        status: 500,
        contentType: 'application/json',
        body: z.object({}),
      },
    ])
    .middleware(
      // Optional middleware logic executed before request validation.
      (req) => {
        if (!req.headers.get('authorization')) {
          return TypedNextResponse.json('Unauthorized', {
            status: 401,
          });
        }
        return undefined;
      },
    )
    .handler(async (req) => {
      try {
        const body = await req.json(); // Strictly-typed request.

        const author = await db.insert(authors).values(body).returning();

        return TypedNextResponse.json(
          {
            id: author[0]?.id,
          },
          {
            status: 201,
          },
        );
      } catch (error) {
        if (error instanceof z.ZodError) {
          return TypedNextResponse.json(error.format(), { status: 422 });
        }

        return TypedNextResponse.json({}, { status: 500 });
      }
    }),
});
