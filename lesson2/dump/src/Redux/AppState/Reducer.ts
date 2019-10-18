import { TAction, ActionTypes } from './Actions';

export interface IAppState {
	UseDarkMode: boolean;
}

export const InitialState: IAppState = {
	UseDarkMode: false,
};

export const Reducer = (state: IAppState = InitialState, action: TAction): IAppState => {
	switch (action.type) {
		case ActionTypes.ToggleTheme:
			return {
				...state,

				UseDarkMode: !state.UseDarkMode,
			};

		default:
			return state;
	}
};
