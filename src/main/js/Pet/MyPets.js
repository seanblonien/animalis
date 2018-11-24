import AddPetForm from 'js/Pet/AddPetForm';
import React from 'react';

class MyPets extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <AddPetForm/>
            </div>
        );
    }
}

export default MyPets;
