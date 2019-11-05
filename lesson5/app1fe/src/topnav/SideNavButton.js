import React, { useState } from 'react';
import { Button, Intent  } from '@blueprintjs/core';
import { OpenfinApiHelpers } from '../services';

function SideNavButton() {
    const [sideNavWin, setSideNavWin] = useState();
    const [sideNavVisible, setNavVisibility] = useState(false);
    const _intent = sideNavVisible ?  Intent.SUCCESS : Intent.NONE;
    const toggleNavVisibility = async () => {
        let visible = !sideNavVisible;
        if(visible && sideNavWin == null) {
            let _win  = await OpenfinApiHelpers.launchScreen("SideNav");
            setSideNavWin(_win);
        }
        
        if(sideNavWin != null) {
            setNavVisibility(visible);
            if(visible) {
                sideNavWin.show();
                sideNavWin.focus();
            } else {
                sideNavWin.hide();
            }
        }
    };
    return (
        <Button icon="menu" intent={_intent} onClick={toggleNavVisibility}></Button>
    )
}

export default SideNavButton;