import { useContext } from "react"
import { UserContext } from "src/state/userContext"

export const useFunnel = () => {
  const { user } = useContext(UserContext);
  const funnel = user.funnel
  
  return {
    funnel,
    getMembershipTitle: () => {
      let title = 'Easiest way to find the next x100 Gem';

      switch(funnel) {
        case 1:
          title = "Don't miss the train. Discover the next Bitcoin or Doge coin early."
          break;
        case 2:
          title = "#1 Best Analytics Platform, According to Thousands of Crypto & NFT traders"
          break;
        case 3:
          title = "Become a smart investor & gain your financial freedom"
          break;
        case 4:
          title = "All the features you need to become the successful crypto investor"
          break;
      }
      
      return title;
    }
  }
}