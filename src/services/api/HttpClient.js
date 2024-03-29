export class HttpClient {
	//field
	_action = '';
	_strUrl = '';

	//methods

	async fetchData() {
		debugger
		const res = await fetch(this._strUrl);
		if (res.ok) {
			const data = await res.json();
			return data;
		}
		return '';

	}

	async getDataList(url) {
		debugger
		this._strUrl = url;
		const data = await this.fetchData(url);

		if (data) {
			return data;
		}
		throw new Error("no get  data json,retry !");

	}













}