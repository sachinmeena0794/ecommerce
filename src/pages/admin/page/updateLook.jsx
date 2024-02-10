import React, { useContext } from 'react'
import myContext from '../../../context/data/myContext';
import Layout from '../../../components/layout/Layout';


function UpdateLook() {
    const context = useContext(myContext);
    const { look } = context;
    return (
      <Layout>
         <div>
          {{look}}
        </div>
      </Layout>
       
    )
}

export default UpdateLook