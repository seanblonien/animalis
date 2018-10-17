package petfinder.site.common.session;

import alloy.util.Identifiable;
import java.util.Date;
import java.util.List;
import java.util.Map;

import petfinder.site.common.pet.PetDto;

public class SessionDto implements Identifiable {
    private Long id;
    private String ownerPrincipal;
    private String sitterPrincipal;
    private Date startDate;
    private Date endDate;
    private List<PetDto> pets;
    private String notes;
    private Integer maxDistance;
    private Map<String,Object> location;

    public SessionDto(Long id, String ownerPrincipal, String sitterPrincipal, Date startDate, Date endDate, List<PetDto> pets, String notes, Integer maxDistance, Map<String,Object> location){
        this.id = id;
        this.ownerPrincipal = ownerPrincipal;
        this.sitterPrincipal = sitterPrincipal;
        this.startDate = startDate;
        this.endDate = endDate;
        this.pets = pets;
        this.notes = notes;
        this.maxDistance = maxDistance;
        this.location = location;
    }

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOwnerPrincipal() { return ownerPrincipal; }

    public void setOwnerPrincipal(String ownerPrincipal) { this.ownerPrincipal = ownerPrincipal; }

    public String getSitterPrincipal() { return sitterPrincipal; }

    public void setSitterPrincipal(String sitterPrincipal) { this.sitterPrincipal = sitterPrincipal; }

    public Date getStartDate() { return startDate; }

    public void setStartDate(Date startDate) { this.startDate = startDate; }

    public Date getEndDate() { return endDate; }

    public void setEndDate(Date endDate) { this.endDate = endDate; }

    public List<PetDto> getPets() { return pets; }

    public void setPets(List<PetDto> pets) { this.pets = pets; }

    public String getNotes() { return notes; }

    public void setNotes(String notes) { this.notes = notes; }

    public Integer getMaxDistance() { return maxDistance; }

    public void setMaxDistance(Integer maxDistance) { this.maxDistance = maxDistance; }

    public Map<String, Object> getLocation() { return location; }

    public void setLocation(Map<String, Object> location) { this.location = location; }

    @Override
    public String toString(){
        String sessionStr = "SessionDto{\n" +
                "id= " + id + "\n" +
                "ownerPrincipal= " + ownerPrincipal + "\n" +
                "sitterPrincipal= " + sitterPrincipal + "\n" +
                "startDate= " + startDate.toString() + "\n" +
                "endDate= " + endDate.toString() + "\n" +
                "pets{\n";

        // Get all pet info
        for(PetDto pet: pets){
            sessionStr += "\t" + pet.toString() + "\n";
        }

        sessionStr += "}\n" +
                "notes= " + notes + "\n" +
                "maxDistance= " + maxDistance + "\n" +
                "location{\n";

        // Get Location information
        for(String field: location.keySet()){
            sessionStr += "\t" + field + "= " + location.get(field).toString() + "\n";
        }

        sessionStr += "}\n";

        return sessionStr;
    }
}
