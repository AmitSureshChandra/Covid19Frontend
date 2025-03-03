import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchHospitals } from "../../redux/hospitalActions";
import { Button } from "react-bootstrap";
import { HospitalType } from "../../model/HospitalType";
import MaterialTable from "material-table";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import { Clear, Search, Cancel, Edit, FilterList } from "@material-ui/icons";
import patient from "../images/patient.jpg";

function AllAdminPage({ history, hospitalsData, fetchHospitals }) {
  const [muiTableKey, setMuiTableKey] = React.useState(0);
  const [data, setData] = useState([]);
  const columns = [
    { field: "adminFirstName", title: "First Name" },
    { field: "adminLastName", title: "Last Name" },
    // { field: 'adminUserName', title: 'UserName' },
    // { field: 'adminPassword', title: 'Password' },
  ];

  useEffect(() => {
    // if (sessionStorage.getItem("username") === null) {
    //   history.push("/");
    // }
    try {
      fetch(`http://localhost:9090/CovidTracker.com/admin/allAdmins`)
        // fetch(`http://localhost:9090/CovidTracker.com/admin/getAdminCredentials`)
        .then((resp) => resp.json())
        .then((resp) => setData(resp));
    } catch (err) {
      alert("Something went wrong");
      history.push("/");
    }
    // fetchHospitals();
  }, []);
  return (
    //   <h2>Loading</h2>
    // ) : hospitalsData.error ? (
    //   <h2>{hospitalsData.error}</h2>
    // ) : (

    <form
      style={{
        backgroundImage: patient,
      }}
    >
      <div className="py-2">
        <Link to="/addAdmin" style={{ float: "right" }}>
          <Button>Add Admin</Button>
        </Link>
        <h1>
          <span className="badge badge-dark">View Admins</span>
        </h1>
      </div>
      <div className="container">
        <MaterialTable
          elevation={5}
          icons={{
            Filter: () => <div />,
            Search: () => <Search></Search>,
            LastPage: () => <div />,
            FirstPage: () => <div />,
            PreviousPage: () => <Button>Prev</Button>,
            NextPage: () => <Button>Next</Button>,
            ResetSearch: () => <Cancel></Cancel>,
            SortArrow: () => <FilterList></FilterList>,
            DetailPanel: () => <div />,
            Edit: () => <Edit></Edit>,
          }}
          title="Customer Data"
          data={data}
          columns={columns}
          options={{
            search: true,
            paging: true,
            filtering: false,
            sorting: true,
          }}
        />
      </div>
    </form>
  );
}
export default AllAdminPage;

// const mapStateToProps = (state) => {
//   //  alert("map state: " + JSON.stringify(state.hospitals));
//   return {
//     hospitalsData: state.hospitals,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchHospitals: () => dispatch(fetchHospitals()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
