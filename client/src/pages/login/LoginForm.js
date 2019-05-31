import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Input, Button, Alert } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { submitLoginData } from '../../modules/auth';
import config from '../../config';

const loginValidation = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const LoginForm = props => {
  const [showLoading, setLoading] = useState(false);
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const [auth, setAuth] = useState(null);

  localStorage.removeItem(config.accessTokenKey);

  useEffect(() => {
    async function login() {
      try {
        if (showLoading) {
          const res = await axios.post(`${config.apiDomain}/auth`, {
            username: values.username,
            password: values.password,
            grantType: 'password',
            scope: 'profile',
          });
          console.log(res);

          if (res.status === 200) {
            localStorage.setItem(config.accessTokenKey, res.data.accessToken);
            window.location.href = '/dashboard';
          }
        }
      } catch (e) {
        setLoading(false);
        setAuth(false);
      }
    }

    login();
  }, [showLoading]);

  return (
    <Formik
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        setValues(values);
        setLoading(true);
        setSubmitting(false);
      }}
      validationSchema={loginValidation}
    >
      {({ handleChange, isSubmitting, errors }) => {
        return (
          <Form id="login-form">
            <Input
              type="email"
              name="username"
              id="username"
              placeholder="email"
              onChange={handleChange}
            />
            {errors.username && (
              <div className="text-danger">{errors.username}</div>
            )}
            <br />
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={handleChange}
            />
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
            <br />
            {showLoading && auth === null ? (
              <img src={require('../../assets/coffee_loader.svg')} />
            ) : (
              <Button color="dark" type="submit" block disabled={isSubmitting}>
                <FormattedMessage id="sys.signin" />
              </Button>
            )}
            {auth === false ? (
              <Alert color="danger" style={{ marginTop: 20 }}>
                <FormattedMessage id="sys.invalidAuth" />
              </Alert>
            ) : null}
          </Form>
        );
      }}
    </Formik>
  );
};

LoginForm.propTypes = {
  intl: PropTypes.object.isRequired,
  auth: PropTypes.any,
  history: PropTypes.object.isRequired,
};

export default withRouter(LoginForm);
