"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import { useRouter } from "next/navigation";

const EventList = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedEvent, setEditedEvent] = useState({
    Ten: "",
    NoiDung: "",
    Anh: null,
    NgayBatDau: "",
    NgayKetThuc: "",
    Luuy: "",
    DieuKien: ""
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/event/");
        if (!response.ok) throw new Error("Failed to fetch events.");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sự kiện này không?")) return;

    try {
      const response = await fetch(`http://localhost:3000/event/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete event.");

      setEvents((prev) => prev.filter((event) => event._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleShowMore = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleAddEvent = () => {
    router.push("/page/themsukien");
  };

  const handleEditEvent = (event) => {
    setEditedEvent(event);
    setSelectedFile(null); // Reset file selection when editing
    setShowEditModal(true);
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();

    // Append all necessary fields to the FormData
    formData.append('newEvent', JSON.stringify({
      Ten: editedEvent.Ten || "",
      NoiDung: editedEvent.NoiDung || "",
      NgayBatDau: editedEvent.NgayBatDau || "",
      NgayKetThuc: editedEvent.NgayKetThuc || "",
      Luuy: editedEvent.Luuy || "",
      DieuKien: editedEvent.DieuKien || "",
    }));

    if (selectedFile) {
      formData.append('Anh', selectedFile);
    }

    try {
      const response = await fetch(`http://localhost:3000/event/edit/${editedEvent._id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update event.');
      }

      const result = await response.json();
      console.log('Update result:', result);
      setShowEditModal(false); // Close the modal on success

      // Refresh the event list
      const updatedEvents = events.map((event) => event._id === result._id ? result : event);
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleNewEventFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Update the selected file
  };

  return (
    <main className="app-content">
      <Head>
        <title>Danh sách sự kiện</title>
      </Head>
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <b>Danh sách sự kiện</b>
          </li>
        </ul>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="row element-button">
                <div className="col-sm-2">
                  <Button className="btn btn-add btn-sm" onClick={handleAddEvent}>
                    <i className="fas fa-plus"></i> Tạo mới sự kiện
                  </Button>
                </div>
              </div>
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th>Mã sự kiện</th>
                    <th>Tên sự kiện</th>
                    <th>Ảnh</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Nội dung</th>
                    <th>Điều kiện</th>
                    <th>Lưu ý</th>
                    <th>Tính năng</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event._id}>
                      <td>{event.id}</td>
                      <td>{event.Ten}</td>
                      <td>
                        <img
                          src={event.Anh}
                          alt={event.Ten}
                          style={{ width: "100px", height: "auto" }}
                        />
                      </td>
                      <td>{event.NgayBatDau}</td>
                      <td>{event.NgayKetThuc}</td>
                      <td>{event.NoiDung}</td>
                      <td>{event.DieuKien}</td>
                      <td>{event.Luuy}</td>
                      <td className="table-td-center">
                        <button
                          className="btn btn-primary btn-sm trash"
                          type="button"
                          title="Xóa"
                          onClick={() => handleDelete(event._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} style={{ color: "#de0400" }} />
                        </button>
                        <button
                          className="btn btn-primary btn-sm edit"
                          type="button"
                          title="Sửa"
                          onClick={() => handleEditEvent(event)}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#f59d39" }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal to show more info about the selected event */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent?.Ten}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <div>
              <img
                src={selectedEvent.Anh}
                alt={selectedEvent.Ten}
                style={{ width: "100%", height: "auto" }}
              />
              <p>{selectedEvent.NoiDung}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Edit Event Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông tin sự kiện</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="form-group col-md-6">
              <label className="control-label">Mã sự kiện</label>
              <input className="form-control" type="text" value={editedEvent.id || ""} readOnly />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Ảnh</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleNewEventFileChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Tên sự kiện</label>
              <input
                className="form-control"
                type="text"
                required
                value={editedEvent.Ten || ""}
                onChange={(e) => setEditedEvent({ ...editedEvent, Ten: e.target.value })}
              />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Nội dung</label>
              <input
                className="form-control"
                type="text"
                value={editedEvent.NoiDung || ""}
                onChange={(e) => setEditedEvent({ ...editedEvent, NoiDung: e.target.value })}
              />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Ngày bắt đầu</label>
              <input
                className="form-control"
                type="date"
                value={editedEvent.NgayBatDau || ""}
                onChange={(e) => setEditedEvent({ ...editedEvent, NgayBatDau: e.target.value })}
              />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Ngày kết thúc</label>
              <input
                className="form-control"
                type="date"
                value={editedEvent.NgayKetThuc || ""}
                onChange={(e) => setEditedEvent({ ...editedEvent, NgayKetThuc: e.target.value })}
              />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Lưu ý</label>
              <input
                className="form-control"
                type="text"
                value={editedEvent.Luuy || ""}
                onChange={(e) => setEditedEvent({ ...editedEvent, Luuy: e.target.value })}
              />
            </div>
            <div className="form-group col-md-6">
              <label className="control-label">Điều kiện</label>
              <input
                className="form-control"
                type="text"
                value={editedEvent.DieuKien || ""}
                onChange={(e) => setEditedEvent({ ...editedEvent, DieuKien: e.target.value })}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default EventList;
