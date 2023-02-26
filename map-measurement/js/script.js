let kordinatPolban = [-6.872206118810957, 107.57377338207202];
let inputsContainer = document.getElementById("inputs-container");
let inputColor = document.getElementById("input-color");

let inputData = [
  {
    keterangan: "Center POLBAN",
    koordinat: kordinatPolban,
    direction: "auto",
  },
];

function addInput() {
  inputData.push({ keterangan: "", koordinat: "", direction: "auto" });
  addInputHTML();
}
function addInputHTML(
  keterangan = "",
  koordinat = "",
  direction = "auto",
  i = inputData.length
) {
  let newInput = document.createElement("div");
  newInput.classList.add("input-wrapper");
  newInput.innerHTML = `
  ${i == 1 ? "<p class='mb-2'>Center Koordinat</p>" : ""}
  <input type="text" name="keterangan[]" placeholder="Keterangan ${i}" value="${keterangan}"  required/>
  <input type="text" name="koordinat[]" placeholder="koordinat ${i}" value="${koordinat}"  required/>

  <div class="flex justify-between mb-5">
    <input type="radio" id="iRadioAuto${i}" name="direction${i}" required value="auto" ${
    direction == "auto" ? "checked" : ""
  }>
    <label for="iRadioAuto${i}">Auto</label><br>
    <input type="radio" id="iRadioLeft${i}" name="direction${i}" required value="left" ${
    direction == "left" ? "checked" : ""
  }>
    <label for="iRadioLeft${i}">Left</label><br>
    <input type="radio" id="iRadioRight${i}" name="direction${i}" required value="right" ${
    direction == "right" ? "checked" : ""
  }>
    <label for="iRadioRight${i}">Right</label><br>  
    <input type="radio" id="iRadioCenter${i}" name="direction${i}" required value="center" ${
    direction == "center" ? "checked" : ""
  }>
    <label for="iRadioCenter${i}">Center</label><br>
    <input type="radio" id="iRadioTop${i}" name="direction${i}" required value="top"" ${
    direction == "top" ? "checked" : ""
  }>
    <label for="iRadioTop${i}">Top</label><br>  
    <input type="radio" id="iRadioBottom${i}" name="direction${i}" required value="bottom" ${
    direction == "bottom" ? "checked" : ""
  }>
    <label for="iRadioBottom${i}">Bottom</label><br> 
  </div>

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
  let inputDirection = document.querySelectorAll('input[type="radio"]:checked');
  let isValidate;

  for (let i = 0; i < inputKoordinat.length; i++) {
    let koordinat = inputKoordinat[i].value.split(",");
    if (koordinat.length > 2) {
      console.log("koma lebih dari 1");
      isValidate = false;
      return false;
    } else {
      isValidate = true;
    }
  }
  // console.log(inputDirection);
  if (isValidate) {
    reset(true);
    // console.log(inputData);
    for (var i = 0; i < inputKeterangan.length; i++) {
      inputData.push({
        keterangan: inputKeterangan[i].value,
        koordinat: inputKoordinat[i].value.split(","),
        direction: inputDirection[i].value,
      });
    }
    generate();
  } else {
    return false;
    // console.log(inputData);
  }
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
    let { keterangan, koordinat, direction } = inputData[i];

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
    addInputHTML(keterangan, koordinat, direction, i + 1);
    console.log("keterangan : " + keterangan + " Koordinat : " + koordinat);

    //add marker
    L.marker(koordinat)
      .addTo(markerLayer)
      .bindTooltip(
        `${i == 0 ? keterangan : keterangan + "<br/>Jarak : " + teksJarak}`,
        {
          permanent: true,
          direction,
          offset:
            direction == "left"
              ? [-30, 10]
              : direction == "right"
              ? [10, 10]
              : direction == "top"
              ? [-10, -30]
              : direction == "bottom"
              ? [-10, 30]
              : [0, 0],
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
        direction: "auto",
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
