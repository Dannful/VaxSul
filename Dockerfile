FROM gradle:jdk11
COPY vaxsul_backend /usr/src/app/vaxsul_backend
WORKDIR /usr/src/app/vaxsul_backend
RUN ./gradlew buildFatJar
RUN cp build/libs/app.jar /usr/src/app/app.jar
WORKDIR /usr/src/app
EXPOSE 8080
CMD java -jar app.jar