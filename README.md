# LicenseManager-mobileapp

Engineer's Thesis mobile application project repository

## Features overview

- Browsing licenses list with displaying license's details
- Browsing customers list with displaying customer's details
- Displaying details about signed in user,
- Dark theme mode

## Getting started

Before starting up project please note some important issues:

- backend URL placed in [axios.js](./mobile-app/src/common/axios.js) file should be accessible from client's mobile device. Hence you should make sure that URL is not pointing to localhost but to known for device IP or hostname. It's recommended to use IP or hostname of machine running backend with port exposed by backend service container (port `9800`)
- if you are facing problems with connecting to server through HTTPS with self-signed certificate, please use Nginx reverse proxy created alongside with backend services containers from backend's docker-compose as a workaround. Currently there is not working solution fo React Native Expo managed project which works for me
- if icons in application are not rendered properly, please try to delete [android](./mobile-app/android/) and [ios](./mobile-app/ios/) directories

Finally you can run Expo project by moving into [application directory](./mobile-app/), installing required dependencies (`yarn install`) and starting project by running `expo start` command in the same directory

## Usage overview

<p align="center">
    <img src="./assets/mobile-app.gif" class="center">
</p>

### Credits

Some icons used in application was downloaded from https://www.flaticon.com/ site.

### Technologies and Tools

- JavaScript ES6
- React Native
- [React Native Elements components library](https://reactnativeelements.com/)
- [NativeBase components library](https://nativebase.io/)
