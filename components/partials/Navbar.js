import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import Link from "next/link";
import {navbarScroll} from "../../utils";
import { authenticationService } from "../../_services";

function Navbar() {
  console.log(authenticationService.currentUserValue);
  const [sidebar, setSidebar] = useState(false);
  const [sideBarMainList, setSideBarMainList] = useState([]);
  const [navbarMainList, setNavbarMainList] = useState("");

  const SidebarData = [
    {
      title: 'Home',
      path: '/',
      icon: <span className="material-icons">
          home
      </span>,
      cName: 'nav-text'
    },
    {
      title: 'Search',
      path: '/search',
      icon: <span className="material-icons">
          search
      </span>,
      cName: 'nav-text'
    },
    {
      title: 'Browse',
      path: '/browse',
      icon: <span className="material-icons">
          explore
      </span>,
      cName: 'nav-text'
    },
    {
      title: 'Images',
      path: '/images',
      icon: <span className="material-icons">
          image
      </span>,
      cName: 'nav-text'
    },
    {
      title: 'Sign In',
      path: '/sign-in',
      icon: <span className="material-icons">
          login
      </span>,
      cName: 'nav-text'
    },
    {
      title: 'Create Account',
      path: '/sign-up',
      icon: <span className="material-icons">
          person_add
      </span>,
      cName: 'nav-text'
    },
  ];
  
  const SidebarDataLoggedIn = [
    {
      title: 'Home',
      path: '/',
      icon: <span className="material-icons">
          home
      </span>,
      cName: 'nav-text'
    },
    {
      title: 'Search',
      path: '/search',
      icon: <span className="material-icons">
          search
      </span>,
      cName: 'nav-text'
    },
    {
      title: 'Browse',
      path: '/browse',
      icon: <span className="material-icons">
          explore
      </span>,
      cName: 'nav-text'
    },
    {
      title: 'Images',
      path: '/images',
      icon: <span className="material-icons">
          image
      </span>,
      cName: 'nav-text'
    },
    ,
    {
      title: 'Watch Later',
      path: '/watch-later',
      icon: <span className="material-icons">
          favorite
      </span>,
      cName: 'nav-text'
    },
    {
      title: 'Profile',
      path: '/profile',
      icon: <span className="material-icons">
          account_circle
      </span>,
      cName: 'nav-text'
    },
    {
      title: 'Logout',
      path: '/logout',
      icon: <span className="material-icons">
          logout
      </span>,
      cName: 'nav-text'
    },
  ];

  useEffect(() => {
    navbarScroll();
    if (authenticationService.currentUserValue) {
      setSideBarMainList(SidebarDataLoggedIn);
      setNavbarMainList(
        <ul>
          <li key="profile">
            <Link href='/profile'>
              <a className="btn btn-dark">
                PROFILE
              </a>
            </Link>
          </li>
        </ul>
      );
    } else {
      setSideBarMainList(SidebarData);
      setNavbarMainList(
        <ul>
          <li key="sign-in">
            <Link href='/sign-in'>
              <a className="btn btn-dark">
                SIGN IN
              </a>
            </Link>
          </li>
          <li key="sign-up">
            <Link href='/sign-up' className="btn btn-dark">
              <a>
                CREATE ACCOUNT
              </a>
            </Link>
          </li>
        </ul>
      );
    }
  }, [])

  const showSidebar = () => setSidebar(!sidebar);

  const renderSideBar = () => {
    return sideBarMainList.map((item, index) => {
      return (
        <li key={item.title} className={item.cName}>
            <Link href={item.path}>
              <a>
                {item.icon}
                <span>{item.title}</span>
              </a>
            </Link>
        </li>
      );
    })
  }

  const renderMenuRight = () => {
    return navbarMainList;
  }

  return (
    <>
        <div className='navbar' id="navbar">
          <div className="container-fluid">
          <div className="navbar-menu-left">
            <div className="navbar-menu-toggle">
              <Link href='#'>
                <a className='menu-bars'>
                  <span className="material-icons" onClick={showSidebar}>
                      menu
                  </span>
                </a>
              </Link>
            </div>

            <div className="navbar-menu-brand">
              <Link href='/'>
                <a>
                  <h2>MOVIE<span className="text-color-primary">GO</span></h2>
                </a>
              </Link>
            </div>
          </div>

          <div className="navbar-menu-right">
            {renderMenuRight()}
          </div>
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link href='#'>
                <a className='menu-bars'>
                  <span className="material-icons">
                      close
                  </span>
                </a>
              </Link>
            </li>
            {renderSideBar()}
          </ul>
        </nav>
    </>
  );
}

export default Navbar;