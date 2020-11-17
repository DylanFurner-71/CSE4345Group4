import * as React from 'react';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { teal, orange, red } from '@material-ui/core/colors';
import { fade } from '@material-ui/core/styles/colorManipulator';
import classNames from 'clsx';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  DayView,
  ViewSwitcher,
  MonthView,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
/*
This is 
*/
const appointments = [
    {
      title: 'Website Re-Design Plan',
      startDate: new Date(2018, 5, 25, 9, 35),
      endDate: new Date(2018, 5, 25, 11, 30),
      id: 0,
      location: 'Room 1',
    }, {
      title: 'Book Flights to San Fran for Sales Trip',
      startDate: new Date(2018, 5, 25, 12, 11),
      endDate: new Date(2018, 5, 25, 13, 0),
      id: 1,
      location: 'Room 1',
    }, {
      title: 'Install New Router in Dev Room',
      startDate: new Date(2018, 5, 25, 14, 30),
      endDate: new Date(2018, 5, 25, 15, 35),
      id: 2,
      location: 'Room 2',
    }, {
      title: 'Approve Personal Computer Upgrade Plan',
      startDate: new Date(2018, 5, 26, 10, 0),
      endDate: new Date(2018, 5, 26, 11, 0),
      id: 3,
      location: 'Room 2',
    }, {
      title: 'Final Budget Review',
      startDate: new Date(2018, 5, 26, 12, 0),
      endDate: new Date(2018, 5, 26, 13, 35),
      id: 4,
      location: 'Room 2',
    }, {
      title: 'New Brochures',
      startDate: new Date(2018, 5, 26, 14, 30),
      endDate: new Date(2018, 5, 26, 15, 45),
      id: 5,
      location: 'Room 2',
    }, {
      title: 'Install New Database',
      startDate: new Date(2018, 5, 27, 9, 45),
      endDate: new Date(2018, 5, 27, 11, 15),
      id: 6,
      location: 'Room 1',
    }, {
      title: 'Approve New Online Marketing Strategy',
      startDate: new Date(2018, 5, 27, 12, 0),
      endDate: new Date(2018, 5, 27, 14, 0),
      id: 7,
      location: 'Room 3',
    }, {
      title: 'Upgrade Personal Computers',
      startDate: new Date(2018, 5, 27, 15, 15),
      endDate: new Date(2018, 5, 27, 16, 30),
      id: 8,
      location: 'Room 3',
    }, {
      title: 'Customer Workshop',
      startDate: new Date(2018, 5, 28, 11, 0),
      endDate: new Date(2018, 5, 28, 12, 0),
      id: 9,
      location: 'Room 3',
    }, {
      title: 'Prepare 2015 Marketing Plan',
      startDate: new Date(2018, 5, 28, 11, 0),
      endDate: new Date(2018, 5, 28, 13, 30),
      id: 10,
      location: 'Room 1',
    }, {
      title: 'Brochure Design Review',
      startDate: new Date(2018, 5, 28, 14, 0),
      endDate: new Date(2018, 5, 28, 15, 30),
      id: 11,
      location: 'Room 2',
    }, {
      title: 'Create Icons for Website',
      startDate: new Date(2018, 5, 29, 10, 0),
      endDate: new Date(2018, 5, 29, 11, 30),
      id: 12,
      location: 'Room 2',
    }, {
      title: 'Upgrade Server Hardware',
      startDate: new Date(2018, 5, 29, 14, 30),
      endDate: new Date(2018, 5, 29, 16, 0),
      id: 13,
      location: 'Room 3',
    }, {
      title: 'Submit New Website Design',
      startDate: new Date(2018, 5, 29, 16, 30),
      endDate: new Date(2018, 5, 29, 18, 0),
      id: 14,
      location: 'Room 3',
    }, {
      title: 'Launch New Website',
      startDate: new Date(2018, 5, 29, 12, 20),
      endDate: new Date(2018, 5, 29, 14, 0),
      id: 15,
      location: 'Room 2',
    }, {
      title: 'Website Re-Design Plan',
      startDate: new Date(2018, 6, 2, 9, 30),
      endDate: new Date(2018, 6, 2, 15, 30),
      id: 16,
      location: 'Room 1',
    }, {
      title: 'Book Flights to San Fran for Sales Trip',
      startDate: new Date(2018, 6, 2, 12, 0),
      endDate: new Date(2018, 6, 2, 13, 0),
      id: 17,
      location: 'Room 3',
    }, {
      title: 'Install New Router in Dev Room',
      startDate: new Date(2018, 6, 2, 14, 30),
      endDate: new Date(2018, 6, 2, 17, 30),
      id: 18,
      location: 'Room 2',
    }, {
      title: 'Approve Personal Computer Upgrade Plan',
      startDate: new Date(2018, 6, 2, 16, 0),
      endDate: new Date(2018, 6, 3, 9, 0),
      id: 19,
      location: 'Room 2',
    }, {
      title: 'Final Budget Review',
      startDate: new Date(2018, 6, 3, 10, 15),
      endDate: new Date(2018, 6, 3, 13, 35),
      id: 20,
      location: 'Room 1',
    }, {
      title: 'New Brochures',
      startDate: new Date(2018, 6, 3, 14, 30),
      endDate: new Date(2018, 6, 3, 15, 45),
      id: 21,
      location: 'Room 3',
    }, {
      title: 'Install New Database',
      startDate: new Date(2018, 6, 3, 15, 45),
      endDate: new Date(2018, 6, 4, 12, 15),
      id: 22,
      location: 'Room 3',
    }, {
      title: 'Approve New Online Marketing Strategy',
      startDate: new Date(2018, 6, 4, 12, 35),
      endDate: new Date(2018, 6, 4, 14, 15),
      id: 23,
      location: 'Room 3',
    }, {
      title: 'Upgrade Personal Computers',
      startDate: new Date(2018, 6, 4, 15, 15),
      endDate: new Date(2018, 6, 4, 20, 30),
      id: 24,
      location: 'Room 2',
    }, {
      title: 'Customer Workshop',
      startDate: new Date(2018, 6, 5, 6, 0),
      endDate: new Date(2018, 6, 5, 14, 20),
      id: 25,
      location: 'Room 1',
    }, {
      title: 'Customer Workshop',
      startDate: new Date(2018, 6, 5, 14, 35),
      endDate: new Date(2018, 6, 5, 16, 20),
      id: 26,
      location: 'Room 1',
    }, {
      title: 'Customer Workshop 2',
      startDate: new Date(2018, 6, 5, 10, 0),
      endDate: new Date(2018, 6, 5, 11, 20),
      id: 27,
      location: 'Room 2',
    }, {
      title: 'Prepare 2015 Marketing Plan',
      startDate: new Date(2018, 6, 5, 20, 0),
      endDate: new Date(2018, 6, 6, 13, 30),
      id: 28,
      location: 'Room 3',
    }, {
      title: 'Brochure Design Review',
      startDate: new Date(2018, 6, 6, 14, 10),
      endDate: new Date(2018, 6, 6, 15, 30),
      id: 29,
      location: 'Room 3',
    }, {
      title: 'Create Icons for Website',
      startDate: new Date(2018, 6, 6, 10, 0),
      endDate: new Date(2018, 6, 7, 14, 30),
      id: 30,
      location: 'Room 1',
    }, {
      title: 'Upgrade Server Hardware',
      startDate: new Date(2018, 6, 3, 9, 30),
      endDate: new Date(2018, 6, 3, 12, 25),
      id: 31,
      location: 'Room 2',
    }, {
      title: 'Submit New Website Design',
      startDate: new Date(2018, 6, 3, 12, 30),
      endDate: new Date(2018, 6, 3, 18, 0),
      id: 32,
      location: 'Room 2',
    }, {
      title: 'Launch New Website',
      startDate: new Date(2018, 6, 3, 12, 20),
      endDate: new Date(2018, 6, 3, 14, 10),
      id: 33,
      location: 'Room 2',
    }, {
      title: 'Book Flights to San Fran for Sales Trip',
      startDate: new Date(2018, 5, 26, 0, 0),
      endDate: new Date(2018, 5, 27, 0, 0),
      id: 34,
      location: 'Room 1',
    }, {
      title: 'Customer Workshop',
      startDate: new Date(2018, 5, 29, 10, 0),
      endDate: new Date(2018, 5, 30, 14, 30),
      id: 35,
      location: 'Room 1',
    }, {
      title: 'Google AdWords Strategy',
      startDate: new Date(2018, 6, 3, 0, 0),
      endDate: new Date(2018, 6, 4, 10, 30),
      id: 36,
      location: 'Room 3',
    }, {
      title: 'Rollout of New Website and Marketing Brochures',
      startDate: new Date(2018, 6, 5, 10, 0),
      endDate: new Date(2018, 6, 9, 14, 30),
      id: 37,
      location: 'Room 3',
    }, {
      title: 'Update NDA Agreement',
      startDate: new Date(2018, 6, 1, 10, 0),
      endDate: new Date(2018, 6, 3, 14, 30),
      id: 38,
      location: 'Room 2',
    }, {
      title: 'Customer Workshop',
      startDate: new Date(2018, 6, 1),
      endDate: new Date(2018, 6, 2),
      allDay: true,
      id: 39,
      location: 'Room 1',
    },
  ];

const LOCATIONS = ['Room 1', 'Room 2', 'Room 3'];
const LOCATIONS_SHORT = [1, 2, 3];
const resources = [{
  fieldName: 'location',
  title: 'Location',
  instances: [
    { id: LOCATIONS[0], text: LOCATIONS[0], color: teal },
    { id: LOCATIONS[1], text: LOCATIONS[1], color: orange },
    { id: LOCATIONS[2], text: LOCATIONS[2], color: red },
  ],
}];

const styles = ({ spacing, palette }) => ({
  flexibleSpace: {
    margin: '0 auto 0 0',
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    width: '75px',
    marginLeft: spacing(1),
    marginTop: 0,
    marginBottom: 0,
    height: spacing(4.875),
  },
  locationSelector: {
    marginLeft: spacing(1),
    height: spacing(4.875),
  },
  button: {
    paddingLeft: spacing(1),
    paddingRight: spacing(1),
    width: spacing(10),
    '@media (max-width: 800px)': {
      width: spacing(2),
      fontSize: '0.75rem',
    },
  },
  selectedButton: {
    background: palette.primary[400],
    color: palette.primary[50],
    '&:hover': {
      backgroundColor: palette.primary[500],
    },
    border: `1px solid ${palette.primary[400]}!important`,
    borderLeft: `1px solid ${palette.primary[50]}!important`,
    '&:first-child': {
      borderLeft: `1px solid ${palette.primary[50]}!important`,
    },
  },
  longButtonText: {
    '@media (max-width: 800px)': {
      display: 'none',
    },
  },
  shortButtonText: {
    '@media (min-width: 800px)': {
      display: 'none',
    },
  },
  title: {
    fontWeight: 'bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  textContainer: {
    lineHeight: 1,
    whiteSpace: 'pre-wrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
  },
  time: {
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  text: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  container: {
    width: '100%',
  },
  weekendCell: {
    backgroundColor: fade(palette.action.disabledBackground, 0.04),
    '&:hover': {
      backgroundColor: fade(palette.action.disabledBackground, 0.04),
    },
    '&:focus': {
      backgroundColor: fade(palette.action.disabledBackground, 0.04),
    },
  },
  weekEnd: {
    backgroundColor: fade(palette.action.disabledBackground, 0.06),
  },
});

const AppointmentContent = withStyles(styles, { name: 'AppointmentContent' })(({
  classes, data, formatDate, ...restProps
}) => (
  <Appointments.AppointmentContent {...restProps} formatDate={formatDate} data={data}>
    <div className={classes.container}>
      <div className={classes.title}>
        {data.title}
      </div>
      <div className={classes.text}>
        {data.location}
      </div>
      <div className={classes.textContainer}>
        <div className={classes.time}>
          {formatDate(data.startDate, { hour: 'numeric', minute: 'numeric' })}
        </div>
        <div className={classes.time}>
          {' - '}
        </div>
        <div className={classes.time}>
          {formatDate(data.endDate, { hour: 'numeric', minute: 'numeric' })}
        </div>
      </div>
    </div>
  </Appointments.AppointmentContent>
));

const Filter = withStyles(styles, { name: 'TextField' })(({ onCurrentFilterChange, currentFilter, classes }) => (
  <TextField
    placeholder="Filter"
    className={classes.textField}
    value={currentFilter}
    onChange={({ target }) => onCurrentFilterChange(target.value)}
    variant="outlined"
    hiddenLabel
    margin="dense"
  />
));

const handleButtonClick = (locationName, locations) => {
  if (locations.indexOf(locationName) > -1) {
    return locations.filter(location => location !== locationName);
  }
  const nextLocations = [...locations];
  nextLocations.push(locationName);
  return nextLocations;
};

const getButtonClass = (locations, classes, location) => (
  locations.indexOf(location) > -1 && classes.selectedButton
);

const LocationSelector = withStyles(styles, { name: 'LocationSelector' })(({ onLocationsChange, locations, classes }) => (
  <ButtonGroup className={classes.locationSelector}>
    {LOCATIONS.map((location, index) => (
      <Button
        className={classNames(classes.button, getButtonClass(locations, classes, location))}
        onClick={() => onLocationsChange(handleButtonClick(location, locations))}
        key={location}
      >
        <React.Fragment>
          <span className={classes.shortButtonText}>{LOCATIONS_SHORT[index]}</span>
          <span className={classes.longButtonText}>{location}</span>
        </React.Fragment>
      </Button>
    ))}
  </ButtonGroup>
));

const FlexibleSpace = withStyles(styles, { name: 'FlexibleSpace' })(
  ({ classes, ...restProps }) => (
    <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
      <ReduxFilterContainer />
      <ReduxLocationSelector />
    </Toolbar.FlexibleSpace>
  ),
);

const isRestTime = date => (
  date.getDay() === 0 || date.getDay() === 6 || date.getHours() < 9 || date.getHours() >= 18
);

const TimeTableCell = withStyles(styles, { name: 'TimeTableCell' })(({ classes, ...restProps }) => {
  const { startDate } = restProps;
  if (isRestTime(startDate)) {
    return <WeekView.TimeTableCell {...restProps} className={classes.weekendCell} />;
  } return <WeekView.TimeTableCell {...restProps} />;
});

const DayScaleCell = withStyles(styles, { name: 'DayScaleCell' })(({ classes, ...restProps }) => {
  const { startDate } = restProps;
  if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    return <WeekView.DayScaleCell {...restProps} className={classes.weekEnd} />;
  } return <WeekView.DayScaleCell {...restProps} />;
});

const SCHEDULER_STATE_CHANGE_ACTION = 'SCHEDULER_STATE_CHANGE';

const SchedulerContainer = ({
  data,
  currentDate, onCurrentDateChange,
  currentViewName, onCurrentViewNameChange,
}) => (
  <Paper>
    <Scheduler
      data={data}
      height={660}
    >
      <ViewState
        currentDate={currentDate}
        onCurrentDateChange={onCurrentDateChange}
        currentViewName={currentViewName}
        onCurrentViewNameChange={onCurrentViewNameChange}
      />
                <EditingState
            // onCommitChanges={this.commitChanges}
          />
          <IntegratedEditing />
      <DayView
        startDayHour={9}
        endDayHour={19}
      />
      <WeekView
        startDayHour={8}
        endDayHour={19}
        timeTableCellComponent={TimeTableCell}
        dayScaleCellComponent={DayScaleCell}
      />
      <MonthView />
      <Appointments
        appointmentContentComponent={AppointmentContent}
      />
      <Resources
        data={resources}
      />

      <Toolbar flexibleSpaceComponent={FlexibleSpace} />
      <DateNavigator />
      <ViewSwitcher />
    </Scheduler>
  </Paper>
);


const schedulerInitialState = {
  data: appointments,
  currentDate: '2018-06-27',
  currentViewName: 'Week',
  currentFilter: '',
  locations: LOCATIONS,
};

const schedulerReducer = (state = schedulerInitialState, action) => {
  if (action.type === SCHEDULER_STATE_CHANGE_ACTION) {
    return {
      ...state,
      [action.payload.partialStateName]: action.payload.partialStateValue,
    };
  }
  return state;
};

export const createSchedulerAction = (partialStateName, partialStateValue) => ({
  type: SCHEDULER_STATE_CHANGE_ACTION,
  payload: {
    partialStateName,
    partialStateValue,
  },
});

const mapStateToProps = (state) => {
  let data = state.data.filter(dataItem => (
    state.locations.indexOf(dataItem.location) > -1
  ));
  const lowerCaseFilter = state.currentFilter.toLowerCase();
  data = data.filter(dataItem => (
    dataItem.title.toLowerCase().includes(lowerCaseFilter)
    || dataItem.location.toLowerCase().includes(lowerCaseFilter)
  ));
  return { ...state, data };
};

const mapDispatchToProps = dispatch => ({
  onCurrentDateChange: currentDate => dispatch(createSchedulerAction('currentDate', currentDate)),
  onCurrentViewNameChange: currentViewName => dispatch(createSchedulerAction('currentViewName', currentViewName)),
  onCurrentFilterChange: currentFilter => dispatch(createSchedulerAction('currentFilter', currentFilter)),
  onLocationsChange: locations => dispatch(createSchedulerAction('locations', locations)),
});

const ReduxSchedulerContainer = connect(mapStateToProps, mapDispatchToProps)(SchedulerContainer);
const ReduxFilterContainer = connect(mapStateToProps, mapDispatchToProps)(Filter);
const ReduxLocationSelector = connect(mapStateToProps, mapDispatchToProps)(LocationSelector);

const store = createStore(
  schedulerReducer,
  // Enabling Redux DevTools Extension (https://github.com/zalmoxisus/redux-devtools-extension)
  // eslint-disable-next-line no-underscore-dangle
  typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : undefined,
  // eslint-enable
);

export default () => (
  <Provider store={store}>
    <ReduxSchedulerContainer />
  </Provider>
);
