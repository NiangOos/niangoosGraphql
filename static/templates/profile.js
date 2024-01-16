import AbstractView from "./AbstractView.js";
import { navigateTo } from "../js/router.js";
import * as func from "../js/functions.js";
import { GET_USER_PROFILE } from "../query/profile.js";

export default class Profile extends AbstractView {
	constructor() {
		super();
		this.setTitle("Profile");
	}

	async getHTML() {
		return `
			<div class="container-fluid position-relative d-flex p-0">
				<!-- Sidebar Start -->
				<div class="sidebar pe-4 pb-3">
					<nav class="navbar bg-secondary navbar-dark">
						<a href="index.html" class="navbar-brand mx-4 mb-3">
							<h3 class="text-primary"><i class="fa fa-user-edit me-2"></i>DarkPan</h3>
						</a>
					</nav>
				</div>
				<!-- Sidebar End -->

				<!-- Content Start -->
				<div class="content">
					<!-- Sale & Revenue Start -->
					<div class="container-fluid pt-4 px-4">
						<div class="row g-4">
							<div class="col-sm-6 col-xl-3">
								<div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
									<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
										<path
											fill="currentColor"
											d="M240 96h64a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16m0 128h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16m256 192H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16m-256-64h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16m-64 0h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.37 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352"
										/>
									</svg>
									<div class="ms-3">
										<p class="mb-2">XP Amount</p>
										<h6 id="xpamount" class="mb-0"></h6>
									</div>
								</div>
							</div>
							<div class="col-sm-6 col-xl-3">
								<div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="32" viewBox="0 0 320 512">
										<path
											fill="currentColor"
											d="M313.553 119.669L209.587 7.666c-9.485-10.214-25.676-10.229-35.174 0L70.438 119.669C56.232 134.969 67.062 160 88.025 160H152v272H68.024a11.996 11.996 0 0 0-8.485 3.515l-56 56C-4.021 499.074 1.333 512 12.024 512H208c13.255 0 24-10.745 24-24V160h63.966c20.878 0 31.851-24.969 17.587-40.331"
										/>
									</svg>
									<div class="ms-3">
										<p class="mb-2">Level</p>
										<h6 id="level" class="mb-0"></h6>
									</div>
								</div>
							</div>
							<div class="col-sm-6 col-xl-3">
								<div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
									<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 14">
										<path
											fill="currentColor"
											fill-rule="evenodd"
											d="M6 0h3.5a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-.854.354L8.104 3.31L2.207 9.207A1 1 0 0 1 .793 7.793l5.896-5.897L5.646.854A.5.5 0 0 1 6 0m7.207 6.207a1 1 0 0 0-1.414-1.414l-5.897 5.896l-1.042-1.043A.5.5 0 0 0 4 10v3.5a.5.5 0 0 0 .5.5H8a.5.5 0 0 0 .354-.854L7.31 12.104l5.896-5.897Z"
											clip-rule="evenodd"
										/>
									</svg>
									<div class="ms-3">
										<p class="mb-2">Audit Ratio</p>
										<h6 id="auditratio" class="mb-0">$1234</h6>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- Sale & Revenue End -->

					<!-- Sales Chart Start -->
					<div class="container-fluid pt-4 px-4">
						<div class="row g-4">
							<div class="col-sm-12 col-xl-6">
								<div class="bg-secondary text-center rounded p-4">
									<div class="d-flex align-items-center justify-content-between mb-4">
										<h6 class="mb-0">XP earned by project</h6>
									</div>
									<div id="xpByprojectchart">
									<svg id="barChart" width="500" height="500"></svg>
									</div>
								</div>
							</div>
							<div class="col-sm-12 col-xl-6">
								<div class="bg-secondary text-center rounded p-4">
									<div class="d-flex align-items-center justify-content-between mb-4">
										<h6 class="mb-0">Salse & Revenue</h6>
										<a href="">Show All</a>
									</div>
									<canvas id="salse-revenue"></canvas>
								</div>
							</div>
						</div>
					</div>
					<!-- Sales Chart End -->
				</div>
				<!-- Content End -->
			</div>
		`;
	}

	async render() {
		func.makestyle("/static/css/profile.css");

		const jwt = localStorage.getItem("jwt");
		if (!jwt) {
			console.log("Go to connect first");
			navigateTo("/");
			return;
		}

		document.setTitle = "Profile";
		const container = document.getElementById("app");
		container.innerHTML = await this.getHTML();

		try {
			const response = await fetch("https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${jwt}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: GET_USER_PROFILE,
				}),
			});

			if (!response.ok) {
				console.error("Erreur de requête GraphQL:", response.status);
				return;
			}

			const responseData = await response.json();

			document.getElementById("xpamount").innerText = func.formatBytes(responseData.data.event_user[0].user.XPamount.aggregate.sum.amount);
			document.getElementById("level").innerText = responseData.data.event_user[0].level;
			document.getElementById("auditratio").innerText = parseFloat(responseData.data.event_user[0].user.auditRatio.toFixed(1));

			const dataObject = {};

			for (const iterator of responseData.data.event_user[0].user.xpByProject) {
				dataObject[iterator.object.name] = iterator.amount;
			}

			createBarChart(dataObject, "barChart");
		} catch (error) {
			console.error("Erreur lors de la requête GraphQL:", error);
			localStorage.removeItem("jwt");
			navigateTo("/");
			return;
		}
	}
}

function createBarChart(data, svgId) {
	const svg = document.getElementById(svgId);
	const maxValue = Math.max(...Object.values(data));
	const barWidth = svg.clientWidth / Object.keys(data).length;
	let currentXPosition = 0;

	for (const key in data) {
		const barHeight = (data[key] / maxValue) * svg.clientHeight;

		const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		bar.setAttribute("x", currentXPosition);
		bar.setAttribute("y", svg.clientHeight - barHeight);
		bar.setAttribute("width", barWidth);
		bar.setAttribute("height", barHeight);
		bar.setAttribute("fill", "blue");

		bar.addEventListener("mouseover", () => showTooltip(key, data[key], currentXPosition, svg.clientHeight - barHeight));
		bar.addEventListener("mouseout", hideTooltip);

		svg.appendChild(bar);

		currentXPosition += barWidth;
	}

	// Fonction pour afficher le tooltip
	function showTooltip(key, value, x, y) {
		const tooltip = document.createElement("div");
		tooltip.className = "tooltip";
		tooltip.textContent = `${key}: ${value}`;
		tooltip.style.position = "absolute";
		tooltip.style.left = `${x}px`;
		tooltip.style.top = `${y - 20}px`; // 20 pixels au-dessus de la barre
		document.body.appendChild(tooltip);
	}

	// Fonction pour masquer le tooltip
	function hideTooltip() {
		const tooltip = document.querySelector(".tooltip");
		if (tooltip) {
			tooltip.parentNode.removeChild(tooltip);
		}
	}
}
