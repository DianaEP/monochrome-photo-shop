# E-COMMERCE APP - Monochrome Photo Shop


## Overview

Welcome to my project! 
Monochrome Photo Shop is a demo e-commerce application for managing products, cart, and user data. This application is built using **React** and **Firebase**.It features user authentication, a cart system, and a simple way to interact with a Firebase database.

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

### 3. Setup Firebase

To connect the app to Firebase, follow these steps:

 1. **Create a Firebase Project**  
    1. Go to the [Firebase Console](https://console.firebase.google.com/).
    2. Click on **Add Project** and follow the steps to create a new project.
    3. Once the project is created, go to **Project Settings** (gear icon in the Firebase Console).
    4. Under the General tab, scroll down to "Your Apps" and click on **Add App** (choose Web App).
    5. Register the app and you'll receive a Firebase configuration object that contains keys like apiKey, authDomain, and others. You'll need these values for the .env file.

 2. **Set Up the Realtime Database**  
    1. In the Firebase Console, navigate to **Build > Realtime Database**.
    2. Click **Create Database** and choose a location.
    3. Set the database to **Start in test mode** (for development purposes).

3. **Database Structure**  

Your Firebase Realtime Database should include the following collections:

  - **users**: This will store user information.
  - **orders**: This will store the orders placed by users.
  - **products**: This will hold the e-commerce products. Follow the steps below to populate this collection with initial data.

*Import the initialData.json into products*
  1. Navigate to the Realtime Database in the Firebase Console.
  2. Click on the three dots (⋮) in the top-right corner of the database panel.
  3. Choose Import JSON.
  4. Select the initialData.json file located in the util/data folder of this project.
  5. The database will be populated with the initial products.

### 4. Environment Setup

1. **Rename .env.demo**

  After cloning the repository, you will find a file called .env.demo in the root of the project.Rename this file to .env.

2. **Configure the .env file**

  In the .env file, replace the placeholder values with your Firebase project's credentials.

  To find these values:

    1. Go to the **Project Settings** in the Firebase Console.
    2. Under the "General" tab, scroll to "Your Apps" and find the Firebase configuration.
    3. Copy the corresponding values into the .env file.

### 5. Running the project

npm run dev

## Notes

 **Dummy Data:**
  - **Demo Login Email:** Use `test@test.com` or any other valid email format as the demo login email.
  - **Fictive Credit Card for Checkout:** Use the card number `1234 5678 1234 5678` with CVV `123`.

