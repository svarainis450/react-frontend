import classNames from "classnames";
import ReactPlayer from "react-player/youtube";

import { VideoProps } from "./types";

import "./Video.scss";

export const Video = ({ url, className }: VideoProps) => {
  return (
    <div className={classNames("Video", className)}>
      <ReactPlayer url={url} width="100%" height="100%" />
    </div>
  );
};
