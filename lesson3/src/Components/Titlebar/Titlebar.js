import React, { useCallback } from 'react';
import { useDocked } from 'openfin-react-hooks';
import { snapAndDock } from 'openfin-layouts';
import { OpenfinApiHelpers } from '../../Services';
import { Icon, Intent } from "@blueprintjs/core";

import './Titlebar.scss';

export default () => {
  const isDocked = useDocked();

  const onMinimizeClick = useCallback(async () => {
    const currentWindow = await OpenfinApiHelpers.getCurrentWindow();
    currentWindow.minimize();
  }, []);

  const onCloseClick = useCallback(async () => {
    const currentWindow = await OpenfinApiHelpers.getCurrentWindow();
    currentWindow.close();
  }, []);

  const onUndockClick = useCallback(async () => {
    await snapAndDock.undockWindow();
  }, []);

  return (
    <div className="titlebar">
      <div className="titlebar__icons">
        <Icon icon="minimize" iconSize = {Icon.SIZE_STANDARD}  intent={Intent.NONE}  onClick={onMinimizeClick}/>
        
        {isDocked[0] && (
          <div
            className="button-icon undock"
            onClick={onUndockClick}
            title="Undock"
          >
            &nbsp;
          </div>
        )}
        <Icon icon="cross" iconSize = {Icon.SIZE_STANDARD} intent={Intent.NONE}  onClick={onCloseClick}/>
      </div>
    </div>
  );
};
