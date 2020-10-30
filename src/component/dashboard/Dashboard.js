import React, { Fragment, useEffect } from "react";
import {Link} from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardAction from'./DashboardAction'
import Experience from './Experience'
import Education from './Education'
const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p p className="lead">
        <i className="fas fa-user"></i>Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
        <DashboardAction/>
        <Experience experience={profile.experience}/>
        <Education education ={profile.education}/>
        </Fragment>
      ) : (
        <Fragment><p>
          You have not yet setup a profile, please add some infor</p>
          <Link to ='/create-profile' className='btn btn-primary my-1'> Create Profile</Link>
          </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateProp = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateProp, { getCurrentProfile })(Dashboard);
