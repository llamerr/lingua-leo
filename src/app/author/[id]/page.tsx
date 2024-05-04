import { eq } from 'drizzle-orm';
import type { Metadata } from 'next';
import Image from 'next/image';

import { GuestbookForm } from '@/components/Guestbook/GuestbookForm';
import { db } from '@/libs/DB';
import type { SelectAuthors } from '@/models/BooksSchema.tables';
import { authors, authorsNames } from '@/models/BooksSchema.tables';
import { Main } from '@/templates/Main';

type IAuthorProps = {
  params: { id: number };
};

export async function generateStaticParams() {
  const data = await db.select({ id: authors.id }).from(authors).all();
  return data.map(({ id }) => ({ id: id.toString() }));
}

export async function generateMetadata(props: IAuthorProps): Promise<Metadata> {
  // TODO: select language. User settings? Browser Locale? URL?
  const data = await db.select().from(authorsNames).where(eq(authorsNames.authorId, props.params.id)).limit(1).all();
  return {
    title: `Author ${data[0]?.name}`,
  };
}

const Author = async (props: IAuthorProps) => {
  const author: SelectAuthors | undefined = await db.query.authors.findFirst({
    with: {
      authorNames: true,
      authorDetails: true,
    },
    where: eq(authors.id, props.params.id),
  });
  console.log(author, props.params.id);

  return (
    <Main>
      <GuestbookForm />
      <h1 className="capitalize">Author {author?.authorNames?.[0]?.name}</h1>

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

      <div className="mt-2 text-center text-sm">
        Database powered by{' '}
        <a href="https://turso.tech/?utm_source=nextjsstarterbp" target="_blank">
          Turso
        </a>
      </div>

      <a href="https://turso.tech/?utm_source=nextjsstarterbp">
        <Image
          className="mx-auto mt-2"
          src="/assets/images/turso.png"
          alt="SQLite Developer Experience"
          width={65}
          height={56}
        />
      </a>
    </Main>
  );
};

export const dynamic = 'force-dynamic';

export const dynamicParams = true;

export default Author;
