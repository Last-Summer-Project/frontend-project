import { Button } from "antd";
import { fetchFile, FFmpeg } from "@ffmpeg/ffmpeg";
import { PlayerState } from "video-react";
import { AnyFunction } from "~/types";
import { getBlobFromURL, sliderValueToVideoTime } from "~/app/utils/video";
import { AUDIO_TEMPLATE_HOST } from "~/const/url";

interface ConversionButtonProps {
  videoPlayerState: PlayerState;
  sliderValues: [number, number];
  audioValue: string;
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
  audioValue,
  videoFile,
  ffmpeg,
  outputFileName = "output.mp4",
  onConversionStart,
  onConversionEnd,
  onResultCreated,
}: ConversionButtonProps) {
  const convertToTarget = async () => {
    // starting the conversion process
    onConversionStart?.(true);

    // values
    const inputVideoFileName = "input.mp4";
    const isAudioInput = audioValue !== "";

    // writing the video file to memory
    ffmpeg.FS("writeFile", inputVideoFileName, await fetchFile(videoFile));

    const [min, max] = sliderValues;
    const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
    const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

    // build command args
    const command = ["-ss", `${minTime}`, "-i", inputVideoFileName];

    if (isAudioInput) {
      const inputAudioFileName = "input.mp3";
      const audio = await getBlobFromURL(AUDIO_TEMPLATE_HOST + audioValue);
      ffmpeg.FS("writeFile", inputAudioFileName, await fetchFile(audio));

      // add audio to video
      command.push(
        "-ss",
        "0",
        "-i",
        inputAudioFileName,
        "-c:v",
        "copy",
        "-map",
        "0:v",
        "-map",
        "1:a"
      );
    } else {
      // just copy...
      command.push("-c:v", "copy");
    }

    command.push("-to", `${maxTime}`, "-shortest", outputFileName);

    // result
    console.log("FFMpeg command: " + command.join(" "));

    // cutting the video and converting it to GIF with a FFMpeg command
    await ffmpeg.run(...command);

    // reading the resulting file
    const data = ffmpeg.FS("readFile", outputFileName);

    // converting the GIF file created by FFmpeg to a valid image URL
    const resultUrl = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );
    onResultCreated?.(resultUrl);

    // ending the conversion process
    onConversionEnd?.(false);
  };

  return <Button onClick={() => convertToTarget()}>인코딩 시작 및 다운로드</Button>;
}

export default ConversionButton;
