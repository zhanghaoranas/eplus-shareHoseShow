import React from 'react';
import ReactLoading from 'react-loading';
import Style from './componentStyle/loading.module.css'
const Loading = ({ type, color }) => (
    <div className={Style.loading_mask}>
        <ReactLoading type={type} color={color} ></ReactLoading>
    </div>
)

export default Loading;