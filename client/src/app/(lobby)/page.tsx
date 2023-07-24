import { Metadata, NextPage } from 'next';

import NewComicsSection from '@/components/new-comics-section';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Main page',
};

const IndexPage: NextPage = () => {
  return (
    <div className='container'>
      <NewComicsSection />
    </div>
  );
};

export default IndexPage;