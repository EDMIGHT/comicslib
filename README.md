# comicslib

In this version of my favorite project, I tried to run this application in Docker. Due to the fact that I discovered the difference in building MySQL tables using Prisma on Windows and inside Docker Container, I decided to create a separate branch before fully implementing Docker in the project.

> **Warning**
> This version of the pet project is not finished
>
> While developing this version I encountered problems that are still present, as soon as these problems are resolved I will merge the main branch with this one

## Known Issues

- [x] Creating **a database structure** when creating a server using Prisma (solved using a separate file with the database structure)
- [ ] Inability for the **client container** to receive a response from the **server container** during assembly
