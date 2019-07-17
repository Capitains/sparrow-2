'use strict';


class Resolver {

	constructor(uri) {
		this.name = "dtsResolver";
		this.uri = new URL(uri);

		this.documentRoute = null;
		this.collectionRoute = null;
		this.navigationRoute = null;

		this.ready = this.getEntryPoints();

		// collections?id=@id of the member
	}

	async getEntryPoints() {
		let that = this;

		fetch(
			this.uri
		).then(
		    function(response) {
		      if (response.status !== 200) {
		      	throw "The URI of the API seems to be wrong";
		        return;
		      }

		      // Examine the text in the response
		      response.json().then(function(data) {
				that.documentRoute = data.hasOwnProperty("documents") ? new URI(data["document"], that.uri) : null;
				that.collectionRoute = data.hasOwnProperty("collections") ? new URI(data["collection"], that.uri) : null;
				that.navigationRoute = data.hasOwnProperty("navigation") ? new URI(data["navigation"], that.uri) : null;
		      });
		    }
	  )
	  .catch(function(err) {
	    console.log(err);
	    throw  "There was an error contacting the service";
	  });
	}

	async getCollection(id=null, page=1, nav="children") {
		await this.ready;
		var that = this;
		fetch(that.collectionRoute)
	   .then(
	    function(response) {
	      if (response.status !== 200) {
	        console.log('Looks like there was a problem. Status Code: ' +
	          response.status);
	        return;
	      }

	      // Examine the text in the response
	      response.json().then(function(data) {
	        console.log(data);
	      });
	    }
	  )
	  .catch(function(err) {
	    console.log('Fetch Error :-S', err);
	  });

	}

}