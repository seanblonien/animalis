import React from 'react';

class HomePage extends React.Component {

    render() {

        return (
            <div style={{
                float: 'center', marginRight: '25%', marginLeft: '25%', marginTop: '25px',
                borderRadius: '20px', backgroundColor: '#D5D5D5'
            }}>
                <h1 style={{float: 'center', marginRight: '5%', marginLeft: '5%', marginTop: '5px'}}> Welcome to the
                    Tempeturs Web App Home Page! </h1>
                <img style={{padding: '5%'}}
                     src="https://img.huffingtonpost.com/asset/5b7fdeab1900001d035028dc.jpeg?cache=sixpwrbb1s&ops=1910_1000"
                     height="265" width="430"/>
            </div>
        );
    }
}

export default HomePage;