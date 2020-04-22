import React from 'react';
import ReactLoading from 'react-loading';
import './componentStyle/loading.css'
const Loading = ({ type, color }) => (
    <div className="loading_mask">
        <ReactLoading type={type} color={color} ></ReactLoading>
    </div>
)

export default Loading;