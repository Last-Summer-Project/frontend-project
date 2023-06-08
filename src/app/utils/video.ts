import axios from "axios";

export function sliderValueToVideoTime(duration: number, sliderValue: number) {
  return Math.round((duration * sliderValue) / 100);
}

export async function getBlobFromURL(url: string): Promise<Blob> {
  const response = await axios.get(url, {
    responseType: "blob", // Set the response type to blob
  });

  return response.data;
}
