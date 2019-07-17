import { Collection } from './collection.js';
import { Document } from "./document.js";
import { Navigation, NavigationGroup } from "./navigation.js";

'use strict';


export class dtsResolver {

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
		await fetch(this.uri).then(
			async response => {
				if (response.status !== 200) {
					throw "The URI of the API seems to be wrong";
				}

				// Examine the text in the response
				const data = await response.json();

				that.documentRoute = "documents" in data
					? new URL(data["documents"], that.uri) : null;
				that.collectionRoute = "collections" in data
					? new URL(data["collections"], that.uri) : null;
				that.navigationRoute = "navigation" in data
					? new URL(data["navigation"], that.uri) : null;

			}
		).catch(function(err) {
				console.log(err);
				throw  "There was an error contacting the service";
		});
	}

	async getCollection(id=undefined, page=1, nav="children") {
		// Need to be sure the endpoints are known
		await this.ready;

		const route = id !== undefined ?
			new URL( "?id=" + id, this.collectionRoute) : this.collectionRoute.href;

		return await dtsResolver.getCollectionAt(route, this, id, page, nav)

	}

	async getDocument(id=undefined, ref=undefined, mimetype="application/tei+xml") {
		// Need to be sure the endpoints are known
		await this.ready;
		const that = this;

		if (that.documentRoute === undefined) {
			throw "This endpoint has no document route";
		}

		const route = id !== undefined ?
			new URL( "?id=" + id, that.documentRoute) : that.documentRoute;

		return await dtsResolver.getDocumentAt(
			route.href,
			that,
			id,
			ref,
			mimetype
		);

	}

	async getNavigation(id, ref, level=1) {
		// Need to be sure the endpoints are known
		await this.ready;

		const route = id !== undefined ?
			new URL( "?id=" + id, this.navigationRoute) : this.navigationRoute;

		return await dtsResolver.getNavigationAt(route.href, this, id, ref, level)

	}

	static async getDocumentAt(route, resolver, id, ref, mimetype) {
		/***
		 *  This function is a different function that .getDocument and is reused by it
		 *  simply because a document can be found in another DTS API and we should not trust
		 *  the original resolver to have this document;
		 */

		return await fetch(route).then(async response => {
	      if (response.status !== 200) {
	        throw 'Looks like there was a problem. Status Code: '+ response.status;
	      }

	      const data = await response.text();
	      // Examine the text in the response
		  return new Document(id, resolver, data, ref);
	    }
	  )
	  .catch(function(err) {
	    console.log('Fetch Error :-S', err);
	    throw err;
	  });
	}

	static async getCollectionAt(route, resolver, id, page=1, nav="children") {
		return await fetch(route).then(async response => {
	      if (response.status !== 200) {
	        throw 'Looks like there was a problem. Status Code: '+ response.status;
	      }

	      const data = await response.json();
	      // Examine the text in the response
		  return new Collection(data, resolver);
	    }
	  )
	  .catch(function(err) {
	    console.log('Fetch Error :-S', err);
	    throw err;
	  });
	}

	static async getNavigationAt(route, resolver, id, ref, level=1) {
		return await fetch(route).then(async response => {
	      if (response.status !== 200) {
	        throw 'Looks like there was a problem. Status Code: '+ response.status;
	      }

	      const data = await response.json();
	      // Examine the text in the response
		  return new NavigationGroup(id, resolver, data, ref);
	    }
	  )
	  .catch(function(err) {
	    console.log('Fetch Error :-S', err);
	    throw err;
	  });
	}

}