# PetPaw Diaries

PetPaw Diaries is a comprehensive web application designed to streamline pet adoption and donation processes. The platform allows users to browse available pets for adoption, make donations to support the cause, and manage pet records efficiently. Built with modern technologies, the project aims to provide a user-friendly and responsive experience for both administrators and potential adopters.

## Features

- **Pet Adoption**: View detailed profiles of pets available for adoption.
- **Donation Management**: Make and manage donations to support pet care and adoption.
- **User Accounts**: Register and log in to manage personal information and track donation history.
- **Admin Dashboard**: Admins can manage pet records, track donations, and view user interactions.
- **Responsive Design**: Ensure a seamless experience across various devices and screen sizes.
- **Real-Time Updates**: Utilize WebSockets for real-time notifications and updates on pet statuses and donations.

## Technology Stack

- **Frontend**: 
  - [React](https://reactjs.org/) - JavaScript library for building user interfaces.
  - [Material-UI (MUI)](https://mui.com/) - React components for faster and easier web development.
  
- **Backend**:
  - [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/) - Framework for building APIs and web applications.
  - [Entity Framework Core (EF Core)](https://docs.microsoft.com/en-us/ef/core/) - ORM for database interactions.
  - [MSSQL](https://www.microsoft.com/en-us/sql-server) - Relational database management system.

- **Containerization and Deployment**:
  - [Docker](https://www.docker.com/) - Containerization platform for building and managing containers.
  - [Azure](https://azure.microsoft.com/en-us/) - Cloud platform for deploying and hosting the application.

## Pages

- **Home**: Overview of the application and featured pets.
- **AddBlogPost**: Form to add a new blog post about pet adoption and donations.
- **BlogPosts**: List and manage existing blog posts.
- **EditBlogPost**: Edit an existing blog post.
- **DeleteBlogPost**: Delete a specific blog post.

## Deployment

The PetPaw Diaries application is deployed using Docker containers on Azure. The deployment process involves:

1. **Building Docker Images**: Create Docker images for the frontend and backend services.
2. **Pushing to Azure Container Registry**: Upload the Docker images to Azure Container Registry.
3. **Deploying to Azure App Services**: Deploy the application using Azure App Services for hosting the frontend and backend.
4. **Database Setup**: Configure and connect to an MSSQL database on Azure SQL Database.

For more details on deployment and setup, refer to the [Deployment Guide](docs/deployment-guide.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/) for its powerful and flexible UI library.
- [Material-UI (MUI)](https://mui.com/) for providing a modern design system.
- [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/) for robust backend development.
- [Docker](https://www.docker.com/) for simplifying containerization and deployment.
- [Azure](https://azure.microsoft.com/en-us/) for cloud services and infrastructure.


