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
  console.log(avoid)

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
            class3.coordinates.push(element.geometry.coordinates)
            break;
        case 4:
            class4.coordinates.push(element.geometry.coordinates)
          break;
        case 5:
            class5.coordinates.push(element.geometry.coordinates)
          break;
        default:
          // code block
      } 
}

console.log(class1)