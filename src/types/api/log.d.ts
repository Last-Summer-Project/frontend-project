interface LogResponseRaw {
  deviceId: number;
  humidity: number;
  temperature: number;
  imageUrl: string;
  detection: Detection;
  timestamp: string;
}

interface LogResponse extends LogResponseRaw {
  timestamp: Date
}

interface Detection {
  status: Status
  result?: string;
}
