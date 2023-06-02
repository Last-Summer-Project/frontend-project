interface TimelapseResponseRaw {
  id: number;
  deviceId: number;
  status: Status;
  result: string;
  logStartDate: string;
  logEndDate: string;
  lastUpdated: string;
}

interface TimelapseResponse extends TimelapseResponseRaw {
  logStartDate: Date;
  logEndDate: Date;
  lastUpdated: Date;
}

interface TimelapseRequest {
  deviceId: number;
  startDate: Date;
  endDate: Date;
}

interface TimelapseRequestRaw extends TimelapseRequest {
  startDate: string;
  endDate: string;
}
