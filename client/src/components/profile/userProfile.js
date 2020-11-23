import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../loading';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { CustomPlaceholder } from 'react-placeholder-image';
import ReviewBox from './reviewBox';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.jwtToken;
    // const {user} = useSelector(state => state.auth)
    // console.log(user)
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            await axios
                .get('http://localhost:8000/api/users/me', {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
                .then(res => {
                    setUser(res.data.user);
                    setIsLoading(false);
                })
                .catch(err => console.log(err));
        };
        fetchUser();
    }, []);

    return (
        <div className='h-100'>
            {isLoading ? (
                <Loading />
            ) : (
                <div className='container'>
                    <div className='card card-signin flex-row my-5'>
                        <div className='card-body'>
                            <div className='row mb-4'>
                                <div className='col-10'>
                                    <h2 className='text-center display-4 mb-4'>{`${user.firstName} ${user.lastName}`}</h2>
                                    <h5>Contact Information</h5>
                                    <ul className='list-group list-group-flush'>
                                        <li className='list-group-item'>
                                            Phone Number:{' '}
                                            {user.number === ''
                                                ? 'None'
                                                : user.number}
                                        </li>
                                        <li className='list-group-item'>
                                            Email:{' '}
                                            {user.email === ''
                                                ? 'None'
                                                : user.email}
                                        </li>
                                        <li className='list-group-item'>
                                            Address:{' '}
                                            {user.address === ''
                                                ? 'None'
                                                : user.address}
                                        </li>
                                    </ul>
                                </div>
                                <div className='col-2 justify-content-end'>
                                    <Link
                                        to='/editProfile'
                                        className='btn btn-info'
                                    >
                                        Edit Profile
                                    </Link>
                                </div>
                            </div>

                            <Tabs>
                                <TabList>
                                    <Tab>Appointments</Tab>
                                </TabList>

                                <TabPanel>
                                    {/*<Service */}
                                    {/*    services={stylist.services}*/}
                                    {/*/>*/}
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
