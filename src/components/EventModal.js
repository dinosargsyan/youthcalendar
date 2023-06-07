import React, { useContext, useState } from "react";
import fbService from "../api/fbService";
import GlobalContext from "../context/GlobalContext";
import BasicDatePicker from "./DatePicker";
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


const labelsClasses = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
];

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(
    selectedEvent ? selectedEvent.title : ""
  );
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [location, setLocation] = useState(
    selectedEvent ? selectedEvent.password : ""
  );
  const [dateEvent, setDateEvent] = useState(Date.now());
  const [eventTime, setEventTime] = useState("");

  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      location,
      eventTime,
      label: selectedLabel,
      day: dateEvent.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    console.log("sa e callendar eventy", calendarEvent);
    // function clear_this_event(){
      //   dispatchCalEvent({type: "delete",payload: selectedEvent,})
      
      // }
      // fbService.getAllPosts()
      // .then(resJson=>{
        //   const calendarEvent = {
          //     title:resJson[1].title,
          //     description: resJson[1].description,
          //     label: resJson[1].label,
          //     day: resJson[1].day,
          //     id: resJson[1].id
          //   }
          //   console.log("resJson",resJson[1].day);
          //   console.log("SA",calendarEvent.day);
          // })
          if (selectedEvent) {
            dispatchCalEvent({ type: "update", payload: calendarEvent });
            fbService.updatePost(calendarEvent);
          } else {
            dispatchCalEvent({ type: "push", payload: calendarEvent });
            fbService.createPost(calendarEvent);
            console.log("this is the calendar event date", calendarEvent);
          }
          
          setShowEventModal(false);
        }
      
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  fbService.deletePost(selectedEvent.id)

                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
             event
            </span>

            {/* <p>{daySelected.format("dddd, MMMM DD")}</p> */}
            {/* <BasicDatePicker
              onChange={(e) => setDateEvent(e.target.value)}
              value={dateEvent}
            /> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="For desktop"
          value={dateEvent}
          
          minDate={dayjs('dddd, MMMM DD')}
          onChange={(newValue) => {
            setDateEvent(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        
      </Stack>
    </LocalizationProvider>
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <input
              type="time"
              name="description"
              placeholder="Add a description"
              value={eventTime}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setEventTime(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <textarea
              // type="textarea"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />

            <span className="material-icons-outlined text-gray-400">
              location_on
            </span>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={location}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setLocation(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>

            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
