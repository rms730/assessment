# Express + Prisma App

This repository demonstrates a simple **Express** application using **Prisma** as the ORM, connected to a **Postgres** database.

---

## Getting Started

### Prerequisites

1. **Node.js** (v12+)
2. **Postgres** database
3. **npm** or **yarn**

---

## Installation

1. Clone the repository:  
   ```
   git clone https://github.com/your-username/your-repo.git
   ```

2. Navigate to the project directory:  
   ```
   cd your-repo
   ```

3. Install the dependencies:  
   ```
   npm install
   ```

4. Create or update your **.env** file:  
   ```
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
   PORT=3000
   ```

---

## Prisma Setup

1. Initialize Prisma (already done if you see a `prisma/schema.prisma` file).
2. Run migrations to create/update your database tables:

   ```
   npx prisma migrate dev --name init
   ```

3. (Optional) View and edit your database data using Prisma Studio:

   ```
   npx prisma studio
   ```

---

## Usage

1. Start the server:

   ```
   node index.js
   ```

2. The application listens on the port specified in your **.env** (defaults to **3000** if not set).  
3. You can verify it by visiting: **http://localhost:3000**

---

## Project Structure

- **index.js**: Entry point for the Express server
- **prisma/schema.prisma**: Contains the Prisma data models and configuration
- **.env**: Defines environment variables (including `DATABASE_URL`)

---

## Example Endpoints

Below is an example of how to interact with the `StudentInfo` model:

- **GET**: All students  
  ```
  GET /students
  ```

- **POST**: Create a new student  
  ```
  POST /students
  Content-Type: application/json

  {
    "studentID": "ABC123"
  }
  ```

- **Response**:  
  ```
  {
    "id": "generated-uuid",
    "createdAt": "...",
    "updatedAt": "...",
    "deletedAt": null,
    "studentID": "ABC123"
  }
  ```

You can replicate this pattern for other models like `CourseInfo`, `Departments`, etc.

---

## Contributing

1. **Fork** the project.  
2. Create a **feature** branch.  
3. **Commit** your changes.  
4. Push to your branch.  
5. Create a **new Pull Request**.

---

## License

This project is licensed under the [MIT License](LICENSE).

---