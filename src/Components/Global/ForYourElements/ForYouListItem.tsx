import { Dispatch, SetStateAction, useState } from 'react';
import { useMediaQuery } from 'src/hooks';
import {
  fetchProjectById,
  sendFavProject,
} from 'src/state/reduxstate/projects/thunks';
import { Project, Statuses } from 'src/state/reduxstate/projects/types';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { deleteFavProject } from 'src/state/reduxstate/user/thunks';
import { icons } from 'src/utils/icons';
import { Loader } from '../Loader/Loader';
import { CategoryTag } from '../TrendsElements/CategoryTag/CategoryTag';
import { CategoryTags } from '../TrendsElements/types';
import { Typography } from '../Typography';
import './ForYouListItem.scss';

interface ForYouListItemProps {
  project: Project;
  showMobileListCallback: Dispatch<SetStateAction<boolean>>;
  isInFavorites?: boolean;
  isCheckingStats?: boolean;
  nameFilterValue?: string | null;
}

export const ForYouListItem: React.FC<ForYouListItemProps> = ({
  isInFavorites,
  project,
  showMobileListCallback,
  nameFilterValue,
  isCheckingStats,
}) => {
  const dispatch = useAppDispatch();
  const { img_url, name, type, id } = project;
  const [status, setStatus] = useState<Statuses>('idle');
  const [isRemoved, setIsRemoved] = useState(false);
  const { isTablet } = useMediaQuery();

  const hanldeAddOrRemoveBtn = (id: number) => {
    if (isInFavorites) {
      dispatch(deleteFavProject({ id, callBack: setStatus }));
      setIsRemoved(true);
    } else {
      dispatch(
        sendFavProject({
          id,
          callBack: setStatus,
        })
      );
    }
  };

  const handleCheckStatsBtn = (id: number) => {
    dispatch(fetchProjectById({ id }));
    showMobileListCallback(false);
  };

  if (isRemoved) return null;
  if (
    nameFilterValue &&
    !project.name
      .toLocaleLowerCase()
      .includes(nameFilterValue.toLocaleLowerCase())
  )
    return null;

  return (
    <div
      className={`for-you-list-item ${isCheckingStats ? 'checking' : ''}`}
      onClick={() => showMobileListCallback(false)}
    >
      <div className="flex-wrapper">
        <div>
          <img
            className="project-icon"
            src={img_url || icons.no_image}
            alt={name}
          />
        </div>
        <div>
          <Typography className="project-name">{name}</Typography>
          {/* @ts-ignore */}
          <CategoryTag isCaptionSizeTag tagTitle={CategoryTags[type]} />
        </div>
      </div>
      <div className={`buttons-wrapper ${isInFavorites ? '' : 'add-to-list'}`}>
        <button
          className={`check-stats-btn remove ${
            isInFavorites ? '' : 'add-to-list'
          }`}
          onClick={() => hanldeAddOrRemoveBtn(id)}
        >
          {status !== 'pending' ? (
            <>
              <img
                src={isInFavorites ? icons.remove : icons.add_to_list}
                alt="remove or add butn"
              />
              {(!isTablet || !isInFavorites) && (
                <span>{isInFavorites ? 'Remove' : 'Add to your list'}</span>
              )}
            </>
          ) : (
            <div className="loader-wrapper-list-item">
              <Loader width={16} height={16} />
            </div>
          )}
        </button>
        {isInFavorites && (
          <button
            className={`check-stats-btn ${isCheckingStats ? 'selected' : ''}`}
            onClick={() => handleCheckStatsBtn(id)}
          >
            {isCheckingStats ? 'Selected' : 'Check stats'}
          </button>
        )}
      </div>
    </div>
  );
};
