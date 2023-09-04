import { FC } from 'react';

type PageProps = {
  params: {
    id: string;
  };
};

const Page: FC<PageProps> = ({ params: { id } }) => {
  return <div>{id}</div>;
};

export default Page;
