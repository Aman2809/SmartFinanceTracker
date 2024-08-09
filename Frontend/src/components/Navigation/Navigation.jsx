import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import avatar from '../../img/avatar.png'; // Replace with your avatar image path
import { signout } from '../../utils/Icon';
import { menuItems } from '../../utils/menuItems'; // Replace with your menu items array
import { doLogout, getCurrentUser, isLoggedIn } from '../../jwtAuth/auth';

function Navigation({ active, setActive }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [login, setLogin] = useState(false);
  const [user,setUser]=useState(null);

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUser);
  }, [login]);

  const handleSignOut = () => {
    doLogout(() => {
      setLogin(false);
      navigate("/");
    });
  };

  const handleNavigation = (link) => {
    navigate(link);
  };

  const currentPath = location.pathname;
  const activeItem = menuItems.find(item => item.link === currentPath)?.id;

  return (
    <NavStyled>
      <div className="user-con">
        <img src={avatar} alt="User Avatar" />
        <div className="text">
        {/* {user ? <p>{user.email}</p> : <p>Loading...</p>} */}
        <h2>Aman</h2>
          <p>Your Money</p>
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => handleNavigation(item.link)}
            className={activeItem === item.id ? 'active' : ''}
          >
            {item.icon}
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
      <div className="bottom-nav">
        <li onClick={handleSignOut} className="menu-item">
          {signout} Sign Out
        </li>
      </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 300px;
  height: 100vh; /* Full height of the window */
  background: rgba(252, 246, 249, 0.78);
  border: 20px solid transparent; /* Make the border transparent */
  background-clip: padding-box; /* Ensure background doesn't cover the border area */
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #FFFFFF;
      padding: .2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
    h2 {
      color: rgba(34, 34, 96, 1);
    }
    p {
      color: rgba(34, 34, 96, .6);
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: .6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all .4s ease-in-out;
      color: rgba(34, 34, 96, .6);
      padding-left: 1rem;
      position: relative;
      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all .4s ease-in-out;
      }
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;
    i {
      color: rgba(34, 34, 96, 1) !important;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }

  .bottom-nav {
    li {
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 1rem 0;
      i {
        margin-right: 1rem;
      }
    }
  }

  .menu-item {
    display: grid;
    grid-template-columns: 40px auto;
    align-items: center;
    margin: .6rem 0;
    font-weight: 500;
    cursor: pointer;
    transition: all .4s ease-in-out;
    color: rgba(34, 34, 96, .6);
    padding-left: 1rem;
    position: relative;
    i {
      color: rgba(34, 34, 96, 0.6);
      font-size: 1.4rem;
      transition: all .4s ease-in-out;
    }
  }
`;


export default Navigation;
