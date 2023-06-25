# CareFinder

![Alt text](public/images/image.png)

CareFinder is a search engine for Hospitals. Currently available only in Nigeria.

* The main page can only be access after signing up and logging in.
* All hospitals for a country will be display after selecting a country, and can the be further filtered by state and local goverment. Right now, only states such as Kwara, Lagos, Abia has some tests hospitals.
* You can add hopital and also write some markdown to describe what the hospital do.
* On the All hospitals page, You can select some hostiplat by checking the checkbox and clicking on the share icon. This will export the selected hospita to your email.
* You can as well download the selected hospital as a csv file.
* User can view the full details of each hospital by clicking on the hospital item. You can further download or export to your gmail likewise. 



## Authentication

Authentication is done with NextAuth Library.

## Main Files: Project Structure

```
├── README.md
├── public
├── app
├── components
├── config
├── cypress
├── hooks
├── library
├── pages
├── store
├── gitignore
└── package.json
```

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Pre-requisites and Local Development

The prerequites tools for local development are:

- NodeJs

### Frontend

The app is built with NextJs version 13.4 so there is need to install the frontend dependencies using Node.js and NPM

You can confirm if Node.js and NPM is installed successfully using the codes below

```
node -v
npm -v
```

From the carefinder folder, run the following commands to start the client:

```bash
npm install # run this once to install all dependencies
# then
npm run dev
# or
yarn dev
# or
pnpm dev

```

By default, the frontend will run on `localhost:3000`.

## Deployment

The app is deployed on Vercel https://care-finder-iota.vercel.app/

## Author

Joel Ojerinde

## Acknowledgements

AltSchool Africa
