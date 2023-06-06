# Social media app

The app was built using:

- Node.js w/ Express
- TypeScript
- MongoDB
- React.js
- HTML/CSS
- Jest

I have used **validation**, server and client side **authentication**, **error handling**.

Some TODOS:

- add websockets
- add profile page
- add upload images functionality for profile and post
- add admin panel with data visualization
- add caching mby with Redis
- finish the tests

# Running the app

- Clone the repository

```bash
git clone https://github.com/bongoslav/Social-media-app.git
```

- Install server dependencies and run project

```bash
cd <project_name>/api/
npm install
npm start
```

- Install client dependencies and run project

```bash
cd <project_name>/frontend/
npm install
npm run dev
```
Client is running on port 5173 and server on port 3000.

>There is a hidden .env file in /api/ . It contains jwt secret string as well as MongoDB connection string. To run locally you would need to setup the .env file with a correct mongo URL connection similar to this:
```javascript
mongoURL = "mongodb+srv://<username>:<password>@social-media-app.tj1jh2n.mongodb.net/?retryWrites=true&w=majority";
```

# App preview

## Register preview

![register page](demo%20images/register.png)

### Some triggered validation errors on login and register pages

![password validation](demo%20images/password-validation1.png)
![user already exists](demo%20images/register-validator.png)
![invalid email address](demo%20images/login-validator1.png)

## Home preview

![home](demo%20images/home.png)
![another home](demo%20images/home2.png)

## No user preview
![no user](demo%20images/logged-out.png)

## Invalid url page
![invalid url](demo%20images/error-page.png)
