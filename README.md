# Gotta Get Outta This Space

The source code for ["Gotta Get Outta This Space"](https://gottagetouttathis.space)

This code

## The Front-end
The front-end for this project uses Ionic React, in Typescript.

This front-end currently points to my firebase project. To point it towards a different project, change the configuration in `src/firebaseConfig.ts`

The front-end also relies on a pro license to [FontAwesome 5](https://fontawesome.com/). To remove these dependencies, see the guide below.

### Run it locally

```
npm install
npm run start
```

### Production Build

```
npm install
npm run build
```

### Deployment
Deployment is via Github Actions. The current actions set up rely on the following secrets:
* `FONTAWESOME_PRO_TOKEN` - a fontawesome pro secret
* `SURGE_LOGIN` - a surge username
* `SURGE_TOKEN` - a surge token

The current actions would have to change to direct deployment to a different domain

### Removing the Fontawesome dependency
```
npm uninstall @fortawesome/pro-regular-svg-icons
npm uninstall @fortawesome/pro-solid-svg-icons
```

Now remove dependencies on those two libraries in `src/components/Game/Icons/index.tsx`. This will break some icons in the build.

## The Backend - firebase functions

The Back-end of this project uses firebase functions, and can be found in the `firebase` directory.

### Deploying the functions

To deploy these functions you'll have to [make a new firebase project](https://firebase.google.com/).
Follow [the instructions here](https://firebase.google.com/docs/functions/get-started) to get the firebase cli up and running on your computer.

You'll then need to [modify the project aliases in the folder](https://firebase.google.com/docs/cli#add_alias), so it's pointing at the right project.

Finally, there's a bunch of variables you'll need to set up (or remove the dependencies for):
* `slack.webhook` - the slack webhook that will recieve game updates
* `captcha.secret` - the recaptcha (v3) secret to verify that forms aren't being filled in by robots
* `mailchimp.apikey` - the mailchimp api key for signing up to a mailing list
