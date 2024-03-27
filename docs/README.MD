# Wish to Visit

## Designed by:

[Jonathan Spannring ](https://gitlab.com/jonathan.spannring) | [Ronnie Reif](https://gitlab.com/ronnielreif) | [Yutong Ye](https://gitlab.com/Yutong-Irene-Ye)

## Introduction

The Wish to Visit platform is a delightful space where users can manifest their desires by creating and managing personalized wishlists. Designed to bring joy and organization to the process of goal-setting and dreaming big, it offers intuitive features that make it both a practical tool and a source of inspiration. Users can also explore their interests, view information about countries they're interested in, and maintain a virtual passport to track their travel aspirations.

## Features

-   User Authentication: Secure login and registration functionality to protect user accounts.
-   Wishlist Management: Users can create, view, and delete wishes, making it easy to keep track of their goals and aspirations.
-   Country Information: Provides users with information about various countries, enriching their wishlist experience.
-   Interests Management: Users can add interests to their account, which are then displayed and can be edited.

## Technologies Used

-   Frontend: React.js for a dynamic and responsive user interface.
-   Backend: FastAPI for a high-performance, easy-to-use framework.
-   Database: PostgreSQL for reliable and efficient data storage.
-   Containerization: Docker for easy deployment and environment consistency.

## API Endpoints

-   [API Endpoints](./docs/apiendpoints.md)

## Wireframe

-   https://excalidraw.com/#room=a73ee2397d26aab63da9,aktQ-JqJT1lskIksYmPCPg

## For Registered Users:

-   Edit your profile settings.
-   View country information and explore further from there.
-   Manage Wishes: Create, view, and delete wishes from your personalized list.
-   Manage countries that the user has previously visited.
-   Manage interests: Submit interests that are then displayed.

## For All Users:

-   View country information.
-   Create an account.
-   Log in to your account.

## Project Initialization

-   Start by cloning the repository, navigate to https://gitlab.com/sry-wtv/wish-to-visit
-   Enter the project directory by navigating to it.
-   Set up a persistent Docker volume using the command docker volume create wtv.
-   Construct the Docker environment by executing docker-compose build.
-   Initiate the application with the command docker-compose up.

### Viewing React Front End and FastAPI Docs

-   To view the React frontend, navigate to https://sry-wtv.gitlab.io/wish-to-visit/ in your internet browser.
-   To view the FastAPI docs, navigate to http://localhost:8000/docs#/ in your internet browser.

### React Routes

-   **Home Page** `http://localhost:5173`
    -   Landing/Homepage that welcomes you to your next adventure.
-   **Signup** `http://localhost:5173/signup`
    -   Sign up for an account.
-   **Login** `http://localhost:5173/login`
    -   Log in to your account.
-   **MyProfile** `http://localhost:5173/settings`
    -   View your profile settings.
-   **Edit MyProfile** `http://localhost:5173/settings/edit`
    -   Edit your account information.
-   **Create Wishes Form** `http://localhost:5173/wishes`
    -   Submit the form to create a wish, and you will be automatically directed back to the wishlist page.
-   **View Wishlist Form** `http://localhost:5173/wishlist`
    -   View your wishlist.
-   **Create Visit Form** `http://localhost:5173/visit`
    -   Submit the form to create a visit, and you will be automatically directed back to the visitlist page.
-   **View Visitlist Form** `http://localhost:5173/visitlist`
    -   View the places you have traveled to.
-   **View List of all Countries** `http://localhost:5173/countries`
    -   View all countries and filter them by keyword search or region.
-   **View Country Detail** `http://localhost:5173/countries/:country`
    -   View details about a specific country.
-   **View Search Results** `http://localhost:5173/search/:searchTerm`
    -   View the results of a search.
-   **View Interests** `http://localhost:5173/interests`
    -   View your interests.
-   **Create Interests Form** `http://localhost:5173/interests/create`
    -   Submit the form to create interests, and you will be automatically directed back to the interests view.
