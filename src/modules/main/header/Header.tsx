import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toggleControlSidebar, toggleSidebarMenu} from '@app/store/reducers/ui';


import UserDropdown from '@app/modules/main/header/user-dropdown/UserDropdown';

const Header = () => {
  const dispatch = useDispatch();
  const navbarVariant = useSelector((state: any) => state.ui.navbarVariant);
  const headerBorder = useSelector((state: any) => state.ui.headerBorder);

  const handleToggleMenuSidebar = () => {
    dispatch(toggleSidebarMenu());
  };


  const getContainerClasses = useCallback(() => {
    let classes = `main-header navbar navbar-expand ${navbarVariant}`;
    if (headerBorder) {
      classes = `${classes} border-bottom-0`;
    }
    return classes;
  }, [navbarVariant, headerBorder]);

  return (
    <nav className={getContainerClasses()}>
      <ul className="navbar-nav d-flex align-items-center">
        <li className="nav-item">
          <button
            onClick={handleToggleMenuSidebar}
            type="button"
            className="nav-link"
          >
            <i className="fas fa-bars" />
          </button>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          ❝Asas que protegem o país❞
        </li>
        
      </ul>
      <ul className="navbar-nav ml-auto">    
        {/* <NotificationsDropdown /> */}
        <i className={`flag-icon flag-icon-br mr-2`} />
        {/* <LanguagesDropdown /> */}
        <UserDropdown />
        {/* <li className="nav-item">
          <Button className="nav-link" onClick={handleToggleControlSidebar}>
            <i className="fas fa-th-large" />
          </Button>
        </li> */}
      </ul>
    </nav>
  );
};

export default Header;
