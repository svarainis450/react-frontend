export interface CommitmentsProps {
  commitmentsList: Array<{
    icon: string,
    name: string,
    text: string
  }>;
  className?: string;
}