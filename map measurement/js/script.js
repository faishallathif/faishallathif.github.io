let kordinatPolban = [-6.872206118810957, 107.57377338207202];
let inputsContainer = document.getElementById("inputs-container");
let inputColor = document.getElementById("input-color");

let inputData = [
  {
    keterangan: "Center POLBAN",
    koordinat: kordinatPolban,
  },
];

function addInput() {
  inputData.push({ keterangan: "", koordinat: "" });
  addInputHTML();
}
function addInputHTML(keterangan = "", koordinat = "") {
  let = i = inputData.length;
  let newInput = document.createElement("div");
  newInput.classList.add("input-wrapper");
  newInput.innerHTML = `
  ${i == 1 ? "<p class='mb-2'>Center Koordinat</p>" : ""}
  <input type="text" name="keterangan[]" placeholder="Keterangan ${i}" value="${keterangan}"  required/>
  <input type="text" name="koordinat[]" placeholder="koordinat ${i}" value="${koordinat}"  required/>
    ${
      i != 1
        ? '<button type="button" class="delete-button bg-red-400 p-2 mb-5" onclick="deleteInput(this)">Delete</button>'
        : ""
    }
  `;
  inputsContainer.appendChild(newInput);
}

function deleteInput(button) {
  var inputWrapper = button.parentElement;
  inputWrapper.remove();
}

let form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  submit();
});

form.addEventListener("reset", (e) => {
  e.preventDefault();
  reset();
});

function submit() {
  let inputKeterangan = document.getElementsByName("keterangan[]");
  let inputKoordinat = document.getElementsByName("koordinat[]");
  console.log(inputData);
  reset(true);
  console.log(inputData);
  for (var i = 0; i < inputKeterangan.length; i++) {
    inputData.push({
      keterangan: inputKeterangan[i].value,
      koordinat: inputKoordinat[i].value.split(","),
    });
  }
  console.log(inputData);
  generate();
}

//leaflet

let map = L.map("map").setView(kordinatPolban, 15);
let markerLayer = L.layerGroup().addTo(map);
let polylines = [];
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// create the sidebar instance and add it to the map
var sidebar = L.control
  .sidebar({ container: "sidebar" })
  .addTo(map)
  .open("home");

function generate() {
  let kordinatOrder = [];

  inputsContainer.innerHTML = "";
  for (let i = 0; i < inputData.length; i++) {
    let { keterangan, koordinat } = inputData[i];

    let dataCenter = inputData[0];
    //menghitung jarak
    let jarak = map.distance(dataCenter.koordinat, koordinat);
    let teksJarak;
    if (jarak >= 1000) {
      teksJarak = (jarak.toFixed(2) / 1000).toFixed(3) + " km";
    } else {
      teksJarak = jarak.toFixed(2) + " m";
    }

    //add to ui
    addInputHTML(keterangan, koordinat);
    console.log("keterangan : " + keterangan + " Koordinat : " + koordinat);

    //add marker
    L.marker(koordinat)
      .addTo(markerLayer)
      .bindTooltip(
        `${i == 0 ? keterangan : keterangan + "<br/>Jarak : " + teksJarak}`,
        {
          permanent: true,
          direction: "left",
          offset: [-30, 10],
        }
      )
      .addTo(markerLayer);

    //set polyline
    kordinatOrder.push(inputData[0].koordinat);
    kordinatOrder.push(koordinat);
  }
  if (inputData.length != 1) {
    let polyline = L.polyline(kordinatOrder, { color: inputColor.value }).addTo(
      markerLayer
    );
    polylines.push(polyline);
    map.fitBounds(polyline.getBounds());
  }

  //add to array

  // zoom the map to the polyline
}
function reset(submit) {
  markerLayer.clearLayers();

  if (submit) {
    inputData = [];
  } else {
    inputData = [
      {
        keterangan: "Center POLBAN",
        koordinat: kordinatPolban,
      },
    ];
    generate();
  }
}
generate();

inputColor.addEventListener("input", (e) => {
  // console.log(e);
  for (let i = 0; i < polylines.length; i++) {
    polylines[i].setStyle({ color: e.target.value });
  }
});

//data
let dataCenter = {
  teks: "Center Puskesmas Ciwaruga",
  latlng: [-6.865306, 107.574667],
};

//MARKER

// let puskesmasCiwaMarker = L.marker(dataCenter.latlng)
//   .addTo(map)
//   .bindTooltip("Center Puskesmas Ciwaruga", {
//     permanent: true,
//     direction: "left",
//     offset: [-20, 10],
//   })
//   .addTo(map);
// let kantorLurahSarjad = L.marker([
//   -6.871536975059046, 107.58069528562943,
// ]).addTo(map);
// let slbDCibogo = L.marker([-6.8893417321714425, 107.57743541449516]).addTo(map);
// let masjidKPAD = L.marker([-6.8660712957692995, 107.58613607859027]).addTo(map);
// let tamanPendidikan = L.marker([-6.8625, 107.572333]).addTo(map);

let datas = [
  {
    teks: "Kantor Lurah - Sarijadi",
    latlng: [-6.871536975059046, 107.58069528562943],
  },
  {
    teks: "SLB D YPAC Bandung - Cibogo",
    latlng: [-6.8893417321714425, 107.57743541449516],
  },
  {
    teks: "Masjid At-Taqwa KPAD - Gegerkalong ",
    latlng: [-6.8660712957692995, 107.58613607859027],
  },
  {
    teks: "Taman Pendidikan Bunda Floria - Sariwangi",
    latlng: [-6.8625, 107.572333],
  },
];

// for (let i = 0; i <= datas.length - 1; i++) {
//   kordinatOrder.push(dataCenter.latlng);
//   kordinatOrder.push(datas[i].latlng);

//   let jarak = map.distance(dataCenter.latlng, datas[i].latlng);
//   let teksJarak;
//   if (jarak >= 1000) {
//     teksJarak = (jarak.toFixed(2) / 1000).toFixed(3) + " km";
//   } else {
//     teksJarak = jarak.toFixed(2) + " m";
//   }
//   let tooltip = L.tooltip(datas[i].latlng, {
//     content: `${datas[i].teks}<br/>Jarak : ${teksJarak} `,
//     direction: "left",
//     permanent: true,
//     offset: [-10, 0],
//   }).addTo(map);

//   console.log(
//     "distance center - kordinat 1\n " + jarak > 1000
//       ? jarak / 1000
//       : jarak.toFixed(2)
//   );
// }

// zoom the map to the polyline
// map.fitBounds(polyline.getBounds());

// var polygon = L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(map);

// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// polygon.bindPopup("I am a polygon.");
// var popup = L.popup();
// popup
//     .setLatLng([51.513, -0.09])
//     .setContent("I am a standalone popup.")
//     .openOn(map);

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(map);
// }

// map.on('click', onMapClick);

// let options =  {
//     position: 'topright',         // Leaflet control position option
//     circleMarker: {               // Leaflet circle marker options for points used in this plugin
//       color: 'red',
//       radius: 2
//     },
//     lineStyle: {                  // Leaflet polyline options for lines used in this plugin
//       color: 'black',
//       dashArray: '1,6'
//     },
//     lengthUnit: {                 // You can use custom length units. Default unit is kilometers.
//       display: 'km',              // This is the display value will be shown on the screen. Example: 'meters'
//       decimal: 2,                 // Distance result will be fixed to this value.
//       factor: null,               // This value will be used to convert from kilometers. Example: 1000 (from kilometers to meters)
//       label: 'Distance:'
//     },
//     angleUnit: {
//       display: '&deg;',           // This is the display value will be shown on the screen. Example: 'Gradian'
//       decimal: 2,                 // Bearing result will be fixed to this value.
//       factor: null,                // This option is required to customize angle unit. Specify solid angle value for angle unit. Example: 400 (for gradian).
//       label: 'Bearing:'
//     }
//   }

// L.control.ruler(options).addTo(map);
