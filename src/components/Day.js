import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import PasswordModal from "./PasswordModal";

export default function Day({ day, rowIdx }) {
  const context = useContext(GlobalContext);
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
    selectedEvent,
  } = useContext(GlobalContext);
  const [modalShow, setModalShow] = React.useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setSelectedEvent(null);
  }

  const handleShow = () => setShow(true);

  const HandleCreateEvent = () => {
    // if (context.isLogin == true) {

    setDaySelected(day);
    // setModalShow(true);
   console.log(selectedEvent, "this is selected event console");
   if(selectedEvent!=null){
      handleShow();
   }
  }
  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );


    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }
  return (
    <div className="border border-gray-200 flex flex-col">
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>

            {selectedEvent && selectedEvent.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className="material-icons-outlined text-gray-400">
          description
        </span>{selectedEvent && selectedEvent.description}
<br></br>
        <span className="material-icons-outlined text-gray-400">
          schedule
        </span>{selectedEvent && selectedEvent.eventTime}
<br></br>
        <span className="material-icons-outlined text-gray-400">
          location_on </span>{selectedEvent && selectedEvent.location}


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={HandleCreateEvent}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.title}

          </div>
        ))}
      </div>
    </div>
  );
}
