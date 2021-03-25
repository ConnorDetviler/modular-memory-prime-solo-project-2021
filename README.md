# Modular Memory.

## Description

_Duration: 2 Week Sprint with 1 Week Scoping_

While the world of modular synthesizers is vast and deep, it is also very niche and unknown by most people. So allow me to explain: A modular synthesizer is comprised of several modules that each carry their own specific function for creating and manipulating sound. These modules are then connected to one another by the user with patch cables. When a user has created a sound that they like, this sound is referred to as a "patch". 

This method of synthesis is extremely powerful and also very fun, but the major downside of it is that there is no way to save your patches and come back to them later. If you would like to create a new patch, you must first erase the one that currently exists. Most synthesists who would like to save their patches will take a picture with their phone, only for the picture to get lost, unlabeled in their camera roll.

This is where my app, Modular Memory comes in. Modular Memory is a place to save those pictures that you have taken with all of the knobs, switches, and patch cables in place. Not just that, but also label them, associate them with custom tags for categorization, and give them descriptions and notes to follow.

## Screen Shot


### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

## Installation

1. Create a database named `prime_app`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries
4. Open up your editor of choice and run an `npm install`
5. Run `npm run server` in your terminal
6. Run `npm run client` in your terminal
7. The `npm run client` command will open up a new browser tab for you!

## Usage

1. Create an account or log in
2. to add your first patch, use an image uploader such as imgur to upload a picture of your patch
3. Navigate to the Patch Edit view to link the image
4. Title your patch and write down any notes for your future self. Associate it with any relevant tags. You may also create your own tags
5. Use the Patch View to view your saved patches
6. Use the Patch Manager to view a table of all of your patches with all of their associated tags, as well as edit or delete them


## Built With

- React
- Node.js
- Redux
- Sagas
- PostgreSQL
- Express


## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality.
