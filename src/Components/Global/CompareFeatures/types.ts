import { BoxProps } from "@mui/system";

export interface CompareFeaturesProps {
  featuresList: Array<{
    type: string,
    starter: boolean,
    pro: boolean,
  }>;
  className?: string;
}