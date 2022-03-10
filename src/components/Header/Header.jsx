import { Badge, Box, IconButton, Menu, MenuItem } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { DialogContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { AccountCircle, Close, ShoppingCart } from "@material-ui/icons";
import CodeIcon from "@material-ui/icons/Code";
import Login from "features/Auth/components/Login";
import Register from "features/Auth/components/Register";
import { logout } from "features/Auth/components/userSlice";
import { cartItemsCountSelector } from "features/Cart/selectors";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  },
}));

const MODE = {
  LOGIN: "login",
  REGISTER: "register",
};

export default function Header() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.current);
  const cartItemsCount = useSelector(cartItemsCountSelector);
  const isLoggedIn = !!loggedInUser.id;
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLoggoutClick = () => {
    const action = logout();
    dispatch(action);
  };

  const handleCartClick = () => {
    history.push("/cart");
  };

  return (
    <header class="header">
      <nav className="navbar navbar-expand-sm">
        <NavLink className="navbar-brand" to="/">
          <h1>TMN SHOP</h1>
        </NavLink>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/"
                activeClassName="active"
                exact
              >
                HOME
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                PRODUCT
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="lg">
          {!isLoggedIn && (
            <Button color="inherit" onClick={handleClickOpen}>
              Login
            </Button>
          )}

          <IconButton
            aria-label="show 4 new mails"
            color="inherit"
            onClick={handleCartClick}
          >
            <Badge badgeContent={cartItemsCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {isLoggedIn && (
            <IconButton color="inherit" onClick={handleUserClick}>
              <AccountCircle />
            </IconButton>
          )}
        </div>

        <div class="menu">
          <Menu
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            getContentAnchorEl={null}
            keepMounted
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
            <MenuItem onClick={handleLoggoutClick}>Logout</MenuItem>
          </Menu>
        </div>

        <div class="dialog">
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <IconButton className={classes.closeButton} onClick={handleClose}>
              <Close />
            </IconButton>

            <DialogContent>
              {mode === MODE.REGISTER && (
                <>
                  <Register closeDialog={handleClose} />

                  <Box textAlign={"center"}>
                    <Button
                      color={"primary"}
                      onClick={() => setMode(MODE.LOGIN)}
                    >
                      Already have an account. Login here
                    </Button>
                  </Box>
                </>
              )}

              {mode === MODE.LOGIN && (
                <>
                  <Login closeDialog={handleClose} />

                  <Box textAlign={"center"}>
                    <Button
                      color={"primary"}
                      onClick={() => setMode(MODE.REGISTER)}
                    >
                      Don't have an account. Register here
                    </Button>
                  </Box>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </header>
  );
}
