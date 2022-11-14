import { PageTitle } from "../../Components/Global/PageTitle";
import { Layout } from "../../Components/Pages/Layout";
import "./PrivacyPolicy.scss";
import { PrivacyPolicyContent } from "./PrivacyPolicyContent";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="PrivacyPolicy">
        <PageTitle title="Privacy Policy" />
        <PrivacyPolicyContent />
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
