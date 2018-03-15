import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppHeader from "../components/appHeader";
import AppList from "../components/appList";

const styles = {
  root: {
    margin: 0,
    padding: 0,
    flexGrow: 1
  },
  flex: {
    flex: 1
  }
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppHeader />
      <AppList />
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
