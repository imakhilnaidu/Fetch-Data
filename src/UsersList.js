import React, {useState, useEffect} from 'react';
import axios from "axios";
import './App.css';
import { Avatar } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

function UsersList() {

    // 👇 It contains page information like count of pages
    const [page, setPage] = useState([]);

     // 👇 It contains users list or data
    const [list, setList] = useState([]);

     // 👇 It contains page number
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        // users data is get fetched by axios
        axios.get(`https://reqres.in/api/users?page=${pageNumber}`).then((response) => {
          setPage(response.data);
          setList(response.data.data)
        });
      }, [pageNumber]);

    //   controlls the change of page number and updating state of page to updated value
    const handleChange = (event, value) => {
        setPageNumber(value);
    };

    return (
        <div>
            {/* Looping through the list of users */}
            {list.map((user) => 
                <div className="card" key={user.id}>
                    <Avatar className="card-avatar" alt="avatar" src={user.avatar} />
                    <div className="card-name">{user.first_name + " " + user.last_name}</div>
                    <div className="card-email">{user.email}</div>
                </div>
            )}

            <div className="page-card">
            {/* It will add count of pages dynamically according to the data */}
            <Pagination className="page" color="primary" size="large" count={page.total_pages} page={pageNumber} onChange={handleChange} />
            </div>
        </div>
    )
}

export default UsersList
