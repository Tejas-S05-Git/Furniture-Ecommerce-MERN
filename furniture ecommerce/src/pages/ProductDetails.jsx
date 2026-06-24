import React from 'react'
import HeroPage from '../components/HeroPage'
import ProductDetailsSection from '../components/ProductDetailsSection'
import ProductTabs from '../components/ProductTabs'
import RelatedProducts from '../components/RelatedProducts'
import FeaturesSection from '../components/FeaturesSection'

const ProductDetails = () => {
  return (
    <>
      <HeroPage
        title="Product Details"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Shop", path: "/shop" },
          { label: "Product Details" },
        ]}
      />

      <ProductDetailsSection />
      <ProductTabs />
      <RelatedProducts />
      <FeaturesSection />
    </>
  )
}

export default ProductDetails