# SafeRouteToSchool
An application to avoid accidents on your routes through the city of Münster. 
After submitting the route, different routes can be selected that avoid different risk areas where accidents are more likely to occur in Münster. All routes are displayed on a map, and it is possible to view additional statistics and to export the routes to Google Maps.
A detailed How-To can be found after installation of the application. 

This application was developed as part of the class "Geoinformation in Society" in the winterterm 2020/21 at [ifgi](https://www.uni-muenster.de/Geoinformatics/en/index.html) at the [University of Münster](https://www.uni-muenster.de/en/). 


## Getting Started
To get a local copy of the application and to run it, follow these simple steps.

### Prerequisites

Install npm
* npm
```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo
```sh
git clone https://github.com/tnier01/SafeRouteToSchool.git
```
2. Install NPM packages
```sh
npm install
```

3. Get your openrouteservice token at https://openrouteservice.org/dev/#/signup

4. Rename the tokens_template.js file inside the private folder to tokens.js

5. Add your key, received in step 3, at the routing spot in the tokens.js file https://github.com/tnier01/SafeRouteToSchool/blob/5866e4ee6efe6e99e56d11f3581071d5d458cbc3/private/tokens_template.js#L5

6. Start the application
```sh
npm start
```

7. Go to the application under https://localhost:3000

## Accident Data Source
https://unfallatlas.statistikportal.de/













