export enum ActionTypes {
	ToggleTheme = 'ToggleTheme',
}

interface IAppStateAction {
	type: ActionTypes;
}

export type TAction = IAppStateAction;

export const Creators = {
	ToggleTheme: (): TAction => ({
		type: ActionTypes.ToggleTheme,
	}),
};
