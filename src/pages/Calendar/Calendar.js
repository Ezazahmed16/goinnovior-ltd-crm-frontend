import React, { useRef } from 'react';
import Header from '../../shared/Header/Header';
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from '@syncfusion/ej2-react-schedule';
import { useAuth } from '../../contexts/AuthContext';

const Calendar = () => {
  const auth = useAuth();
  const scheduleRef = useRef(null); // Ref to access the Schedule component instance

  // Event handler for when a date is selected
  const handleDateSelect = (args) => {
    console.log('Selected Date:', args.startTime);
  };

  // Event handler for when a task is selected
  const handleEventSelect = (args) => {
    console.log('Selected Task:', args.event);
  };

  // Event handler for when a task is added or edited
  const handleTaskActionComplete = (args) => {
    if (args.requestType === 'eventCreated' || args.requestType === 'eventChanged') {
      console.log('Task Added/Edited:', args.modifiedRecords);
    }
  };

  return (
    <div>
      <div className="m-2 md:m-10 mt-14 p-2 md:p-2 bg-main-bg rounded-3xl">
        <Header category="App" title="Calendar" />

        <ScheduleComponent
          height="650px"
          ref={scheduleRef}
          // Attach event handlers
          eventClick={handleEventSelect}
          select={handleDateSelect}
          actionComplete={handleTaskActionComplete}
        >
          <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
        </ScheduleComponent>
      </div>
    </div>
  );
};

export default Calendar;
