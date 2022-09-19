import { Dispatch, SetStateAction, useState } from 'react';
import { tags } from 'src/state/reduxstate/projects/types';
import { icons } from 'src/utils/icons';
import {
  Typography,
  TypographyVariant,
  TypographyWeight,
} from '../../Typography';
import { CategoryTags } from '../types';
import './CustomSelectDropdown.scss';

interface CustomSelectDropdownProps {
  categoryCallBack: Dispatch<SetStateAction<CategoryTags | undefined>>;
}

export const CustomSelectDropdown: React.FC<CustomSelectDropdownProps> = ({
  categoryCallBack,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState<CategoryTags | null>(null);

  const handleOptionSelection = (option: CategoryTags) => {
    setSelected(option);
    setShowOptions(false);
    categoryCallBack(option);
  };

  return (
    <div className="custom-select">
      <div
        className={`custom-select__desc ${showOptions ? 'show' : ''}`}
        onClick={() => setShowOptions(!showOptions)}
      >
        <Typography
          className="custom-select__desc__title"
          variant={TypographyVariant.DEFAULT}
          weight={TypographyWeight.MEDIUM}
        >
          {selected ? selected : 'Select Category'}
        </Typography>
        <img
          className={`custom-select__desc__arrow ${
            showOptions ? 'selected' : ''
          }`}
          src={icons.arrow_down}
          alt="Select Category"
        />
      </div>
      {showOptions && (
        <div className="custom-select__options">
          {tags.map((item, index) => (
            <div
              key={index}
              className={`custom-select__options__option ${
                selected === item ? 'selected' : ''
              }`}
              onClick={() => handleOptionSelection(item)}
            >
              <Typography className="custom-select__options__option__value">
                {item}
              </Typography>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
