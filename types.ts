
export enum Screen {
  WELCOME = 'WELCOME',
  HOME = 'HOME',
  INVITATION = 'INVITATION',
  SCHEDULE = 'SCHEDULE'
}

export interface AppState {
  guestName: string;
  currentScreen: Screen;
  personalizedWish: string;
}
