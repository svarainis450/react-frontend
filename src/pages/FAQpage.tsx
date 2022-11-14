import { GetStarted } from "../Components/Global/GetStarted";
import { FAQ } from "../Components/Global/FAQ";
import { PageTitle } from "../Components/Global/PageTitle";
import { faqItemsFull } from "../Components/Global/FAQ/constants";
import { Layout } from "../Components/Pages/Layout";

const FAQPage = () => {
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

export default FAQPage;
