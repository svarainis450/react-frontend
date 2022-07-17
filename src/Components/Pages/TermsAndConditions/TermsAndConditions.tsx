import { PageTitle } from '../../Global/PageTitle';
import { Layout } from '../Layout';
import { TermsContent } from './TermsContent';

import './TermsAndConditions.scss';

export const TermsAndConditions: React.FC = () => (
  <Layout>
    <div className="TermsAndConditions">
      <PageTitle title="Terms & Conditions" />
      <TermsContent />
    </div>
  </Layout>
);
