import React from 'react'
import PageHeader from '../../../components/common/PageHeader'
import ProductForm from '../../../components/products/ProductForm'

const AddProduct = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Add Product"
        subtitle="Create a new furniture product"
      />

      <ProductForm />
    </div>
  )
}

export default AddProduct