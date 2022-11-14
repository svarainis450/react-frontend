import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import { HeroTitle } from "../HeroTitle";
import { CompareFeaturesProps } from "./types";
import { LinkList } from "../../../types";
import { Button } from "../Button";

import trueImage from "../../../Assets/images/compareTrue.svg";
import falseImage from "../../../Assets/images/compareFalse.svg";

import "./CompareFeatures.scss";
import { useMoney } from "src/hooks";
import { useContext } from "react";
import { UserContext } from "src/state/userContext";
import { priceOptions } from "../PaymentOptions";

export const CompareFeatures = ({
  featuresList,
  className,
}: CompareFeaturesProps) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { currencySign } = useMoney();

  const handleSelect = (planKey: string) => {
    const plan = priceOptions["yearly"].find((p) => p.key === planKey);

    setUser((prev) => ({
      ...prev,
      selectedPlan: plan,
    }));

    navigate(LinkList.Checkout);
  };

  return (
    <div className={classNames("CompareFeatures", className)}>
      <HeroTitle className="CompareFeatures__hero" title="Compare features" />

      <div className="CompareFeatures__table-wrapper">
        <table className="CompareFeatures__table" cellSpacing="0">
          <tr className="CompareFeatures__heading-row">
            <th className="CompareFeatures__first-heading"></th>

            <th className="CompareFeatures__header">
              <p className="CompareFeatures__name">Potato Starter</p>
              <p className="CompareFeatures__occurrence">
                {currencySign}5 per month, paid annually
              </p>

              <div className="CompareFeatures__cta">
                <Button onClick={() => handleSelect("potato-starter-yearly")}>
                  Select plan
                </Button>
              </div>
            </th>

            <th className="CompareFeatures__header">
              <p className="CompareFeatures__name">Potato Pro</p>
              <p className="CompareFeatures__occurrence">
                {currencySign}15 per month, paid annually
              </p>

              <div className="CompareFeatures__cta">
                <Button
                  buttonType="success"
                  onClick={() => handleSelect("potato-pro-yearly")}
                >
                  Select plan
                </Button>
              </div>
            </th>
          </tr>

          {featuresList.map((item, index) => {
            return (
              <tr key={index}>
                <td className="CompareFeatures__feature-desc">{item.type}</td>
                <td>
                  {item.starter ? (
                    <img
                      className="CompareFeatures__feature-img"
                      src={trueImage}
                      alt="true"
                    />
                  ) : (
                    <img
                      className="CompareFeatures__feature-img"
                      src={falseImage}
                      alt="false"
                    />
                  )}
                </td>
                <td>
                  {item.pro ? (
                    <img
                      className="CompareFeatures__feature-img"
                      src={trueImage}
                      alt="true"
                    />
                  ) : (
                    <img
                      className="CompareFeatures__feature-img"
                      src={falseImage}
                      alt="false"
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};
