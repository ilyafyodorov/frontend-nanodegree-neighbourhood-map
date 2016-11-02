function init() {

//  APPLICATION DATA INITIALIZATION - PRE-SET INFORMATION

    var allLocations = [
            {
                name : 'Krom fortress',
                flickrSearchString: 'псков%20кремль',
                imgSrc : '',
                imgAttribution : '',
                latlng : {lat: 57.824098, lng: 28.327088},
            },
            {
                name : 'Trinity Cathedral',
                flickrSearchString: 'trinity%20pskov',
                imgSrc : '',
                imgAttribution : '',
                latlng : {lat: 57.822072, lng: 28.329144},
            },
            {
                name : 'Ice Battle Monument',
                flickrSearchString: 'ice%20battle%20pskov',
                imgSrc : '',
                imgAttribution : '',
                latlng : {lat: 57.847602, lng: 28.270506},
            },
            {
                name : 'Holy Transfiguration Mirozh Monastery',
                flickrSearchString: 'Спасо-Мирожский%20монастырь.%20Псков',
                imgSrc : '',
                imgAttribution : '',
                latlng : {lat: 57.806854, lng: 28.328652},
            },
            {
                name : 'Monument to Princess Olga',
                flickrSearchString: 'памятник%20княгине%20ольге%20псков',
                imgSrc : '',
                imgAttribution : '',
                latlng : {lat: 57.816232, lng: 28.334807},
            },
            {
                name : 'Olginskaya Chapel',
                flickrSearchString: 'ольгинская%20часовня',
                imgSrc : '',
                imgAttribution : '',
                latlng : {lat: 57.820001, lng: 28.324984},
            },
            {
                name : 'Alexander Nevskiy Cathedral',
                flickrSearchString: 'храм%20александра%20невского',
                imgSrc : '',
                imgAttribution : '',
                latlng : {lat: 57.807841, lng: 28.321275},
            },
            {
                name : 'Proloma Church',
                flickrSearchString: 'церковь%20пролома',
                imgSrc : '',
                imgAttribution : '',
                latlng : {lat: 57.805269, lng: 28.334017},
            },
            {
                name : 'Basil Church on the Hill',
                flickrSearchString: 'церковь%20василия%20псков',
                imgSrc : '',
                imgAttribution : '',
                latlng : {lat: 57.815271, lng: 28.335788},
            },
            {
                name : 'Gremyachaya Tower',
                flickrSearchString: 'Псков.%20Гремячая%20башня',
                imgSrc : '',
                imgAttribution : '',
                latlng : {lat: 57.823411, lng: 28.347780},
            },
            {
                name : 'Temple of Assumption',
                flickrSearchString: 'успения%20богородицы%20псков',
                imgSrc : '',
                imgAttribution : '',
                latlng : {lat: 57.817890, lng: 28.308747},
            },
            {
                name : 'Church of the Epiphany',
                flickrSearchString: 'Церковь Богоявления в Запсковье',
                imgSrc : '',
                imgAttribution : '',
                latlng : {lat: 57.821998, lng: 28.334581},
            },
            {
                name : 'Prikaznye Chambers',
                flickrSearchString: 'Приказные%20палаты%20(16%20век)',
                imgSrc : '',
                imgAttribution : '',
                latlng : {lat: 57.820175, lng: 28.330228},
            },
            {
                name : 'Saint George Church',
                flickrSearchString: 'георгия%20псков',
                imgSrc : '',
                imgAttribution : '',
                latlng : {lat: 57.809907, lng: 28.332432},
            },
            {
                name : 'Menshikov Chambers',
                flickrSearchString: 'палаты%20меньшикова',
                imgSrc : '',
                imgAttribution : '',
                latlng : {lat: 57.812303, lng: 28.335181},
            },
            {
                name : 'Merchant Pechenko House',
                flickrSearchString: 'pechenko house',
                imgSrc : '',
                imgAttribution : '',
                latlng : {lat: 57.819669, lng: 28.348716},
            },
            {
                name : 'Pogankin Chambers',
                flickrSearchString: '71%20Поганкины%20палаты',
                imgSrc : '',
                imgAttribution : '',
                latlng : {lat: 57.811352, lng: 28.337466},
            },
            {
                name : 'Podznoev Chambers',
                flickrSearchString: 'двор подзноев',
                imgSrc : '',
                imgAttribution : '',
                latlng : {lat: 57.810885, lng: 28.337029},
            },
        ];


    // Flickr API URL for search requests
    flickrURL='https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=756d2646bbf50cde087d43bb80dd3696&format=json&nojsoncallback=1&text='

//  KNOCKOUT - BASED MV* APPLICATION STARTS HERE

//  Definition of Model object - Location

    var Location = function(data) {
        this.name = ko.observable(data.name);
        this.imgSrc = ko.observable(data.imgSrc);
        this.imgAttribution = ko.observable(data.imgAttribution);
        this.latlng = ko.observable(data.latlng);
        this.flickrSearchString = ko.observable(data.flickrSearchString);
        this.filtered = ko.observable(true);
    };

//  Definition of View Model

    var ViewModel = function() {

        var that = this;

        //Define and fill in the Model from stored data set

        this.locationList = ko.observableArray([]);

        allLocations.forEach(function(locItem){

            that.locationList.push(new Location(locItem));

        });

        this.currentLocation = ko.observable(this.locationList()[0]);

        //Create ViewModel objects based on Model data

        //Map object as a part of ViewModel
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 57.816486, lng: 28.343647},
            zoom: 16
        });

        //InfoWindow object as a part of ViewModel
        this.largeInfowindow = new google.maps.InfoWindow();
        // This function populates the infowindow when the marker is clicked. We'll only allow
        // one infowindow which will open at the marker that is clicked, and populate based
        // on that markers position.
        //InfoWindow population function as a part of ViewModel
        this.populateInfoWindow = function(marker, infowindow, imgSrc, imgAtt) {
            infowindow.marker = marker;
            infowindow.setContent('<div>' + marker.title + '</div>'+'<img style="height:20vh" src="'+imgSrc+'" alt="Pskov">'+'<p><a href="'+imgAtt+'">Flickr source</a></p>');
            infowindow.open(that.map, marker);
        };

        //Bounds object as a part of ViewModel
        this.bounds = new google.maps.LatLngBounds();


        //Location switch processing
        this.switchLocation = function(locationListItem) {
            that.currentLocation(locationListItem);
            //find current marker and make it green
            that.markerArray.forEach(function(marker){
               if(marker.title == that.currentLocation().name()) {
                    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
                    var thisMarker=marker;

                    //open infovindow with spinner and default text
                    that.populateInfoWindow(thisMarker, that.largeInfowindow, 'css/spinner.gif', '#')

                    //perform Flickr search for location
                    //send request
                    $.ajax({
                        url: flickrURL+that.currentLocation().flickrSearchString(),
                        async: true,
                        dataType: 'json',

                        success:function(data){
                            var imgSrc;
                            var imgAttribution;
                            //Parse responce
                            //Create image link and attribution if images were returned
                            if(data.photos.total>0) {
                                var far=data.photos.photo[0].farm.toString();
                                var id=data.photos.photo[0].id;
                                var sec=data.photos.photo[0].secret;
                                var ser=data.photos.photo[0].server;
                                var own=data.photos.photo[0].owner;
                                imgSrc='https://c2.staticflickr.com/'+far+'/'+ser+'/'+id+'_'+sec+'_z.jpg';
                                imgAttribution='https://www.flickr.com/photos/'+own+'/';
                            } else {
                                //if Flickr could not find pictures
                                imgSrc='img/noimage.png';
                                imgAttribution='#';
                            };
                            //update infowindow with flickr data
                            that.populateInfoWindow(thisMarker, that.largeInfowindow, imgSrc, imgAttribution)
                        },

                        error:function(){

                            //update infowindow with "no flickr" picture
                            that.populateInfoWindow(thisMarker, that.largeInfowindow, 'img/noflickr.png', '#')

                        }
                    });

               } else {
                   marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
               }
            });
        };


        //Marker array object as a part of ViewModel
        this.markerArray = [];

        //function - display markers based on filter
        this.displayFilteredMarkers = function(){

            //clear any previous marker data
            for (var i = 0; i < that.markerArray.length; i++) {
                that.markerArray[i].setMap(null);
            }
            that.markerArray = [];


            //Fill in marker array using Model data
            that.locationList().forEach(function(locItem){

                //add marker only if location is filtered
                if (locItem.filtered()==true) {

                    that.markerArray.push(new google.maps.Marker({
                        position: locItem.latlng(),
                        map: that.map,
                        title: locItem.name(),
                        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                    }));

                    // Create an onclick event to open an infowindow at each marker and change its color to green

                    that.markerArray[that.markerArray.length-1].addListener('click', function() {that.switchLocation(locItem)});

                    that.bounds.extend(that.markerArray[that.markerArray.length-1].position);

                }

            });

            //Update map bounds after adding all markers
            that.map.fitBounds(this.bounds);
        };

        //Function to filter markers according to user input
        this.doFiltering = function(formElement) {
            //get filter value from the form
            var filterValue=formElement[0].value;
            var index;
            //for each list item
            that.locationList().forEach(function(locItem){
                //Case-insensitive search within list item name
                var index = locItem.name().search(new RegExp(filterValue, "i"));
                if (index != -1) {
                    locItem.filtered(true);
                } else {
                    locItem.filtered(false);
                }
            });

            this.displayFilteredMarkers();

        }

        this.displayFilteredMarkers();

    };
    //Initialize knockout
    ko.applyBindings(new ViewModel());

}