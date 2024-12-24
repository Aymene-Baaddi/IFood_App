import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'MenuItems',
    path: '/menuitems',
    icon: <FaIcons.FaUtensils/>,
    cName: 'nav-text'
  },
  {
    title: 'Customers',
    path: '/customers',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Orders',
    path: '/orders',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },

];