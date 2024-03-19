# MyNews

Customizable aggregator for news from around the world, allowing you to explore and follow the stories you like the most, and streamline your news experience.

## About project build

This is a [Next.js](https://nextjs.org/) project uses [Tailwind CSS](https://tailwindcss.com/).

## Development

First, install node.js 18 or higher version.

Then install modules:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker

This project containerized with Docker and here is instruction on how to run the project within a Docker container.

### Prerequisites

Docker must be installed on your machine. You can download and install Docker from [Docker's official website](https://www.docker.com/).

### Steps to Run the Project

#### Build the Docker Image

Open a terminal and navigate to the root directory of the project where the Dockerfile is located. Run the following command to build the Docker image:

```sh
docker build -t mynews .
```

#### Run the Container
  
After the image has been successfully built, run the container using:

```sh
docker run -p 3000:3000 mynews
```

This command runs the container and maps port 3000 of the container to port 3000 on your host machine.

##### Accessing the Application
    
With the container running, open your web browser and navigate to http://localhost:3000. You should see your frontend application running.

### Stopping the Container
   
To stop the container, execute:

```sh
docker stop mynews
```
