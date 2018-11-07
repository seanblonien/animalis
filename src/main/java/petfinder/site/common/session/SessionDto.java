package petfinder.site.common.session;

import alloy.util.Identifiable;

import java.util.List;

public class SessionDto implements Identifiable {
    private Long id;
    private String ownerPrincipal;
    private String sitterPrincipal;
    private String startDate;
    private String endDate;
    private String startTime;
    private String endTime;
    private String sessionType;
    private List<Long> pets;
    private String notes;
    private Long maxDistance;
    private Boolean isComplete;

    private SessionDto() {}

    public SessionDto(Long id, String ownerPrincipal, String sitterPrincipal, String startDate, String endDate, String startTime, String endTime, String sessionType, List<Long> pets, String notes, Long maxDistance, Boolean isComplete) {
        this.id = id;
        this.ownerPrincipal = ownerPrincipal;
        this.sitterPrincipal = sitterPrincipal;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.sessionType = sessionType;
        this.pets = pets;
        this.notes = notes;
        this.maxDistance = maxDistance;
        this.isComplete = isComplete;
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

    public String getStartDate() { return startDate; }

    public void setStartDate(String startDate) { this.startDate = startDate; }

    public String getEndDate() { return endDate; }

    public void setEndDate(String endDate) { this.endDate = endDate; }

    public List<Long> getPets() { return pets; }

    public void setPets(List<Long> pets) { this.pets = pets; }

    public String getNotes() { return notes; }

    public void setNotes(String notes) { this.notes = notes; }

    public Long getMaxDistance() { return maxDistance; }

    public void setMaxDistance(Long maxDistance) { this.maxDistance = maxDistance; }

    public Boolean getComplete() { return isComplete; }

    public void setComplete(Boolean complete) { isComplete = complete; }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getSessionType() {
        return sessionType;
    }

    public void setSessionType(String sessionType) {
        this.sessionType = sessionType;
    }

    @Override
    public String toString(){
        String sessionStr = "SessionDto{\n" +
                "id= " + id + "\n" +
                "ownerPrincipal= " + ownerPrincipal + "\n" +
                "sitterPrincipal= " + sitterPrincipal + "\n" +
                "startDate= " + startDate.toString() + "\n" +
                "endDate= " + endDate.toString() + "\n" +
                "startTime= " + startTime.toString() + "\n" +
                "endTime= " + endTime.toString() + "\n" +
                "sessionType" + sessionType.toString() + "\n" +
                "pets{\n";

        // Get all pet info
        for(Long pet: pets){
            sessionStr += "\t" + pet.toString() + "\n";
        }

        sessionStr += "}\n" +
                "notes= " + notes + "\n" +
                "maxDistance= " + maxDistance + "\n" +
                "isComplete= " + isComplete + "\n}\n";

        return sessionStr;
    }

    public boolean isEmpty() {
        return id == null;
    }
}
