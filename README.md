# Readme
This is Group 5's Tempeturs project.
[Our Heroku page link](https://temperature-group5.herokuapp.com/)
[Our Trello page link](https://trello.com/b/XZJmAk9w/tempetur-web-app)

## Elastic Search
This application uses elastic search as a data backend. To run the app you will have to either install elastic search locally or point to a remote elastic search instance. Configuration options are provided in `application.yml`.

## Development
In development there are three components to the running application. A Java app server, which runs your backend code, elasticsearch, which is the data store, and a webpack development server which serves up the frontend resources and does hot reloading.

### Running the Backend in IntelliJ
1. Install Java, Gradle, IntelliJ if you don't already have them
3. Import the project as a Gradle project into IntelliJ (may need a Gradle plugin)
4. Run `petfinder.site.PetfinderApplication.main` with VM args `-Dspring.profiles.active=development`
  * Open PetfinderApplication.java, right click, and Run PetfinderApplication.main(), which should fail
  * Up near the top left you should see a dropdown that now says Petfinder application, click it and select Edit configurations
  * In the menu, you should see a VM Options box, enter `-Dspring.profiles.active=development`, click OK
  * Run the application again, and it should start correctly
5. Go to `http://localhost:8080/` and verify the application is running (you may see a blank page if the frontend isn't running yet, but if it doesn't 404 you are good)

### Running elasticsearch
1. Install elasticsearch 6.0.1 https://www.elastic.co/downloads/past-releases/elasticsearch-6-0-1
2. Run `elasticsearch` and confirm it started with `curl -XGET 'localhost:9200'`

### Running the Frontend
1. Install node if you don't already have it
2. In the project directory run `npm install` from the command line
3. In the project directory run `npm run dev` from the command line
4. Go to `http://localhost:8080/` - you should see simple output which reads "This is the home page."
5. Navigate to page 1 and click the "Login as User" button - you should see a token print and the text "Welcome, user!" show on the page. This means everything is working.

## QA/Heroku/Running as QA Locally
In qa there is just a single executable jar which contains the static resources produced from webpack.

1. To build run `gradle install`
2. Build output can be found in `<Root Project Dir>/build/libs/petfinder-site-1.0-SNAPSHOT.jar`
3. This jar is all you need to run the application, to run locally use the following command: `java -jar build/libs/petfinder-site-1.0-SNAPSHOT.jar --spring.profiles.active=qa`
