function init() {
    var allLocations = [
            {
                name : 'Krom fortress',
                imgSrc : 'img/1.jpg',
                imgAttribution : 'http://www.photosight.ru/photos/3460101/',
                latlng : {lat: 57.824098, lng: 28.327088},
            },
            {
                name : 'Trinity Cathedral',
                imgSrc : 'img/2.jpg',
                imgAttribution : 'http://bookingpskov.ru/upload/information_system_18/1/7/1/item_171/information_items_171.jpg',
                latlng : {lat: 57.822072, lng: 28.329144},                
            },
            {
                name : 'Ice Battle Monument',
                imgSrc : 'img/3.jpg',
                imgAttribution : 'http://fun-for-us.ru/img.php?url=http://cs7011.vk.me/v7011024/64e6/qLWTNmrK2dI.jpg',
                latlng : {lat: 57.830768, lng: 28.319158},
            },
            {
                name : 'Holy Transfiguration Mirozh Monastery',
                imgSrc : 'img/4.jpg',
                imgAttribution : 'http://altertravel.ru/images/3791.jpg',
                latlng : {lat: 57.806854, lng: 28.328652},
            },
            {
                name : 'Monument to Princess Olga',
                imgSrc : 'img/5.jpg',
                imgAttribution : 'http://img1.liveinternet.ru/images/attach/c/6/92/646/92646727_2.jpg',
                latlng : {lat: 57.816232, lng: 28.334807},
            },
            {
                name : 'Olginskaya Chapel',
                imgSrc : 'img/6.jpg',
                imgAttribution : 'http://static.panoramio.com/photos/large/110141514.jpg',
                latlng : {lat: 57.820001, lng: 28.324984},
            },
            {
                name : 'Alexander Nevskiy Cathedral',
                imgSrc : 'img/7.jpg',
                imgAttribution : 'http://s4.fotokto.ru/photo/full/266/2662987.jpg',
                latlng : {lat: 57.807841, lng: 28.321275},
            },
            {
                name : 'Proloma Church',
                imgSrc : 'img/8.jpg',
                imgAttribution : 'http://photos.wikimapia.org/p/00/00/17/96/18_big.jpg',
                latlng : {lat: 57.805269, lng: 28.334017},
            },            
            {
                name : 'Basil Church on the Hill',
                imgSrc : 'img/9.jpg',
                imgAttribution : 'http://sobory.ru/pic/00250/00261_20141028_221825.jpg',
                latlng : {lat: 57.815271, lng: 28.335788},
            },
            {
                name : 'Gremyachaya Tower',
                imgSrc : 'img/10.jpg',
                imgAttribution : 'http://static.panoramio.com/photos/large/74952837.jpg',
                latlng : {lat: 57.823411, lng: 28.347780},
            },         
            {
                name : 'Temple of Assumption',
                imgSrc : 'img/11.jpg',
                imgAttribution : 'http://sobory.ru/pic/00250/00263_20140409_201453.jpg',
                latlng : {lat: 57.817890, lng: 28.308747},
            },         
            {
                name : 'Church of the Epiphany',
                imgSrc : 'img/12.jpg',
                imgAttribution : 'http://sobory.ru/pic/01900/01934_20120802_223719.jpg',
                latlng : {lat: 57.821998, lng: 28.334581},
            },     
            {
                name : 'Prikaznye Chambers',
                imgSrc : 'img/13.jpg',
                imgAttribution : 'http://img.tourister.ru/files/8/7/8/4/3/8/5/original.jpg',
                latlng : {lat: 57.820175, lng: 28.330228},
            },            
            {
                name : 'Saint George Church',
                imgSrc : 'img/14.jpg',
                imgAttribution : 'http://sobory.ru/pic/00500/00508_20141224_230136.jpg',
                latlng : {lat: 57.809907, lng: 28.332432},
            },   
            {
                name : 'Menshikov Chambers',
                imgSrc : 'img/15.jpg',
                imgAttribution : 'https://walencienne.files.wordpress.com/2012/03/img_1976-lt.jpg',
                latlng : {lat: 57.812303, lng: 28.335181},
            },         
            {
                name : 'Merchant Pechenko House',
                imgSrc : 'img/16.jpg',
                imgAttribution : 'https://walencienne.files.wordpress.com/2013/06/img_1515-lt.jpg',
                latlng : {lat: 57.819669, lng: 28.348716},
            },
            {
                name : 'Pogankin Chambers',
                imgSrc : 'img/17.jpg',
                imgAttribution : 'http://img.tourbina.ru/photos.3/1/6/169516/big.photo.jpg',
                latlng : {lat: 57.811352, lng: 28.337466},
            },
            {
                name : 'Podznoev Chambers',
                imgSrc : 'img/18.jpg',
                imgAttribution : 'http://www.nat-geo.ru/upload/iblock/40b/40beeddc38a3ec1fb89c28a692e2e75d.jpg',
                latlng : {lat: 57.810885, lng: 28.337029},
            },            
        ];

    var Location = function(data) {
        this.name = ko.observable(data.name);
        this.imgSrc = ko.observable(data.imgSrc);
        this.imgAttribution = ko.observable(data.imgAttribution);
        this.latlng = ko.observable(data.latlng);
    };


    var ViewModel = function() {
 
        var that = this;    
        
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 57.816486, lng: 28.343647},
            zoom: 16
        });
        this.largeInfowindow = new google.maps.InfoWindow();
        // This function populates the infowindow when the marker is clicked. We'll only allow
        // one infowindow which will open at the marker that is clicked, and populate based
        // on that markers position.
        this.populateInfoWindow = function(marker, infowindow) {
          // Check to make sure the infowindow is not already opened on this marker.
          if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.setContent('<div>' + marker.title + '</div>');
            infowindow.open(map, marker);

          }
        };


        this.bounds = new google.maps.LatLngBounds();        

        this.markerArray = [];
            
        //Define and fill in the Model from stored data set
        
        this.locationList = ko.observableArray([]);
        
        allLocations.forEach(function(locItem){

            that.locationList.push(new Location(locItem));
            
        });

        this.currentLocation = ko.observable(this.locationList()[0]);
        
        //Create ViewModel objects based on Model data

        this.locationList().forEach(function(locItem){
        
            that.markerArray.push(new google.maps.Marker({
                position: locItem.latlng(),
                map: that.map,
                title: locItem.name(),
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            }));
            // Create an onclick event to open an infowindow at each marker and change its color to green
            that.markerArray[that.markerArray.length-1].addListener('click', function() {
                that.markerArray.forEach(function(marker){
                    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
                });
                that.populateInfoWindow(this, that.largeInfowindow);
                this.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
            });
            that.bounds.extend(that.markerArray[that.markerArray.length-1].position);

        });
        
        this.map.fitBounds(this.bounds);
        
        this.switchLocation = function(locationListItem) {
            that.currentLocation(locationListItem);    
            //find current marker and make it green
            that.markerArray.forEach(function(marker){
               if(marker.title == that.currentLocation().name()) {
                   marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
                   that.populateInfoWindow(marker, that.largeInfowindow)
               } else {
                   marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');               
               }
            });
        };

    };

    ko.applyBindings(new ViewModel());
    
}