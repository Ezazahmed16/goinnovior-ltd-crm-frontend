import React from 'react'
import Header from '../../shared/Header/Header'
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import {kanbanGrid, kanbanData} from './KanbanData'

const Kanban = () => {
  return (
    <div className='m-2 md:m-10 mt-14 p-2 md:p-2 bg-white rounded-3xl'>
      <Header category="App" title="Kanban" />

      <KanbanComponent
        id="kanban"
        keyField="Status"
        dataSource={kanbanData}
        cardSettings={{ contentField: 'Summary', headerField: 'Id' }}
      >
        <ColumnsDirective>
          {kanbanGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
      </KanbanComponent>
    </div>
  )
}

export default Kanban