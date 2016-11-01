function init() {

//  APPLICATION DATA INITIALIZATION - PRE-SET INFORMATION

    var allLocations = [
            {
                name : 'Krom fortress',
                flickrSearchString: 'pskov%20krom',
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
                latlng : {lat: 57.830768, lng: 28.319158},
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
                flickrSearchString: 'Greatness%20of%20Trinity%20Cathedral',                
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

//  APPLICATION DATA INITIALIZATION - GET PHOTOS FROM FLICKR
    
    //counter to check that all content was loaded
    var counter = 0;
    
    //Preparation: get Flickr photos of sights using flickr image search API
    //Loop over locations
        
    getFlickrData = function()
    {
        //Create search string
        flickrURL='https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=756d2646bbf50cde087d43bb80dd3696&format=json&nojsoncallback=1&text='+allLocations[counter].flickrSearchString;
        //send request
        $.ajax({
            url: flickrURL,
            async: true,
            dataType: 'json',
            success:function(data){
                counter++;

                //Parse responce
                //Create image link and attribution if images were returned
                if(data.photos.total>0) {
                    var far=data.photos.photo[0].farm.toString();
                    var id=data.photos.photo[0].id;
                    var sec=data.photos.photo[0].secret;
                    var ser=data.photos.photo[0].server;
                    var own=data.photos.photo[0].owner;
                    allLocations[counter-1].imgSrc='https://c2.staticflickr.com/'+far+'/'+ser+'/'+id+'_'+sec+'_z.jpg';
                    allLocations[counter-1].imgAttribution='https://www.flickr.com/photos/'+own+'/';
                } else {
                    allLocations[counter-1].imgSrc='img/noimage.png';
                    allLocations[counter-1].imgAttribution='#';
                };

                if (counter > 17) {
                    initializeKnockout();
                } else {
                    getFlickrData();
                };
                    
            },
            fail:function(data){
                alert('could not connect to Flickr');
                initializeKnockout();
            }        
        });

    
    };
    
    getFlickrData();

//  KNOCKOUT - BASED MV* APPLICATION STARTS HERE


//  Definition of Model object - Location
    
    var Location = function(data) {
        this.name = ko.observable(data.name);
        this.imgSrc = ko.observable(data.imgSrc);
        this.imgAttribution = ko.observable(data.imgAttribution);
        this.latlng = ko.observable(data.latlng);
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
            infowindow.setContent('<div>' + marker.title + '</div>'+'<img style="height:20vh" src="'+imgSrc+'" alt="Pskov">'+'<p><a href="'+imgAtt+'">Photo source</a></p>');
            infowindow.open(that.map, marker);
        };

        //Bounds object as a part of ViewModel        
        this.bounds = new google.maps.LatLngBounds();        
        //Marker array object as a part of ViewModel        
        this.markerArray = [];

        //Location switch processing
        this.switchLocation = function(locationListItem) {
            that.currentLocation(locationListItem);    
            //find current marker and make it green
            that.markerArray.forEach(function(marker){
               if(marker.title == that.currentLocation().name()) {
                   marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
                   that.populateInfoWindow(marker, that.largeInfowindow, that.currentLocation().imgSrc(), that.currentLocation().imgAttribution())
               } else {
                   marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');               
               }
            });
        };        

        //Fill in marker array using Model data
        this.locationList().forEach(function(locItem){
        
            that.markerArray.push(new google.maps.Marker({
                position: locItem.latlng(),
                map: that.map,
                title: locItem.name(),
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            }));
            
            // Create an onclick event to open an infowindow at each marker and change its color to green
            
            that.markerArray[that.markerArray.length-1].addListener('click', function() {that.switchLocation(locItem)});
            
            /*that.markerArray[that.markerArray.length-1].addListener('click', function() {
                that.markerArray.forEach(function(marker){
                    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
                });
                that.populateInfoWindow(this, that.largeInfowindow, locItem.imgSrc(), locItem.imgAttribution());
                this.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
            });*/
            
            
            that.bounds.extend(that.markerArray[that.markerArray.length-1].position);

        });
        
        //Update map bounds after adding all markers
        this.map.fitBounds(this.bounds);

    };

    //Initialize knockout
    function initializeKnockout() {
        $( ".cover" ).hide();
        ko.applyBindings(new ViewModel());
    };
    
}