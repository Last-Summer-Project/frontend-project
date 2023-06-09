import {
  BigPlayButton,
  ControlBar,
  LoadingSpinner,
  Player,
  PlayerReference,
  PlayerState,
  PlayToggle,
} from "video-react";
import "video-react/dist/video-react.css";
import { useEffect, useState } from "react";
import { AnyFunction } from "~/types";
interface Prop {
  videoSrc: string;
  onPlayerChange?: AnyFunction;
  onChange?: AnyFunction;
  startTime?: number;
}

const VideoPlayer = ({
  videoSrc,
  onChange,
  onPlayerChange,
  startTime = undefined,
}: Prop) => {
  const [player, setPlayer] = useState<PlayerReference | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);

  useEffect(() => {
    if (playerState) {
      onChange?.(playerState);
    }
  }, [playerState, onChange]);

  useEffect(() => {
    onPlayerChange?.(player);

    if (player) {
      player.subscribeToStateChange(setPlayerState);
    }
  }, [player, onPlayerChange]);

  return (
    <div className={"video-player"}>
      <Player
        ref={(player) => {
          setPlayer(player);
        }}
        startTime={startTime}
      >
        <source src={videoSrc} />
        <BigPlayButton position="center" />
        <LoadingSpinner />
        <ControlBar autoHide={false} disableDefaultControls={true}>
          <PlayToggle />
        </ControlBar>
      </Player>
    </div>
  );
};

export default VideoPlayer;
