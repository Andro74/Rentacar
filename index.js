        // Inicijalizacija mape 555
        const map = L.map('map').setView([45.1, 15.2], 7);
        
        // Dodavanje
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Lokacije rent a carova po gradovima i otocima
        const locations = {
            // Gradovi
            zagreb: { lat: 45.8150, lng: 15.9819, name: "Zagreb" },
            split: { lat: 43.5081, lng: 16.4402, name: "Split" },
            rijeka: { lat: 45.3271, lng: 14.4422, name: "Rijeka" },
            dubrovnik: { lat: 42.6507, lng: 18.0944, name: "Dubrovnik" },
            zadar: { lat: 44.1194, lng: 15.2314, name: "Zadar" },
            pula: { lat: 44.8666, lng: 13.8496, name: "Pula" },
            osijek: { lat: 45.5550, lng: 18.6955, name: "Osijek" },
            šibenik: { lat: 43.7350, lng: 15.8950, name: "Šibenik" },
            
            // Otoci
            krk: { lat: 45.0275, lng: 14.5753, name: "Krk" },
            brač: { lat: 43.3260, lng: 16.6444, name: "Brač" },
            hvar: { lat: 43.1725, lng: 16.4428, name: "Hvar" },
            korčula: { lat: 42.9602, lng: 16.6932, name: "Korčula" },
            pag: { lat: 44.4850, lng: 14.9575, name: "Pag" },
            cres: { lat: 44.9609, lng: 14.4085, name: "Cres" },
            lošinj: { lat: 44.5306, lng: 14.4686, name: "Lošinj" },
            vis: { lat: 43.0619, lng: 16.1833, name: "Vis" },
            rab: { lat: 44.7556, lng: 14.7606, name: "Rab" }
        };
        
        // Primjer podataka o rent a carovima (cijene u EUR)
        const rentalData = {
            zagreb: [
                { name: "Europcar Zagreb", price: "60 €/dan", address: "Ul. kneza Borne 12" },
                { name: "Sixt Zagreb", price: "95 €/dan", address: "Savska cesta 41" },
                { name: "Budget Zagreb", price: "40 €/dan", address: "Zagrebačka avenija 12" }
            ],
            split: [
                { name: "Hertz Split", price: "80 €/dan", address: "Put Firula 8" },
                { name: "Enterprise Split", price: "50 €/dan", address: "Domovinskog rata 61" }
            ],
            dubrovnik: [
                { name: "Avis Dubrovnik", price: "55 €/dan", address: "Čilipi Airport" },
                { name: "Local Rent Dubrovnik", price: "35 €/dan", address: "Obala Stjepana Radića 40" }
            ],
            zadar: [
                { name: "Zadar Car Rent", price: "50 €/dan", address: "Ul. don Ive Prodana 1" }
            ],
            rijeka: [
                { name: "Rijeka Rentals", price: "75 €/dan", address: "Riva 16" }
            ],
            pula: [
                { name: "Pula Car Hire", price: "40 €/dan", address: "Flaciusova 6" }
            ],
            osijek: [
                { name: "Osijek Auto", price: "45 €/dan", address: "Europska avenija 9" }
            ],
            šibenik: [
                { name: "Šibenik Rent", price: "65 €/dan", address: "Fra Jeronima Milete 42" }
            ],
            krk: [
                { name: "Krk Auto Rent", price: "55 €/dan", address: "Vela Placa 12, Krk" }
            ],
            brač: [
                { name: "Brač Rent a Car", price: "60 €/dan", address: "Put Supetara 12, Supetar" }
            ],
            hvar: [
                { name: "Hvar Car Rental", price: "70 €/dan", address: "Riva 22, Hvar" }
            ],
            korčula: [
                { name: "Korčula Auto", price: "55 €/dan", address: "Ul. Hrvatske bratske zajednice 5" }
            ],
            pag: [
                { name: "Pag Car Rent", price: "65 €/dan", address: "Ul. kralja Zvonimira 8, Pag" }
            ],
            cres: [
                { name: "Cres Rentals", price: "50 €/dan", address: "Riva Crespina 5, Cres" }
            ],
            lošinj: [
                { name: "Lošinj Auto", price: "50 €/dan", address: "Riva Lošinjskih kapetana 1, Mali Lošinj" }
            ],
            vis: [
                { name: "Vis Car Hire", price: "55 €/dan", address: "Šetalište stare Isse 3, Vis" }
            ],
            rab: [
                { name: "Rab Auto Rent", price: "60 €/dan", address: "Trg Municipium Arba 8, Rab" }
            ]
        };
        
        
        // Markeri na karti
        const markers = {};
        
        // Dodavanje markera za svaki grad i otok
        Object.keys(locations).forEach(location => {
            markers[location] = L.marker([locations[location].lat, locations[location].lng])
                .addTo(map)
                .bindPopup(`<b>${locations[location].name}</b><br>Klikni za detalje`)
                .on('click', function() {
                    document.getElementById('city-select').value = location;
                    showResults(location);
                });
        });
        
        // Funkcija za prikaz rezultata
        function showResults(location) {
            const resultsContainer = document.getElementById('results-container');
            const resultsList = document.getElementById('results-list');
            
            resultsList.innerHTML = '';
            
            if (rentalData[location]) {
                rentalData[location].forEach(car => {
                    const carElement = document.createElement('div');
                    carElement.className = 'car-listing';
                    carElement.innerHTML = `
                        <h3>${car.name}</h3>
                        <p><strong>Lokacija:</strong> ${car.address}</p>
                        <p class="price">Cijena: ${car.price}</p>
                        <button>Rezerviraj sada</button>
                    `;
                    resultsList.appendChild(carElement);
                });
                
                resultsContainer.style.display = 'block';
            } else {
                resultsList.innerHTML = '<p>Nema dostupnih rent a car usluga za odabranu lokaciju.</p>';
                resultsContainer.style.display = 'block';
            }
        }
        
        // Funkcija za prikaz rezultata
function showResults(location) {
    const resultsContainer = document.getElementById('results-container');
    const resultsList = document.getElementById('results-list');
    
    resultsList.innerHTML = '';
    
    if (rentalData[location]) {
        rentalData[location].forEach(car => {
            const carElement = document.createElement('div');
            carElement.className = 'car-listing';
            carElement.innerHTML = `
                <h3>${car.name}</h3>
                <p><strong>Lokacija:</strong> ${car.address}</p>
                <p class="price">Cijena: ${car.price}</p>
                <button>Rezerviraj sada</button>
            `;
            resultsList.appendChild(carElement);
        });
        
        resultsContainer.style.display = 'block';
        // Dodajte ovu liniju za automatsko pomicanje do rezultata
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    } else {
        resultsList.innerHTML = '<p>Nema dostupnih rent a car usluga za odabranu lokaciju.</p>';
        resultsContainer.style.display = 'block';
        // Dodajte ovu liniju i ovdje za slučaj da nema rezultata
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }
}
        
        // Event listener za gumb pretraži
        document.getElementById('search-btn').addEventListener('click', function() {
            const selectedLocation = document.getElementById('city-select').value;
            if (selectedLocation) {
                // Centriranje mape na odabranu lokaciju
                map.setView([locations[selectedLocation].lat, locations[selectedLocation].lng], 12);
                showResults(selectedLocation);
            } else {
                alert('Molimo odaberite lokaciju za pretraživanje.');
            }
        });