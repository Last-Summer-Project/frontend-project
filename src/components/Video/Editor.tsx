import { createFFmpeg } from "@ffmpeg/ffmpeg";
import { useEffect, useRef, useState } from "react";
import { Radio, Select, Slider, Spin } from "antd";
import VideoPlayer from "./Player";
import ConversionButton from "./ConversionButton";
import { PlayerReference, PlayerState } from "video-react";
import { VIDEO_HOST } from "~/const/url";
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
  const [videoFile, setVideoFile] = useState<Blob>();
  const [videoPlayerState, setVideoPlayerState] = useState<PlayerState>();
  const [videoPlayer, setVideoPlayer] = useState<PlayerReference>();
  const [sliderValues, setSliderValues] = useState<[number, number]>([0, 100]);
  const [audioValue, setAudioValue] = useState("");
  const [processing, setProcessing] = useState(false);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // loading ffmpeg on startup
    ffmpeg.load().then(() => {
      setFFmpegLoaded(true);
    });

    // download img
    if (videoFileUrl && videoUrl) {
      getBlobFromURL(videoFileUrl).then((blob) => {
        setVideoFile(blob);
      });
    }
  }, []);

  useEffect(() => {
    const min = sliderValues[0];
    // when the slider values are updated, updating the
    // video time
    if (min !== undefined && videoPlayerState && videoPlayer) {
      videoPlayer.seek(sliderValueToVideoTime(videoPlayerState.duration, min));
    }
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
  }, [videoPlayerState]);

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
        tip={!ffmpegLoaded ? "Waiting for FFmpeg to load..." : "Processing..."}
      >
        <div>
          {videoFile ? (
            <VideoPlayer
              src={videoFileUrl!}
              onPlayerChange={(videoPlayer) => {
                setVideoPlayer(videoPlayer);
              }}
              onChange={(videoPlayerState) => {
                setVideoPlayerState(videoPlayerState);
              }}
            />
          ) : (
            <h1>{!videoFileUrl ? "Invalid video url" : "Loading..."}</h1>
          )}
        </div>
        <div className={"slider-div"}>
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
        <div>
          <h3>오디오 추가</h3>
          <Radio.Group
            onChange={(event) => {
              setAudioValue(event.target.value);
            }}
            defaultValue=""
          >
            {Object.entries(AUDIO_TEMPLATE_LIST).map(([key, value]) => (
              <Radio value={value}>{key}</Radio>
            ))}
          </Radio.Group>
        </div>
        <div className={"conversion-div"}>
          <ConversionButton
            outputFileName={outputFileName}
            onConversionStart={() => {
              setProcessing(true);
            }}
            onConversionEnd={() => {
              setProcessing(false);
            }}
            ffmpeg={ffmpeg}
            videoPlayerState={videoPlayerState!}
            sliderValues={sliderValues}
            audioValue={audioValue}
            videoFile={videoFile!}
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
