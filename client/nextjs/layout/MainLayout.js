import { Component } from "react"
import TopBar from '../components/Navbars/TopBar'
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';

import dashboardStyle from '../assets/jss/material-dashboard-react/layouts/dashboardStyle'
class MainLayout extends Component {

  render() {
    const { children, classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <div className={classes.mainPanel} ref="mainPanel">
          <TopBar/>
          {children}

        </div>
      </div>
    );
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
]).isRequired};

export default withStyles(dashboardStyle)(MainLayout);