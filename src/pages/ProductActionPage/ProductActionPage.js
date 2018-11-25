import React, { Component } from 'react';
// import ProductList from '../../components/ProductList/ProductList';
// import ProductItem from '../../components/ProductItem/ProductItem';

import callApi from '../../utils/apiCaller';
import { Link } from 'react-router-dom';
import { actAddProductRequest, actGetProductRequest } from './../../actions/index';
import { connect } from 'react-redux';

class ProductActionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtPrice: '',
            chkbStatus: ''
        }
    };

    componentDidMount() {
        console.log('componentDidMount')
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            this.props.onEditProduct(id);
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log('componentWillReceiveProps');
    //     if (nextProps && nextProps.itemEditing) {
    //         var { itemEditing } = nextProps;
    //         this.setState({
    //             id: itemEditing.id,
    //             txtName: itemEditing.name,
    //             txtPrice: itemEditing.price,
    //             chkbStatus: itemEditing.status
    //         });
    //     }
    // }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.itemEditing){
            var {itemEditing} = nextProps;
            this.setState({
                id : itemEditing.id,
                txtName : itemEditing.name,
                txtPrice : itemEditing.price,
                chkbStatus : itemEditing.status
            });
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        })
    }

    onSave = (e) => {
        e.preventDefault();
        var { id, txtName, txtPrice, chkbStatus } = this.state;
        var { history } = this.props;
        var product = {
            id: id,
            name: txtName,
            price: txtPrice,
            status: chkbStatus
        }
        if (id) {
            callApi(`products/${id}`, 'PUT', {
                name: txtName,
                price: txtPrice,
                status: chkbStatus
            }).then(res => {
                history.goBack();
            })
        } else {
            this.props.onAddProduct(product);
            history.goBack();
        }

    }
    render() {
        var { txtName, txtPrice, chkbStatus } = this.state;

        return (

            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">

                <form onSubmit={this.onSave} >
                    <div className="form-group">
                        <label>Name Product:</label>
                        <input type="text"
                            className="form-control"
                            name="txtName"
                            value={txtName}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input type="text"
                            className="form-control"
                            name="txtPrice"
                            value={txtPrice}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="checkbox"   >
                        <label>
                            <input type="checkbox"
                                name="chkbStatus"
                                value={chkbStatus}
                                onChange={this.onChange}
                                checked={chkbStatus}
                            />
                            Have Products
                        </label>
                    </div>
                    <Link to="/product-list" className="btn btn-danger mr-10">
                        Go Back
                    </Link>

                    <button type="submit" className="btn btn-primary">Save</button>

                </form>

            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        itemEditing : state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddProduct: (product) => { 
            dispatch(actAddProductRequest(product));
        },
        onEditProduct: (id) => {
            dispatch(actGetProductRequest(id));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);
