import React from 'react';
import ScheduleSession from 'js/Sesssion/ScheduleSession';

export const sessionTypes = [
	{	label: 'Pet Sitting',
		value: 'sitting',
		description: 'Sitters watch your pet overnight in your home.',
		image: 'http://www.thedoggieinn.com/images/homeicon.png',
	},
	{	label: 'Pet Boarding',
		value: 'boarding',
		description: 'Your pet stays overnight in the sitter’s home.',
		image: 'https://i.imgur.com/jk5LVpv.png',
	},
	{
		label: 'Pet Daycare',
		value: 'daycare',
		description: 'Drop off your pet at your sitter\'s home in the morning and pick them up in the evening.',
		image: 'https://lh6.googleusercontent.com/-xVJDnLDgH8M/UwUYfM-AOZI/AAAAAAAAABY/sI4WgumL3us/w800-h800/content.jpg',
	},
	{
		label: 'Drop-In',
		value: 'drop-in',
		description: 'Sitters stop by your home for 30 minutes to feed and play with your pet.',
		image: 'https://cdn3.iconfinder.com/data/icons/bathroom-icons/407/Hand_With_Drop-512.png',
	},
];

class SessionTypes extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<h5>Types of Services</h5>
				<div>
					{sessionTypes.map((type) => (
						<div key={type.label} className={'card m-2'}>
							<div className={'card-header'}>
								<img src={type.image} style={{height: 50, width: 50}}/>
							</div>
							<div className={'p-2 m-2'}>
								<b>{type.label}</b>: {type.description}
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default SessionTypes;