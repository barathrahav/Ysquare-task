import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { CSVLink } from "react-csv";

function Empdashboard() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    user_id: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    ph_no: "",
    dob: "",
    age: "",
    gender: "",
    city: "",
    emergency_contact: "",
    emergency_ph_no: "",
    dept: "",
    job_title: "",
    salary: "",
    isAdmin: "",
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4004/empdetails");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({ ...user });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4004/users/${selectedUser.user_id}`,
        formData
      );
      console.log(response.data);
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const headers = [
    { label: "User ID", key: "user_id" },
    { label: "First Name", key: "first_name" },
    { label: "Last Name", key: "last_name" },
    { label: "Email", key: "email" },
    { label: "Phone Number", key: "ph_no" },
    { label: "Date of Birth", key: "dob" },
    { label: "Age", key: "age" },
    { label: "Gender", key: "gender" },
    { label: "City", key: "city" },
    { label: "Emergency Contact", key: "emergency_contact" },
    { label: "Emergency Phone Number", key: "emergency_ph_no" },
    { label: "Department", key: "dept" },
    { label: "Job Title", key: "job_title" },
    { label: "Salary", key: "salary" },
    { label: "Is Admin", key: "isAdmin" },
  ];

  return (
    <div>
      <h1>User Dashboard</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone Number</th>
            <th>Date of Birth</th>
            <th>Age</th>
            <th>Gender</th>
            <th>City</th>
            <th>Emergency Contact</th>
            <th>Emergency Phone Number</th>
            <th>Department</th>
            <th>Job Title</th>
            <th>Salary</th>
            <th>Is Admin</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.ph_no}</td>
              <td>{user.dob}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.city}</td>
              <td>{user.emergency_contact}</td>
              <td>{user.emergency_ph_no}</td>
              <td>{user.dept}</td>
              <td>{user.job_title}</td>
              <td>{user.salary}</td>
              <td>{user.isAdmin ? "Yes" : "No"}</td>
              <td>
                <Button onClick={() => handleEdit(user)}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CSVLink
        data={users}
        headers={headers}
        filename={"empdetails.csv"}
        className="btn btn-primary mt-2"
      >
        Download CSV
      </CSVLink>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                value={formData.ph_no}
                onChange={(e) =>
                  setFormData({ ...formData, ph_no: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDOB">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmergencyContact">
              <Form.Label>Emergency Contact</Form.Label>
              <Form.Control
                type="text"
                value={formData.emergency_contact}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emergency_contact: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmergencyPhoneNumber">
              <Form.Label>Emergency Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={formData.emergency_ph_no}
                onChange={(e) =>
                  setFormData({ ...formData, emergency_ph_no: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDept">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                value={formData.dept}
                onChange={(e) =>
                  setFormData({ ...formData, dept: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formJobTitle">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.job_title}
                onChange={(e) =>
                  setFormData({ ...formData, job_title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSalary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="text"
                value={formData.salary}
                onChange={(e) =>
                  setFormData({ ...formData, salary: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Empdashboard;
