/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import {Nav} from "react-bootstrap";

import '../views/styles/Dashboard.css';
import { ReportContext } from "../ContextProvider";

const Sidebar = () => {
  const {reportSelected, setReportSelected } = useContext(ReportContext);

  return (
      <>
          <Nav className="col-md-2 d-none d-md-block bg-light sidebar"
            activeKey="/"
            onSelect={selectedKey => setReportSelected(selectedKey)}
          >
              <div className="sidebar-sticky"></div>
          <Nav.Item>
              <Nav.Link eventKey = 'general-report' active>Reporte General</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link eventKey="response-time">Tiempo de atención</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link eventKey="scedules-creation">Creación de turnos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link eventKey="roles-assigments">Asignación de Roles</Nav.Link>
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