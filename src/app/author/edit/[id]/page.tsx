import { eq } from 'drizzle-orm';
import type { Metadata } from 'next';

import { AuthorForm } from '@/components/Author/AuthorForm';
import { db } from '@/libs/DB';
import { authors, authorsNames } from '@/models/BooksSchema.tables';
import { Main } from '@/templates/Main';

type IAuthorProps = {
  params: { id: number | string };
};

export async function generateStaticParams() {
  const data = await db.select({ id: authors.id }).from(authors);
  return data.map(({ id }) => ({ id: id.toString() }));
}

export async function generateMetadata(props: IAuthorProps): Promise<Metadata> {
  // TODO: select language. User settings? Browser Locale? URL?
  if (props.params.id === 'new') {
    return {
      title: `Create new author`,
    };
  }
  // TODO: protect from strings? what db will return for NaN? an error?6
  const id = parseInt(props.params.id.toString(), 10);
  const data = await db.select().from(authorsNames).where(eq(authorsNames.authorId, id)).limit(1);
  return {
    title: `Author ${data[0]?.name}`,
  };
}

const Author = async (props: IAuthorProps) => {
  return (
    <Main>
      <AuthorForm />
      <h1 className="capitalize">Create new author</h1>

      <div className="mt-5">
        {/* {guestbook.map((elt) => (
          <div key={elt.id} className="mb-1 flex items-center gap-x-1">
            <DeleteGuestbookEntry id={elt.id} />

            <EditableGuestbookEntry
              id={elt.id}
              username={elt.username}
              body={elt.body}
            />
          </div>
        ))} */}
      </div>
    </Main>
  );
};

export const dynamic = 'force-dynamic';

export const dynamicParams = true;

export default Author;
