import React, { Component } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import ProductItem from '../../components/ProductItem/ProductItem';
import { connect } from 'react-redux';
// import axios from 'axios';
// import apiCaller from './../../utils/apiCaller';
import {actFetchProductsRequest, actDeleteProductRequest} from './../../actions/index';

import { Link } from 'react-router-dom';


class ProductListPage extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     products: []
        // };
    }

    componentDidMount() {
        // apiCaller('products', 'GET', null).then(res => {
        //     // if (res.status === 200) {
        //     //     this.setState({
        //     //         products: res.data
        //     //     })
        //     // }
        //     this.props.fetchAllProducts(res.data);
        // });
        this.props.fetchAllProducts();
    }


    onDelete = (id) => {
        this.props.onDeleteProduct(id);
    }

    

    render() {
        var { products } = this.props;
        return (

            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                <Link to="/product/add" className="btn btn-info mb-10">Add product</Link>

                <ProductList>
                    {this.showProducts(products)}
                </ProductList>

            </div>

        );
    }
    showProducts(products) {
        var result = null;
        if (products.length > 0) {
            result = products.map((product, index) => {
                return (
                    <ProductItem
                        key={index}
                        product={product}
                        index={index}
                        onDelete={this.onDelete}
                    />
                )
            })
        }
        return result;
    }
}

const mapStateToProps = state => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllProducts: (products) => {
            dispatch(actFetchProductsRequest(products));
        },

        onDeleteProduct: (id) => {
            dispatch(actDeleteProductRequest(id));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
