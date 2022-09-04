import { Dispatch, SetStateAction, useState } from 'react';
import { fetchProjectById } from 'src/state/reduxstate/projects/thunks';
import { Project, Statuses } from 'src/state/reduxstate/projects/types';
import { useAppDispatch } from 'src/state/reduxstate/store';
import {
  deleteFromFavorites,
  sendFavProjectOrInfluencer,
} from 'src/state/reduxstate/user/thunks';
import { icons } from 'src/utils/icons';
import { Loader } from '../Loader/Loader';
import { CategoryTag } from '../TrendsElements/CategoryTag/CategoryTag';
import { Typography } from '../Typography';
import './ForYouListItem.scss';

interface ForYouListItemProps {
  project: Project;
  projectIDCallback?: Dispatch<SetStateAction<number | null>>;
  favProjectIdCallback?: Dispatch<SetStateAction<Project>>;
  isInFavorites?: boolean;
}

export const ForYouListItem: React.FC<ForYouListItemProps> = ({
  isInFavorites,
  project,
  projectIDCallback,
  favProjectIdCallback,
}) => {
  const dispatch = useAppDispatch();
  const { img, name, tag, id } = project;
  const [status, setStatus] = useState<Statuses>('idle');

  const hanldeAddOrRemoveBtn = (id: number) => {
    if (isInFavorites) {
      dispatch(
        deleteFromFavorites({ id, callBack: setStatus, fav_type: 'project' })
      );
    } else {
      dispatch(
        sendFavProjectOrInfluencer({
          id,
          fav_type: 'project',
          callBack: setStatus,
        })
      );
    }
  };

  const handleCheckStatsBtn = (id: number) => {
    dispatch(fetchProjectById({ id }));
    if (projectIDCallback) {
      projectIDCallback(id);
    }
  };

  return (
    <div className="for-you-list-item">
      <div className="flex-wrapper">
        <div>
          <img
            className="project-icon"
            src={img || icons.no_image}
            alt={name}
          />
        </div>
        <div>
          <Typography className="project-name">{name}</Typography>
          <CategoryTag tagTitle={tag.name} />
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
              {isInFavorites ? 'Remove' : 'Add to your list'}
            </>
          ) : (
            <div className="loader-wrapper-list-item">
              <Loader width={16} height={16} />
            </div>
          )}
        </button>
        {isInFavorites && (
          <button
            className="check-stats-btn"
            onClick={() => handleCheckStatsBtn(id)}
          >
            Check stats
          </button>
        )}
      </div>
    </div>
  );
};
