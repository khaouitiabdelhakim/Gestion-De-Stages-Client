import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Stage = Loadable(lazy(() => import('../views/stage/stage')))
const Students = Loadable(lazy(() => import('../views/etudiants/Students')))
const Encadrants = Loadable(lazy(() => import('../views/encadrants/Encadrants')))
const Professeurs = Loadable(lazy(() => import('../views/professeurs/Professeurs')))
const Entreprise = Loadable(lazy(() => import('../views/entreprise/entreprise')))
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')))
const Icons = Loadable(lazy(() => import('../views/icons/Icons')))
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')))
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/Acceuil" /> },
      { path: '/Acceuil', exact: true, element: <Dashboard /> },
      { path: '/stage', exact: true, element: <Stage /> },
      { path: '/Students', exact: true, element: <Students /> },
      { path: '/Professeurs', exact: true, element: <Professeurs /> },
      { path: '/Encadrants', exact: true, element: <Encadrants /> },
      { path: '/entreprise', exact: true, element: <Entreprise /> },
      { path: '/profile', exact: true, element: <SamplePage /> },
      { path: '/', exact: true, element: <SamplePage /> },


      { path: '/icons', exact: true, element: <Icons /> },
      { path: '/ui/typography', exact: true, element: <TypographyPage /> },
      { path: '/ui/shadow', exact: true, element: <Shadow /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
