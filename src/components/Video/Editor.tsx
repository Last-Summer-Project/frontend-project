import { createFFmpeg } from "@ffmpeg/ffmpeg";
import { useEffect, useRef, useState } from "react";
import { Radio, Slider, Spin } from "antd";
import VideoPlayer from "./Player";
import ConversionButton from "./ConversionButton";
import { PlayerReference, PlayerState } from "video-react";
import { AUDIO_TEMPLATE_HOST, VIDEO_HOST } from "~/const/url";
import { getBlobFromURL, sliderValueToVideoTime } from "~/app/utils/video";
import { AUDIO_TEMPLATE_LIST } from "~/const/shared";

const ffmpeg = createFFmpeg({ log: true });

interface VideoEditorProps {
  videoUrl?: string;
  outputFileName: string;
}

function VideoEditor({ videoUrl, outputFileName }: VideoEditorProps) {
  const videoFileUrl = videoUrl ? VIDEO_HOST + videoUrl : undefined;
  const [ffmpegLoaded, setFFmpegLoaded] = useState(false);
  const [videoFile, setVideoFile] = useState<Blob | undefined>();
  const [videoPlayerState, setVideoPlayerState] = useState<
    PlayerState | undefined
  >();
  const [videoPlayer, setVideoPlayer] = useState<PlayerReference | undefined>();
  const [sliderValues, setSliderValues] = useState<[number, number]>([0, 100]);
  const [audioValue, setAudioValue] = useState("");
  const [processing, setProcessing] = useState(false);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // loading ffmpeg on startup
    setFFmpegLoaded(ffmpeg.isLoaded());
    if (!ffmpegLoaded) {
      ffmpeg.load().then(() => {
        setFFmpegLoaded(true);
      });
    }
  }, [ffmpegLoaded]);

  useEffect(() => {
    // download video
    if (videoFileUrl) {
      getBlobFromURL(videoFileUrl).then((blob) => {
        setVideoFile(blob);
      });
    }
  }, [videoFileUrl]);

  useEffect(() => {
    const min = sliderValues[0];
    // when the slider values are updated, updating the
    // video time
    if (min !== undefined && videoPlayerState && videoPlayer) {
      videoPlayer.seek(sliderValueToVideoTime(videoPlayerState.duration, min));
    }

    // This should be only triggered on slider values.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderValues]);

  useEffect(() => {
    if (videoPlayer && videoPlayerState) {
      // allowing users to watch only the portion of
      // the video selected by the slider
      const [min, max] = sliderValues;

      const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
      const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

      if (videoPlayerState.currentTime < minTime) {
        videoPlayer.seek(minTime);
      }
      if (videoPlayerState.currentTime > maxTime) {
        // looping logic
        videoPlayer.seek(minTime);
      }
    }
  }, [videoPlayerState, sliderValues, videoPlayer]);

  useEffect(() => {
    // when the current videoFile is removed,
    // restoring the default state
    if (!videoFile) {
      setVideoPlayerState(undefined);
      setSliderValues([0, 100]);
      setVideoPlayerState(undefined);
    }
  }, [videoFile]);

  return (
    <div>
      <Spin
        spinning={processing || !ffmpegLoaded}
        tip={
          !ffmpegLoaded
            ? "FFMpeg가 로딩되기를 기다리고 있습니다..."
            : "처리중입니다..."
        }
      >
        <div>
          {videoFile && videoFileUrl ? (
            <VideoPlayer
              videoSrc={videoFileUrl}
              onPlayerChange={(videoPlayer) => {
                setVideoPlayer(videoPlayer);
              }}
              onChange={(videoPlayerState) => {
                setVideoPlayerState(videoPlayerState);
              }}
            />
          ) : (
            <h1>{!videoFileUrl ? "Invalid video url" : "비디오 로딩중..."}</h1>
          )}
        </div>
        <div className={"pb-1 pt-1 slider-div"}>
          <h3>비디오 자르기</h3>
          <Slider
            disabled={!videoPlayerState}
            value={sliderValues}
            range={true}
            onChange={(values) => {
              setSliderValues(values);
            }}
            tooltip={{
              formatter: null,
            }}
          />
        </div>
        <div className={"pb-1 pt-1 audio-div"}>
          <h3>오디오 추가</h3>
          <Radio.Group
            disabled={!videoPlayerState}
            onChange={(event) => {
              setAudioValue(event.target.value);
            }}
            defaultValue=""
          >
            {Object.entries(AUDIO_TEMPLATE_LIST).map(([key, value]) => (
              <Radio value={value} key={key}>
                {key}
              </Radio>
            ))}
          </Radio.Group>
          {audioValue && (
            <div className="pt-1 pb-1">
              <h5>오디오 프리뷰</h5>
              <audio src={AUDIO_TEMPLATE_HOST + audioValue} controls />
            </div>
          )}
        </div>
        <div className={"pb-1 pt-1 conversion-div"}>
          <ConversionButton
            outputFileName={outputFileName}
            onConversionStart={() => {
              setProcessing(true);
            }}
            onConversionEnd={() => {
              setProcessing(false);
            }}
            ffmpeg={ffmpeg}
            videoPlayerState={videoPlayerState}
            sliderValues={sliderValues}
            audioValue={audioValue}
            videoFile={videoFile}
            onResultCreated={(resUrl) => {
              const a = downloadRef?.current;
              if (!a) return;
              a.href = resUrl;
              a.click();
            }}
          />

          <a
            hidden
            ref={downloadRef}
            download={outputFileName}
            className={"ant-btn ant-btn-default"}
          >
            Download
          </a>
        </div>
      </Spin>
    </div>
  );
}

export default VideoEditor;
