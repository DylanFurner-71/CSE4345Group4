import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import 'react-tabs/style/react-tabs.css'
import { useInput } from '../hooks/InputHook';
const times = [
  {
  startTime: "9:00 AM",
  endTime: "10:00 AM",
  tS: 9,
  tF: 10,
}, 
{
  startTime: "10:00 AM",
  endTime: "11:00 AM",
  tS: 10,
  tF: 11,
}, 
{
  startTime: "11:00 AM",
  endTime: "12:00 PM",
  tS:11,
  tF: 12,
}, {
  startTime: "12:00 PM",
  endTime: "1:00 PM",
  tS:12,
  tF: 13,
},{
  startTime: "1:00 PM",
  endTime: "2:00 PM",
  tS:13,
  tF: 14,
}, 
 {
  startTime: "2:00 PM",
  endTime: "3:00 PM",
  tS:14,
  tF: 15,
  }, 
{
  startTime: "3:00 PM",
  endTime: "4:00 PM",
  tS:15,
  tF: 16,
    }, 
   {
    startTime: "4:00 PM",
    endTime: "5:00 PM",
    tS:16,
    tF: 17,
      }, 
        {
          startTime: "5:00 PM",
          endTime: "6:00 PM",
          tS: 17,
          tF: 18
        }, 
          
];
const days = [{day: "Monday"}, {day: "Tuesday"}, {day: "Wednesday"}, {day: "Thursday"}, {day: "Friday"}]
export const AddAvailability = () => {
  const [stylist, setStylist] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checkedItems, setCheckedItems] = useState({}); //plain object as state
  const stylistId = useParams();
  const URL = `http://localhost:8000/api`;  
  const [day, setDay] = useState(0);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  //stylistName: `${stylist.firstName} ${stylist.lastName}`,
  //startDate, end date are date objects selected from a drop down list
    const onSend = () => {
      const currentDate = new Date();
      console.log("FIRST", currentDate);
      const dOTW = currentDate.getDay();
      if (dOTW > day){
        console.log("DAY OF THE WEEK", dOTW);
        console.log("DAY", day);
        currentDate.setDate(currentDate.getDate() + (7 - (5 - day)));
      } else if (dOTW === day){
        currentDate.setDate(currentDate.getDate() + 7);
      } else if (dOTW < day){
        currentDate.setDate(currentDate.getDate() + day);

      }
      const finalDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay(), times[startTime].tS, 0, 0);
      const finalDate2 = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay(), times[startTime].tF, 0, 0);
      console.log("Final date", finalDate);
      console.log("Final date2", finalDate2);
      console.log("FML");
      console.log(currentDate);
      const appointment = {
        stylist: stylistId.id,
        stylistName: `${stylist.firstName}` + `  ${stylist.lastName}`,
        startDate: finalDate,
        endDate: finalDate2,
            };
           const postAppt = async() => {
             console.log("posting appintment", appointment)
              await axios
            .post(`http://localhost:8000/api/stylists/appointments/${stylistId.id}`, appointment)
              .then( res => {
                setAppointments(res.data.appointment)})
                .catch(err =>
                //   dispatch({
                //     type: GET_ERRORS,
                //     payload: err.response.data
                // })
                console.log("Error upon errors")
            );   
              };
console.log( day, times[startTime].startTime, times[startTime].endTime)
postAppt();
   };
function handleChangeDay(e) {
  setDay(e.target.value);
}
function handleChangeStartTime(e) {
setStartTime(e.target.value);
}
function handleChangeEndTime(e) {
setEndTime(e.target.value)
}
    useEffect(() => {
      const fetchStylist = async () => {
          await axios.get(`${URL}/stylists/${stylistId.id}`)
              .then(res => {
                  const stylistData = res.data.stylist
                  setStylist(stylistData)
                  setIsLoading(false)
              })
      }
      fetchStylist()
  }, [stylist])

  useEffect(() => {
    const fetchAppointments = async () => {
        await axios.get(`http://localhost:8000/api/stylists/appointments/${stylistId.id}`)
            .then(res => {
                const appts = res.data.appointments;
                setAppointments(appts)
            })
    }  
    fetchAppointments()
  }, [appointments])
    return(<>
       <form className="container bg-green text-info border border-primary" style={{width: "50%", height: "50%"}}>
      <h3 className="action">Add Your Availability for the upcoming week</h3>
      <div class="form-group col-md-5">
      <label for="inputState">Day</label>
      <select id="inputState" class="form-control"
      onChange={handleChangeDay} value={day}>
        <option selected>Choose the day of the week that you would like to input your availability</option>
        {days.map((items, i) => (
        <option
          key={i}
          value={i+1}
        >
                    {items.day}
        </option>
      ))}      
      </select>
      </div>
      <div class="form-row">
                <div class="form-group col-md-5">
      <label for="inputState">Add an apointment time</label>
      <select id="inputState" class="form-control"
      // disabled={loading}
      // value={startTime}
      onChange={handleChangeStartTime}>
        <option selected>Book an available slot</option>
        {times.map((items, i) => (
        <option
          key={i}
          value={i}
        >
                    {items.startTime} - {items.endTime}
        </option>
      ))}      
      </select>
      </div>

                </div>
            <input className="bg-primary" type="button" value="Submit"
               onClick={ () => onSend()} text="helloworldAddServices"/>
  
      </form>
      </>)
}

export default AddAvailability;

// const CheckboxExample = () => {
//   const [checkedItems, setCheckedItems] = useState({}); //plain object as state

//   const handleChange = (event) => {
//       // updating an object instead of a Map
//       setCheckedItems({...checkedItems, [event.target.name] : event.target.checked });
//   }

//   useEffect(() => {
//     console.log("checkedItems: ", checkedItems);
//   }, [checkedItems]);  

//   const checkboxes = [
//       {
//           name: 'check-box-1',
//           key: 'checkBox1',
//           label: 'Check Box 1',
//       },
//       {
//           name: 'check-box-2',
//           key: 'checkBox2',
//           label: 'Check Box 2',
//       }
