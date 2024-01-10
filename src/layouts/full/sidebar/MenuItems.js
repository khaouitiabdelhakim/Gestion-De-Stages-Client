import {
  IconBuildingSkyscraper , IconBriefcase , IconUserCheck , IconSchool ,IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus, IconUser,
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [

{
    navlabel: true,
    subheader: 'Acceuil',
  },

  {
    id: uniqueId(),
    title: 'Acceuil',
    icon: IconLayoutDashboard,
    href: '/Acceuil',
  },
  {
    id: uniqueId(),
    title: 'Stage',
    icon: IconBriefcase,
    href: '/stage',
  },
  {
    navlabel: true,
    subheader: 'Interne',
  },
  {
    id: uniqueId(),
    title: 'Professeurs',
    icon: IconUserCheck,
    href: '/Professeurs',
  },
  {
    id: uniqueId(),
    title: 'Etudiants',
    icon: IconSchool,
    href: '/Students',
  },
  {
    navlabel: true,
    subheader: 'Externe',
  },
  {
    id: uniqueId(),
    title: 'Encadrants',
    icon: IconUserCheck,
    href: '/Encadrants',
  },
  {
    id: uniqueId(),
    title: 'Entreprise',
    icon: IconBuildingSkyscraper,
    href: '/entreprise',
  },
  {
    navlabel: true,
    subheader: 'Admin',
  },
  {
    id: uniqueId(),
    title: 'Admin',
    icon: IconUserCheck,
    href: '/sample-page',
  },

  /*
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Utilities',
  },
  {
    id: uniqueId(),
    title: 'Typography',
    icon: IconTypography,
    href: '/ui/typography',
  },
  {
    id: uniqueId(),
    title: 'Shadow',
    icon: IconCopy,
    href: '/ui/shadow',
  },
  {
    navlabel: true,
    subheader: 'Auth',
  },
  {
    id: uniqueId(),
    title: 'Login',
    icon: IconLogin,
    href: '/auth/login',
  },
  {
    id: uniqueId(),
    title: 'Register',
    icon: IconUserPlus,
    href: '/auth/register',
  },
  {
    navlabel: true,
    subheader: 'Extra',
  },
  {
    id: uniqueId(),
    title: 'Icons',
    icon: IconMoodHappy,
    href: '/icons',
  },
  {
    id: uniqueId(),
    title: 'Sample Page',
    icon: IconAperture,
    href: '/sample-page',
  },
  {
    navlabel: true,
    subheader: 'Custom Menu',
  },
  {
    id: uniqueId(),
    title: 'Stage',
    icon: IconUser,
    href: '/stage',
  },
  {
    id: uniqueId(),
    title: 'Professeur',
    icon: IconUser,
    href: '/professeur',
  },
  {
    id: uniqueId(),
    title: 'Etudiant',
    icon: IconUser,
    href: '/etudiant',
  },
  {
    id: uniqueId(),
    title: 'Encadrant',
    icon: IconUser,
    href: '/encadrant',
  },
  {
    id: uniqueId(),
    title: 'Entreprise',
    icon: IconUser,
    href: '/entreprise',
  },
  */

];

export default Menuitems;
