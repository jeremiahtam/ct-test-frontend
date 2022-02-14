import React, { useState, useEffect, useCallback } from 'react'
import ProductModal from '../components/ProductModal';
import { Navigate } from "react-router-dom";
import axios from 'axios'

const HomeScreen = (props) => {

  const [productData, setProductData] = useState()

  const [loadScreen, setLoadScreen] = useState();
  const [error, setError] = useState({
    'status': false,
    'message': ''
  })
  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    try {
      const res = await axios({
        url: 'http://localhost:8000/api/index',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const resData = await res.data
      // console.log(resData)
      if (resData.success === true) {
        setProductData(resData.data)
      } else {
        setError({
          ...error, ...{
            'status': true,
            'message': resData.message
          }
        })
      }
      setLoadScreen(true)

    } catch (error) {
      setError({
        ...error, ...{
          'status': true,
          'message': error
        }
      })
    }

  }

  /* modal functionality */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false)

  const handleShow = () => {
    setShow(true)
  }

  const [modalType, setModalType] = useState() /* modal type */
  const [modalDataItem, setModalDataItem] = useState() /* modal dataId */

  /* Modal data handler*/
  const modalDataHandler = useCallback((_dataItem, _modalType) => {
    handleShow()
    setModalDataItem(_dataItem)
    setModalType(_modalType)
  }, [modalType, modalDataItem])

  /* screen render/display */
  if (loadScreen === undefined) {
    //return null;
  };

  return (
    <div className='container main-container'>
      {(show) ?
        <ProductModal
          showModal={show}
          closeModalAction={handleClose}
          type={modalType}
          dataItem={modalDataItem}
          getProducts={getProducts}
        /> : ''
      }
      <div className="title">
        <span className='text'> Product</span>
      </div>
      <div className='card'>
        {loadScreen ?
          <>
            <div className='card-title'>List of Products</div>
            <div className='card-body'>
              <div className='product-card-body'>
                <div className='row'>
                  <div className='col-md-2'>
                    <button onClick={() => {
                      setModalType('add-product')/* set modalType */
                      handleShow();
                    }}
                      className='add-button btn btn-sm btn-outline-primary' data-toggle='modal'
                      data-target='#modal'>
                      Add
                    </button>
                  </div>
                </div>
                <div className='row'>
                  {productData &&
                    <div className='table-responsive'>
                      <table className='table table-hover table-sm table-bordered'>
                        <thead className='thead-light'>
                          <tr>
                            <th className=''>No.</th>
                            <th className=''>Product Name</th>
                            <th className=''>Quantity In Stock</th>
                            <th className=''>Price per item</th>
                            <th className=''>Datetime submitted</th>
                            <th className=''>Total value number</th>
                            <th className=''>Edit</th>
                            <th className=''>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productData.map((product, index) => {
                            return (
                              <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td>{product.product_name}</td>
                                <td>{product.quantity_in_stock}</td>
                                <td>{product.price_per_item}</td>
                                <td>{product.created_at}</td>
                                <td>{product.quantity_in_stock * product.price_per_item}</td>
                                <td><div className='product-action'>
                                  <a className='action-button' onClick={() =>
                                    modalDataHandler(product, 'edit-product')
                                  }>Edit</a></div>
                                </td>
                                <td><div className='product-action'>
                                  <a className='action-button' onClick={() =>
                                    modalDataHandler(product, 'delete-product')
                                  }>Delete</a></div>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>

                    </div>
                  }

                </div>
              </div>
            </div>
          </>
          :
          <>
            <span className="spinner-border spinner-border-sm center-spinner" role="status" aria-hidden="true"></span>
          </>
        }
      </div>
    </div>
  )
}
export default HomeScreen;