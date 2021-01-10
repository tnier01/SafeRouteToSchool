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
- layer selection for different basis layers (e.g. OpenStreetMap, satellite image), put on/ off density map, put on/ off accident points (Aysel)
- showing the intital route and highlight the accidents on the route (Nick)
- showing different routes at the same time (especially the intital route and one further route which is avoiding accidents) (Tom) 
- responsible design, good looking settings for the route search (Aysel) 
- contact to police (Tom) 
- get densitsy map from QGIS, and write down procedure for final report (Mirjeta) 
- statistics for accidents on route (Jan)

#### possible new tasks 
- suggestions for textual start and destination input (mentioned by Tom)
- activate highlighting manually (mentioned by Nick)
