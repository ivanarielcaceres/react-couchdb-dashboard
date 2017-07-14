import React,  { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import {spacing, typography} from 'material-ui/styles';
import {white, blue600} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';
import Avatar from 'material-ui/Avatar';

const LeftDrawer = (props) => {
  let { navDrawerOpen } = props;

  const styles = {
    logo: {
      cursor: 'pointer',
      fontSize: 22,
      color: typography.textFullWhite,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: typography.fontWeightLight,
      backgroundColor: blue600,
      paddingLeft: 40,
      height: 56,
    },
    menuItem: {
      color: white,
      fontSize: 14
    },
    avatar: {
      div: {
        padding: '15px 0 20px 15px',
        backgroundImage:  'url("https://i1.wp.com/pgviajantes.com/wp-content/uploads/2016/12/Iluminacion-Itaipu.jpg?fit=500%2C331")',
        backgroundPosition: 'center',
        height: 150
      },
      icon: {
        marginRight: 15,
        marginTop: 65,
        boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
      },
      span: {
        display: 'block',
        color: 'white',
        fontWeight: 500,
        fontSize: 20,
        textShadow: '1px 1px #444'
      }
    }
  };

  return (
    <Drawer
      docked={true}
      open={navDrawerOpen}>
        <div style={styles.avatar.div}>
          <Avatar src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAArsAAAAJDFlMjFkNDc2LTFkNDAtNGM5Ny04MGYzLWQ2MjE5MGIxYzY5Mw.jpg"
                  size={65}
                  style={styles.avatar.icon}/>
          <span style={styles.avatar.span}>{props.username}</span>
        </div>
        <div>
          {props.menus.map((menu, index) =>
            <MenuItem
              key={index}
              style={styles.menuItem}
              primaryText={menu.text}
              leftIcon={menu.icon}
              containerElement={<Link to={menu.link}/>}
            />
          )}
        </div>
    </Drawer>
  );
};

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.array,
  username: PropTypes.string,
};

export default LeftDrawer;
