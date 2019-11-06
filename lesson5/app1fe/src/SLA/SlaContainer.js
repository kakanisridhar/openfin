import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Alignment,
    Button,
    Classes,
    H5,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    Switch,
} from "@blueprintjs/core";

import TitleBar from "../components/Titlebar";

export class SlaContainer extends Component {
    static propTypes = {

    }

    render() {
        return (
            
            <>
                <TitleBar></TitleBar>
                <Navbar className="bp3-dark">
                    <NavbarGroup align={Alignment.LEFT}>
                        <NavbarHeading>Blueprint</NavbarHeading>
                        <NavbarDivider />
                        <Button className={Classes.MINIMAL} icon="home" text="Home" />
                        <Button className={Classes.MINIMAL} icon="document" text="Files" />
                    </NavbarGroup>
                </Navbar>
            </>
        )
    }
}

export default SlaContainer
