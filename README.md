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
- update Server (Nick)
- legend for routes, like it is also available for the risk areas(Jan) 
- change representation of the risk areas (color, lines) so that they the different levels are better distinguishable. Furthermore a connection between the routes and the risk areas concerning color or marking would be interesting (Jan) 
- accidents marker should be always above the risk areas, so that they are clickable (Jan) 
- group layer for accidents marker (pedestrian, bicycle, others) (Jan) 
- responsive design/ create the design described by the mockup (Nick)
- something like a popup from the map which can be opened and closed for the submit process (Tom) 
- grey suggestion in the start and finish field ("street, number, place") (Tom)
- insert the new density map in our application and proof if it works (Mirjeta)
- limit the map extent to Münster (Mirjeta) 

#### possible new tasks 
- add data for other years 
- make a video of the application 









