import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <div className="container padded horizontal-center">
                <hr/>
                <div className="row mt-md-5 mb-md-5">
                    <div className="col-md-4">
                        FAQ
                    </div>
                    <div className="col-md-4">
                        SUPPORT
                    </div>
                    <div className="col-md-4">
                        ABOUT US
                    </div>
                </div>
            </div>
        );
    }
}
