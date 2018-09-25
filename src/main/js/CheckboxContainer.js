import React from 'react';
import PropTypes from 'prop-types';
import checkboxes from 'js/user-checkboxes';
import Checkbox from 'js/Checkbox';

class CheckboxContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedItems: new Map(),
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const item = e.target.name;
        const isChecked = e.target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    }

    render() {
        return (
            <React.Fragment>
                {
                    checkboxes.map(item => (
                        <div>
                            <Checkbox name={item.name} checked={this.state.checkedItems.get(item.name)} onChange={this.handleChange} /> <label key={item.key}> {item.label} </label>
                        </div>
                    ))
                }
            </React.Fragment>
        );
    }
}

export default CheckboxContainer;