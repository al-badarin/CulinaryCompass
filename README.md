# CulinaryCompass

Here you can see a video of the site view:
<iframe> width="560" height="315" src="[https://www.youtube.com/embed/dQw4w9WgXcQ](https://youtu.be/au5F5Q9bL-o)" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Table of Contents
1. [Introduction](#introduction)
2. [Overview](#overview)
3. [Features](#features)
   - [Home](#home)
   - [Add Recipes](#add-recipes)
   - [Recipes List](#recipes-list)
   - [My Profile](#my-profile)
   - [Contacts](#contacts)
4. [Structure](#structure)
5. [Getting Started](#getting-started)
   - [Installation](#installation)

## Introduction <a name="introduction"></a>
This is the README file for the CulinaryCompass project. CulinaryCompass is a web application for exploring, sharing, and managing recipes.

## Overview <a name="overview"></a>
The CulinaryCompass application allows users to browse a collection of recipes, add new recipes, view their own profile, edit and delete the recipes the user have created.

## Features <a name="features"></a>
### Home <a name="home"></a>
The home page of CulinaryCompass welcomes users and provides a brief overview of the site's features. There is displayed a carousel gallery with the most recent recipes.

### Add Recipes <a name="add-recipes"></a>
Users can add their own recipes to the CulinaryCompass database, complete with description of the recipe, its ingredients, instructions, and an image.

### Recipes List <a name="recipes-list"></a>
The Recipes List page displays a collection of all the recipes available on CulinaryCompass. The user who created the recipe can edit and delete it.

### My Profile <a name="my-profile"></a>
Registered users have access to a personalized profile page where they can view and manage their added recipes and also update their profile information.

### Contacts <a name="contacts"></a>
The Contacts page provides users with a way to get in touch with the CulinaryCompass team for support, feedback, or inquiries.

## Structure <a name="structure"></a>
Here's an overview of the project structure:
- `recipe-sharing-app` - This is the CLIENT side of the application.
   - `src/` - Contains the source code for the CulinaryCompass application.
     - `app/` - Main application components, modules and services.
     - `assets/` - Images, fonts, and other static assets.
     - `environments/` -  stored the apiUrl: `http://localhost:3000/api`
- `Rest-api` - This is the SERVER side of the application.

## Getting Started <a name="getting-started"></a>
### Installation <a name="installation"></a>
To run the CulinaryCompass application locally, follow these steps:
1. Clone this repository to your local machine.
2. Open a new terminal
3. Navigate to the folder with the server 'Rest-api'
2. Install the necessary dependencies using `npm install`.
4. Start the development server ('Rest-api') with `npm start`.
5. Open a second terminal
6. Navigate to 'recipe-sharing-app' folder and run `ng serve`.
