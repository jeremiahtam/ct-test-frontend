import React, { useState, useEffect, useCallback } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Modal } from 'react-bootstrap'
import axios from 'axios'

const ProductModal = (props) => {

  /* destructure props for some dependencies */
  const { closeModalAction, getProducts, dataItem } = props;
  const [formError, setFormError] = useState('')


  /* Add Product Handler */

  const addProductHandler = useCallback(async (values, setSubmitting) => {
    try {

      const res = await axios({
        url: `http://localhost:8000/api/store`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: values
      })
      const resData = await res.data
      await setSubmitting(false);
      // console.log(resData)
      if (resData.success === true) {
        getProducts();
        closeModalAction();
      } else {
        setFormError(resData.message)
      }
    } catch (error) {
      setFormError({
        'message': 'Fetch Error: ' + error
      });
    }
  }, [])

  /* Edit Product Handler */
  const editProductHandler = async (values, setSubmitting) => {

    let id = dataItem.id

    try {
      const res = await axios({
        url: ` http://localhost:8000/api/update/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        data: values
      })
      const resData = await res.data
      await setSubmitting(false);
      // console.log(resData)
      if (resData.success === true) {
        getProducts();
        closeModalAction();
      } else {
        setFormError(resData.message)
      }
    } catch (error) {
      setFormError({
        'message': 'Fetch Error: ' + error
      });
    }
  }

  /* Delete Product Handler */
  const deleteProductHandler = async (setSubmitting) => {

    let id = dataItem.id
    try {
      const res = await axios({
        url: ` http://localhost:8000/api/destroy/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const resData = await res.data
      await setSubmitting(false);
      // console.log(resData)
      if (resData.success === true) {
        getProducts();
        closeModalAction();
      } else {
        setFormError(resData.message)
      }
    } catch (error) {
      setFormError({
        'message': 'Fetch Error: ' + error
      });
    }
  }
  switch (props.type) {
    case 'add-product':
      return (
        <Modal show={props.showModal} onHide={props.closeModalAction}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Formik
            initialValues={
              {
                product_name: '',
                quantity_in_stock: '',
                price_per_item: ''
              }
            }
            enableReinitialize={true}
            validationSchema={Yup.object({
              product_name: Yup.string('Enter a name').required('Enter the product name'),
              quantity_in_stock: Yup.number('Enter a number').required('Enter a number'),
              price_per_item: Yup.number('Enter a number').required('Enter a number')
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                addProductHandler(values, setSubmitting)
              }, 400);
            }}
          >
            {({
              isSubmitting
            }) => (
              <Form method="POST" id="add-product-form" className="add-product-form" name="add-product-form">
                <Modal.Body>
                  <div className='row'>
                    <div className="col-md-12">
                      <div className="form-error">
                        {formError}
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className="col-md-4">
                      <label className='modal-form-label'>Product name</label>
                      <Field name="product_name" disabled={isSubmitting} type='text' className="form-control" placeholder="Product name" />
                      <div className="form-error">
                        <ErrorMessage name="product_name" />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label className='modal-form-label'>Quantity in stock</label>
                      <Field name="quantity_in_stock" disabled={isSubmitting} type='text' className="form-control" placeholder="Quantity" />
                      <div className="form-error">
                        <ErrorMessage name="quantity_in_stock" />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label className='modal-form-label'>Price per item</label>
                      <Field name="price_per_item" disabled={isSubmitting} type='text' className="form-control" placeholder="Price" />
                      <div className="form-error">
                        <ErrorMessage name="price_per_item" />
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button className='btn btn-light' onClick={props.closeModalAction}>
                    Close
                  </Button>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ?
                      (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          <span> Processing..</span>
                        </>
                      ) : ("Add Entry")}
                  </button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal>
      )
    case 'edit-product':

      return (
        <Modal show={props.showModal} onHide={props.closeModalAction}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Formik
            initialValues={{
              product_name: dataItem ? dataItem.product_name : '',
              quantity_in_stock: dataItem ? dataItem.quantity_in_stock : '',
              price_per_item: dataItem ? dataItem.price_per_item : '',
            }}
            enableReinitialize={true}
            validationSchema={Yup.object({
              product_name: Yup.string('Enter a name').required('Enter the product name'),
              quantity_in_stock: Yup.number('Enter a number').required('Enter a number'),
              price_per_item: Yup.number('Enter a number').required('Enter a number')
            })}
            onSubmit={(values, { setSubmitting }) => {
              // console.log(setSubmitting)                  
              setTimeout(() => {
                editProductHandler(values, setSubmitting);
              }, 400);
            }}
          >
            {({
              isSubmitting
            }) => (
              <Form method="POST" id="edit-product-form" className="edit-product-form" name="edit-product-form">
                <Modal.Body>
                  {dataItem ?
                    <>
                      <div className='row'>
                        <div className="col-md-12">
                          <div className="form-error">
                            {formError}
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className="col-md-4">
                          <label className='modal-form-label'>Product name</label>
                          <Field name="product_name" disabled={isSubmitting} type='text' className="form-control" placeholder="Product name" />
                          <div className="form-error">
                            <ErrorMessage name="product_name" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <label className='modal-form-label'>Quantity in stock</label>
                          <Field name="quantity_in_stock" disabled={isSubmitting} type='text' className="form-control" placeholder="Quantity" />
                          <div className="form-error">
                            <ErrorMessage name="quantity_in_stock" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <label className='modal-form-label'>Price per item</label>
                          <Field name="price_per_item" disabled={isSubmitting} type='text' className="form-control" placeholder="Price" />
                          <div className="form-error">
                            <ErrorMessage name="price_per_item" />
                          </div>
                        </div>
                      </div>
                    </>
                    :
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  }
                </Modal.Body>

                <Modal.Footer>
                  <Button className='btn btn-light' onClick={() => props.closeModalAction} type=''>
                    Close
                  </Button>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ?
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span> Processing..</span>
                      </>
                      : "Edit Entry"}
                  </button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal>
      )

    case 'delete-product':
      return (
        <Modal show={props.showModal} onHide={props.closeModalAction}>
          {dataItem ?
            <>
              <Modal.Header closeButton>
                <Modal.Title>Delete Product Entry</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this entry?
              </Modal.Body>
              <Modal.Footer>
                <Formik
                  initialValues={{}}
                  enableReinitialize={true}
                  validationSchema={Yup.object({})}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      //alert(values)
                      deleteProductHandler(setSubmitting);
                    }, 400);
                  }}
                >
                  {({
                    isSubmitting
                  }) => (
                    <Form>
                      <Button variant="btn-light" onClick={props.closeModalAction}>
                        Close
                      </Button>

                      <Button type='submit' variant="primary">
                        {isSubmitting ?
                          <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span> Processing..</span>
                          </>
                          :
                          "Delete"
                        }
                      </Button>
                    </Form>
                  )
                  }
                </Formik>
              </Modal.Footer>
            </>
            :
            <span className="spinner-border spinner-border-sm modal-spinner" role="status" aria-hidden="true"></span>
          }
        </Modal>
      )

    default:
      return (
        <div></div>
      )

  }
}

export default ProductModal
