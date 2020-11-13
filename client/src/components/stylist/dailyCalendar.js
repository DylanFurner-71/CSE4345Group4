import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Loading from "../loading"
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import {CustomPlaceholder} from "react-placeholder-image";
import ReviewBox from "../profile/reviewBox";
import Rating from "../rating/rating"
import ServicesList from "./servicesList";
import {AddServices} from "./addServices";
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
Scheduler,
DayView,
WeekView,
MonthView,
Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import moment from "moment";

const DailyCalendar = (props) => {
    return (
        <Paper>
        <Scheduler
          data={data}
          height={660}
        >
          <ViewState
            currentDate={currentDate}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <IntegratedEditing />
          <DayView
            startDayHour={9}
            endDayHour={19}
          />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
          <AppointmentForm />
        </Scheduler>
      </Paper>
    )
}

export default DailyCalendar;