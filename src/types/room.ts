export interface RoomDisplay {
  coordinates: { x: number; y: number };
  size: { w: number; h: number };
}

export interface RoomState {
  free: boolean;
}
