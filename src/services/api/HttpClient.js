export class HttpClient {
	//field
	_action = '';
	_strUrl = '';

	//methods

	async fetchData() {

		const res = await fetch(this._strUrl);
		if (res.ok) {
			const data = await res.json();
			console.log('data: ', data);
			return data;
		}
		return '';

	}

	async getDataList(url) {

		this._strUrl = url;
		const data = await this.fetchData(url);

		if (data) {
			return data;
		}
		throw new Error("no get  data json,retry !");

	}













}