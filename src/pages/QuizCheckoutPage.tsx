import { AllFeaturesBlock } from "src/Components/Global/AllFeaturesBlock";
import { FAQ, faqItems } from "src/Components/Global/FAQ";
import { Footer } from "src/Components/Global/Footer";
import { GetStarted } from "src/Components/Global/GetStarted";
import { Reasoning } from "src/Components/Global/Reasoning";
import { SliderBigBlock } from "src/Components/Global/SliderBigBlock";
import { SliderPhoneBlock } from "src/Components/Global/SliderPhoneBlock";
import { SourcesBlock } from "src/Components/Global/SourcesBlock";
import { TwoSideBlock } from "src/Components/Global/TwoSideBlock";
import { HeaderWithImage } from "src/Components/layouts/HeaderWithImage/HeaderWithImage";
import { LinkList } from "src/types";
import graphImg from "src/Assets/images/graph.png";
import { QuizCheckoutHero } from "src/Components/layouts/QuizCheckoutHero";
import { FC } from "react";
import { SelectedPlan } from "src/state/reduxstate/user/types";
import styled from "styled-components";
import { Button } from "src/Components/Global/Button";

const QuizCheckoutPage: FC<{
  products: Record<3 | 6 | 12, SelectedPlan>;
}> = ({ products }) => {
  const handleButtonClick = () => {
    const el = document.getElementById("checkout__plan-selection");

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <HeaderWithImage>
        <ButtonStyled onClick={handleButtonClick}>
          Choose your plan
        </ButtonStyled>
      </HeaderWithImage>
      <QuizCheckoutHero products={products} />
      <SliderPhoneBlock />
      <AllFeaturesBlock />
      <SourcesBlock />
      <TwoSideBlock
        title="Track sentiment, correlate with price"
        subtitle="Social sentiment has been shown to be useful in predicting whether Crypto & NFT prices will increase or decrease."
        ctaText="Get started"
        url={LinkList.Pricing}
        subText="Click here for scientific information about sentiment tracking"
        subUrl="https://jfin-swufe.springeropen.com/articles/10.1186/s40854-022-00352-7"
        img={graphImg}
        className="Frontpage__graphBlock"
      />

      <Reasoning />
      <SliderBigBlock />
      <GetStarted />
      <TwoSideBlock
        title="Get the first row ticket now"
        subtitle="Join thousands who've already invested by copying the leading industry traders and crypto experts in our community."
        ctaText="Try 1 Month For $5"
        url={LinkList.Pricing}
      />
      <FAQ faqItems={faqItems} />
      <Footer />
    </>
  );
};

export default QuizCheckoutPage;

const ButtonStyled = styled(Button)`
  padding: 0 0.75rem !important;
  height: 2.1875rem !important;
`;
