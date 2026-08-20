// Page constants
let cookie = null;

const platsKoder = [
  { customer: "Jollyroom 111", code: "WDH9" },
  { customer: "Jollyroom 113", code: "HX4O" },
  { customer: "Tree of Pets", code: "7DXJ" },
  { customer: "Emmaljunga", code: "EK3H" },
  { customer: "Mediplast", code: "ILSH" },
  { customer: "Dyson / KN:", code: "DL2W" },
  { customer: "Ellos", code: "7DXJ" },
];

platsKoder.sort((a, b) => a.customer.localeCompare(b.customer));

const exportSection = document.getElementById("exportPage");
const importFeeTable = document.getElementById("importFeeTable");
const exportFeeTable = document.getElementById("exportFeeTable");
const products = [
  {
    name: "MyPack",
    code: "17,19",
  },
  {
    name: "Parcel",
    code: "18",
  },
  {
    name: "Palett",
    code: "52",
  },
  {
    name: "Split Shipment",
    code: "SS",
  },
  {
    name: "Groupage",
    code: "83",
  },
];
const myPack = products.find((ele) => ele.name == "MyPack");
const parcel = products.find((ele) => ele.name == "Parcel");
const palett = products.find((ele) => ele.name == "Palett");
const split = products.find((ele) => ele.name == "Split Shipment");
const groupage = products.find((ele) => ele.name == "Groupage");

const countryData = [
  {
    name: "Schweiz",
    products: [
      { product: myPack.name + " " + myPack.code, condition: "Gäller ej" },
      { product: parcel.name + " " + parcel.code, condition: "DDP" },
      { product: palett.name + " " + palett.code, condition: "DDP" },
    ],
  },
  {
    name: "Island",
    products: [
      { product: myPack.name + " " + myPack.code, condition: "Gäller ej" },
      { product: parcel.name + " " + parcel.code, condition: "DDP" },
      { product: palett.name + " " + palett.code, condition: "Gäller ej" },
    ],
  },
  {
    name: "Storbritannien",
    products: [
      { product: myPack.name + " " + myPack.code, condition: "DAP" },
      { product: parcel.name + " " + parcel.code, condition: "DAP" },
      { product: palett.name + " " + palett.code, condition: "DAP" },
    ],
  },
  {
    name: "Åland",
    products: [
      { product: myPack.name + " " + myPack.code, condition: "DAP" },
      { product: parcel.name + " " + parcel.code, condition: "DDP" },
      { product: palett.name + " " + palett.code, condition: "DDP" },
      { product: groupage.name + " " + groupage.code, condition: "DDP" },
    ],
  },
  {
    name: "Norge",
    products: [
      { product: myPack.name + " " + myPack.code, condition: "DDP/DAP" },
      { product: parcel.name + " " + parcel.code, condition: "DDP/DAP" },
      { product: palett.name + " " + palett.code, condition: "DDP/DAP" },
      { product: split.name + " " + palett.code, condition: "DDP" },
    ],
  },
  {
    name: "Färöarna & Grönland",
    products: [
      { product: myPack.name + " " + myPack.code, condition: "DAP" },
      { product: parcel.name + " " + parcel.code, condition: "DDP" },
      { product: palett.name + " " + palett.code, condition: "Gäller ej" },
    ],
  },
];
const pnCharge = (name, number, price, type) => ({ name, number, price, type });
const pnCharges = [
  pnCharge("Avslut av transit", 2001609, 280, "import"),
  pnCharge("Manuell reg.av varukoder företag import", 2009716, 35, "import"),
  pnCharge("Tullfaktura - felaktig EDI import", 2009717, 55, "import"),
  pnCharge("Ankomstanmälan", 2009790, 450, "import"),
  pnCharge("Övriga spedavgifter", 2001605, 490, "import"),
  pnCharge("Uppstart transit", 2001609, 280, "export"),
  pnCharge("Manuell reg av varukoder", 2003427, 35, "export"),
  pnCharge("Tullfaktura - felaktig EDI (VP)", 2007542, 55, "export"),
  pnCharge("Tullfaktura - ej komplett EDI", 2007543, 55, "export"),
  pnCharge("Övriga spedavgifter", 2001605, 490, "export"),
  pnCharge("Förtullningsavgift, DAP Cleared Parcel", 2001598, 210, "export"),
  pnCharge("Förtullningsavgift, DAP Parcel", 2001600, 95, "export"),
  pnCharge("Förtullningsavgift, Split Shipment", 2008831, 295, "export"),
  pnCharge("Klarering vid gräns (TVINN)", 2007550, 325, "export"),
  pnCharge("Tullfaktura Saknad EDI", 2001607, 250, "export"),
  pnCharge("Tullfaktura Saknad EDI", 2001607, 250, "import"),
  pnCharge("Importförtullning Privat HV CS", 2001138, 140, "import"),
  pnCharge("Importförtullning PDDP LV CS", 2009560, 5, "import"),
  pnCharge("Importdeklaration (företag) CS", 2001143, 240, "import"),
  pnCharge("Importförtullning Privat LV CS", 2008060, 80, "import"),
  pnCharge("Omprövning (privat) CS", 2006388, 200, "import"),
  pnCharge("Omprövning (företag) CS", 2006390, 352, "import"),
  pnCharge("Omprövning (privat) Log", 2003850, 200, "import"),
  pnCharge("Omprövning (företag) Log", 2003851, 352, "import"),
  pnCharge("Ofullständig tullhandling", 2001606, 195, "export"),
  pnCharge("Inläsning tull-EDI", 2010022, 100, "export"),
];

pnCharges.sort((a, b) => a.name.localeCompare(b.name));
const importFees = pnCharges.filter((charge) => charge.type == "import");

const exportFees = pnCharges.filter((charge) => charge.type == "export");

//Call default functions
writeWebPageHeader();
writeWebPageFooter();
activeBtn();
renderFeeTables();

if (exportSection) renderCountries(countryData);

// Functions
function writeWebPageHeader() {
  document.getElementById("header").innerHTML = `
<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand" href="index.html">Home</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" id="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onclick="toggleNavBar()">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="import.html">Import</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="export.html">Export</a>
                </li>
                
                <li class="nav-item">
                    <a class="nav-link" href="direktbilar.html">Direktbilar</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="avgifter.html">Avgifter</a>
                </li>
                 <li class="nav-item">
                    <a class="nav-link" href="postal.html">Postal</a>
                </li>
                 <li class="nav-item">
                    <a class="nav-link" href="game.html">Game</a>
                </li>
                
              
             
             
            </ul>
        </div>
    </div>
</nav>
`;
}

// Add later, when completed/ready
// <li class="nav-item">
//                     <a class="nav-link" href="tvinnlista.html">Skapa Tvinnlista</a>
//                 </li>
//                 <li class="nav-item">
//                     <a class="nav-link" href="blåkläder.html">Skapa excel Blåkläder</a>
//                 </li>
// <li class="nav-item">
//                   <a class="nav-link" href="helper.html">Helper</a>
//               </li>

function writeWebPageFooter() {
  document.querySelector("footer").innerHTML = `
<div class="container">
<div class="d-flex flex-wrap justify-content-between align-items-center py-3">
    <div class="col"></div>
    <div class="col d-flex align-items-center justify-content-center"></div>
    <div class="col d-flex justify-content-end"></div>
</div>
</div>

`;
}

function activeBtn() {
  const activeBtnString = "activeButton";
  const allNavBtns = document.querySelectorAll(".nav-item .nav-link");
  allNavBtns.forEach((navBtn) => {
    navBtn.classList.remove(activeBtnString);
    if (navBtn.href === document.location.href) {
      navBtn.classList.add(activeBtnString);
    }
  });
}

const postalaExportKoder = [
  {
    terminal: "Arlanda",
    exitOffice: "SE003033",
    step1: "GYER",
    step2: "XOU2",
  },
  {
    terminal: "Malmö",
    exitOffice: "SE000050",
    step1: "F8YZ",
    step2: "1B0T",
  },
  {
    terminal: "Göteborg",
    exitOffice: "SE060340",
    step1: "ZJPY",
    step2: "L1W0",
  },
  {
    terminal: "Örebro",
    exitOffice: "SE060341",
    step1: "IIEX",
    step2: "KZEU",
  },
  {
    terminal: "Veddesta",
    exitOffice: "SE003033",
    step1: "M7HY",
    step2: "GXSD",
  },
];

postalaExportKoder.sort((a, b) => a.terminal.localeCompare(b.terminal));

function renderCountries(countries) {
  countries.sort((a, b) => a.name.localeCompare(b.name));
  exportSection.innerHTML = countries
    .map(
      (country) => `
        <div class="exportLandDiv row">
            <h3>${country.name}</h3>
            <div class="col">
                <h5>Leveransvillkor</h5>
                <table class="table table-striped table-bordered table-sm align-middle text-cente">
                    <thead><tr><th>Produkt</th><th>Villkor</th></tr></thead>
                    <tbody>
                        ${country.products
                          .map(
                            (p) =>
                              `<tr><td>${p.product}</td><td>${p.condition}</td></tr>`,
                          )
                          .join("")}
                    </tbody>
                </table>                  
            </div>
            <div class="col">
            <h5>Special</h5>
            ${
              country.name === "Storbritannien"
                ? `
                <ul class=list-group>
                <li class=list-group-item>B2C Ange avsändares GB EORI</li>
                <li class=list-group-item>B2B Ange mottagares GB EORI</li>
                </ul> 
                `
                : ``
            }
            ${
              country.name === "Island"
                ? `
                <ul class=list-group>
                <li class=list-group-item>TS-external. Proc: 3171</li>
                <li class=list-group-item>Avslut av transit, notera i BNB-arket </li>               

        
                
               
               
                </ul> 
                `
                : ``
            }
             ${
               country.name === "Norge"
                 ? `
                <ul class=list-group>
                <li class=list-group-item>Mypackretur</li>
                <li class=list-group-item>Consignor: 1009 PostNord AB NO Retur</li>
                <li class=list-group-item>Consignee: 9992 PostNord AS</li>
                <li class=list-group-item>Payer: 9992 PostNord AS</li>
              
                </ul> 
                `
                 : ``
             }
            
           

            </div>
        </div>
    `,
    )
    .join("");
}
function renderFeeTables() {
  if (importFeeTable) {
    importFees.forEach((fee) => {
      let row = document.createElement("tr");

      let name = document.createElement("td");
      row.append(name);
      name.innerHTML = fee.name;

      let number = document.createElement("td");
      row.append(number);
      number.innerHTML = fee.number;

      let price = document.createElement("td");
      row.append(price);
      price.innerHTML = fee.price;

      importFeeTable.children[1].append(row);
    });
  }

  if (exportFeeTable) {
    exportFees.forEach((fee) => {
      let row = document.createElement("tr");

      let name = document.createElement("td");
      row.append(name);
      name.innerHTML = fee.name;

      let number = document.createElement("td");
      row.append(number);
      number.innerHTML = fee.number;

      let price = document.createElement("td");
      row.append(price);
      price.innerHTML = fee.price;

      exportFeeTable.children[1].append(row);
    });
  }
}

function generateBarCode(string) {
  const canvas = document.createElement("canvas");
  JsBarcode(canvas, string, {
    format: "CODE128",
    width: 2,
    height: 100,
    displayValue: true,
  });

  let barcodeDataUrl = canvas.toDataURL("image/png");
  canvas.remove();

  return barcodeDataUrl;
}

function generateTvinnpdf() {
  //const { jsPDF } = window.jspdf;
  const { jsPDF } = window.jspdf;
  // Step 1: Read data from the DOM
  const transportId = document.querySelector("#transportOut").textContent;
  const regnum = document.querySelector("#regnumberOut").textContent;
  let headerInfo = document.querySelector(".headerInfo");

  if (transportId === "" || regnum === "") {
    let p = document.createElement("p");
    if (!headerInfo.querySelector("p")) {
      p.role = "alert";
      p.innerHTML =
        "Unable to create PDF. Please fill Transport or Regnumber and try again!";
      headerInfo.appendChild(p);
      p.classList = "alert alert-warning width45";
    }

    alert(
      "Unable to create PDF. Please fill Transport or Regnumber and try again!",
    );
    return;
  }

  if (headerInfo.querySelector("p")) {
    headerInfo.querySelector("p").remove();
  }

  const agentsContact = [
    {
      name: "Ecus",
      phone: "+46 771 375 700",
      hoursWeek: "00 - 24",
      hoursWeekend: "00 - 24",
    },
    {
      name: "Aditro",
      phone: "+46 73 080 30 98",
      hoursWeek: "07 - 21:30",
      hoursWeekend: "",
    },
    {
      name: "PostNord",
      phone: "+46 010 436 33 31",
      hoursWeek: "08 - 23",
      hoursWeekend: "",
    },
    {
      name: "Gerlach",
      phone: "+46 70 598 43 79",
      hoursWeek: "00 - 24",
      hoursWeekend: "00 - 24",
    },
    {
      name: "Maersk",
      phone: "+46 10 45 90 712",
      hoursWeek: "00 - 24",
      hoursWeekend: "00 - 24",
    },
    {
      name: "TPL",
      phone: "+46 10-4376200",
      hoursWeek: "08 - 24",
      hoursWeekend: "00 - 24",
    },
  ];

  const inputTable = document.querySelector("#inputTable");
  const rows = Array.from(inputTable.querySelectorAll("tr"));
  const transitMrns = [];
  let currentContacts = [];
  const agentsSet = new Set();
  const inputData = rows.map((row) =>
    Array.from(row.querySelectorAll("td, th")).map((cell) =>
      cell.textContent.trim(),
    ),
  );

  // Step 2: Process the data
  const outputData = [];
  inputData.forEach((row, index) => {
    if (index === 0) {
      // Assume first row is the header
      //row.splice(5, 1);
      //row[5] = "MRN";
      outputData.push(row);
    } else {
      const [
        consignor,
        consignee,
        agent,
        packages,
        weight,
        mrn,
        declarant,
        date,
        seqNumber,
        isTransit,
      ] = row;
      // Validation: Ensure only one MRN is filled

      let isTransitBool = isTransit === "true";

      if (isTransitBool) transitMrns.push(mrn);

      agentsSet.add(agent.toUpperCase());
      currentContacts = agentsContact.filter((a) =>
        agentsSet.has(a.name.toUpperCase()),
      );

      // Processed row
      outputData.push([
        consignor,
        consignee,
        agent,
        packages,
        weight,
        mrn,
        declarant,
        date,
        seqNumber,
      ]);
    }
  });

  outputData.map((row, index) => {
    // Only join the last three elements of each row (ignoring the first elements)
    if (row.length >= 3) {
      const lastThree = row.slice(-3); // Get the last three elements
      const joinedLastThree = lastThree.join("-"); // Join them with a hyphen

      // Replace the last three elements with the joined string
      row.splice(-3, 3, joinedLastThree).slice(-2); // This replaces the last 3 elements with the joined string
    }
    return row;
  });

  // Step 3: Create and format a PDF using jsPDF
  const doc = new jsPDF({ orientation: "landscape" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const startXOutData = 10; // Starting X-axis position
  const cellWidthBarcodes = (pageWidth - startXOutData * 2) / 2;
  let loopCounter = 0;
  if (currentContacts.length > 4) {
    loopCounter++;
  }

  let y = 0;

  let headerRow = outputData.shift();

  headerRow = headerRow.slice(0, -2);

  y = tvinnListHeader(doc, startXOutData, y, pageWidth, transportId, regnum);
  y = tvinnListContacts(doc, startXOutData, y, currentContacts);
  y = tvinnAddColumnHeaders(doc, headerRow, startXOutData, y, pageWidth);

  outputData.forEach((row) => {
    let x = startXOutData; // Reset X for each row

    row.forEach((cell, cellIndex) => {
      if (cellIndex < row.length - 2) {
        const cellWidth = (pageWidth - startXOutData * 2) / 5; // Distribute cells evenly
        const cellText = doc.splitTextToSize(cell, cellWidth);
        doc.text(cellText, x, y);
        x += cellWidth;
      } else {
        let imageX =
          startXOutData + cellWidthBarcodes * (cellIndex - (row.length - 2));
        const imageY = y + 5; // Adjust barcode position relative to text
        doc.addImage(generateBarCode(cell), "PNG", imageX, imageY, 90, 27);
        doc.line(10, imageY + 26, pageWidth - 10, imageY + 26);
      }
    });
    y += 35;
    loopCounter++;

    if (loopCounter % 3 == 0) {
      doc.text("Underskrift chaufför", startXOutData, y);
      doc.line(startXOutData, y + 15, startXOutData + 50, y + 15);

      doc.text("Tullstämpel", pageWidth - 70, y);
      doc.rect(pageWidth - 85, y + 2, 50, 30);

      doc.addPage();
      y = tvinnListHeader(
        doc,
        startXOutData,
        y,
        pageWidth,
        transportId,
        regnum,
      );
      y = tvinnAddColumnHeaders(doc, headerRow, startXOutData, y, pageWidth);
    }
  });
  y = 145;
  doc.text("Underskrift chaufför", startXOutData, y);
  doc.line(startXOutData, y + 15, startXOutData + 50, y + 15);

  doc.text("Tullstämpel", pageWidth - 70, y);
  doc.rect(pageWidth - 85, y + 2, 50, 30);

  tvinnListLastPage(doc, pageWidth, transitMrns, transportId, regnum);

  // Step 4: Save the PDF
  let today = new Date();
  today = today.toISOString().split("T")[0].split("-").join("");

  doc.save(
    "Tvinnlista" + "_" + transportId + "_" + regnum + "_" + today + ".pdf",
  );
}

function tvinnListHeader(doc, x, y, pageWidth, transportId, regnum) {
  y = 10;
  doc.setFontSize(24);
  doc.setFont("times", "bold");

  doc.text("Tvinndeklarationer", pageWidth / 2, y, { align: "center" });
  y += 10;
  doc.setFontSize(14);
  doc.text("Transport: " + transportId, x, y);
  doc.text("Registreringsnummer: " + regnum, pageWidth / 2, y);
  doc.setFontSize(12);
  doc.setFont("times", "normal");
  y += 10;

  return y;
}

function tvinnListContacts(doc, x, y, contactList) {
  doc.setFont("times", "bold");
  doc.text("Ombud", x, y);
  doc.text("Jourtelefon", x + 30, y);
  doc.text("Mån-Fre", x + 60, y);
  doc.text("Lör-Sön", x + 90, y);
  doc.setFontSize(10);
  doc.setFont("times", "normal");

  let agentX = x;
  let agentY = y + 5;
  contactList.forEach((agent) => {
    doc.text(agent.name, agentX, agentY);
    doc.text(agent.phone, agentX + 30, agentY);
    doc.text(agent.hoursWeek, agentX + 60, agentY);
    doc.text(agent.hoursWeekend, agentX + 90, agentY);

    agentY += 5;
  });
  y = agentY;

  return y + 5;
}

function tvinnListLastPage(doc, pageWidth, mrnlist, transportId, regnum) {
  const startX = 10;
  const startY = 10;
  let x = startX;
  let y = startY;
  doc.addPage();
  const driverTexts = [
    {
      language: "English",
      text: "Please check all documents before signing! By signing, you give consent in taking over the responsibility of getting all given documents to be stamped/scanned at the border!",
    },
    {
      language: "Estonian",
      text: "Enne allkirjastamist kontrollige kõiki dokumente! Allkirjastamisega annate nõusoleku kõigi antud dokumentide piiril tembeldamise / skaneerimise eest vastutuse võtmisel!",
    },
    {
      language: "Russian",
      text: "Пожалуйста, проверьте все документы перед подписанием! Подписывая, вы даете согласие на то, чтобы взять на себя ответственность за печать и сканирование всех данных документов на границе!",
    },
    {
      language: "Bulgarian",
      text: "Проверете всички документи преди подписване! С подписа си поемате отговорността за подпечатването или сканирането им на границата.",
    },
    {
      language: "Polish",
      text: "Sprawdź wszystkie dokumenty przed podpisaniem! Podpisując, wyrażasz zgodę na przejęcie odpowiedzialności za pobranie wszystkich podanych dokumentów do zeskanowania / zeskanowania na granicy!",
    },
    {
      language: "Lituanian",
      text: "Prieš pasirašydami, patikrinkite visus dokumentus! Pasirašydami jūs duodate sutikimą perimti atsakomybę už tai, kad visi duoti dokumentai būtų antspauduoti / nuskaityti pasienyje!",
    },
  ];

  const texts = [
    "Tvinn-transiteringar för avslut",
    "Dessa transiteringar ska ligga bakom Melding om forhåndssent TVINN-deklarasjon",
    "Transport: " + transportId + "    " + "Regnummer: " + regnum,
    "Till Terminal:",
    "Se till att samtliga utav de uppradade Transiteringar här till vänster finns tillhands och iordninglagd i nummerordning bakom Tvinnlistan. ",
    'Dokumentet "Tvinn-transiteringar för avslut" är enbart till för att säkerställa att samtliga dokument finns tillhands och ska inte visas för tullverket vid gränspasseringen. ',
    'Enbart "Melding om forhåndssendt TVINN deklarasjon" samt de uppradade transiteringar ska visas!',
    "Till Chaufför / To Driver:",
  ];
  doc.setFontSize(14);

  // Add each line of text to the document
  texts.forEach((line, index) => {
    if (index === 0) {
      // Set font size and center-align the first line
      doc.setFontSize(24);
      doc.setFont("times", "bold");
      doc.text(line, pageWidth / 2, y, { align: "center" });
    } else if (index >= 4 && index <= 6) {
      doc.setFontSize(12);
      doc.setFont("times", "normal");
      doc.text(line, x, y);
    } else if (index === 2 || index === 1) {
      doc.setFontSize(14);
      doc.text(line, pageWidth / 2, y, { align: "center" });
    } else {
      // Render the other lines with default alignment
      doc.setFontSize(14);
      doc.setFont("times", "bold");
      doc.text(line, x, y);
    }

    // Adjust y for the next line
    if (index >= 3 && index <= 5) {
      y += 5;
    } else {
      y += 10;
    }
  });

  driverTexts.forEach((country) => {
    if (country.language === "English") {
      doc.setFontSize(12);
      doc.setFont("times", "bold");
      doc.text(`${country.language}`, x, y);
      doc.setFontSize(12);
      doc.setFont("times", "normal");
      let wrappedText = doc.splitTextToSize(country.text, pageWidth - 30);
      //doc.text(wrappedText, x+20, y)
      //y+=5
      wrappedText.forEach((line) => {
        doc.text(line, x + 20, y);
        y += 5; // Increment for each line
      });
    }
  });

  if (mrnlist.length > 0) renderMrnList(doc, mrnlist, y);
}

function renderMrnList(doc, mrnlist, y) {
  let x = 10;
  y += 5;
  doc.setFont("times", "bold");
  doc.text("TransitMRN", x, y);
  y += 7;
  doc.setFont("times", "normal");
  doc.setFontSize(12);
  mrnlist.forEach((mrn) => {
    doc.text(mrn, x, y);
    y += 6;
  });
}

function addTvinnHeader(ele) {
  event.preventDefault();
  let transportId = document.querySelector("#transportInput").value;
  let regnum = document.querySelector("#regnumberInput").value;
  let inputForm = document.querySelector("#inputFormHeader");
  let transportElement = document.querySelector("#transportInput");
  let regnrelement = document.querySelector("#regnumberInput");

  toggleValidityCheckSpan(transportElement);
  toggleValidityCheckSpan(regnrelement);

  if (
    !toggleValidityCheckSpan(transportElement) ||
    !toggleValidityCheckSpan(regnrelement)
  ) {
    alert(
      "Please make sure both transportnumber and regnumber are filled and try again",
    );
    return;
  }

  document.querySelector("#transportOut").textContent = transportId;
  document.querySelector("#regnumberOut").textContent = regnum;
  ele.textContent = "Edit header";

  writeSucessMsg(inputForm);
}

function toggleValidityCheckSpan(element) {
  let errorSymbol = "✘";
  let successSymbol = "✔";
  let isValid = false;
  let span = element.nextElementSibling;
  if (element.value === "") {
    isValid = false;
    span.classList.remove("success");
    span.classList.add("error");
    span.innerHTML = errorSymbol;
  } else {
    if (!isValid) isValid = true;
    span.classList.remove("error");
    span.classList.add("success");
    span.innerHTML = successSymbol;
  }

  return isValid;
}

function toggleValidityCheckSpans(elements) {
  let errorSymbol = "✘";
  let sucessSymbol = "✔";
  isValid = true;
  element1 = elements[0];
  element2 = elements[1];

  if (element1.value === "" && element2.value === "") {
    isValid = false;
    elements.forEach((element) => {
      element.parentElement.nextElementSibling.classList.remove("success");
      element.parentElement.nextElementSibling.classList.add("error");
      element.parentElement.nextElementSibling.innerHTML = errorSymbol;
    });
  } else if (element1.value !== "" && element2.value !== "") {
    elements.forEach((element) => {
      element.parentElement.nextElementSibling.classList.remove("success");
      element.parentElement.nextElementSibling.classList.add("error");
      element.parentElement.nextElementSibling.innerHTML = errorSymbol;
    });
    isValid = false;
  } else {
    if (!isValid) isValid = true;
    elements.forEach((element) => {
      isValid = true;
      element.parentElement.nextElementSibling.classList.remove("error");
      element.parentElement.nextElementSibling.classList.add("success");
      element.parentElement.nextElementSibling.innerHTML = sucessSymbol;
    });
  }
  return isValid;
}

function addTvinnData() {
  event.preventDefault();
  let tvinnDataArray = [
    document.querySelector("#consignorInput"),
    document.querySelector("#consigneeInput"),
    document.querySelector("#agentInput"),
    document.querySelector("#packagesInput"),
    document.querySelector("#weightInput"),
    document.querySelector("#exportMrnInput"),
    document.querySelector("#declarantInput"),
    document.querySelector("#dateInput"),
    document.querySelector("#seqNumberInput"),
    document.querySelector("#transitCheck"),
  ];

  let rowElement = document.createElement("tr");
  let isValid = true;

  for (let i = 0; i < tvinnDataArray.length - 1; i++) {
    if (!toggleValidityCheckSpan(tvinnDataArray[i])) isValid = false;
  }

  if (
    !document.querySelector("#transitCheck").checked &&
    !document.querySelector("#exportCheck").checked
  ) {
    isValid = false;
    document.querySelector("#transitCheck").nextElementSibling.style.color =
      "red";
    document.querySelector("#exportCheck").nextElementSibling.style.color =
      "red";
  } else {
    document.querySelector("#transitCheck").nextElementSibling.style.color = "";
    document.querySelector("#exportCheck").nextElementSibling.style.color = "";
  }

  if (!isValid) {
    alert("Kontrollera att nödvändiga fält är ifyllda");
    return;
  }

  for (let i = 0; i < tvinnDataArray.length; i++) {
    let isTransit = false;
    let tvinnInputData = tvinnDataArray[i].value;
    let td = document.createElement("td");

    //tvinnDataArray[10] = isTransit;

    if (i === 7) {
      tvinnInputData = tvinnInputData.split("-").reverse().join("");
      //tvinnInputData = tvinnInputData.replaceAll("-", "");
    }

    if (i === 9) {
      isTransit = document.querySelector("#transitCheck").checked;
      tvinnInputData = isTransit;
      td.style.display = "none";
    }

    td.textContent = tvinnInputData;
    rowElement.appendChild(td);
  }
  if (isValid) {
    let form = document.querySelector("#inputFormBody");

    document.querySelector("#inputTable tbody").appendChild(rowElement);

    let removeButtonTd = document.createElement("td");
    let editButtonTd = document.createElement("td");
    let removeRowBtn = document.createElement("button");

    //Remove btn
    removeRowBtn.textContent = "Remove";
    removeRowBtn.style.marginRight = "10px";
    removeRowBtn.classList = "btn btn-danger";
    removeRowBtn.onclick = () => rowElement.remove(); // Remove row on click

    // Edit Button
    let editRowBtn = document.createElement("button");
    editRowBtn.textContent = "Edit";
    editRowBtn.classList = "btn btn-warning";
    editRowBtn.onclick = () => {
      let cells = rowElement.querySelectorAll("td");
      tvinnDataArray.forEach((input, index) => {
        input.value = cells[index].textContent; // Populate inputs with current row values
      });
      rowElement.remove(); // Remove row for editing
    };

    editButtonTd.appendChild(editRowBtn);
    removeButtonTd.appendChild(removeRowBtn);

    rowElement.appendChild(editButtonTd);
    rowElement.appendChild(removeButtonTd);

    document.querySelector("#inputTable tbody").appendChild(rowElement);

    tvinnDataArray.forEach((element) => {
      element.value = "";
    });

    tvinnDataArray.forEach((element) => {
      element.nextElementSibling.classList.remove("error");
      element.nextElementSibling.classList.remove("success");
    });
    writeSucessMsg(form, "Data successfully added!");
    document.querySelector("#exportCheck").checked = false;
    document.querySelector("#transitCheck").checked = false;
  }
}

function writeSucessMsg(outElement, phrase) {
  let p = document.createElement("p");
  p.classList = "alert alert-success";
  p.role = "alert";
  p.style.marginTop = "5px";
  p.innerHTML = phrase;
  outElement.append(p);
  setTimeout(() => {
    p.remove();
  }, 2000);
}

function addDummyRows() {
  const tableBody = document.querySelector("#inputTable tbody");
  document.querySelector("#transportOut").textContent = "SENO123";
  document.querySelector("#regnumberOut").textContent = "ABC123";

  // Array of dummy data
  const dummyData = [
    [
      "STADIUM OUTLET AB",
      "STADIUM OUTLET NORGE AS",
      "TPL",
      5,
      20,
      "25SE0000IUZM65VOA5",
      "971632798",
      "05022025",
      "123456",
      true,
    ],
    [
      "STADIUM OUTLET NORGE AB",
      "Oscar Jakobsson123443",
      "Gerlach",
      10,
      50,
      "25SE000050DDHFOVJ4",
      "971632798",
      "05022025",
      "654321",
      false,
    ],
    [
      "STADIUM OUTLET NORGE AB",
      "STADIUM OUTLET NORGE AS",
      "Maersk",
      15,
      30,
      "25SE0000IUZM65VOA5",
      "971632798",
      "05022025",
      "234567",
      true,
    ],
    [
      "STADIUM OUTLET NORGE AB",
      "STADIUM OUTLET NORGE AS",
      "Ecus",
      20,
      40,
      "25SE000050DDHFOVJ4",
      "971632798",
      "05022025",
      "765432",
      false,
    ],
    [
      "STADIUM OUTLET NORGE AB",
      "CSTADIUM OUTLET NORGE AS",
      "Aditro",
      25,
      35,
      "25SE0000IUZM65VOA5",
      "971632798",
      "05022025",
      "345678",
      true,
    ],
    [
      "STADIUM OUTLET NORGE AB",
      "STADIUM OUTLET NORGE AS",
      "PostNord",
      30,
      45,
      "25SE000050DDHFOVJ4",
      "971632798",
      "05022025",
      "876543",
      false,
    ],
    [
      "STADIUM OUTLET NORGE AB",
      "STADIUM OUTLET NORGE AS",
      "Agent G",
      35,
      55,
      "25SE0000IUZM65VOA5",
      "971632798",
      "05022025",
      "456789",
      true,
    ],
    [
      "STADIUM OUTLET NORGE AB",
      "CSTADIUM OUTLET NORGE AS",
      "Agent H",
      40,
      25,
      "25SE000050DDHFOVJ4",
      "971632798",
      "05022025",
      "987654",
      true,
    ],
    [
      "STADIUM OUTLET NORGE AB",
      "STADIUM OUTLET NORGE AS",
      "Agent I",
      45,
      20,
      "25SE0000IUZM65VOA5",
      "971632798",
      "05022025",
      "567890",
      false,
    ],
    [
      "STADIUM OUTLET NORGE AB",
      "STADIUM OUTLET NORGE AS",
      "Agent J",
      50,
      30,
      "25SE000050DDHFOVJ4",
      "971632798",
      "05022025",
      "098765",
      false,
    ],
  ];

  dummyData.forEach((rowData) => {
    let newTableRow = document.createElement("tr");

    rowData.forEach((cellData) => {
      let td = document.createElement("td");
      td.textContent = cellData;
      newTableRow.appendChild(td);
    });
    // Create a cell for action buttons
    let removeTd = document.createElement("td");
    let editTd = document.createElement("td");

    // Remove Button
    let removeRowBtn = document.createElement("button");
    removeRowBtn.textContent = "Remove";
    removeRowBtn.style.marginRight = "10px";
    removeRowBtn.classList = "btn btn-danger";
    removeRowBtn.onclick = () => newTableRow.remove(); // Remove row on click

    // Edit Button
    let editRowBtn = document.createElement("button");
    editRowBtn.textContent = "Edit";
    editRowBtn.classList = "btn btn-warning";
    editRowBtn.onclick = () => {
      let cells = newTableRow.querySelectorAll("td");
      const inputIds = [
        "#consignorInput",
        "#consigneeInput",
        "#agentInput",
        "#packagesInput",
        "#weightInput",
        "#exportMrnInput",
        "#transitMrnInput",
        "#declarantInput",
        "#dateInput",
        "#seqNumberInput",
      ];

      cells.forEach((cell, index) => {
        if (index < rowData.length) {
          // Assuming you have input fields that match the data structure
          document.querySelector(inputIds[index]).value = cell.textContent;
        }
      });
      newTableRow.remove(); // Remove row for editing
    };

    editTd.appendChild(editRowBtn);
    removeTd.append(removeRowBtn);

    newTableRow.appendChild(editTd);
    newTableRow.appendChild(removeTd);

    tableBody.appendChild(newTableRow);
  });
}

// används ej
function storeArray(array) {
  localStorage.clear();
  localStorage.setItem("MyArray", JSON.stringify(array));
}

// används ej
function loadArray() {
  const tableBody = document.querySelector("#inputTable tbody");
  const savedArray = JSON.parse(localStorage.getItem("MyArray"));

  if (tableBody && savedArray) {
    savedArray.forEach((rowData) => {
      let newTableRow = document.createElement("tr");

      rowData.forEach((cellData) => {
        let td = document.createElement("td");
        td.textContent = cellData;
        newTableRow.appendChild(td);
      });
      // Create a cell for action buttons
      let actionTd = document.createElement("td");

      // Remove Button
      let removeRowBtn = document.createElement("button");
      removeRowBtn.textContent = "Remove";
      removeRowBtn.style.marginRight = "10px";
      removeRowBtn.classList = "btn btn-danger";
      removeRowBtn.onclick = () => newTableRow.remove(); // Remove row on click

      // Edit Button
      let editRowBtn = document.createElement("button");
      editRowBtn.textContent = "Edit";
      editRowBtn.classList = "btn btn-warning";
      editRowBtn.onclick = () => {
        let cells = newTableRow.querySelectorAll("td");
        const inputIds = [
          "#consignorInput",
          "#consigneeInput",
          "#agentInput",
          "#packagesInput",
          "#weightInput",
          "#exportMrnInput",
          "#transitMrnInput",
          "#declarantInput",
          "#dateInput",
          "#seqNumberInput",
        ];

        cells.forEach((cell, index) => {
          if (index < rowData.length) {
            // Assuming you have input fields that match the data structure
            document.querySelector(inputIds[index]).value = cell.textContent;
          }
        });
        newTableRow.remove(); // Remove row for editing
      };
      actionTd.appendChild(editRowBtn);
      actionTd.appendChild(removeRowBtn);

      newTableRow.appendChild(actionTd);

      tableBody.appendChild(newTableRow);
    });
  }
}

function setCookie(name, array) {
  const date = new Date();
  date.setDate(date.getDate() + 2);

  const cookieValue = encodeURIComponent(JSON.stringify(array)); // Ensure proper encoding
  document.cookie =
    "name=test; expires=" + date.toUTCString() + "; path=/; SameSite=Strict";

  console.log(document.cookie);
}

function getCookie(cookie) {
  console.log(JSON.parse(cookie));
}

function tvinnAddColumnHeaders(doc, dataArray, x, y, pageWidth) {
  const cellWidth = (pageWidth - x * 2) / dataArray.length;
  doc.setFont("times", "bold");
  doc.setFontSize(12);

  dataArray.forEach((header) => {
    doc.text(header, x, y);
    x += cellWidth;
  });
  doc.setFont("times", "normal");
  return (y += 10);
}

function formatDataForExceJSON(data) {
  let formattedData = [];

  data.forEach((obj) => {
    // Seller block (Vertical)
    formattedData.push(["Seller"]);
    formattedData.push(...objectToRowsJSON(obj.customsInvoice.seller));

    // Buyer block (Vertical)
    formattedData.push(["Buyer"]);
    formattedData.push(...objectToRowsJSON(obj.customsInvoice.buyer));

    // Invoice block (Vertical)
    formattedData.push(["Invoice"]);
    formattedData.push(...objectToRowsJSON(obj.customsInvoice.invoice));

    formattedData.push([
      "Number of packages",
      obj.customsInvoice.totalNumberOfPackages.value,
    ]);

    formattedData.push([
      "Gross weight",
      obj.customsInvoice.totalGrossWeight.value,
    ]);

    //formattedData.push(["Net weight", obj.customsInvoice.totalNetWeight.value]);

    formattedData.push(["Total value", obj.customsInvoice.invoiceTotal.amount]);

    // Detailed Description block (Horizontal)
    formattedData.push(["Detailed Description"]);
    console.log(formattedData);

    // Add headers (only once)
    if (obj.detailedDescription.length > 0) {
      formattedData.push(Object.keys(obj.detailedDescription[0])); // Column Headers
    }

    // Add each item in horizontal format
    obj.detailedDescription.forEach((item) => {
      formattedData.push(Object.values(item));
    });

    // Separator row (optional)
    formattedData.push([" "]);
  });

  return formattedData;
}

function objectToRowsJSON(obj) {
  return Object.entries(obj).map(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      value = JSON.stringify(value); // Convert objects/arrays to strings
    }
    return [key, value]; // Each property is a row
  });
}

// //Blåkläder excelskapare
async function createExcel(arrayOfObjects, fileName) {
  formattedData = formatDataForExceJSON(arrayOfObjects);

  //const worksheet = XLSX.utils.json_to_sheet(arrayOfObjects);

  const worksheet = XLSX.utils.aoa_to_sheet(formattedData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Default");

  XLSX.writeFile(workbook, fileName + ".xlsx", { compression: true });
}

async function processPDF() {
  const loadDiv = document.querySelector("#loading");
  const completedDiv = document.querySelector("#completed");
  const failureDiv = document.querySelector("#failure");

  const file = document.getElementById("pdfInput").files[0];
  if (!file) {
    alert("Please select a PDF file.");
    return;
  }

  try {
    loadDiv.style.display = "block";
    const pdfData = await readPDFFile(file);

    const extractedLines = await extractTextFromPDF(pdfData);

    const parsedData = parseLinesToObjects(extractedLines);

    const mergedData = mergeData(parsedData);

    let totalweight = mergedData.reduce((acc, obj) => acc + obj.netWeight, 0);
    let totalvalue = mergedData.reduce((acc, obj) => acc + obj.itemValue, 0);
    let kollinr = "1233457890SE";

    // = document.querySelector("#pdfText").value;

    const apiObject = apidataArrayOfObjects[0];
    apiObject.ids[0].id = kollinr;
    apiObject.detailedDescription = mergedData;
    apiObject.customsInvoice.totalGrossWeight.value = totalweight;
    apiObject.customsInvoice.invoiceTotal.amount = totalvalue;
    apiObject.customsInvoice.invoice.shippingDate = bkDate;
    apiObject.customsInvoice.invoice.invoiceNo = dispactNoBK;

    console.log("OBJECT:", apiObject);
    console.log("ARRAYOFOBJECTS:", apidataArrayOfObjects);

    await createExcel(apidataArrayOfObjects, "Blåkläder");

    loadDiv.style.display = "none";
    completedDiv.style.display = "block";
    setTimeout(() => (completedDiv.style.display = "none"), 3000);
  } catch (error) {
    console.error("Error processing PDF:", error);
    alert("An error occurred while processing the PDF.");
    failureDiv.style.display = "block";
    setTimeout(() => (failureDiv.style.display = "none"), 3000);
  }
}

async function readPDFFile(file) {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(new Uint8Array(fileReader.result));
    fileReader.onerror = reject;
    fileReader.readAsArrayBuffer(file);
  });
}

let dispactNoBK = null;
let bkDate = null;

async function extractTextFromPDF(pdfData) {
  const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
  let arrayOfLines = [];
  const promises = [];
  let loopCounter = 1;
  const worker = await Tesseract.createWorker({
    logger: (m) => console.info(m),
  });

  await worker.loadLanguage("eng");
  await worker.initialize("eng");

  let progressShower = document.querySelector("#progressShower");
  progressShower.textContent = "Initializing...";

  // for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
  //   promises.push(
  //     (async () => {
  //       try {
  //         const page = await pdf.getPage(pageNum);
  //         const text = await performOCR(page, worker);
  //         const lines = extractLines(text, "Total");

  //         arrayOfLines.push(...lines);
  //         updateProgress(pdf.numPages, loopCounter);
  //         loopCounter++;
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     })()
  //   );
  // }

  // await Promise.all(promises);

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    try {
      const page = await pdf.getPage(pageNum);
      const text = await performOCR(page, worker);
      const lines = extractLines(text, "Total");

      if (!bkDate) bkDate = extractBKdate(text);
      if (!dispactNoBK) dispactNoBK = extractBKdispact(text);

      arrayOfLines.push(...lines);
      updateProgress(pdf.numPages, pageNum);
    } catch (error) {
      console.error("Error on page " + pageNum, error);
      progressShower.textContent = "Failure...";
    }
  }
  await worker.terminate();

  return arrayOfLines;
}

async function performOCR(page, worker) {
  const scale = 3;
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = viewport.width;
  canvas.height = viewport.height;

  const renderContext = { canvasContext: ctx, viewport };
  await page.render(renderContext).promise;

  const imageUrl = canvas.toDataURL("image/png");
  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/png"),
  );

  // const {
  //   data: { text },
  // } = await Tesseract.recognize(imageUrl, "eng", {
  //   logger: (m) => console.log(m),
  // });
  // console.info("OCR result:", "sucess " + pageNum + " of " + totalPages);

  const {
    data: { text },
  } = await worker.recognize(blob);

  return text;
}

function updateProgress(totalPages, currentPage) {
  let progressShower = document.querySelector("#progressShower");
  let progressPercentage = currentPage / totalPages;
  progressShower.textContent = Math.round(progressPercentage * 100) + "%";
}

function extractBKdispact(text) {
  const lines = text.split("\n");
  let dispactNo = null;
  if (!dispactNo) {
    lines.forEach((stringLine) => {
      if (stringLine.includes("Dispatch")) {
        let index = stringLine.indexOf("Dispatch");
        dispactNo = stringLine.substring(index + 8, index + 16).trim();
      }
    });
  }
  return dispactNo;
}

function extractBKdate(text) {
  const lines = text.split("\n");
  let fulldate = null;
  if (!fulldate) {
    lines.forEach((stringLine) => {
      if (stringLine.includes("Date:")) {
        let index = stringLine.indexOf("Date:");
        fulldate = stringLine.substring(index + 5, index + 16).trim();
      }
    });
  }
  return fulldate;
}

function extractLines(text, searchPhrase) {
  //return text.split("\n").indexOf(searchPhrase);
  //.filter((line) => line.startsWith(searchPhrase))
  //.map((line) => line.trim());
  const lines = text.split("\n");
  const result = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith(searchPhrase)) {
      if (i > 0) {
        result.push(lines[i - 1].trim()); // Add the line before the match
      }
      result.push(lines[i].trim()); // Add the matching line
    }
  }

  return result;
}

function parseLinesToObjects(arrayOfLines) {
  const objects = [];
  let content;

  for (let i = 0; i < arrayOfLines.length; i++) {
    const line = arrayOfLines[i];
    const newLine = line.replace(",", "").split(/\s+/);

    if (i % 2 === 0) {
      if (newLine.length === 7) {
        content = newLine[1] + " " + newLine[2];
      } else if (newLine.length === 8) {
        content = newLine[1] + " " + newLine[2] + " " + newLine[3];
      } else if (newLine.length === 9) {
        content =
          newLine[1] + " " + newLine[2] + " " + newLine[3] + " " + newLine[4];
      } else if (newLine.length === 10) {
        content =
          newLine[1] +
          " " +
          newLine[2] +
          " " +
          newLine[3] +
          " " +
          newLine[4] +
          " " +
          newLine[5];
      } else
        content =
          newLine[1] +
          " " +
          newLine[2] +
          " " +
          newLine[3] +
          " " +
          newLine[4] +
          " " +
          newLine[5] +
          " " +
          newLine[6];
    } else {
      if (newLine.length > 7) {
        newLine[3] = newLine[3] + newLine[4];
        newLine.splice(4, 1);
      }

      let obj = {
        content: content,
        hsTariffNumber: newLine[1],
        countryOfOrigin: getCountryCode(newLine[3]),
        quantity: parseFloat(newLine[5]),
        netWeight: parseFloat(newLine[4]),
        itemValue: parseFloat(newLine[6]),
      };

      if (obj.quantity / obj.weight < 0.09) {
        obj.weight /= 100;
      }
      objects.push(obj);
    }
  }

  return objects;
}

const helperCalcValues = () => {
  let kgfield = document.getElementById("kgInput");
  let antalfield = document.getElementById("antalInput");
  let expectedfield = document.getElementById("expectedVal");

  let emptyCounter = 0;
  let inputFields = [kgfield, antalfield, expectedfield];

  inputFields.forEach((field) => {
    if (field.value === "" || isNaN(field.value)) {
      emptyCounter++;
      field.style.borderColor = "red";
    } else field.style.borderColor = "";
  });
  console.log(emptyCounter);
};

function mergeData(arrayOfcommodityItems) {
  return Object.values(
    arrayOfcommodityItems.reduce((acc, commodityItem) => {
      const key =
        commodityItem.hsTariffNumber + "_" + commodityItem.countryOfOrigin;
      if (!acc[key]) {
        acc[key] = { ...commodityItem };
      } else {
        acc[key].quantity += commodityItem.quantity;
        acc[key].netWeight += commodityItem.netWeight;
        acc[key].itemValue += commodityItem.itemValue;
      }
      return acc;
    }, {}),
  );
}

function getCountryCode(country) {
  const countryMap = new Map([
    ["LATVIA", "LV"],
    ["SRILANKA", "LK"],
    ["BANGLADESH", "BD"],
    ["MYANMAR", "MM"],
    ["ROMANIA", "RO"],
    ["SWEDEN", "SE"],
  ]);

  return countryMap.get(country.toUpperCase()) || country;
}

const APIurl = "api2.postnord.com/rest/shipment";

const apidataArrayOfObjects = [
  {
    ids: [
      {
        id: "23784726535SE",
        idType: "ITEMID",
      },
    ],
    customsInvoice: {
      declarationType: "invoiceExportDeclaration",
      type: "commercial",
      basicServiceCode: "52",
      seller: {
        partyIdentification: {
          partyId: "20072020",
          partyIdType: "160",
        },
        vatNo: "5560696618",
        name: "AB BLÅKLÄDER",
        streets: ["POSTBOX 124"],
        city: "SVENLJUNGA",
        postalCode: "51223",
        countryCode: "SE",
        contacts: {
          name: "JOSEFIN ANDERSSON",
          phoneNo: "+0325661900",
          emailAddress: "INVOICES@BLAKLADER.COM",
        },
        eoriNo: "5560696618",
      },
      buyer: {
        name: "KNEGARN AB",
        streets: ["DALKARBYVÄGEN 2"],
        city: "MARIEHAMN",
        postalCode: "22100",
        countryCode: "AX",
        contacts: {
          name: "POSTNORD SVERIGE ",
          phoneNo: "010-4363330",
        },
      },

      // shipTo: {
      //   partyIdentification: {
      //     partyId: "1234567890",
      //     partyIdType: "160",
      //   },
      //   name: "Nils Andersson",
      //   streets: ["Engelbrekts väg"],
      //   city: "Sollentuna",
      //   postalCode: "19162",
      //   countryCode: "SE",
      //   contacts: {
      //     name: "Nils Andersson",
      //     phoneNo: "+4685586363",
      //     emailAddress: "me@postnord.com",
      //     smsNo: "+467052555",
      //   },
      // },
      invoice: {
        invoiceNo: "7680396",
        shippingDate: "2020-02-05",
        reasonForExportation: "1000",
        termsOfSale: "DDP",
      },
      ids: [
        {
          id: "23784726535SE",
          idType: "ITEMID",
        },
      ],
      // detailedDescription: [
      //   {
      //     quantity: 1,
      //     hsTariffNumber: "33040000",
      //     hsTariffNumberCountryCode: "SE",
      //     content: "Cotton shirt",
      //     countryOfOrigin: "SE",
      //     netWeight: {
      //       value: 5,
      //       unit: "KGM",
      //     },
      //     grossWeight: {
      //       value: 5,
      //       unit: "KGM",
      //     },
      //     itemValue: {
      //       amount: 20,
      //       currency: "SEK",
      //     },
      //   },
      // ],
      totalNetWeight: {
        value: 5,
        unit: "KGM",
      },
      totalGrossWeight: {
        value: 5,
        unit: "KGM",
      },
      totalNumberOfPackages: {
        value: 1,
      },

      invoiceTotal: {
        amount: 20,
        currency: "SEK",
      },
    },
  },
];
const h7blExciseDuty = [
  { tariffCode: "130211", type: "exciseDuty" },
  { tariffCode: "130212", type: "exciseDuty" },
  { tariffCode: "130213", type: "exciseDuty" },
  { tariffCode: "130214", type: "exciseDuty" },
  { tariffCode: "13021905", type: "exciseDuty" },
  { tariffCode: "180690", type: "exciseDuty" },
  { tariffCode: "200811", type: "exciseDuty" },
  { tariffCode: "200819", type: "exciseDuty" },
  { tariffCode: "200820", type: "exciseDuty" },
  { tariffCode: "200830", type: "exciseDuty" },
  { tariffCode: "200840", type: "exciseDuty" },
  { tariffCode: "200850", type: "exciseDuty" },
  { tariffCode: "200860", type: "exciseDuty" },
  { tariffCode: "200870", type: "exciseDuty" },
  { tariffCode: "200880", type: "exciseDuty" },
  { tariffCode: "200891", type: "exciseDuty" },
  { tariffCode: "200893", type: "exciseDuty" },
  { tariffCode: "200897", type: "exciseDuty" },
  { tariffCode: "200899", type: "exciseDuty" },
  { tariffCode: "210111", type: "exciseDuty" },
  { tariffCode: "210112", type: "exciseDuty" },
  { tariffCode: "210390", type: "exciseDuty" },
  { tariffCode: "210690", type: "exciseDuty" },
  { tariffCode: "2203", type: "exciseDuty" },
  { tariffCode: "2204", type: "exciseDuty" },
  { tariffCode: "2205", type: "exciseDuty" },
  { tariffCode: "2206", type: "exciseDuty" },
  { tariffCode: "2207", type: "exciseDuty" },
  { tariffCode: "2208", type: "exciseDuty" },
  { tariffCode: "24", type: "exciseDuty" },
  { tariffCode: "2701", type: "exciseDuty" },
  { tariffCode: "2702", type: "exciseDuty" },
  { tariffCode: "2703000000", type: "exciseDuty" },
  { tariffCode: "2704", type: "exciseDuty" },
  { tariffCode: "2710", type: "exciseDuty" },
  { tariffCode: "2711", type: "exciseDuty" },
  { tariffCode: "271311", type: "exciseDuty" },
  { tariffCode: "271312", type: "exciseDuty" },
  { tariffCode: "3301", type: "exciseDuty" },
  { tariffCode: "3302", type: "exciseDuty" },
  { tariffCode: "3305", type: "exciseDuty" },
  { tariffCode: "330690", type: "exciseDuty" },
  { tariffCode: "330710", type: "exciseDuty" },
  { tariffCode: "330720", type: "exciseDuty" },
  { tariffCode: "330730", type: "exciseDuty" },
  { tariffCode: "330741", type: "exciseDuty" },
  { tariffCode: "330790", type: "exciseDuty" },
  { tariffCode: "3803", type: "exciseDuty" },
  { tariffCode: "3826", type: "exciseDuty" },
  { tariffCode: "841810", type: "exciseDuty" },
  { tariffCode: "841821", type: "exciseDuty" },
  { tariffCode: "841829", type: "exciseDuty" },
  { tariffCode: "841830", type: "exciseDuty" },
  { tariffCode: "841840", type: "exciseDuty" },
  { tariffCode: "842211", type: "exciseDuty" },
  { tariffCode: "845011", type: "exciseDuty" },
  { tariffCode: "845012", type: "exciseDuty" },
  { tariffCode: "845019", type: "exciseDuty" },
  { tariffCode: "845121", type: "exciseDuty" },
  { tariffCode: "847130", type: "exciseDuty" },
  { tariffCode: "847141", type: "exciseDuty" },
  { tariffCode: "847149", type: "exciseDuty" },
  { tariffCode: "850811", type: "exciseDuty" },
  { tariffCode: "851650", type: "exciseDuty" },
  { tariffCode: "851660", type: "exciseDuty" },
  { tariffCode: "851711", type: "exciseDuty" },
  { tariffCode: "851713", type: "exciseDuty" },
  { tariffCode: "851714", type: "exciseDuty" },
  { tariffCode: "851718", type: "exciseDuty" },
  { tariffCode: "851762", type: "exciseDuty" },
  { tariffCode: "851930", type: "exciseDuty" },
  { tariffCode: "851981", type: "exciseDuty" },
  { tariffCode: "851989", type: "exciseDuty" },
  { tariffCode: "852110", type: "exciseDuty" },
  { tariffCode: "852190", type: "exciseDuty" },
  { tariffCode: "852712", type: "exciseDuty" },
  { tariffCode: "852713", type: "exciseDuty" },
  { tariffCode: "852719", type: "exciseDuty" },
  { tariffCode: "852791", type: "exciseDuty" },
  { tariffCode: "852792", type: "exciseDuty" },
  { tariffCode: "852799", type: "exciseDuty" },
  { tariffCode: "852842", type: "exciseDuty" },
  { tariffCode: "852849", type: "exciseDuty" },
  { tariffCode: "852852", type: "exciseDuty" },
  { tariffCode: "852859", type: "exciseDuty" },
  { tariffCode: "852871", type: "exciseDuty" },
  { tariffCode: "852872", type: "exciseDuty" },
  { tariffCode: "852873", type: "exciseDuty" },
  { tariffCode: "854340", type: "exciseDuty" },
  { tariffCode: "950450", type: "exciseDuty" },
];

const h7blRestricted = [
  { tariffCode: "01", type: "restricted" },
  { tariffCode: "02", type: "restricted" },
  { tariffCode: "03", type: "restricted" },
  { tariffCode: "04", type: "restricted" },
  { tariffCode: "05", type: "restricted" },
  { tariffCode: "601", type: "restricted" },
  { tariffCode: "602", type: "restricted" },
  { tariffCode: "603", type: "restricted" },
  { tariffCode: "60420", type: "restricted" },
  { tariffCode: "70190", type: "restricted" },
  { tariffCode: "702", type: "restricted" },
  { tariffCode: "703", type: "restricted" },
  { tariffCode: "704", type: "restricted" },
  { tariffCode: "705", type: "restricted" },
  { tariffCode: "70610", type: "restricted" },
  { tariffCode: "70690", type: "restricted" },
  { tariffCode: "707", type: "restricted" },
  { tariffCode: "70810", type: "restricted" },
  { tariffCode: "70820", type: "restricted" },
  { tariffCode: "70890", type: "restricted" },
  { tariffCode: "709", type: "restricted" },
  { tariffCode: "712", type: "restricted" },
  { tariffCode: "713", type: "restricted" },
  { tariffCode: "714", type: "restricted" },
  { tariffCode: "80121", type: "restricted" },
  { tariffCode: "80131", type: "restricted" },
  { tariffCode: "802", type: "restricted" },
  { tariffCode: "804", type: "restricted" },
  { tariffCode: "805", type: "restricted" },
  { tariffCode: "807", type: "restricted" },
  { tariffCode: "808", type: "restricted" },
  { tariffCode: "809", type: "restricted" },
  { tariffCode: "810", type: "restricted" },
  { tariffCode: "901", type: "restricted" },
  { tariffCode: "90210", type: "restricted" },
  { tariffCode: "90220", type: "restricted" },
  { tariffCode: "90421", type: "restricted" },
  { tariffCode: "910", type: "restricted" },
  { tariffCode: "1001", type: "restricted" },
  { tariffCode: "1002", type: "restricted" },
  { tariffCode: "100310", type: "restricted" },
  { tariffCode: "100410", type: "restricted" },
  { tariffCode: "100510", type: "restricted" },
  { tariffCode: "100590", type: "restricted" },
  { tariffCode: "100610", type: "restricted" },
  { tariffCode: "100710", type: "restricted" },
  { tariffCode: "1008", type: "restricted" },
  { tariffCode: "120110", type: "restricted" },
  { tariffCode: "1202", type: "restricted" },
  { tariffCode: "1204", type: "restricted" },
  { tariffCode: "1205", type: "restricted" },
  { tariffCode: "1206", type: "restricted" },
  { tariffCode: "1207", type: "restricted" },
  { tariffCode: "1209", type: "restricted" },
  { tariffCode: "121010", type: "restricted" },
  { tariffCode: "121020", type: "restricted" },
  { tariffCode: "1211", type: "restricted" },
  { tariffCode: "121292", type: "restricted" },
  { tariffCode: "121293", type: "restricted" },
  { tariffCode: "121294", type: "restricted" },
  { tariffCode: "121299", type: "restricted" },
  { tariffCode: "1213", type: "restricted" },
  { tariffCode: "121490", type: "restricted" },
  { tariffCode: "1302", type: "restricted" },
  { tariffCode: "140190", type: "restricted" },
  { tariffCode: "140490", type: "restricted" },
  { tariffCode: "15", type: "restricted" },
  { tariffCode: "16", type: "restricted" },
  { tariffCode: "170211", type: "restricted" },
  { tariffCode: "170219", type: "restricted" },
  { tariffCode: "210390", type: "restricted" },
  { tariffCode: "2104", type: "restricted" },
  { tariffCode: "2105", type: "restricted" },
  { tariffCode: "2106", type: "restricted" },
  { tariffCode: "2202", type: "restricted" },
  { tariffCode: "2203", type: "restricted" },
  { tariffCode: "2204", type: "restricted" },
  { tariffCode: "2205", type: "restricted" },
  { tariffCode: "2206", type: "restricted" },
  { tariffCode: "2207", type: "restricted" },
  { tariffCode: "2208", type: "restricted" },
  { tariffCode: "2301", type: "restricted" },
  { tariffCode: "2305", type: "restricted" },
  { tariffCode: "2309", type: "restricted" },
  { tariffCode: "2401", type: "restricted" },
  { tariffCode: "2402", type: "restricted" },
  { tariffCode: "2403", type: "restricted" },
  { tariffCode: "253090", type: "restricted" },
  { tariffCode: "2612", type: "restricted" },
  { tariffCode: "270810", type: "restricted" },
  { tariffCode: "2710", type: "restricted" },
  { tariffCode: "2711", type: "restricted" },
  { tariffCode: "28", type: "restricted" },
  { tariffCode: "29", type: "restricted" },
  { tariffCode: "30", type: "restricted" },
  { tariffCode: "3101", type: "restricted" },
  { tariffCode: "310230", type: "restricted" },
  { tariffCode: "310250", type: "restricted" },
  { tariffCode: "310510", type: "restricted" },
  { tariffCode: "330129", type: "restricted" },
  { tariffCode: "340391", type: "restricted" },
  { tariffCode: "340399", type: "restricted" },
  { tariffCode: "3501", type: "restricted" },
  { tariffCode: "3502", type: "restricted" },
  { tariffCode: "3503", type: "restricted" },
  { tariffCode: "3504", type: "restricted" },
  { tariffCode: "3507", type: "restricted" },
  { tariffCode: "3601", type: "restricted" },
  { tariffCode: "3602", type: "restricted" },
  { tariffCode: "3603", type: "restricted" },
  { tariffCode: "3604", type: "restricted" },
  { tariffCode: "3808", type: "restricted" },
  { tariffCode: "382489", type: "restricted" },
  { tariffCode: "382492", type: "restricted" },
  { tariffCode: "382499", type: "restricted" },
  { tariffCode: "391220", type: "restricted" },
  { tariffCode: "391390", type: "restricted" },
  { tariffCode: "41", type: "restricted" },
  { tariffCode: "4206", type: "restricted" },
  { tariffCode: "4301", type: "restricted" },
  { tariffCode: "430219", type: "restricted" },
  { tariffCode: "430220", type: "restricted" },
  { tariffCode: "430230", type: "restricted" },
  { tariffCode: "4303", type: "restricted" },
  { tariffCode: "4401", type: "restricted" },
  { tariffCode: "4403", type: "restricted" },
  { tariffCode: "4404", type: "restricted" },
  { tariffCode: "4405", type: "restricted" },
  { tariffCode: "4406", type: "restricted" },
  { tariffCode: "4407", type: "restricted" },
  { tariffCode: "4408", type: "restricted" },
  { tariffCode: "4409", type: "restricted" },
  { tariffCode: "4416", type: "restricted" },
  { tariffCode: "47", type: "restricted" },
  { tariffCode: "5101", type: "restricted" },
  { tariffCode: "5102", type: "restricted" },
  { tariffCode: "5103", type: "restricted" },
  { tariffCode: "530210", type: "restricted" },
  { tariffCode: "6309", type: "restricted" },
  { tariffCode: "6701", type: "restricted" },
  { tariffCode: "7101", type: "restricted" },
  { tariffCode: "7102", type: "restricted" },
  { tariffCode: "7103", type: "restricted" },
  { tariffCode: "7104", type: "restricted" },
  { tariffCode: "7105", type: "restricted" },
  { tariffCode: "7113", type: "restricted" },
  { tariffCode: "7114", type: "restricted" },
  { tariffCode: "7116", type: "restricted" },
  { tariffCode: "841210", type: "restricted" },
  { tariffCode: "843290", type: "restricted" },
  { tariffCode: "8549", type: "restricted" },
  { tariffCode: "9013", type: "restricted" },
  { tariffCode: "93", type: "restricted" },
  { tariffCode: "940610", type: "restricted" },
  { tariffCode: "9601", type: "restricted" },
  { tariffCode: "97", type: "restricted" },
  { tariffCode: "98", type: "restricted" },
];

const h7bl = [
  { tariffCode: "01", type: "return" },
  { tariffCode: "02", type: "restricted" },
  { tariffCode: "03", type: "restricted" },
  { tariffCode: "04", type: "restricted" },
  { tariffCode: "05", type: "restricted" },
  { tariffCode: "15", type: "restricted" },
  { tariffCode: "16", type: "restricted" },
  { tariffCode: "24", type: "return" },
  { tariffCode: "28", type: "restricted" },
  { tariffCode: "29", type: "restricted" },
  { tariffCode: "30", type: "restricted" },
  { tariffCode: "36", type: "return" },
  { tariffCode: "41", type: "restricted" },
  { tariffCode: "47", type: "restricted" },
  { tariffCode: "93", type: "restricted" },
  { tariffCode: "97", type: "restricted" },
  { tariffCode: "98", type: "restricted" },

  { tariffCode: "0601", type: "restricted" },
  { tariffCode: "0602", type: "restricted" },
  { tariffCode: "0603", type: "restricted" },
  { tariffCode: "0702", type: "restricted" },
  { tariffCode: "0703", type: "restricted" },
  { tariffCode: "0704", type: "restricted" },
  { tariffCode: "0705", type: "restricted" },
  { tariffCode: "0707", type: "restricted" },
  { tariffCode: "0709", type: "restricted" },
  { tariffCode: "0712", type: "restricted" },
  { tariffCode: "0713", type: "restricted" },
  { tariffCode: "0714", type: "restricted" },
  { tariffCode: "0802", type: "restricted" },
  { tariffCode: "0804", type: "restricted" },
  { tariffCode: "0805", type: "restricted" },
  { tariffCode: "0807", type: "restricted" },
  { tariffCode: "0808", type: "restricted" },
  { tariffCode: "0809", type: "restricted" },
  { tariffCode: "0810", type: "restricted" },
  { tariffCode: "0901", type: "restricted" },
  { tariffCode: "0910", type: "restricted" },

  { tariffCode: "1001", type: "restricted" },
  { tariffCode: "1002", type: "restricted" },
  { tariffCode: "1008", type: "restricted" },
  { tariffCode: "1202", type: "restricted" },
  { tariffCode: "1204", type: "restricted" },
  { tariffCode: "1205", type: "restricted" },
  { tariffCode: "1206", type: "restricted" },
  { tariffCode: "1207", type: "restricted" },
  { tariffCode: "1209", type: "restricted" },
  { tariffCode: "1211", type: "restricted" },
  { tariffCode: "1213", type: "restricted" },
  { tariffCode: "1302", type: "restricted" },
  { tariffCode: "140190", type: "restricted" },
  { tariffCode: "140490", type: "restricted" },
  { tariffCode: "170211", type: "restricted" },
  { tariffCode: "170219", type: "restricted" },
  { tariffCode: "180690", type: "exciseDuty" },

  { tariffCode: "210111", type: "exciseDuty" },
  { tariffCode: "210112", type: "exciseDuty" },
  { tariffCode: "210390", type: "return" },
  { tariffCode: "2104", type: "restricted" },
  { tariffCode: "2105", type: "restricted" },
  { tariffCode: "2106", type: "restricted" },
  { tariffCode: "2202", type: "restricted" },
  { tariffCode: "2203", type: "return" },
  { tariffCode: "2204", type: "return" },
  { tariffCode: "2205", type: "return" },
  { tariffCode: "2206", type: "restricted" },
  { tariffCode: "2207", type: "return" },
  { tariffCode: "2208", type: "return" },
  { tariffCode: "2209", type: "return" },
  { tariffCode: "2301", type: "restricted" },
  { tariffCode: "2305", type: "restricted" },
  { tariffCode: "2309", type: "restricted" },
  { tariffCode: "2401", type: "restricted" },
  { tariffCode: "2402", type: "restricted" },
  { tariffCode: "2403", type: "restricted" },

  { tariffCode: "253090", type: "restricted" },
  { tariffCode: "2612", type: "restricted" },
  { tariffCode: "2701", type: "exciseDuty" },
  { tariffCode: "2702", type: "exciseDuty" },
  { tariffCode: "2704", type: "exciseDuty" },
  { tariffCode: "270810", type: "restricted" },
  { tariffCode: "2710", type: "exciseDuty" },
  { tariffCode: "2711", type: "exciseDuty" },
  { tariffCode: "271012", type: "return" },
  { tariffCode: "271311", type: "exciseDuty" },
  { tariffCode: "271312", type: "exciseDuty" },
  { tariffCode: "2844", type: "return" },
  { tariffCode: "2852", type: "return" },
  { tariffCode: "290513", type: "return" },
  { tariffCode: "290514", type: "return" },
  { tariffCode: "290539", type: "return" },
  { tariffCode: "2941", type: "return" },

  { tariffCode: "3001", type: "return" },
  { tariffCode: "3003", type: "return" },
  { tariffCode: "300410", type: "return" },
  { tariffCode: "300420", type: "return" },
  { tariffCode: "30043", type: "return" },
  { tariffCode: "30044", type: "return" },
  { tariffCode: "300460", type: "return" },
  { tariffCode: "300490", type: "return" },
  { tariffCode: "300660", type: "return" },
  { tariffCode: "3101", type: "restricted" },
  { tariffCode: "310230", type: "restricted" },
  { tariffCode: "310250", type: "restricted" },
  { tariffCode: "310510", type: "restricted" },

  { tariffCode: "3301", type: "exciseDuty" },
  { tariffCode: "3302", type: "exciseDuty" },
  { tariffCode: "3305", type: "exciseDuty" },
  { tariffCode: "330129", type: "restricted" },
  { tariffCode: "330690", type: "exciseDuty" },
  { tariffCode: "330710", type: "exciseDuty" },
  { tariffCode: "330720", type: "exciseDuty" },
  { tariffCode: "330730", type: "exciseDuty" },
  { tariffCode: "330741", type: "exciseDuty" },
  { tariffCode: "330790", type: "exciseDuty" },
  { tariffCode: "340391", type: "restricted" },
  { tariffCode: "340399", type: "restricted" },
  { tariffCode: "3501", type: "restricted" },
  { tariffCode: "3502", type: "restricted" },
  { tariffCode: "3503", type: "restricted" },
  { tariffCode: "3504", type: "restricted" },
  { tariffCode: "3507", type: "restricted" },
  { tariffCode: "3601", type: "restricted" },
  { tariffCode: "3602", type: "restricted" },
  { tariffCode: "3603", type: "restricted" },
  { tariffCode: "3604", type: "restricted" },
  { tariffCode: "3803", type: "exciseDuty" },
  { tariffCode: "3808", type: "restricted" },
  { tariffCode: "380891", type: "return" },
  { tariffCode: "380892", type: "return" },
  { tariffCode: "380893", type: "return" },
  { tariffCode: "380894", type: "return" },
  { tariffCode: "380899", type: "return" },
  { tariffCode: "3813", type: "return" },
  { tariffCode: "3826", type: "exciseDuty" },
  { tariffCode: "382489", type: "restricted" },
  { tariffCode: "382492", type: "restricted" },
  { tariffCode: "382499", type: "return" },
  { tariffCode: "391220", type: "return" },
  { tariffCode: "391390", type: "restricted" },
  { tariffCode: "4206", type: "restricted" },

  { tariffCode: "4301", type: "restricted" },
  { tariffCode: "430219", type: "restricted" },
  { tariffCode: "430220", type: "restricted" },
  { tariffCode: "430230", type: "restricted" },
  { tariffCode: "4303", type: "restricted" },
  { tariffCode: "4401", type: "restricted" },
  { tariffCode: "4403", type: "restricted" },
  { tariffCode: "4404", type: "restricted" },
  { tariffCode: "4405", type: "restricted" },
  { tariffCode: "4406", type: "restricted" },
  { tariffCode: "4407", type: "restricted" },
  { tariffCode: "4408", type: "restricted" },
  { tariffCode: "4409", type: "restricted" },
  { tariffCode: "4416", type: "restricted" },
  { tariffCode: "5101", type: "restricted" },
  { tariffCode: "5102", type: "restricted" },
  { tariffCode: "5103", type: "restricted" },
  { tariffCode: "530210", type: "restricted" },
  { tariffCode: "6309", type: "restricted" },
  { tariffCode: "6701", type: "restricted" },
  { tariffCode: "7101", type: "restricted" },
  { tariffCode: "7102", type: "restricted" },
  { tariffCode: "7103", type: "restricted" },
  { tariffCode: "7104", type: "restricted" },
  { tariffCode: "7105", type: "restricted" },
  { tariffCode: "7113", type: "restricted" },
  { tariffCode: "7114", type: "restricted" },
  { tariffCode: "7116", type: "restricted" },

  { tariffCode: "841210", type: "restricted" },
  { tariffCode: "841810", type: "exciseDuty" },
  { tariffCode: "841821", type: "exciseDuty" },
  { tariffCode: "841829", type: "exciseDuty" },
  { tariffCode: "841830", type: "exciseDuty" },
  { tariffCode: "841840", type: "exciseDuty" },
  { tariffCode: "842211", type: "exciseDuty" },
  { tariffCode: "843290", type: "restricted" },
  { tariffCode: "845011", type: "exciseDuty" },
  { tariffCode: "845012", type: "exciseDuty" },
  { tariffCode: "845019", type: "exciseDuty" },
  { tariffCode: "845121", type: "exciseDuty" },
  { tariffCode: "847130", type: "exciseDuty" },
  { tariffCode: "847141", type: "exciseDuty" },
  { tariffCode: "847149", type: "exciseDuty" },
  { tariffCode: "850650", type: "return" },
  { tariffCode: "850760", type: "return" },
  { tariffCode: "850811", type: "exciseDuty" },
  { tariffCode: "851650", type: "exciseDuty" },
  { tariffCode: "851660", type: "exciseDuty" },
  { tariffCode: "851711", type: "exciseDuty" },
  { tariffCode: "851713", type: "exciseDuty" },
  { tariffCode: "851714", type: "exciseDuty" },
  { tariffCode: "851718", type: "exciseDuty" },
  { tariffCode: "851762", type: "exciseDuty" },
  { tariffCode: "851930", type: "exciseDuty" },
  { tariffCode: "851981", type: "exciseDuty" },
  { tariffCode: "851989", type: "exciseDuty" },
  { tariffCode: "852110", type: "exciseDuty" },
  { tariffCode: "852190", type: "exciseDuty" },
  { tariffCode: "852712", type: "exciseDuty" },
  { tariffCode: "852713", type: "exciseDuty" },
  { tariffCode: "852719", type: "exciseDuty" },
  { tariffCode: "852791", type: "exciseDuty" },
  { tariffCode: "852792", type: "exciseDuty" },
  { tariffCode: "852799", type: "exciseDuty" },
  { tariffCode: "852842", type: "exciseDuty" },
  { tariffCode: "852849", type: "exciseDuty" },
  { tariffCode: "852852", type: "exciseDuty" },
  { tariffCode: "852859", type: "exciseDuty" },
  { tariffCode: "852871", type: "exciseDuty" },
  { tariffCode: "852872", type: "exciseDuty" },
  { tariffCode: "852873", type: "exciseDuty" },
  { tariffCode: "8539322000", type: "return" },
  { tariffCode: "854340", type: "exciseDuty" },
  { tariffCode: "8549", type: "restricted" },
  { tariffCode: "9013", type: "restricted" },
  { tariffCode: "9301", type: "return" },
  { tariffCode: "9303", type: "return" },
  { tariffCode: "9306", type: "return" },
  { tariffCode: "940610", type: "restricted" },
  { tariffCode: "950450", type: "return" },
  { tariffCode: "9601", type: "restricted" },
  { tariffCode: "9613", type: "return" },
];

console.log("Total H7 codes:", h7bl.length);

const h7TwoDigitCodes = h7bl.map((code) => code.tariffCode.substring(0, 2));

// const h7FourDigitCodes = h7bl
//   .map((code) => code.tariffCode)
//   .filter((code) => code.length === 4);

const h7Element = document.getElementById("h7bl");

if (h7Element) {
  let table = document.createElement("table");

  // Sort the codes
  h7bl.sort((a, b) => {
    return a.tariffCode.localeCompare(b.tariffCode);
  });

  let colCounter = 0;
  let noOfCols = 10;
  let row = document.createElement("tr");

  // Add rows
  h7bl.forEach((code) => {
    let codeTd = document.createElement("td");
    codeTd.classList.add("fw-medium", "px-4");
    codeTd.textContent = code.tariffCode;
    row.appendChild(codeTd);
    colCounter++;
    if (colCounter % noOfCols === 0 || colCounter === 0) {
      table.appendChild(row);
      row = document.createElement("tr");
    }
  });
  if (colCounter % noOfCols !== 0) {
    table.appendChild(row);
  }

  // Add table to the element
  h7Element.appendChild(table);
}

const searchH7 = () => {
  const inputField = document.getElementById("h7Search");
  const returnFeedback = document.querySelector(".return-feedback");
  inputField.classList.remove("is-valid");
  inputField.classList.remove("is-invalid");
  returnFeedback.style.display = "none";
  inputField.style.backgroundColor = "";
  let input = inputField.value.trim();
  h7Element
    .querySelectorAll("td")
    .forEach((cell) => (cell.style.backgroundColor = ""));

  if (input.length <= 1) return;

  // const result = h7bl.find(
  //   (code) =>
  //     input.startsWith(code.tariffCode) || code.tariffCode.startsWith(input),
  // );

  const result =
    h7bl.find((code) => code.tariffCode === input) ||
    h7bl.find((code) => input.startsWith(code.tariffCode)) ||
    h7bl.find((code) => code.tariffCode.startsWith(input));
  // .filter((code) => input.startsWith(code.tariffCode))
  // .sort((a, b) => b.tariffCode.length - a.tariffCode.length)[0];

  if (result) {
    inputField.style.backgroundColor = "red";
    if (result.type === "return") {
      returnFeedback.style.display = "block";

      console.log("Return code found:", result.tariffCode);
    }
    if (result.type === "restricted" || result.type === "exciseDuty") {
      returnFeedback.style.display = "none";
      inputField.classList.add("is-invalid");
      console.log("Restricted code found:", result.tariffCode);
    }
  } else {
    inputField.style.backgroundColor = "lightgreen";

    inputField.classList.remove("is-invalid");
    inputField.classList.add("is-valid");
  }
  if (result) highLightHit(input);
};

const highLightHit = (input) => {
  const cells = h7Element.querySelectorAll("td");
  cells.forEach((cell) => {
    const text = cell.textContent;
    if (text.startsWith(input) || input.startsWith(text)) {
      cell.style.backgroundColor = "yellow";
    } else {
      cell.style.backgroundColor = "";
    }
  });
};

let returTaricList = [{ description: "Läkemedel", tariffCode: "300490" }];

let specialTaricList = [
  { description: "Dressmaking kit", tariffCode: "630800" },
  {
    description: "Pinnekjött",
    tariffCode: "0210992990",
  },
  {
    description: "Charger",
    tariffCode: "850440(60)",
  },
  { description: "Chips", tariffCode: "200520" },
];

let specialTaricElement;
let returTaricElement = document.getElementById("returTaric");

if (returTaricElement) {
  specialTaricElement = returTaricElement.children[0];
  returTaricList.forEach((item) => {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    td1.textContent = item.description;
    td2.textContent = item.tariffCode;
    tr.appendChild(td1);
    tr.appendChild(td2);
    returTaricElement.appendChild(tr);
  });
}

if (document.getElementById("specialTaric")) {
  specialTaricElement = document.getElementById("specialTaric").children[0];
}

if (specialTaricElement) {
  specialTaricList.forEach((item) => {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    td1.textContent = item.description;
    td2.textContent = item.tariffCode;
    tr.appendChild(td1);
    tr.appendChild(td2);
    specialTaricElement.appendChild(tr);
  });
}

let platsKodTable = document.getElementById("platsKodTable");
if (platsKodTable) {
  platsKodTable = platsKodTable.children[0];
  platsKoder.forEach((item) => {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    td1.textContent = item.customer;
    td2.textContent = item.code;
    tr.appendChild(td1);
    tr.appendChild(td2);
    platsKodTable.appendChild(tr);
  });
}

let postalExportTable = document.getElementById("postalExportTable");
if (postalExportTable) {
  postalExportTable = postalExportTable.children[1];
  postalaExportKoder.forEach((location) => {
    let row = document.createElement("tr");
    let terminal = document.createElement("td");
    let exportOffice = document.createElement("td");
    let step1 = document.createElement("td");
    let step2 = document.createElement("td");
    terminal.textContent = location.terminal;
    exportOffice.textContent = location.exitOffice;
    step1.textContent = location.step1;
    step2.textContent = location.step2;
    row.appendChild(terminal);
    row.appendChild(exportOffice);
    row.appendChild(step1);
    row.appendChild(step2);
    postalExportTable.append(row);
  });
}
