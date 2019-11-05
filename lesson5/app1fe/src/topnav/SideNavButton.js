import React, { Component } from 'react'
import { OpenfinApiHelpers } from '../services';

import { Button,Intent } from "@blueprintjs/core";

class SideNavButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sideNavWin: null,
            sideNavVisible: false
        }
        this.toggleNavVisibility = this.toggleNavVisibility.bind(this);
    }
        
    async toggleNavVisibility() {
        let visible = !this.state.sideNavVisible;
        let sideNavWin = this.state.sideNavWin;
        if(visible && sideNavWin == null) {
            sideNavWin  = await OpenfinApiHelpers.launchScreen("SideNav");
            this.setState({sideNavWin: sideNavWin});
        }
        
        if(sideNavWin != null) {
            this.setState({sideNavVisible: visible});
            if(visible) {
                sideNavWin.show();
                sideNavWin.focus();
            } else {
                sideNavWin.hide();
            }
        }
    };

    render() {
        const _intent = this.state.sideNavVisible ?  Intent.SUCCESS : Intent.NONE;
        return (
            <>
                <Button icon="menu" intent={_intent} onClick={this.toggleNavVisibility}></Button>
            </>
        )
    }
}

export default SideNavButton;