import { useNavigate } from 'react-router-dom';
import { LinkList } from 'src/types';

export const useNavigateHook = (linkTo: LinkList) => {
  const navigate = useNavigate();
  navigate(linkTo);
};
