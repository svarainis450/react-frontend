import { GetStarted } from '../../Global/GetStarted';
import { FAQ } from '../../Global/FAQ';
import { PageTitle } from '../../Global/PageTitle';
import { faqItemsFull } from '../../Global/FAQ/constants';
import { Layout } from '../Layout';

export const FAQpage = () => {
  return (
    <Layout>
      <div className="FAQpage">
        <PageTitle title="Frequently Asked Questions" />
        <FAQ noTitle faqItems={faqItemsFull} />
        <GetStarted />
      </div>
    </Layout>
  );
};
