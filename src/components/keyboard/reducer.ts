import { IKeyPressed } from './';

export enum ActionName {
  OverwriteKeyPressData = 'OverwriteKeyPressData'
}

export interface Action {
  type: string;
  payload: Payload;
}

export interface Payload {
  keyPressed: string;
  keyData: IKeyPressed;
}

export default function reducer(state: any, action: Action) {
  switch (action.type) {
    case ActionName.OverwriteKeyPressData:
      const { payload } = action;
      state[payload.keyPressed] = payload.keyData;
      return state;
    default:
      return state;
  }
}
