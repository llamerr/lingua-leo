import Link from 'next/link';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Blog = () => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga recusandae quidem. Quaerat molestiae
      blanditiis doloremque possimus labore voluptatibus distinctio recusandae autem esse explicabo molestias officia
      placeat, accusamus aut saepe.
    </p>

    {Array.from(Array(10).keys()).map((elt) => (
      <div className="my-4 w-full rounded-md border-2 border-gray-400 px-2 py-1" key={elt}>
        <Link href={`/blog/blog-${elt}`}>{`Blog - ${elt}`}</Link>
      </div>
    ))}
  </Main>
);

export default Blog;
