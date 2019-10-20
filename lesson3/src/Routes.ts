import { IconName } from '@blueprintjs/icons';

export interface IRoute {
  to: string;
  text: string;
  icon: IconName;
  page: any;
}

const Routes: Array<IRoute> = [];

export default Routes;
