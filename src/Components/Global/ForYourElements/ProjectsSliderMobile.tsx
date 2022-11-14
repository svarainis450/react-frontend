import { Dispatch, SetStateAction } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Project } from 'src/state/reduxstate/projects/types';

import './ProjectsSliderMobile.scss';
import { Pagination } from 'swiper';
import { icons } from 'src/utils/icons';
import { Typography } from '../Typography';
import { useAppDispatch } from 'src/state/reduxstate/store';
import { fetchProjectById } from 'src/state/reduxstate/projects/thunks';

interface ProjectsSliderMobileProps {
  projects: Project[];
  favoriteProjects: Project[];
  projectIDCallback?: Dispatch<SetStateAction<number>>;
}

export const ProjectsSliderMobile: React.FC<ProjectsSliderMobileProps> = ({
  projects,
  favoriteProjects,
  projectIDCallback,
}) => {
  const dispatch = useAppDispatch();

  const handleCheckStatsBtn = (id: number) => {
    dispatch(fetchProjectById({ id }));
    // projectIDCallback(id);
  };
  return (
    <div className="for-you-projects-mob">
      <Typography className="for-you-projects-mob__title">
        Select one of most viewed
      </Typography>
      <Swiper
        spaceBetween={10}
        pagination={false}
        modules={[Pagination]}
        className="mySwiper"
        loop
        slidesPerView={8}
      >
        {favoriteProjects &&
          favoriteProjects.map((project) => (
            <SwiperSlide>
              <img
                onClick={() => handleCheckStatsBtn(project.id)}
                className="project-image"
                src={project.img_url || icons.no_image}
                alt={project.name}
              />
            </SwiperSlide>
          ))}
        {projects &&
          projects.map((project) => {
            const isInFavorites = favoriteProjects?.find(
              (item) => item.id === project.id
            );
            return (
              !isInFavorites && (
                <SwiperSlide>
                  <img
                    onClick={() => handleCheckStatsBtn(project.id)}
                    className="project-image"
                    src={project.img_url || icons.no_image}
                    alt={project.name}
                  />
                </SwiperSlide>
              )
            );
          })}
      </Swiper>
    </div>
  );
};
