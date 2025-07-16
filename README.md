# -REAL-TIME-COLLABORATIVE-DOCUMENT-EDITOR

  COMPANY: CODTECH IT SOLUTIONS

  NAME: BHUVANESWARI S

  DOMAIN: FULL STACK WEB DEVELOPMENT

  DURATION: 4 WEEKS

  MENTOR: NEELA SANTOSH

# DocEdit - Real-Time Collaborative Document Editor

DocEdit is a professional, real-time collaborative document editing web application. It enables users to create, edit, and manage text documents with features such as live multi-user editing, rich text formatting, image insertion, download as PDF, and document management (favorites, search, delete).

## Table of Contents

* [Demo](#demo)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [Usage](#usage)
* [API Endpoints](#api-endpoints)
* [Contributing](#contributing)
* [License](#license)

## Demo

 Live demo coming soon (or run locally using the instructions below).

## Features

*  Real-time collaborative editing with WebSocket + STOMP
*  Rich text formatting (bold, italic, underline, lists, font styles, colors)
*  Insert and upload images from local device
*  Document workspace dashboard with:

  1. Search
  2. Create
  3. Delete
  4. Mark as Favorite 
  5. Recent Documents
*  Auto and manual document saving to backend
*  Download documents as PDF
*  Responsive design for mobile and desktop

## Tech Stack

### Frontend

* HTML5, CSS3, JavaScript 
* WebSocket (SockJS + STOMP)
* PDF Generation via `html2pdf.js`

### Backend

* Spring Boot (Java)
* WebSocket configuration using `@EnableWebSocketMessageBroker`
* RESTful APIs (CRUD)
* DataBase for storing and retrive
* Lombok, JPA, CORS support

## Installation

### Prerequisites

* Node.js (for optional frontend bundling)
* Java 17+
* MySQL 8+

### Setup Backend

1. Clone this repo:

```bash
git clone https://github.com/your-username/docedit.git
cd docedit
```

2. Configure `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/docedit_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

3. Run the application:

```bash
./mvnw spring-boot:run
```
### Setup Frontend

You can open the HTML files directly in the browser:

* `index.html`: Landing page
* `workspace.html`: Document dashboard
* `editor.html`: Document editing view

## Usage

### Workspace

* View all documents
* Search and filter (All / Recent / Favorites)
* Create new document with `+ New`
* Click a document to open it in the editor

### Editor

* Use toolbar to format content (bold, italic, color, fonts, highlight)
* Upload images via `+Img` button
* Download as PDF
* Content syncs in real-time across connected users

## API Endpoints

### Base URL

http://localhost:8080/api/documents

 Method    Endpoint    Description              

 GET    -   `/`   -    Fetch all documents      
 GET   -  `/{id}` -  Fetch a single document  
 POST  -  `/`    -   Create a new document    
 PUT   -  `/{id}` -  Update existing document 
 DELETE - `/{id}` -  Delete a document        

### WebSocket

* Endpoint: `/ws`
* Subscribe: `/topic/changes/{docId}`
* Send: `/app/edit/{docId}`

## Contributing

Pull requests are welcome! Feel free to file issues or suggest features.

### To Contribute:

* Fork the repository
* Create a new branch
* Make your changes
* Submit a pull request

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

Thanks to open-source tools like SockJS, Spring Boot, and html2pdf.js that made this project possible.


## DocEditPage


<img width="1920" height="901" alt="Image" src="https://github.com/user-attachments/assets/679f4c7b-b594-4b78-8bf5-e7f60f005ad6" />


## Document Creation


<img width="1920" height="906" alt="Image" src="https://github.com/user-attachments/assets/324eb7f1-41ae-4d68-bce2-33aae349b2ed" />
