import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
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
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddAvailability from './AddAvailability';
import base_url from '../../base_url';
export default class StylistCalendar extends React.PureComponent {
    state = {
        data: [],
        stylist: {},
        currentDate: new Date().toLocaleString(),
        URL: `http://${base_url}:8000`,
        stylistId: this.props.match.params.id,
        addedAppointment: {},
        appointmentChanges: {},
        editingAppointment: undefined,
    };
    constructor(props) {
        super(props);
        this.commitChanges = this.commitChanges.bind(this);
        this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
        this.changeAppointmentChanges = this.changeAppointmentChanges.bind(
            this
        );
        this.changeEditingAppointment = this.changeEditingAppointment.bind(
            this
        );
    }

    getStylistByID = id => {
        return new Promise((resolve, reject) => {
            axios
                .get(`http://${base_url}:8000/api/stylists/appointments/${id}`)
                .then(x => resolve(x.data.appointments))
                .catch(e => {
                    alert(e);
                    reject();
                });
        });
    };

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
        this.setState(state => {
            let { data } = state;
            if (added) {
                const startingAddedId =
                    data.length > 0 ? data[data.length - 1].id + 1 : 0;
                data = [...data, { id: startingAddedId, ...added }];
            }
            if (changed) {
                data = data.map(appointment =>
                    changed[appointment.id]
                        ? { ...appointment, ...changed[appointment.id] }
                        : appointment
                );
            }
            if (deleted !== undefined) {
                data = data.filter(appointment => appointment.id !== deleted);
            }
            return { data };
        });
    }
    render() {
        const {
            currentDate,
            data,
            addedAppointment,
            appointmentChanges,
            editingAppointment,
        } = this.state;
        data.filter(event => event.pending === false);
        return (
            <div
                className='container'
                style={{ marginTop: '3%', marginBottom: '3%' }}
            >
                <h2> Your Calendar </h2>
                <div className='row'>
                    <div className='col'>
                        <Paper>
                            <Scheduler data={data} height={660}>
                                <ViewState
                                    defaultCurrentDate={currentDate}
                                    defaultCurrentViewName='Week'
                                />
                                <EditingState
                                    onCommitChanges={this.commitChanges}
                                    addedAppointment={addedAppointment}
                                    onAddedAppointmentChange={
                                        this.changeAddedAppointment
                                    }
                                    appointmentChanges={appointmentChanges}
                                    onAppointmentChangesChange={
                                        this.changeAppointmentChanges
                                    }
                                    editingAppointment={editingAppointment}
                                    onEditingAppointmentChange={
                                        this.changeEditingAppointment
                                    }
                                />
                                <DayView startDayHour={9} endDayHour={18} />
                                <WeekView startDayHour={9} endDayHour={19} />
                                <MonthView startDayHour={9} endDayHour={19} />
                                <Toolbar />
                                <ViewSwitcher />
                                <AllDayPanel />
                                <EditRecurrenceMenu />
                                <ConfirmationDialog />
                                <Appointments />
                                <AppointmentTooltip
                                    showOpenButton
                                    showDeleteButton
                                />
                                <AppointmentForm />
                            </Scheduler>
                        </Paper>
                    </div>
                </div>
                <AddAvailability />
            </div>
        );
    }
    componentDidMount() {
        this.getStylistByID(this.state.stylistId).then(stylist =>
            this.setState({ stylist }, () => {
                this.setState({ data: stylist });
            })
        );
    }
}
