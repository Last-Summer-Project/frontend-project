import { Button } from "antd";
import { fetchFile, FFmpeg } from "@ffmpeg/ffmpeg";
import { PlayerState } from "video-react";
import { AnyFunction } from "~/types";
import { sliderValueToVideoTime } from "~/app/utils/video";

interface ConversionButtonProps {
  videoPlayerState: PlayerState;
  sliderValues: [number, number];
  videoFile: File | Blob;
  ffmpeg: FFmpeg;
  outputFileName: string;
  onConversionStart?: AnyFunction;
  onConversionEnd?: AnyFunction;
  onResultCreated?: AnyFunction;
}

function ConversionButton({
  videoPlayerState,
  sliderValues,
  videoFile,
  ffmpeg,
  outputFileName = "output.mp4",
  onConversionStart = () => {},
  onConversionEnd = () => {},
  onResultCreated = () => {},
}: ConversionButtonProps) {
  const convertToTarget = async () => {
    // starting the conversion process
    onConversionStart(true);

    const inputFileName = "input.mp4";

    // writing the video file to memory
    ffmpeg.FS("writeFile", inputFileName, await fetchFile(videoFile));

    const [min, max] = sliderValues;
    const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
    const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

    // cutting the video and converting it to GIF with a FFMpeg command
    await ffmpeg.run(
      "-i",
      inputFileName,
      "-ss",
      `${minTime}`,
      "-to",
      `${maxTime}`,
      outputFileName
    );

    // reading the resulting file
    const data = ffmpeg.FS("readFile", outputFileName);

    // converting the GIF file created by FFmpeg to a valid image URL
    const resultUrl = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );
    onResultCreated(resultUrl);

    // ending the conversion process
    onConversionEnd(false);
  };

  return <Button onClick={() => convertToTarget()}>인코딩 시작</Button>;
}

export default ConversionButton;
