import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { db } from '@/libs/DB';
import { authors } from '@/models/BooksSchema.tables';
import { DeleteAuthorSchema, EditAuthorSchema } from '@/validations/AuthorValidation';

export const GET = async (request: Request) => {
  try {
    const json = await request.json();
    const body = EditAuthorSchema.parse(json);

    await db
      .update(authors)
      .set({
        ...body,
      })
      .where(eq(authors.id, body.id))
      .run();

    return NextResponse.json({});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.format(), { status: 422 });
    }

    return NextResponse.json({}, { status: 500 });
  }
};

export const PUT = async (request: Request) => {
  try {
    const json = await request.json();
    const body = EditAuthorSchema.parse(json);

    await db
      .update(authors)
      .set({
        ...body,
      })
      .where(eq(authors.id, body.id))
      .run();

    return NextResponse.json({});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.format(), { status: 422 });
    }

    return NextResponse.json({}, { status: 500 });
  }
};

export const DELETE = async (request: Request) => {
  try {
    const json = await request.json();
    const body = DeleteAuthorSchema.parse(json);

    await db.delete(authors).where(eq(authors.id, body.id)).run();

    return NextResponse.json({});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.format(), { status: 422 });
    }

    return NextResponse.json({}, { status: 500 });
  }
};
