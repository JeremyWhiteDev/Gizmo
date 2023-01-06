# Gizmo

Gizmo is an application that allows users to share their personal belongings with other users. We all have own a bunch of whatchamacallits, thingamajigs, normal household items. Let's reduce waste and create sustainable communities where we share our assets with everyone around us.

This project was created as a Front End Capstone project while attending Nashville Software School's Full Stack Web Development Bootcamp. It was completed with one week of planning and ~25 days of coding.

## Project Description

This application finally resolves a problem we've all faced in our lives: "I need to borrow a ${insert random item here} for a few days. Anyone got one?" I know I have faced this problem before numberous times. Sometimes it's a tree limb that falls in my yard and I need a chainsaw to cut it up. Sometimes it's a folding table that I need to borrow for a special event I'm hosting. The list goes on and ON.

Gizmo solves this problem by allowing users to browse search and browse gizmos in their area. If a user wants to borrow a gizmo, they must request it for a specific period of time. The owner of that gizmo can then decide to accept or reject the request.

## Technologies Used

<a href="https://reactjs.org/" title="React JS"><img src="https://github.com/get-icon/geticon/raw/master/icons/react.svg" alt="React JS" width="50px" height="50px"></a>
<a href="https://reactrouter.com/en/main" title="React Router"><img src="https://reactrouter.com/_brand/react-router-mark-color.svg" alt="React Router" width="50px" height="50px"></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" title="JavaScript"><img src="https://github.com/get-icon/geticon/raw/master/icons/javascript.svg" alt="JavaScript" width="50px" height="50px"></a>
<a href="https://tailwindcss.com/" title="Tailwind"><img src="https://github.com/get-icon/geticon/raw/master/icons/tailwindcss-icon.svg" alt="Tailwind" width="50px" height="50px"></a>
<a href="https://flowbite.com/" title="Flowbite"><img src="https://flowbite.com/images/logo.svg" alt="Flowbite" width="50px" height="50px"></a>
<a href="https://maps.google.com/" title="Google Maps"><img src="https://github.com/get-icon/geticon/blob/master/icons/google-maps.svg" alt="Google Maps" width="50px" height="50px"></a>
<a href="https://www.npmjs.com/" title="npm"><img src="https://github.com/get-icon/geticon/raw/master/icons/npm.svg" alt="npm" width="50px" height="50px"></a>
<a href="https://www.firebase.com/" title="Firebase"><img src="https://github.com/get-icon/geticon/raw/master/icons/firebase.svg" alt="Firebase" width="50px" height="50px"></a>
<a href="https://react-query-v3.tanstack.com/" title="React Query"><img src="https://react-query-v3.tanstack.com/_next/static/images/emblem-light-628080660fddb35787ff6c77e97ca43e.svg" alt="React Query" width="50px" height="50px"></a>

### Techologies I used in this project that I had used in previous projects:

<ul>
<li>Javascript ES6 and ReactJS with React Router to create a single page application.</li>
<li><a href="https://github.com/typicode/json-server" title="JSON Server">JSON Server API</a> to interface with a local JSON database.</li>
</ul>

### Technologies I hadn't used until this project:

<ul>
<li>TailwindCSS and Flowbite Components for styling.</li>
<li>Google Maps API to display geocode data on a map, and Google Places API to generate geocode data based on user input.</li>
<li>Headless UI, Google Places Autocomplete npm packages.</li>
<li>Firebase for email/password and Google authentication.</li>
<li>Firebase for image file upload.</li>
<li>React Query for asynchronous State Management.</li>
</ul>

### Why I chose these technologies

1. One of the project requirements was that this application had to use Javascript ES6/ReactJS/React Router.
2. I found that TailwindCSS and Flowbite allowed for quick creation and editing of styles. I appreciate that Tailwind's use of utlity classes allows for a single source of truth regarding a component's styling without the need to manage .css files.
3. I wanted to challenge myself to display data in a way other than a grid or list. The Google Maps API allowed me to do that. It also opened up more challenge on how to capture geocode from a user's input.
4. Headless UI had powerful unstyled components that worked very well with Tailwind's styling approach.
5. After comparing Google Firebase and Amazon Cognito, I found that Firebase provided all of the features I needed for authentication. I watched a few Youtube videos on Photo storage and had an understanding of what that would entail.
6. I wanted to explore different options for a global state management library. I considered redux and React Query (aka TanStack Query) I thought that for the purpose of this application, React query had specific tooling to keep for caching data returned from async API calls. React Query keeps that data up to date and reduces the amount of unneccessary fetching when the user mounts/unmounts certain components.

## Challenges Faced

The biggest challenge I faced was learning the patters used with React Query. Simple operations like fetching data and displaying it were very easy in Reacty Query. But I ran into issues when I wanted to use data fetched with React Query to then change a state variable upon successful fetch. Something that can be easily done with useEffect but not in combination with React Query which returns a new object with every render of a component.

I also had difficulty designing the layout of the pages. While Flowbite and TailwindCSS provider a good starting place for components, I found that filling a page in a pleasing way with those components was a challenge.

Before starting this application, a stretch goal I had was to deploy this application in a secure manner. The requirements I came up with that this project needed to meet in order to be deployed were as follows: only fetching data that was for the current use case, not bringing in personal user data unnecessarily, and not joining lots and lots of data on the front-end. I quickly discovered that what I was looking for was a full-stack app with a custom API the could provide custom routes and responses.

I researched using AWS API Gateway and AWS Lambda functions with Node.js to create an API, but that would've required much learning in technologies I'd never used before and would've undoutbedly put me outside of my 4 week timeframe to create this application.

## Current Noteworthy Features.

### For Un-Authorized users:

Users can browse gizmos in a grid view or map view.
Gizmos on the map view go through a location algorithm before being displayed on the map. The algorithm randomizes the coordinates within a small variation, allowing for security and peace of mind that the exact location of a user's personal property isn't displayed on the map.
Users can search for gizmos by Keyword, Category, or a combination of both. Input field is a combobox that allows users to start typing and see matching categories or create their own search term. Users can select multiple categories.
Page through 25 gizmos at a time.
See how many total gizmos match their search query, and what range of items are currently being displayed.

### For Authorized Users:

All of the features of unauthorized users.
Users can sign-in with Google.
Users can create a user profile.
Users can input a street address in a form field that will autocomplete that address as they type. That address is then converted to lat/lng coordinates which is used for locating that user's gizmo captures the latitude
Users can request a tool for a specific timeframe and provide a message with the request.
Users can create gizmos from their own collection that can be public or private.
Users can see requests they have submittedfor gizmos as well as requests that other users have made for their gizmos.
Users can edit, accept, or decline requests.
Accepted requests can be tracked and users can mark gizmos that have been borrowed as returned when they recevie the gizmo back.

## Features I would Like to Implement in the Future

Making Gizmo a full stack, deployed application.
Integrating charts and graphs for a user's gizmos to see how their inventory has grown over time, how many times certain gizmos have been shared, and an ROI on frequently used gizmos.
Creating an Activites feed where users can create an actitity, tag specific tools they own or tools they have borrowed, and share that activity so others can like and comment on it.

## How to Install

1.

## Credits

### Step 1: Clone This Template

- Click the "use this template" button in the upper right hand corner of this repo and select "create a new repository". (note: the repo pictured is a different repo but it works the same).

![Screen Shot 2022-11-14 at 7 55 27 AM](https://user-images.githubusercontent.com/43580474/201677821-fca0834d-2cf9-4465-9488-d6ab755f0ffa.png)

- Select yourself from the "Owner" drop down list and name your repo after your app. Important! Make sure it's set to public"

![Screen Shot 2022-11-14 at 7 57 16 AM](https://user-images.githubusercontent.com/43580474/201678218-8b8b85a8-4e09-4b89-bff0-c01c0aa604d9.png)

- Now you should have a copy of this as a github repo in your github! All you have to do is copy the ssh from the green "<> CODE" button in the upper right hand corner and clone it locally.

### Step 2: Change things to your app's name

- In your `package.json` file change the "name" property on line 2 to your app's name
- Rename the `CapstoneTemplate.js` file to your app's name. Do the same with the name of the component

### Step 3: Run `npm i`

- Run `nmp i` in your app's root directory

## Step 4: Create a Firebase Account & Initialize Products

- Go to https://firebase.google.com/ and creat an account. It's free!
- Add a new project for your app IMPORTANT! DISABLE google analytics (it will ask you when it asks for your app name)
- It will ask you to enable Firebase.

![Screen Shot 2022-11-14 at 8 19 28 AM](https://user-images.githubusercontent.com/43580474/201683328-4479c1ed-5864-4060-8bbb-857bc273fcf2.png)

- Make sure you pick the "web" button. Give your app a nickname and click next. In step 2 make sure it copy the firebase Config object it shows you. Copy it into your `fakeApiKeys.js` file.
- Rename `fakeApiKeys.js` to `apikeys.js`
- Next it will ask you to "Choose Products You Want To Add To You App". IF USING AUTHENTICATION Choose Authentication click the "get started" button and enable email/password.
- After that is done click the "enable a new provider" and choose google.
- IF USING PHOTO STORAGE: Go into the side menu under "build" and choose storage.

![Screen Shot 2022-11-14 at 8 27 00 AM](https://user-images.githubusercontent.com/43580474/201684975-f62755a7-371a-4b48-a591-e4c1356bbce0.png)

- click the "Get Started" button
- When prompted make sure you select to use Production Mode.
- Click next when it asks you which region you want (stick with the default).
- Go into the "Rules" tab and change them to match what is below. Click the "publish" button.

![Screen Shot 2022-11-14 at 8 29 39 AM](https://user-images.githubusercontent.com/43580474/201685827-48a6b36b-a11a-4c7e-babd-9e4b5d1ac3fd.png)

**YOU ARE ALL SET!**

## If You Cherry Pick (Not Advised)

This is assuming that you only want to use the methods and you are building your own structure to use them. Slightly harder and more advanced so not totally advised.

### Using It For Google Authentication

If using only google auth keep the `googleAuth.js` file

Initialize Firebase Authentication in your firebase account. Enable google as a sign-in method.

-- Methods --

`googleAuth.signInRegister()`

- params:
  - Navigate --> A way to pass in `userNavigate` function and route to a new view
- note: opens google sign in popup

`googleAuth.signOut()`

- params:
  - Navigate --> A way to pass in `userNavigate` function and route to a new view
- note: could be used for either signout methods

## Using It For Email/Password

If using only email/password auth keep the `emailAuth.js` file

Initialize Firebase Authentication in your firebase account. Enable email/password as a sign-in method.

-- Methods --

`emailAuth.register()`

- params:
  - userObj --> {fullName: , password: , email: }
  - Navigate --> A way to pass in `userNavigate` function and route to a new view

`emailAuth.signIn()`

- params:
  - userObj --> full object{email: , password: }
  - Navigate --> A way to pass in `userNavigate` function and route to a new view

`emailAuth.signOut()`

- params:
  - Navigate --> A way to pass in `userNavigate` function and route to a new view

## Using It For Email/Password AND Google Sign In

If using email/password and google auth keep everything in the `helpers/` folder except `photoStorage.js`.

Initialize Firebase Authentication in your firebase account. Enable email/password as a sign-in method as well as Google.

-- Methods --

The only new file you would use is `logout.js`. That handles logging out for both google and email.

`logout.lougout()`

- params:
  - Navigate --> A way to pass in `userNavigate` function and route to a new view
- Note: Looks at which type of login the user used and then picks the appropriate sign out.

### Using It For File Storage

If using only file storage keep the `photoStorage.js` file

Initialize Firebase Storage in your firebase account.

-- Methods --

`photoStorage.upload()`

- params:
  - bucket ---> name of folder in your firebase storage where your photo is going. Default is "images".
  - file ---> file object to be uploaded
- note: Make sure that you are saving the return object properties to an object in your database (ex: a user if its a user profile). You especially need the path if you are going to use the delete method

`photoStorage.delete()`

- params:
  - filepath ---> path to file you are trying to delete
- Note: don't forget to delete your reference to this file in your database as well

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
