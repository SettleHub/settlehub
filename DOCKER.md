# Instructions for build and run project in docker container

Check if you have docker on your system
```bash
docker --version
```

Output should be something like that
```output
Docker version 27.3.1, build ce1223035a
```

Build image with
```bash
docker build -t esettlement-spa:source .
```

Create and run the container
```bash
docker run -d -p 8080:8080 --name esettlement-spa esettlement-spa:source
```
Or you can run on another port instead 8080, as you wish
For example on 8090
```bash
docker run -d -p 8090:8080 --name esettlement-spa esettlement-spa:source
```

View container logs
```bash
docker logs esettlement-spa
```

> [!TIP]
> Execute command in your container
> ```sh
> docker exec CONTAINER_NAME uname -a
> ```
>
> Get into container with ```exec``` command
> ```sh
> docker exec -it CONTAINER_NAME /bin/bash
> ```

> [!IMPORTANT]
> If you want to run code in container, Docker should be installed on your computer
>
> Docker maintained on many OSs. [supported_platforms](https://docs.docker.com/engine/install/#supported-platforms)
>
> Install Docker Desktop
>
> - For Windows [see](https://docs.docker.com/desktop/setup/install/windows-install/)
> - For MacOS [see](https://docs.docker.com/desktop/setup/install/mac-install/)
> - For Linux OS [see](https://docs.docker.com/desktop/setup/install/linux/)