import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState,   EditingState, } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  MonthView,
  AppointmentForm,
  AppointmentTooltip,
  EditRecurrenceMenu,
  AllDayPanel,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import {useParams} from 'react-router-dom'
import axios from 'axios'


export default class StylistCalendar extends React.PureComponent {
      state = {
    data: [],
    stylist: {},
    currentDate: new Date().toLocaleString(),
    URL: `http://localhost:8000`,
    stylistId: this.props.match.params.id,
    addedAppointment: {},
    appointmentChanges: {},
    editingAppointment: undefined,
  };
  constructor(props) {
    super(props);
    this.commitChanges = this.commitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
  }

getStylistByID = (id) => {
  return new Promise((resolve, reject) => {
     axios.get(`http://localhost:8000/stylists/${id}`)
      .then(x => resolve(x.data.stylist))
      .catch(e => {
          alert(e);
          reject();
      });
  });
}

  changeAddedAppointment(addedAppointment) {
    this.setState({ addedAppointment });
  }

  changeAppointmentChanges(appointmentChanges) {
    this.setState({ appointmentChanges });
  }

  changeEditingAppointment(editingAppointment) {
    this.setState({ editingAppointment });
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }
  render() {
    const {currentDate, data, addedAppointment, appointmentChanges, editingAppointment,
  } = this.state;
    return (
      <Paper>
        <Scheduler
          data={data}
          height={660}
        >
          <ViewState
            defaultCurrentDate={currentDate}
            defaultCurrentViewName="Week"
          />
          <EditingState
            onCommitChanges={this.commitChanges}

            addedAppointment={addedAppointment}
            onAddedAppointmentChange={this.changeAddedAppointment}

            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={this.changeAppointmentChanges}

            editingAppointment={editingAppointment}
            onEditingAppointmentChange={this.changeEditingAppointment}
          />
          <DayView
            startDayHour={9}
            endDayHour={18}
          />
          <WeekView
            startDayHour={10}
            endDayHour={19}
          />
             <MonthView
            startDayHour={10}
            endDayHour={19}
          />

          <Toolbar />
          <ViewSwitcher />
          <Appointments />
        </Scheduler>
      </Paper>
    );
  }
  componentDidMount() {
    this.getStylistByID(this.state.stylistId).then(stylist => this.setState({stylist}, () => {
      this.setState({data: stylist.appointments})
    }));
     }
}
