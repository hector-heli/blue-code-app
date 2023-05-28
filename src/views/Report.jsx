/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

import Table from '../components/Table'

const Reports = ({ calls }) => {
  
  return (
    <div className="root page" >
      <h1> Reporte de llamados </h1>
      {/*<Table 
        data={ getAllCalls }
      />*/}
      <Table calls={calls}/>
    </div>
  )
}

export default Reports
