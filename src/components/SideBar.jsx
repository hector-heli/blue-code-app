/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";

//import '../views/styles/Dashboard.css';
import { ReportContext } from "../ContextProvider";

const Sidebar = () => {
  const {reportSelected, setReportSelected } = useContext(ReportContext);

  return (
      <>
        <Nav className="max-width-100 hover:shadow-lg justify-content-end bg-dark"
            activeKey="/"
            onSelect={selectedKey => setReportSelected(selectedKey)}
          >
              {/* <div className="sidebar-sticky"></div> */}
          <Nav.Item>
              <Nav.Link eventKey = 'general-report'> Historial de eventos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link eventKey="response-time">Tiempos de respuesta</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link eventKey="schedules">Gestión de turnos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link eventKey="roles-assigments">Gestión de usuarios</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link eventKey="disabled" hidden>
              Disabled
              </Nav.Link>
          </Nav.Item>
          </Nav>
        
      </>
      );
  };
  // const Sidebar = withRouter(Side);
  export default Sidebar