import axios from 'axios';

export function getPet(pet) {
	return axios.get('/api/pets', pet);
}

export function addPet(pet) {
	return axios.post('application/json', pet);
}