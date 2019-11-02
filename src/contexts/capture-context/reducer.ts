export enum ActionName {
  AddPlaybackNote = 'AddPlaybackNote',
  ClearPlaybackNotes = 'ClearPlaybackNotes'
}

export interface Action {
  type: string;
  payload: object;
}

export default function reducer(state: any, action: Action) {
  switch (action.type) {
    case ActionName.AddPlaybackNote:
      return [...state, action.payload];
    case ActionName.ClearPlaybackNotes:
      return [];
    default:
      return [...state];
  }
}
