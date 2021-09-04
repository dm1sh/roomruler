export interface RoomDisplay {
  coordinates: { x: number; y: number };
  size: { w: number; h: number };
  title: string | number;
}

export interface RoomState {
  free: boolean;
}
