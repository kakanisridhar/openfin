import React from 'react';
import classNames from 'classnames';

import { NavLink } from 'react-router-dom';
import { Classes, Tag } from '@blueprintjs/core';

import { IRoute } from 'Routes';

const NavItem: React.FC<INavItemProps> = ({ to, icon, text, active }) => {
	return (
		<NavLink exact to={to} style={{ margin: '0 10px' }}>
			<Tag icon={icon} interactive minimal large className={classNames({ [Classes.INTENT_PRIMARY]: active })}>
				{text}
			</Tag>
		</NavLink>
	);
};

interface INavItemProps extends IRoute {
	active: boolean;
}

export default NavItem;
