import AbstractView from "./AbstractView.js";
import { navigateTo } from "../js/router.js";

export default class Profile extends AbstractView {
	constructor() {
		super();
		this.setTitle("Profile");
	}

	async getHTML() {
		return `
            <h1>Hello</h1
        `;
	}

	async render() {
		const jwt = localStorage.getItem("jwt");
		if (!jwt) {
			console.log("Go to connect first");
			navigateTo("/");
			return;
		}
		document.setTitle = "Profile";
		const container = document.getElementById("app");
		container.innerHTML = await this.getHTML();
	}
}
