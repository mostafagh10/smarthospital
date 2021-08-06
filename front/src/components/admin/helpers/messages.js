import React from 'react';

export const failedmessage = (msg) => (
    <div className="alert alert-danger" style={{textAlign:'center'}}>
        {msg}
    </div>
);


export const successmessage = (msg) => (
    <div className="alert alert-success" style={{textAlign:'center'}}>
        {msg}
    </div>
);