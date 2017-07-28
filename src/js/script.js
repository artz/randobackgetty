(function () {

    function Getty() {

        function request(url, callback) {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                if (xhr.status === 200) {
                    callback(null, xhr.responseText);
                } else {
                    callback(new Error(xhr.status + ' ' + xhr.statusText));
                }
            }
            xhr.open('GET', url, true);
            xhr.setRequestHeader('Api-Key', 'k77y4y26w46e3yzu3p9tnhdv');
            xhr.send();
        }

        const apiUrl = 'https://api.gettyimages.com/v3/';

        this.searchImages = function (phrase, callback) {
            const url = apiUrl + 'search/images/creative?sort_order=most_popular&phrase=' + encodeURIComponent(phrase);
            request(url, function (err, response) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, JSON.parse(response));
                }
            });
        };

        // this.getImage = function (id, callback) {
        //     const url = apiUrl + 'images/' + id;
        //     request(url, function (err, response) {
        //         if (err) {
        //             callback(err);
        //         } else {
        //             callback(null, JSON.parse(response));
        //         }
        //     });
        // }
    }

    const getty = new Getty();

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        // The maximum is exclusive and the minimum is inclusive.
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const htmlElem = document.getElementsByTagName('html')[0];

    function setBackground(uri) {
        const image = new Image();
        image.src = uri;
        image.onload = function () {
            htmlElem.style.backgroundImage = `url(${uri})`;
        };
    }

    const queryVue = new Vue({
        el: '#query',
        data: {
            ui: {
                isSearching: false,
            },
            phrase: 'New York City, NY',
            image: {
                uri: '../img/hallway.jpg',
                title: 'Room 206'
            }
        },
        methods: {
            search: function (event) {
                const data = this;
                data.ui.isSearching = true;
                getty.searchImages(data.phrase, function (err, response) {
                    data.ui.isSearching = false;
                    const images = response.images;
                    const image = images[getRandomInt(0, images.length)];
                    data.image.uri = image.display_sizes[0].uri;
                    data.image.title = image.title || image.caption;
                    setBackground(data.image.uri);
                });
                event.preventDefault();
            }
        }
    });

    const resultsVue = new Vue({
        el: '#results',
        data: {
            items: []
        }
    });

    const cities = [['Birmingham', 'Alabama'],
        ['Huntsville', 'Alabama'],
        ['Mobile', 'Alabama'],
        ['Montgomery', 'Alabama'],
        ['Anchorage', 'Alaska'],
        ['Chandler', 'Arizona'],
        ['Gilbert', 'Arizona'],
        ['Glendale', 'Arizona'],
        ['Mesa', 'Arizona'],
        ['Peoria', 'Arizona'],
        ['Phoenix', 'Arizona'],
        ['Scottsdale', 'Arizona'],
        ['Surprise', 'Arizona'],
        ['Tempe', 'Arizona'],
        ['Tucson', 'Arizona'],
        ['Little Rock', 'Arkansas'],
        ['Anaheim', 'California'],
        ['Antioch', 'California'],
        ['Bakersfield', 'California'],
        ['Berkeley', 'California'],
        ['Burbank', 'California'],
        ['Carlsbad', 'California'],
        ['Chula Vista', 'California'],
        ['Clovis', 'California'],
        ['Concord', 'California'],
        ['Corona', 'California'],
        ['Costa Mesa', 'California'],
        ['Daly City', 'California'],
        ['Downey', 'California'],
        ['El Cajon', 'California'],
        ['El Monte', 'California'],
        ['Elk Grove', 'California'],
        ['Escondido', 'California'],
        ['Fairfield', 'California'],
        ['Fontana', 'California'],
        ['Fremont', 'California'],
        ['Fresno', 'California'],
        ['Fullerton', 'California'],
        ['Garden Grove', 'California'],
        ['Glendale', 'California'],
        ['Hayward', 'California'],
        ['Huntington Beach', 'California'],
        ['Inglewood', 'California'],
        ['Irvine', 'California'],
        ['Jurupa Valley', 'California'],
        ['Lancaster', 'California'],
        ['Long Beach', 'California'],
        ['Los Angeles', 'California'],
        ['Modesto', 'California'],
        ['Moreno Valley', 'California'],
        ['Murrieta', 'California'],
        ['Norwalk', 'California'],
        ['Oakland', 'California'],
        ['Oceanside', 'California'],
        ['Ontario', 'California'],
        ['Orange', 'California'],
        ['Oxnard', 'California'],
        ['Palmdale', 'California'],
        ['Pasadena', 'California'],
        ['Pomona', 'California'],
        ['Rancho Cucamonga', 'California'],
        ['Rialto', 'California'],
        ['Richmond', 'California'],
        ['Riverside', 'California'],
        ['Roseville', 'California'],
        ['Sacramento', 'California'],
        ['Salinas', 'California'],
        ['San Bernardino', 'California'],
        ['San Diego', 'California'],
        ['San Francisco', 'California'],
        ['San Jose', 'California'],
        ['San Mateo', 'California'],
        ['Santa Ana', 'California'],
        ['Santa Clara', 'California'],
        ['Santa Clarita', 'California'],
        ['Santa Maria', 'California'],
        ['Santa Rosa', 'California'],
        ['Simi Valley', 'California'],
        ['Stockton', 'California'],
        ['Sunnyvale', 'California'],
        ['Temecula', 'California'],
        ['Thousand Oaks', 'California'],
        ['Torrance', 'California'],
        ['Vallejo', 'California'],
        ['Ventura', 'California'],
        ['Victorville', 'California'],
        ['Visalia', 'California'],
        ['Vista', 'California'],
        ['West Covina', 'California'],
        ['Arvada', 'Colorado'],
        ['Aurora', 'Colorado'],
        ['Boulder', 'Colorado'],
        ['Centennial', 'Colorado'],
        ['Colorado Springs', 'Colorado'],
        ['Denver', 'Colorado'],
        ['Fort Collins', 'Colorado'],
        ['Greeley', 'Colorado'],
        ['Lakewood', 'Colorado'],
        ['Pueblo', 'Colorado'],
        ['Thornton', 'Colorado'],
        ['Westminster', 'Colorado'],
        ['Bridgeport', 'Connecticut'],
        ['Hartford', 'Connecticut'],
        ['New Haven', 'Connecticut'],
        ['Stamford', 'Connecticut'],
        ['Waterbury', 'Connecticut'],
        ['Washington', 'District of Columbia'],
        ['Cape Coral', 'Florida'],
        ['Clearwater', 'Florida'],
        ['Coral Springs', 'Florida'],
        ['Davie', 'Florida'],
        ['Fort Lauderdale', 'Florida'],
        ['Gainesville', 'Florida'],
        ['Hialeah', 'Florida'],
        ['Hollywood', 'Florida'],
        ['Jacksonville', 'Florida'],
        ['Lakeland', 'Florida'],
        ['Miami', 'Florida'],
        ['Miami Gardens', 'Florida'],
        ['Miramar', 'Florida'],
        ['Orlando', 'Florida'],
        ['Palm Bay', 'Florida'],
        ['Pembroke Pines', 'Florida'],
        ['Pompano Beach', 'Florida'],
        ['Port St. Lucie', 'Florida'],
        ['St. Petersburg', 'Florida'],
        ['Tallahassee', 'Florida'],
        ['Tampa', 'Florida'],
        ['West Palm Beach', 'Florida'],
        ['Athens', 'Georgia'],
        ['Atlanta', 'Georgia'],
        ['Augusta', 'Georgia'],
        ['Columbus', 'Georgia'],
        ['Macon', 'Georgia'],
        ['Sandy Springs', 'Georgia'],
        ['Savannah', 'Georgia'],
        ['Honolulu', 'Hawaii'],
        ['Boise', 'Idaho'],
        ['Aurora', 'Illinois'],
        ['Chicago', 'Illinois'],
        ['Elgin', 'Illinois'],
        ['Joliet', 'Illinois'],
        ['Naperville', 'Illinois'],
        ['Peoria', 'Illinois'],
        ['Rockford', 'Illinois'],
        ['Springfield', 'Illinois'],
        ['Evansville', 'Indiana'],
        ['Fort Wayne', 'Indiana'],
        ['Indianapolis', 'Indiana'],
        ['South Bend', 'Indiana'],
        ['Cedar Rapids', 'Iowa'],
        ['Davenport', 'Iowa'],
        ['Des Moines', 'Iowa'],
        ['Kansas City', 'Kansas'],
        ['Olathe', 'Kansas'],
        ['Overland Park', 'Kansas'],
        ['Topeka', 'Kansas'],
        ['Wichita', 'Kansas'],
        ['Lexington', 'Kentucky'],
        ['Louisville', 'Kentucky'],
        ['Baton Rouge', 'Louisiana'],
        ['Lafayette', 'Louisiana'],
        ['New Orleans', 'Louisiana'],
        ['Shreveport', 'Louisiana'],
        ['Baltimore', 'Maryland'],
        ['Boston', 'Massachusetts'],
        ['Cambridge', 'Massachusetts'],
        ['Lowell', 'Massachusetts'],
        ['Springfield', 'Massachusetts'],
        ['Worcester', 'Massachusetts'],
        ['Ann Arbor', 'Michigan'],
        ['Clinton', 'Michigan'],
        ['Detroit', 'Michigan'],
        ['Grand Rapids', 'Michigan'],
        ['Lansing', 'Michigan'],
        ['Sterling Heights', 'Michigan'],
        ['Warren', 'Michigan'],
        ['Minneapolis', 'Minnesota'],
        ['Rochester', 'Minnesota'],
        ['Saint Paul', 'Minnesota'],
        ['Jackson', 'Mississippi'],
        ['Columbia', 'Missouri'],
        ['Independence', 'Missouri'],
        ['Kansas City', 'Missouri'],
        ['Springfield', 'Missouri'],
        ['St. Louis', 'Missouri'],
        ['Billings', 'Montana'],
        ['Lincoln', 'Nebraska'],
        ['Omaha', 'Nebraska'],
        ['Henderson', 'Nevada'],
        ['Las Vegas', 'Nevada'],
        ['North Las Vegas', 'Nevada'],
        ['Reno', 'Nevada'],
        ['Manchester', 'New Hampshire'],
        ['Edison', 'New Jersey'],
        ['Elizabeth', 'New Jersey'],
        ['Jersey City', 'New Jersey'],
        ['Lakewood', 'New Jersey'],
        ['Newark', 'New Jersey'],
        ['Paterson', 'New Jersey'],
        ['Woodbridge', 'New Jersey'],
        ['Albuquerque', 'New Mexico'],
        ['Las Cruces', 'New Mexico'],
        ['Buffalo', 'New York'],
        ['New York', 'New York'],
        ['Rochester', 'New York'],
        ['Syracuse', 'New York'],
        ['Yonkers', 'New York'],
        ['Cary', 'North Carolina'],
        ['Charlotte', 'North Carolina'],
        ['Durham', 'North Carolina'],
        ['Fayetteville', 'North Carolina'],
        ['Greensboro', 'North Carolina'],
        ['High Point', 'North Carolina'],
        ['Raleigh', 'North Carolina'],
        ['Wilmington', 'North Carolina'],
        ['Winston–Salem', 'North Carolina'],
        ['Fargo', 'North Dakota'],
        ['Akron', 'Ohio'],
        ['Cincinnati', 'Ohio'],
        ['Cleveland', 'Ohio'],
        ['Columbus', 'Ohio'],
        ['Dayton', 'Ohio'],
        ['Toledo', 'Ohio'],
        ['Broken Arrow', 'Oklahoma'],
        ['Norman', 'Oklahoma'],
        ['Oklahoma City', 'Oklahoma'],
        ['Tulsa', 'Oklahoma'],
        ['Eugene', 'Oregon'],
        ['Gresham', 'Oregon'],
        ['Hillsboro', 'Oregon'],
        ['Portland', 'Oregon'],
        ['Salem', 'Oregon'],
        ['Allentown', 'Pennsylvania'],
        ['Philadelphia', 'Pennsylvania'],
        ['Pittsburgh', 'Pennsylvania'],
        ['Providence', 'Rhode Island'],
        ['Charleston', 'South Carolina'],
        ['Columbia', 'South Carolina'],
        ['North Charleston', 'South Carolina'],
        ['Sioux Falls', 'South Dakota'],
        ['Chattanooga', 'Tennessee'],
        ['Clarksville', 'Tennessee'],
        ['Knoxville', 'Tennessee'],
        ['Memphis', 'Tennessee'],
        ['Murfreesboro', 'Tennessee'],
        ['Nashville', 'Tennessee'],
        ['Abilene', 'Texas'],
        ['Amarillo', 'Texas'],
        ['Arlington', 'Texas'],
        ['Austin', 'Texas'],
        ['Beaumont', 'Texas'],
        ['Brownsville', 'Texas'],
        ['Carrollton', 'Texas'],
        ['College Station', 'Texas'],
        ['Corpus Christi', 'Texas'],
        ['Dallas', 'Texas'],
        ['Denton', 'Texas'],
        ['El Paso', 'Texas'],
        ['Fort Worth', 'Texas'],
        ['Frisco', 'Texas'],
        ['Garland', 'Texas'],
        ['Grand Prairie', 'Texas'],
        ['Houston', 'Texas'],
        ['Irving', 'Texas'],
        ['Killeen', 'Texas'],
        ['Laredo', 'Texas'],
        ['League City', 'Texas'],
        ['Lewisville', 'Texas'],
        ['Lubbock', 'Texas'],
        ['McAllen', 'Texas'],
        ['McKinney', 'Texas'],
        ['Mesquite', 'Texas'],
        ['Midland', 'Texas'],
        ['Odessa', 'Texas'],
        ['Pasadena', 'Texas'],
        ['Pearland', 'Texas'],
        ['Plano', 'Texas'],
        ['Richardson', 'Texas'],
        ['Round Rock', 'Texas'],
        ['San Angelo', 'Texas'],
        ['San Antonio', 'Texas'],
        ['Tyler', 'Texas'],
        ['Waco', 'Texas'],
        ['Wichita Falls', 'Texas'],
        ['Provo', 'Utah'],
        ['Salt Lake City', 'Utah'],
        ['West Jordan', 'Utah'],
        ['West Valley City', 'Utah'],
        ['Alexandria', 'Virginia'],
        ['Chesapeake', 'Virginia'],
        ['Hampton', 'Virginia'],
        ['Newport News', 'Virginia'],
        ['Norfolk', 'Virginia'],
        ['Richmond', 'Virginia'],
        ['Virginia Beach', 'Virginia'],
        ['Bellevue', 'Washington'],
        ['Everett', 'Washington'],
        ['Kent', 'Washington'],
        ['Renton', 'Washington'],
        ['Seattle', 'Washington'],
        ['Spokane', 'Washington'],
        ['Tacoma', 'Washington'],
        ['Vancouver', 'Washington'],
        ['Green Bay', 'Wisconsin'],
        ['Madison', 'Wisconsin'],
        ['Milwaukee', 'Wisconsin']];

})();
