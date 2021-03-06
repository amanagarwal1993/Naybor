# Naybor
Naybor is an app used to search for hotels in any city which meet **one** major criteria: *how near they are to a particular amenity (such as a convenience store, a subway station, etc)*.

For example, you may say "Find me all the hotels in *Paris* that have a *supermarket* within *20 metres*." This crude little app will allow you to make queries like these.

## How to use the app
Download the repository. Open scopetry.html in a browser (the weird name of this file is a long story). Type in the name of the city, choose one amenity name and then specify the number of meters (eg 100, 50) from the hotel within which you need the amenity. Wait for 10-12 seconds till the results load, and then see the magic!

## Usage
##### APIs and Frameworks
The app was written in **AngularJs**. For fetching locations, it uses **Overpass API**, which uses OpenStreetMaps data. It then displays them on a map created using **Google Maps API**.

##### How the code works
The code takes 3 form inputs: *city*, *name of amenity* and *distance*. Then it creates a small string which follows the Overpass API query syntax, in the variable named `request`.

The code sends the http `request` to the Overpass API, and stores the data into two arrays:
* `spots` stores the name of the hotels
*  `locations` stores the latitude and longitude values of the hotels.

After this, the front-end uses an `ng-repeat` to display a list of all hotel names (taken from `spots`). Underneath it, it also renders a map with pin marks to the locations of all those hotels (taken from `locations`).

## License
[GNU General Public License](http://choosealicense.com/licenses/gpl-3.0/#)

I wrote this README using [Dillinger.io](http://dillinger.io) Markdown editor. Great tool!
