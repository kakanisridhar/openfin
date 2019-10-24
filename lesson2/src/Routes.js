import Members from './pages/members';
import Window3 from './pages/window3';

const Routes = [
    {
      path: 'members',
      component: Members,
      options: {
        defaultHeight: '400',
        defaultWidth: '400'
      }
    },
    {
      path: 'window3',
      component: Window3,
      options: {
        defaultHeight: '200',
        defaultWidth: '200'
      }
    }
  ];

export default Routes;