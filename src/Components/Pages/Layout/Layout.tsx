import { useState, FC, ReactNode } from "react";

import { Header } from "../../Global/Header";
import { Footer } from "../../Global/Footer";
import { SideMenu } from "../../Global/SideMenu";

import "./Layout.scss";

export interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const [mainNavActive, setMainNavActive] = useState<boolean>(false);

  return (
    <div className="Layout">
      {/* sidenav mobile*/}
      <SideMenu isActive={mainNavActive} isActiveToggler={setMainNavActive} />

      <Header onMenuToggle={() => setMainNavActive((value) => !value)} />
      {children}
      <Footer />
    </div>
  );
};
