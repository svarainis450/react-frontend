import { PageTitle } from '../../Global/PageTitle';
import { Layout } from '../Layout';
import './PrivacyPolicy.scss';
import { PrivacyPolicyContent } from './PrivacyPolicyContent';

export const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="PrivacyPolicy">
        <PageTitle title="Privacy Policy" />
        <PrivacyPolicyContent />
      </div>
    </Layout>
  );
};
