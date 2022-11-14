import { PageTitle } from "../../Components/Global/PageTitle";
import { Layout } from "../../Components/Pages/Layout";
import { TermsContent } from "./TermsContent";

import "./TermsAndConditions.scss";

const TermsAndConditions: React.FC = () => (
  <Layout>
    <div className="TermsAndConditions">
      <PageTitle title="Terms & Conditions" />
      <TermsContent />
    </div>
  </Layout>
);

export default TermsAndConditions;
