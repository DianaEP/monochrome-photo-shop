# E-COMMERCE APP - Monochrome Photo Shop


## Overview

Welcome to my project! 
Monochrome Photo Shop is a demo e-commerce application for managing products, cart, and user data. This application is built using **React** and **Firebase**.It features user authentication, a cart system, and a simple way to interact with a Firebase database.

This project is designed for learning purposes, and it uses a **demo Firebase database** that I have set up for you. You can easily run this project locally, or if you want, you can replace my Firebase credentials with your own.

## Features

- User authentication (Login & Registration)
- Firebase-backed cart system
- Ability to update user data and delete the account
- Fictive credit card for checkout (this is a demo)

## Technologies Used

- **Firebase**: Backend service for authentication, data storage, and cart system
- **React Router DOM**: Used for client-side routing and page navigation
- **React Query**: For handling data fetching, caching, and synchronization
- **React Context API**: For managing global application state (like authentication, cart data and modal)
- **useReducer**: For managing complex state logic in the cart system

## Setup Instructions

### 1. Clone the Project

- git clone https://github.com/DianaEP/monochrome-photo-shop.git
- cd monochrome-photo-shop

### 2. Install Dependencies

- npm install

### 3. Environment Setup

 1. **Rename .env.demo to .env**  
 After cloning the repository, you will see a file called .env.demo in the root of the project. 
Rename this file to .env.

 2. **Firebase Credentials**  
 In the `.env` file, you’ll have to replace the values with my demo Firebase credentials for testing:

   ```env
   VITE_FIREBASE_API_KEY=AIzaSyDSqNrl60QoqUSonJgcX9RmHiXy3ectueI
   VITE_FIREBASE_DATABASE_URL=https://e-commerce-app-68e67-default-rtdb.europe-west1.firebasedatabase.app

    ```
*Important*:  
If you want to create your own Firebase project and connect the app to your own Firebase database, you can replace these values in the .env file with your own Firebase project credentials. You'll need to go to the Firebase Console and create a project to get your credentials.

3. **Firebase API Key & Database URL**  

If you're using your own Firebase project, these are the values you will need to provide in the .env file:
- FIREBASE_API_KEY – Found in your Firebase project's settings.
- FIREBASE_DATABASE_URL – Found in the Realtime Database section of your Firebase Console.

4. **Demo**  
You can use the app to log in, register, and interact with the cart. 

*Important*:  
If you use the demo Firebase database:
- I will be resetting the data daily.
- When the data is reset, the app will start fresh, and you’ll need to re-enter your data.

### 4. Running the project

npm run dev

## Notes

- **For Learning Purposes:**  
This project is primarily intended for learning purposes and is not intended for production use.

- **Dummy Data:**
    - *Email for register:* You can use test@test.com or anything similar as the demo login email.
    - *Credit Card:* A fictive card number 1234 5678 1234 5678 can be used for testing checkout. CVV: 123. 

