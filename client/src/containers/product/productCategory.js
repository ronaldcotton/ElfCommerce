import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Button, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import ProductCategoryForm from '../forms/productCategoryForm';

class ProductCategory extends Component {
  render() {
    const { history, match: { path } } = this.props;

    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem>
            <Button color="link" onClick={() => history.push('/dashboard')}>
              <FormattedMessage id="sys.dashboard" />
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Button color="link" onClick={() => history.push('/categories')}>
              <FormattedMessage id="sys.categories" />
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="sys.category" />
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="content-body">
          <div className="table-container">
            <Col md={12} className="table-content">              
              <ProductCategoryForm 
                mode={path === '/new-category'?'new':'update'} />
            </Col>
          </div>
        </div>
      </div>
    );
  }
}

ProductCategory.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  null
)(withRouter(ProductCategory));
