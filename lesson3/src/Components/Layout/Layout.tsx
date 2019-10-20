import './Layout.scss';

import React from 'react';
import classNames from 'classnames';
import { Classes } from '@blueprintjs/core';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { GlobalState } from '../../Redux/Store';
import * as AppState from '../../Redux/AppState';

import Navbar from './Navbar';

const Layout: React.FC<LayoutProps> = ({
  useDarkMode,
  toggleTheme,
  children
}) => {
  const className = classNames({ [Classes.DARK]: useDarkMode });

  const onToggleTheme = (event: React.MouseEvent) => {
    event.preventDefault();

    if (toggleTheme) toggleTheme();
  };

  return (
    <main id="bb-layout" className={className}>
      <Navbar darkMode={useDarkMode} onToggleTheme={onToggleTheme} />
      {children}
    </main>
  );
};

//#region Props and Redux
interface ILayoutProps {
  children: JSX.Element;
}

interface IReduxProps {
  useDarkMode: boolean;
}

interface IDispatchProps {
  toggleTheme: () => AppState.TAction;
}

type LayoutProps = ILayoutProps & IReduxProps & IDispatchProps;

function MapStateToProps(state: GlobalState): IReduxProps {
  return {
    useDarkMode: state.appState.UseDarkMode
  };
}

function MapDispatchToProps(disaptch: Dispatch<AnyAction>): IDispatchProps {
  return bindActionCreators(
    { toggleTheme: AppState.Creators.ToggleTheme },
    disaptch
  );
}

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(Layout);
//#endregion
