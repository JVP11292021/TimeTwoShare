FROM ibmjava:jre
MAINTAINER jessyvanpolanen
WORKDIR /app
COPY ./target/mono-app-1.0.jar /app/mono-app.jar

ENTRYPOINT ["java","-jar","/app/mono-app.jar"]
