import React from 'react';

class FaqPage extends React.Component {
    render() {
        return (
            <div>
                <hr></hr>
                <div>
                    <h5>Q:</h5>
                    <p>What is Animalis?</p>
                    <h5>A:</h5>
                    <p>Animalis is a pet sitting service website that matches pet owners with pet sitters looking for work.
                        You can find out more about us <a href="/#/about">here</a>.
                    </p>
                    <hr></hr>
                </div>
                <div>
                    <h5>Q:</h5>
                    <p>Can I be a pet sitter and a pet owner?</p>
                    <h5>A:</h5>
                    <p>Yes you can! Your sessions will be automatically separated into different sections based on your roles.</p>
                    <hr></hr>
                </div>
                <div>
                    <h5>Q:</h5>
                    <p>What kind of pets are supported?</p>
                    <h5>A:</h5>
                    <p>Any and all pets! When you post a new session, sitters will be able to see what pets you want sat.</p>
                </div>
            </div>
        );
    }
}

export default FaqPage;
