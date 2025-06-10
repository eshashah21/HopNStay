# 🏝️ HopNStay

**HopNStay** is a full-stack web application built using MongoDB, Express.js, and Node.js, following a clean MVC architecture. The platform enables users to create, edit, and search listings with advanced filtering options. It integrates Cloudinary for secure and scalable image storage, ensuring fast and reliable media management.

---

## 🚀 Features

- **Full-Stack Implementation**: Built using MongoDB, Express.js, and Node.js.
- **MVC Architecture**: Clean separation of concerns for better scalability and maintainability.
- **Authentication & Authorization**: Secure login system with role-based access control.
- **CRUD Functionality**: Users can create, read, update, and delete listings.
- **Advanced Filters**: Refine search results with various filtering options.
- **Category-Based Filtering**: Filter listings based on property categories for more targeted results.
- **Cloudinary Integration**: Store and manage images using Cloudinary for optimized delivery.
- **Bootstrap Integration**: Responsive and modern user interface design.
- **Real-time Search**: Experience seamless and instant search functionality.
- **Map Integration**: View listing locations on an interactive map.

---

## 🛠 Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository

2. **Install Dependencies**
   ```bash
   npm install
   ```  

3. **Set Up Environment Variables**
Create a .env file in the root directory and add the following:
   ```bash
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   ```  

4. **Run the Application**
   ```bash
   nodemon app.js
   ```  
   The app will be available at: http://localhost:8080/listings


## **📌 Usage**
1. Sign up or log in with your credentials.
2. Create new listings with image uploads.
3. Use filters (including category) to search and refine listings.
4. Edit or delete listings as needed.

## **🧰 Technologies Used**
- **MongoDB**: Database
- **Express.js**: Backend framework
- **Node.js**: Backend runtime
- **Cloudinary**: Image storage and delivery
- **Bootstrap**: Responsive UI framework
- **Map API**: Interactive map integration
