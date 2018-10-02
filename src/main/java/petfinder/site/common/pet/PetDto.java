package petfinder.site.common.pet;

import alloy.util.Identifiable;

import java.util.Date;

/**
 * Created by jlutteringer on 8/23/17.
 */
public class PetDto implements Identifiable {
	private Long id;
	private String name;
	private String species;
	private String breed;
	private Double weight;
	private String color;
	private Date birthdate;
	private String sex;

	public PetDto(Long id, String name, String species, String breed, Double weight, String color, Date birthdate, String sex) {
		this.id = id;
		this.name = name;
		this.species = species;
		this.breed = breed;
		this.weight = weight;
		this.color = color;
		this.birthdate = birthdate;
		this.sex = sex;
	}

	@Override
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBreed() {
		return breed;
	}

	public void setBreed(String breed) {
		this.breed = breed;
	}

	public String getSpecies() {
		return species;
	}

	public void setSpecies(String species) {
		this.species = species;
	}

	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public Date getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(Date birthdate) {
		this.birthdate = birthdate;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}
}