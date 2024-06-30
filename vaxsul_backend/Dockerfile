FROM gradle:jdk11-alpine
COPY . /usr/src/app/vaxsul_backend
WORKDIR /usr/src/app/vaxsul_backend
RUN ./gradlew buildFatJar
RUN cp build/libs/app.jar /usr/src/app/app.jar
WORKDIR /usr/src/app
EXPOSE 8080
CMD java -jar app.jar

