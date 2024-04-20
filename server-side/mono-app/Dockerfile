FROM openjdk:17-oracle
MAINTAINER jessyvanpolanen
COPY target/*.jar mono-app.jar
EXPOSE 8089
ENTRYPOINT ["java","-jar","mono-app.jar"]
