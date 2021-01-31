# SafeRouteToSchool

#### Accident data source
https://unfallatlas.statistikportal.de/

## Getting Started


To get a local copy up and running follow these simple steps.

### Prerequisites

Install npm
* npm
```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo
```sh
git clone https://github.com/NJaku01/NJaku01.github.io.git
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

#### next tasks 
- responsive design (Nick)
- adapt month to real month in the popup (Jan)
- adapt color of the routes (Jan)
- legend of the risk levels should have the same size like routes legend (Jan) 
- finish how-to and impressum (Tom)
- video (Aysel) 
- delete route markers + route instructions (Tom) 
- only show every second number in the statistics (Jan) 
- insert the new density map in our application and proof if it works (Mirjeta)
- limit the map extent to Münster (Mirjeta) 

#### open questions
- name? (SafeRouteToSchool vs. SafeRoute)










