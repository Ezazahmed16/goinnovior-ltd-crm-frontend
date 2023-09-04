import React, { } from 'react'
import Header from '../../shared/Header/Header'
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';

const Calendar = () => {


  return (
    <div className=''>
      <div className="m-2 md:m-10 mt-14 p-2 md:p-2 bg-main-bg rounded-3xl">
        <Header category="App" title="Calendar" />

        <ScheduleComponent height='650px'>
          <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
        </ScheduleComponent>
      </div>
    </div>
  )
}

export default Calendar