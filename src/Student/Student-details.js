import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, InputGroup, Alert } from 'react-bootstrap';
import { FaUser, FaAddressCard, FaPhoneAlt, FaBirthdayCake, FaVenusMars } from 'react-icons/fa';
import Sidebar from "./Student-sidebar";

const Student = ({ initialStudentData, isEditMode = false }) => {
  const [studentData, setStudentData] = useState({
    firstName: 'Arun',
    dob: '2003-03-01',
    gender: 'Female',
    contactNumber: '9363503665',
    address: 'Chennai',
  });

  const [editMode, setEditMode] = useState(isEditMode);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (initialStudentData) {
      setStudentData(initialStudentData);
    }
  }, [initialStudentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlertMessage('Student details updated successfully!');
    setTimeout(() => {
      setAlertMessage('');
      setEditMode(false); // Exit edit mode
    }, 2000);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="d-none d-md-block fs-6">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-3" style={{ backgroundColor: '#f1f1f1' }}>
        <Container className="mt-1">
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6}>
              <Card className="shadow-lg" style={{ backgroundColor: '#f9f9f9', color: '#333' }}>
                <Card.Body>
                  <h2 className="text-center mb-4 fs-4 fs-md-3" style={{ color: 'black' }}>
                    {editMode ? 'Edit Student Details' : 'Profile'}
                  </h2>

                  {alertMessage && <Alert variant="success">{alertMessage}</Alert>}

                  {editMode ? (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="firstName" className="mb-3">
                        <Form.Label className="fs-6 fs-md-5">
                          <FaUser className="me-1" />
                          First Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={studentData.firstName}
                          onChange={handleChange}
                          required
                          style={{ borderColor: '#5c6bc0' }}
                        />
                      </Form.Group>

                      <Form.Group controlId="dob" className="mb-3">
                        <Form.Label className="fs-6 fs-md-5">
                          <FaBirthdayCake className="me-1" />
                          Date of Birth
                        </Form.Label>
                        <Form.Control
                          type="date"
                          name="dob"
                          value={studentData.dob}
                          onChange={handleChange}
                          required
                          style={{ borderColor: '#5c6bc0' }}
                        />
                      </Form.Group>

                      <Form.Group controlId="gender" className="mb-3">
                        <Form.Label className="fs-6 fs-md-5">
                          <FaVenusMars className="me-1" />
                          Gender
                        </Form.Label>
                        <Form.Control
                          as="select"
                          name="gender"
                          value={studentData.gender}
                          onChange={handleChange}
                          required
                          style={{ borderColor: '#5c6bc0' }}
                        >
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                          <option value="Other">Other</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="contactNumber" className="mb-3">
                        <Form.Label className="fs-6 fs-md-5">
                          <FaPhoneAlt className="me-1" />
                          Contact Number
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text>+91</InputGroup.Text>
                          <Form.Control
                            type="text"
                            name="contactNumber"
                            value={studentData.contactNumber}
                            onChange={handleChange}
                            required
                            placeholder="Enter phone number"
                            pattern="[0-9]{10}"
                            title="Please enter a valid phone number"
                            maxLength="10"
                            style={{ borderColor: '#5c6bc0' }}
                          />
                        </InputGroup>
                      </Form.Group>

                      <Form.Group controlId="address" className="mb-3">
                        <Form.Label className="fs-6 fs-md-5">
                          <FaAddressCard className="me-2" />
                          Address
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          name="address"
                          value={studentData.address}
                          onChange={handleChange}
                          required
                          style={{ borderColor: '#5c6bc0' }}
                        />
                      </Form.Group>

                      <Button type="submit" variant="primary" className="w-100 mt-3" style={{ backgroundColor: '#5c6bc0' }}>
                        Save Changes
                      </Button>
                    </Form>
                  ) : (
                    // Displaying student information
                    <>
                      {Object.entries(studentData).map(([key, value]) => (
                        key !== "address" ? (
                          <p key={key} className="fs-6 fs-md-5" style={{ color: '#333' }}>
                            <strong>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1') + ":"}</strong> {value}
                          </p>
                        ) : (
                          <div key={key}>
                            <strong className="fs-6 fs-md-5" style={{ color: '#333' }}>
                              {key.charAt(0).toUpperCase() + key.slice(1)}:
                            </strong>
                            <p className="fs-6 fs-md-5" style={{ whiteSpace: 'pre-wrap', color: '#333' }}>{value}</p>
                          </div>
                        )
                      ))}

                      <Button variant="secondary" onClick={() => setEditMode(true)} className="w-100 mt-3">
                        Edit Details
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Student;
