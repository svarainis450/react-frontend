import { Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ArrowRightRounded } from 'src/Assets/icons/IconElements';
import { Project } from 'src/state/reduxstate/projects/types';
import { icons } from 'src/utils/icons';
import { images } from 'src/utils/images';
import { Loader } from '../../Loader/Loader';
import { CategoryTag } from '../../TrendsElements/CategoryTag/CategoryTag';
import { CategoryTags } from '../../TrendsElements/types';
import './AddProjectManually.scss';

export const AddProjectManually: React.FC = () => {
  const [urlValue, setUrlValue] = useState('');
  const [seeMore, setSeeMore] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const isReadyUrl = urlValue.length > 0;
  const isLoading = false;

  const demoProject: Project = {
    id: 1234,
    name: 'CrytpoPunks',
    started: '2017 01 21',
    img: images.bitkoin,
    tag: {
      name: CategoryTags.NFT,
      color: '',
    },
    rateData: {
      talkRate: 23,
      talkRateChanges: 2,
      positiveRatio: 22,
      bullRatio: 23,
    },
    description:
      'CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard. They have been featured in places like The New York Times, Christie’s of London, Art|Basel Miami, and The PBS NewsHour.',
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className={`add-project`}>
      {!isLoading && (
        <div className="add-project__titles">
          <img src={icons.add_project} alt="Add project manually" />
          <Typography>Add projects</Typography>
        </div>
      )}
      {!isLoading && (
        <form
          className="add-project__input-wrapper"
          onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}
        >
          <input
            type="text"
            placeholder="Paste project link"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUrlValue(e.target.value)
            }
          />
          <div
            onClick={() => setIsSuccess(true)}
            className={`add-project__input-wrapper__icon-wrapper ${
              isReadyUrl ? 'loading' : ''
            } `}
          >
            {!isSuccess && <ArrowRightRounded />}
            {isSuccess && <img src={icons.blue_checkmark} alt="success" />}
          </div>
        </form>
      )}
      {isSuccess && (
        <div className="add-project__project-details">
          <Typography className="add-project__project-details__mean-title">
            You mean this?
          </Typography>
          <div className="add-project__project-details__project-name">
            <img
              className="project-icon"
              src={demoProject.img}
              alt={demoProject.name}
            />
            <div>
              <Typography className="project-title">
                {demoProject.name}
              </Typography>
              <CategoryTag isCaptionSizeTag tagTitle={demoProject.tag.name} />
            </div>
            {demoProject.tag.name === CategoryTags.NFT && (
              <div className="verified-icon">
                <img src={icons.verified_checkmark} alt="Verified account" />
              </div>
            )}
          </div>
          <div className="add-project__project-details__desc-wrapper">
            <Typography className="project-desc">
              {seeMore
                ? demoProject.description
                : `${demoProject.description?.substring(0, 75)}...`}
            </Typography>
            <div
              onClick={() => setSeeMore(!seeMore)}
              className="add-project__project-details__desc-wrapper__see-more"
            >
              <Typography>See more</Typography>
              <img src={icons.arrow_down_blue} alt="see more" />
            </div>
          </div>
          <div className="add-project__project-details__params">
            <div>
              <Typography className="param-title">Project started</Typography>
              <Typography className="param-value">
                {demoProject.started}
              </Typography>
            </div>
            <div>
              <Typography className="param-title">Floor price</Typography>
              <Typography className="param-value">$ 0.092</Typography>
            </div>
            <div>
              <Typography className="param-title">Total volume</Typography>
              <Typography className="param-value"> 986.9K</Typography>
            </div>
            <div>
              <Typography className="param-title">Items</Typography>
              <Typography className="param-value">10K</Typography>
            </div>
            <div>
              <Typography className="param-title">Owners</Typography>
              <Typography className="param-value">3.4K</Typography>
            </div>
            <div>
              <Typography className="param-title">Best offer</Typography>
              <Typography className="param-value">----</Typography>
            </div>
          </div>
          <button className="add-project__project-details__add-project-button">
            <img src={icons.add_project} alt="Add project button" />
            <span>Add project</span>
          </button>
        </div>
      )}
      {isLoading && (
        <div className="add-project__loader-wrapper">
          <Loader width={58} height={58} />
          <Typography>
            Please wait while we analyze the social media of this account. We
            will add the project to your favorites if the data is available.
          </Typography>
        </div>
      )}
    </div>
  );
};
