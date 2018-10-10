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
                <div style={{width: '100%',textAlign:'center'}}>
                    <img style={{borderRadius: '25px', padding: '2%'}}
                        src="https://img.huffingtonpost.com/asset/5b7fdeab1900001d035028dc.jpeg?cache=sixpwrbb1s&ops=1910_1000"
                         height="255" width="430"/>
                </div>
            </div>
        );
    }
}

export default HomePage;