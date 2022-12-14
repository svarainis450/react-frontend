import { PageTitle } from "../../Components/Global/PageTitle";
import { Video } from "../../Components/Global/Video";
import { Layout } from "../../Components/Pages/Layout";

import "./DemoPage.scss";

const DemoPage = () => {
  return (
    <Layout>
      <div className="DemoPage">
        <PageTitle
          className="DemoPage__title"
          title="All-in-one platform to discover the next x100 crypto opportunity"
          subtitle="Potato makes it easier than ever to track top crypto influencersâ€™ picks and stay ahead of trading trends"
        />

        <div className="DemoPage__content">
          <Video
            url="https://www.youtube.com/watch?v=3HKMhBrdWKY"
            className="DemoPage__video desktop"
          />
          <Video
            url="https://www.youtube.com/watch?v=wDCCw6a-ruA"
            className="DemoPage__video mobile"
          />
        </div>
      </div>
    </Layout>
  );
};

export default DemoPage;
