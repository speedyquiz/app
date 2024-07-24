// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    // icon: icon('ic_analytics'),
  },
  {
    title: 'member management',
    path: '/dashboard/membermanagement',
    // icon: icon('ic_user'),
  },
  {
    title: 'winner management',
    path: '/dashboard/winnermanagement',
    // icon: icon('ic_user'),
  },
  {
    title: 'tracks payouts',
    path: '/dashboard/trackpayout',
    // icon: icon('ic_user'),
  },
  {
    title: 'quiz category management',
    path: '/dashboard/quizcategorymanagement',
    // icon: icon('ic_user'),
  },
  {
    title: 'quiz question management',
    path: '/dashboard/quizquestionmanagement',
    // icon: icon('ic_user'),
  },
  {
    title: 'quiz template management',
    path: '/dashboard/quiztemplatemanagement',
    // icon: icon('ic_user'),
  },
  {
    title: 'carousel Image',
    path: '/dashboard/carouselImage',
    // icon: icon('ic_user'),
  },
  {
    // title: 'content management system',
    title: 'About SPEEDQUIZZ',
    path: '/dashboard/contentmanagementsystem',
    // icon: icon('ic_user'),
  },
  {
    title: 'FAQ\'s',
    path: '/dashboard/faq',
    // icon: icon('ic_user'),
  },
  {
    title: 'video',
    path: '/dashboard/video',
    // icon: icon('ic_user'),
  },
  {
    title: 'Points',
    path: '/dashboard/point',
    // icon: icon('ic_user'),
  },
  {
    title: 'my account',
    path: '/dashboard/myaccount',
    // icon: icon('ic_user'),
  },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
