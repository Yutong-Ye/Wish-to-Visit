# Wish to Visit

## Introduction

The Wishlist platform is a delightful space where users can manifest their desires by creating and managing personalized wishlists. It's designed to bring joy and organization to the process of goal-setting and dreaming big. With intuitive features for managing wishes, the platform is both a practical tool and a source of inspiration.

## Install Extensions

-   Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
-   Black Formatter: <https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter>

## For Registered Users:

-   Manage Wishes: Create, view, and delete wishes from your personalized list.

## For Registered Users:

-   View country information.

## Project Initialization

-   Clone the repository to your local machine.
-   Navigate into the project directory.
-   Create a persistent Docker volume with docker volume create wtv.
-   Build the Docker environment with docker compose build.
-   Launch the application using docker compose up.

### Viewing FastAPI Docs and React Front End

-   To view the React-based frontend, navigate to https://sry-wtv.gitlab.io/wish-to-visit/ in your internet browser.
-   Since the frontend utilizes React, the React Google Chrome extensions allow for viewing the store and state in the JavaScript console.

### React Routes

-   Home Page (/): A welcoming landing page that introduces you to the Wishlist platform.
-   Signup (/signup): Register for a Wishlist account.
-   Login (/login): Sign in to your Wishlist account.
-   Create Wishes (/wishes): Create the wishes and redirects to the Wishlist upon submission.
-   Wishes (/wishes/:wish_id): View/Delete a specific wish.