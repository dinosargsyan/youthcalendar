import React, { useState, useContext, useEffect, clearContext } from "react";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import fbService from "./api/fbService";
function App() {
  const context = useContext(GlobalContext);
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent, 
  } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  
  useEffect(()=>{
    
    // const calendarEvent = {
    //     title,
    //     description,
    //     label: selectedLabel,
    //     day: daySelected.valueOf(),
    //     id: selectedEvent ? selectedEvent.id : Date.now(),
    //   };
      
    // dispatchCalEvent({ type: "clean"});
    console.log("refresh console log", context.isLogin);
      fbService.getAllPosts()
      .then(resJson=>{
        console.log("selectedevent",selectedEvent);
        // dispatchCalEvent({
        //   type: "delete",
        //   payload: selectedEvent
        // })
        const calendarEvent= {
          title:"",
          description: "",
          label: "",
          day: "",
          id: ""
        }
        dispatchCalEvent({ type: "clear", payload: calendarEvent });
        let i=0;
        var highest = resJson[ Object.keys(resJson).sort().pop() ];
        console.log("the last key", highest.id);
        while(i!==resJson.length){
          console.log("sa Rez", resJson[1])
         
          const calendarEvent = {
            description: resJson[i].description,
            label: resJson[i].label,
            day: resJson[i].day,
            id: resJson[i].id,
            title: resJson[i].title
        }
          i++;
          console.log("resJson",resJson);
          console.log("SA",resJson.length);
          
        

        if (selectedEvent) {
          dispatchCalEvent({ type: "update", payload: calendarEvent });
        } else {
          dispatchCalEvent({ type: "push", payload: calendarEvent });      
        }
        
      }
    })
  
      
    
  },[])
  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currenMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
