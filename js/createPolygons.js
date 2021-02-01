Multipolygon= {
    "type": "MultiPolygon",
    "coordinates": []
  }

class1 = JSON.parse(JSON.stringify(Multipolygon))
class2 = JSON.parse(JSON.stringify(Multipolygon))
class3 = JSON.parse(JSON.stringify(Multipolygon))
class4 = JSON.parse(JSON.stringify(Multipolygon))
class5 = JSON.parse(JSON.stringify(Multipolygon))
avoid = {
    "type": "MultiPolygon",
    "coordinates": [ 
      [
        [[7.608461380004882, 51.96505306750262], [7.619447708129882, 51.96505306750262],[7.619447708129882,51.96944221561243],[7.608461380004882, 51.96944221561243],[7.608461380004882,51.96505306750262]]
      ],
      [
        [[7.6289963722229, 51.96699650839783],[7.632451057434082,51.96699650839783],[ 7.632451057434082, 51.968939865022485],[7.6289963722229, 51.968939865022485],[7.6289963722229,51.96699650839783]]
      ]
    ]
  }

for(var element of areas.features){
    switch(element.properties.class) {
        case 1:
        //if(element.geometry.coordinates.length == 1){
          class1.coordinates.push(element.geometry.coordinates)
        //}
          break;
        case 2:
            class2.coordinates.push(element.geometry.coordinates)
          break;
        case 3:
            for (var element1 of element.geometry.coordinates) {
              class3.coordinates.push(element1)
            }
            break;
        case 4:
          for (var element1 of element.geometry.coordinates) {
            class4.coordinates.push(element1)
          }
          break;
        case 5:
          for (var element1 of element.geometry.coordinates) {
            class5.coordinates.push(element1)
          }
          break;
        default:
          // code block
      } 
}


console.log(class5)