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
- responsive design, basis for dashboard design (Nick) 
- update Server (Nick)
- suggestions for textual start and destination input (Mirjeta)
- statistics concerning the routes should only be shown if the routes are choosen (Tom: show statistics independently from selection in layercontrol)
- different colours for different routes (Tom)
- problem if the start is inside a risk area (Tom: how do we want to solve it? (added: if all routes are the same, only the none route is shown))
- get densitsy map from QGIS, write down procedure for final report (about 5 classes, geojson format) (Mirjeta)
- something like an explanation or legend (especially for staistics) (Jan)

#### possible new tasks 
- limit the map extent to münster 
- add data for other years 
- make a video of the application 
- make the different levels better distinguishable in the map (Tom)
- loadingbar (Tom)
