/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

import { ReportContext } from '../ContextProvider'
import Sidebar from '../components/SideBar';
import CallsTable from '../components/CallsTable';
import ResumeReport from '../components/AnaliticsReport';
import UsersTable from '../components/UsersTable';

const Reports = () => {
  const [reportSelected, setReportSelected] = useState(() => <CallsTable />)
  
  const reportSwitch = () =>{
    switch (reportSelected) {
      case 'general-report':
        return (
          <div>
            <h3> Historial de eventos </h3>
            <CallsTable />
          </div>
        ) ;

      case 'response-time':
        return (
          <div>
            <h3> Análisis de respuestas </h3>
            <ResumeReport />
          </div>
        ) ;

      case 'roles-assigments':
        return (
          <div>
            <h3> Gestión de usuarios </h3>
            <UsersTable />
          </div>
        ) ;
      
      default: return <p>no disponible</p>
    }
  }

  return (
    <ReportContext.Provider   value = {{ reportSelected, setReportSelected }} >
      <div className="root page" >
        <h1> Reportes </h1>
        <div className='flex'>
          <Sidebar />
          { reportSwitch() }
      </div>
    </div>
    </ReportContext.Provider>
    
  )
}

export default Reports
