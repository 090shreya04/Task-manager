# 📝 Task Manager

A full-stack **Task Management Application** built with **Spring Boot** and **MySQL** that helps users organize, track, and manage their daily tasks efficiently.

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.4-brightgreen)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🌟 Features

✅ **Create Tasks** - Add new tasks with title, description, and due dates  
✅ **Update Tasks** - Edit task details and update status  
✅ **Delete Tasks** - Remove completed or unwanted tasks  
✅ **Task Status** - Mark tasks as pending, in-progress, or completed  
✅ **Responsive UI** - Clean and modern web interface  
✅ **MySQL Integration** - Persistent data storage  
✅ **RESTful API** - Well-structured backend endpoints  

---

## 🛠️ Tech Stack

### Backend
- **Java 17** - Programming language
- **Spring Boot 4.0.4** - Application framework
- **Spring Web MVC** - Web layer
- **MySQL** - Relational database
- **Maven** - Dependency management

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling
- **JavaScript** - Interactivity

---

## 📋 Prerequisites

Before running this project, make sure you have:

- ☕ **Java 17** or higher installed
- 🐬 **MySQL Server** (version 8.0+)
- 📦 **Maven** (or use included Maven wrapper)
- 💻 **IDE** (IntelliJ IDEA, Eclipse, or VS Code)

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/090shreya04/Task-manager.git
cd Task-manager
```

### 2️⃣ Configure MySQL Database

Create a new database in MySQL:
```sql
CREATE DATABASE task_manager_db;
```

Update database credentials in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/task_manager_db
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

### 3️⃣ Build the Project

Using Maven Wrapper (recommended):
```bash
./mvnw clean install
```

Or using Maven:
```bash
mvn clean install
```

### 4️⃣ Run the Application

Using Maven Wrapper:
```bash
./mvnw spring-boot:run
```

Or using Maven:
```bash
mvn spring-boot:run
```

The application will start on **http://localhost:8080**

---

## 📂 Project Structure

```
Task-manager/
├── src/
│   ├── main/
│   │   ├── java/com/example/taskmanager/
│   │   │   ├── controller/       # REST Controllers
│   │   │   ├── model/            # Entity classes
│   │   │   ├── repository/       # Data access layer
│   │   │   ├── service/          # Business logic
│   │   │   └── TaskManagerApplication.java
│   │   └── resources/
│   │       ├── static/           # CSS, JS, Images
│   │       ├── templates/        # HTML files
│   │       └── application.properties
│   └── test/                     # Unit tests
├── .mvn/wrapper/                 # Maven wrapper files
├── pom.xml                       # Maven configuration
└── README.md                     # This file
```

---

## 🔌 API Endpoints

### Task Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Get all tasks |
| `GET` | `/api/tasks/{id}` | Get task by ID |
| `POST` | `/api/tasks` | Create new task |
| `PUT` | `/api/tasks/{id}` | Update task |
| `DELETE` | `/api/tasks/{id}` | Delete task |
| `PATCH` | `/api/tasks/{id}/status` | Update task status |

### Example Request (Create Task)
```json
POST /api/tasks
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write README and API docs",
  "dueDate": "2026-04-01",
  "status": "PENDING"
}
```

---

## 🎨 Screenshots

### Home Page
![Task Manager Home](https://via.placeholder.com/800x400?text=Task+Manager+Home+Page)

### Task List
![Task List](https://via.placeholder.com/800x400?text=Task+List+View)

---

## 🧪 Testing

Run unit tests:
```bash
./mvnw test
```

---

## 🔧 Configuration

### Application Properties

| Property | Description | Default |
|----------|-------------|---------|
| `server.port` | Application port | 8080 |
| `spring.datasource.url` | MySQL database URL | - |
| `spring.jpa.hibernate.ddl-auto` | Hibernate auto schema | update |
| `spring.jpa.show-sql` | Show SQL logs | true |

---

## 🐛 Troubleshooting

### Common Issues

**Issue 1: Database Connection Error**
```
Solution: Verify MySQL is running and credentials are correct in application.properties
```

**Issue 2: Port 8080 Already in Use**
```
Solution: Change port in application.properties:
server.port=8081
```

**Issue 3: Maven Build Fails**
```
Solution: Run: ./mvnw clean package -DskipTests
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 Future Enhancements

- [ ] User authentication and authorization
- [ ] Task categories and tags
- [ ] Task priority levels
- [ ] Email notifications
- [ ] Task search and filters
- [ ] Export tasks to PDF/Excel
- [ ] Mobile application
- [ ] Collaborative tasks

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Shreya**

- GitHub: [@090shreya04](https://github.com/090shreya04)
- Project Link: [https://github.com/090shreya04/Task-manager](https://github.com/090shreya04/Task-manager)

---

## 🙏 Acknowledgments

- Spring Boot Documentation
- MySQL Community
- Bootstrap for UI components
- All contributors and supporters

---

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact via email
- Check existing documentation

---

<div align="center">
  <p>Made with ❤️ by Shreya</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
