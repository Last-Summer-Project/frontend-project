interface DeviceResponseRaw {
  id: number;
  dateCreated: string;
  lastEdited: string;
}

interface DeviceResponse extends DeviceResponseRaw {
  dateCreated: Date;
  lastEdited: Date;
}
