import React, { useState, useEffect } from 'react';
import Layout from '@/components/layouts/layout';
import CheckoutFlow from '@/components/eden/checkout-flow';

export default function Step1() {
  return (
    <>
      <Layout>
        <CheckoutFlow />
        
      </Layout>
    </>
  );
}
