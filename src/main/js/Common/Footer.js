import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <div className="container padded horizontal-center footer">
                <hr/>
                <div className="row mt-md-5 mb-md-5">
                    <div className="col-md-5">
                        &copy; 2018 Tempetūrs
                    </div>
                    <div className="col-md">
                        <img src="https://i.imgur.com/J9wBmWu.png"/>
                    </div>
                    <div className="col-md-5 justify-content-between footer-links">
                        <div className="grow px-1"><a href="/#/about">About</a></div>
                        <div className="grow px-1"><a href="/#/support">Support and FAQ</a></div>
                        <div className="grow px-1"><a href="/#">Contact Us</a></div>
                    </div>
                </div>
            </div>
        );
    }
}
