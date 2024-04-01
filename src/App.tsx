import { useLocalStorage } from '@uidotdev/usehooks';
import { State } from './delivery-helper';
import { RemainingStopsDialog } from './components/dialog/RemainingStopsDialog';
import { Clock } from './components/Clock';
import { CompleteStopButton } from './components/CompleteStopButton';
import StopsTable from './components/StopsTable';
import { LoadState } from './components/file/LoadState';
import { SaveState } from './components/file/SaveState';
import { ConfirmDialog } from './components/dialog/ConfirmDialog';
import { format } from 'date-fns';

// let startTime = new Date();
// let totalStopsRequired;
// let stops = [];
// let stopGraph;
// let stopsPerHourGraph;
// let map;
// let markers = [];
// let editStopMap;
// let editStopMarker;

// function createCurrentLocationMarker() {
//   const markerContent = document.createElement("div");
//   markerContent.className = "current-location-marker";
//   markerContent.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
//   return markerContent;
// }

// function initMap() {
//   if (!map) {
//     map = new google.maps.Map(document.getElementById("map"), {
//       center: { lat: 0, lng: 0 },
//       zoom: 7,
//       mapId: "ddd9f6b48ff9646c",
//       gestureHandling: "greedy",
//       draggableCursor: "grab",
//     });
//   }
// }

// function createMarkerContent(stopNumber) {
//   const markerContent = document.createElement("div");
//   markerContent.className = "marker-label";
//   markerContent.textContent = stopNumber;
//   return markerContent;
// }

// function updateMap() {
//   if (!map) {
//     initMap();
//   }
//   if (stops.length > 0) {
//     // Clear existing markers
//     markers.forEach((marker) => marker.remove());
//     markers = [];

//     // Add a marker for the current location on the full map
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const currentLocation = new google.maps.LatLng(
//           position.coords.latitude,
//           position.coords.longitude
//         );
//         new google.maps.marker.AdvancedMarkerElement({
//           map: map,
//           position: currentLocation,
//           content: createCurrentLocationMarker(),
//           zIndex: 2000,
//         });
//       },
//       (error) => {
//         console.error("Error getting current location:", error);
//       }
//     );

//     // Create markers for all stops with stop numbers
//     stops.forEach((stop, index) => {
//       const stopNumber = stops.length - index;
//       const markerElement = new google.maps.marker.AdvancedMarkerElement({
//         map: map,
//         position: new google.maps.LatLng(stop.latitude, stop.longitude),
//         content: createMarkerContent(stopNumber),
//       });
//       markers.push(markerElement);
//     });
//   }
// }

// function zoomToAllStops() {
//   if (stops.length > 0) {
//     const bounds = new google.maps.LatLngBounds();
//     stops.forEach((stop) =>
//       bounds.extend(new google.maps.LatLng(stop.latitude, stop.longitude))
//     );
//     map.fitBounds(bounds, { padding: 50 });
//   }
// }

// function zoomToLastStop() {
//   if (stops.length > 0) {
//     const lastStop = stops[0];
//     map.setCenter(
//       new google.maps.LatLng(lastStop.latitude, lastStop.longitude)
//     );
//     map.setZoom(18);
//   }
// }

// function zoomToMajorityStops() {
//   if (stops.length > 0) {
//     const bounds = new google.maps.LatLngBounds();
//     const outlierThreshold = 0.025; // Adjust this value to define the outlier threshold
//     const latitudes = stops.map((stop) => stop.latitude);
//     const longitudes = stops.map((stop) => stop.longitude);
//     const medianLat = median(latitudes);
//     const medianLng = median(longitudes);
//     const filteredStops = stops.filter((stop) => {
//       const latDiff = Math.abs(stop.latitude - medianLat);
//       const lngDiff = Math.abs(stop.longitude - medianLng);
//       return latDiff <= outlierThreshold && lngDiff <= outlierThreshold;
//     });
//     filteredStops.forEach((stop) =>
//       bounds.extend(new google.maps.LatLng(stop.latitude, stop.longitude))
//     );
//     map.fitBounds(bounds, { padding: 50 });
//   }
// }

// function median(numbers) {
//   const sorted = numbers.slice().sort((a, b) => a - b);
//   const middle = Math.floor(sorted.length / 2);
//   if (sorted.length % 2 === 0) {
//     return (sorted[middle - 1] + sorted[middle]) / 2;
//   }
//   return sorted[middle];
// }

// function createGraph() {
//   const ctx = document.getElementById("stopGraph");
//   if (ctx) {
//     stopGraph = new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: [],
//         datasets: [
//           {
//             data: [],
//             borderColor: "rgba(75, 192, 192, 1)",
//             backgroundColor: "rgba(75, 192, 192, 0.2)",
//             borderWidth: 2,
//             pointRadius: 6,
//             pointBackgroundColor: "rgba(75, 192, 192, 1)",
//             pointBorderColor: "#fff",
//             pointHoverRadius: 8,
//             pointHitRadius: 20,
//             pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
//             pointHoverBorderColor: "#fff",
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//           x: {
//             title: {
//               display: true,
//               text: "Stop Number",
//             },
//           },
//           y: {
//             title: {
//               display: true,
//               text: "Time",
//             },
//             ticks: {
//               callback: function (value, index, values) {
//                 const date = new Date(value);
//                 const hours = date.getHours();
//                 const minutes = date.getMinutes();
//                 return `${hours}:${minutes.toString().padStart(2, "0")}`;
//               },
//             },
//           },
//         },
//         plugins: {
//           legend: {
//             display: false,
//           },
//           title: {
//             display: true,
//             text: "Stop Times",
//           },
//           tooltip: {
//             callbacks: {
//               label: function (context) {
//                 const date = new Date(context.raw);
//                 const hours = date.getHours();
//                 const minutes = date.getMinutes();
//                 const formattedTime = `${hours}:${minutes
//                   .toString()
//                   .padStart(2, "0")}`;
//                 return `Stop ${context.label}: ${formattedTime}`;
//               },
//             },
//           },
//         },
//         interaction: {
//           mode: "nearest",
//           intersect: true,
//         },
//       },
//     });
//     updateGraph();
//   }
// }

// function updateGraph() {
//   if (stopGraph) {
//     const reversedStops = [...stops].reverse();
//     stopGraph.data.labels = reversedStops.map((_, index) => index + 1);
//     stopGraph.data.datasets[0].data = reversedStops.map((stop) => stop.time);
//     stopGraph.update();
//   }
// }

// function createStopsPerHourGraph() {
//   const ctx = document.getElementById("stopsPerHourGraph");
//   if (ctx) {
//     if (stopsPerHourGraph) {
//       stopsPerHourGraph.destroy();
//     }
//     stopsPerHourGraph = new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: [],
//         datasets: [
//           {
//             data: [],
//             borderColor: "rgba(255, 99, 132, 1)",
//             backgroundColor: "rgba(255, 99, 132, 0.2)",
//             borderWidth: 2,
//             pointRadius: 6,
//             pointBackgroundColor: "rgba(255, 99, 132, 1)",
//             pointBorderColor: "#fff",
//             pointHoverRadius: 8,
//             pointHitRadius: 20,
//             pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
//             pointHoverBorderColor: "#fff",
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//           x: {
//             title: {
//               display: true,
//               text: "Time",
//             },
//             type: "time",
//             time: {
//               unit: "minute",
//               displayFormats: {
//                 minute: "h:mm a",
//               },
//             },
//             ticks: {
//               callback: function (value, index, values) {
//                 const date = new Date(value);
//                 const hours = date.getHours();
//                 const minutes = date.getMinutes();
//                 const ampm = hours >= 12 ? "pm" : "am";
//                 const formattedHours = hours % 12 || 12;
//                 const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
//                 return `${formattedHours}:${formattedMinutes} ${ampm}`;
//               },
//             },
//           },
//           y: {
//             title: {
//               display: true,
//               text: "Stops Per Hour",
//             },
//             ticks: {
//               beginAtZero: true,
//             },
//           },
//         },
//         plugins: {
//           legend: {
//             display: false,
//           },
//           title: {
//             display: true,
//             text: "Stops Per Hour",
//           },
//           tooltip: {
//             callbacks: {
//               label: function (context) {
//                 return `${context.formattedValue} stops per hour`;
//               },
//             },
//           },
//         },
//         interaction: {
//           mode: "nearest",
//           intersect: true,
//         },
//       },
//     });
//   }
// }

// function updateStopsPerHourGraph() {
//   if (stopsPerHourGraph) {
//     const stopsPerHour = stops.map((stop, index) => {
//       const currentTime = stop.time;
//       const oneHourAgo = new Date(currentTime.getTime() - 3600000); // 1 hour ago
//       const stopsInLastHour = stops.filter(
//         (s) => s.time >= oneHourAgo && s.time <= currentTime
//       ).length;
//       return stopsInLastHour;
//     });

//     stopsPerHourGraph.data.labels = stops.map((stop) => stop.time);
//     stopsPerHourGraph.data.datasets[0].data = stopsPerHour;
//     stopsPerHourGraph.update();
//   }
// }

// function updateDataContainerVisibility() {
//   const dataContainer = document.querySelector(".dataContainer");
//   const container = document.querySelector(".container");
//   if (stops.length === 0) {
//     dataContainer.style.display = "none";
//     container.style.display = "block";
//   } else {
//     dataContainer.style.display = "block";
//     container.style.display = "none";
//   }
// }

// async function addStop() {
//   if (!totalStopsRequired) {
//     totalStopsRequired = parseInt(
//       document.getElementById("totalStops").value || 0,
//       10
//     );
//     document.getElementById("stopsLabel").style.display = "none";
//     document.getElementById("totalStops").style.display = "none";
//   }

//   const stopTime = new Date();
//   try {
//     const position = await getCurrentLocation();
//     const { latitude, longitude } = position.coords;
//     stops.unshift({ time: stopTime, latitude, longitude });
//     updateUI();
//     updateDataContainerVisibility();
//     if (map) {
//       updateMap();
//       zoomToAllStops();
//     }
//   } catch (error) {
//     console.error("Error getting current location:", error);
//     stops.unshift({ time: stopTime });
//     updateUI();
//     updateDataContainerVisibility();
//   }
// }

// function updateUI() {
//   updateTable();
//   updateFinishTime();
//   updateStopsLeft();
//   updateGraph();
//   updateStopsPerHourGraph();
//   saveToLocalStorage();
// }

// function updateFinishTime() {
//   const currentTime = new Date();
//   const totalStops = stops.length;
//   const stopsPerHourLastHour = stopsInLast(60);
//   const tableRows = [
//     [
//       "Current Stops Per Hour",
//       stopsPerHourLastHour,
//       calculateEstimatedFinishTime(stopsPerHourLastHour),
//     ],
//     ["Ideal Residential Pace", 25, calculateEstimatedFinishTime(25)],
//     ["Ideal Rural Pace", 15, calculateEstimatedFinishTime(15)],
//   ]
//     .map(
//       (row) => `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td></tr>`
//     )
//     .join("");

//   document.getElementById("finishTimeTable").querySelector("tbody").innerHTML =
//     tableRows;

//   function calculateEstimatedFinishTime(stopsPerHour) {
//     if (stopsPerHour === "N/A" || stopsPerHour <= 0) {
//       return "N/A";
//     }
//     const remainingStops = totalStopsRequired - totalStops;
//     const estimatedHoursRemaining = remainingStops / stopsPerHour;
//     return new Date(
//       currentTime.getTime() + estimatedHoursRemaining * 3600000
//     ).toLocaleTimeString();
//   }

//   function stopsInLast(minutes) {
//     const timeLimit = new Date(currentTime.getTime() - minutes * 60000);
//     return stops.filter((stop) => stop.time >= timeLimit).length;
//   }

//   function stopsPerHourLastNStops(n) {
//     if (stops.length >= n) {
//       const durationHours = (stops[0].time - stops[n - 1].time) / 3600000;
//       return n / durationHours;
//     }
//     return "N/A";
//   }
// }

// function updateTable() {
//   const tbody = document.getElementById("stopTimes").querySelector("tbody");
//   tbody.innerHTML = stops
//     .map(
//       (stop, i) => `
//         <tr>
//             <td>${stops.length - i}</td>
//             <td>${stop.time.toLocaleTimeString()}</td>
//             <td>
//             <button class="actionBtn editBtn" onclick="editStop(${i})"><i class="fas fa-edit"></i></button>
//                 <button class="actionBtn deleteBtn" onclick="openDeleteConfirmationModal(${i})"><i class="fas fa-trash"></i></button>
//             </td>
//         </tr>
//     `
//     )
//     .join("");
// }

// function updateStopsLeft() {
//   const stopsLeftElement = document.getElementById("stops-left");
//   const currentStopElement = document.getElementById("current-stop");
//   const stopsLeft = totalStopsRequired - stops.length;
//   const currentStop = stops.length + 1;
//   stopsLeftElement.textContent =
//     "Stops Left: " + (stopsLeft >= 0 ? stopsLeft : 0);
//   currentStopElement.textContent =
//     "Current Stop: " + (currentStop > 0 ? currentStop : 0);
// }

// function editStop(stopIndex) {
//   const modal = document.getElementById("editTimeModal");
//   const editModalTitle = document.getElementById("editModalTitle");
//   const timePicker = document.getElementById("timePicker");
//   const cancelEdit = document.getElementById("cancelEdit");
//   const submitEdit = document.getElementById("submitEdit");

//   editModalTitle.textContent = `Edit time for stop ${stops.length - stopIndex}`;
//   modal.style.display = "block";

//   const currentTime = stops[stopIndex].time;
//   const timeValueWithSeconds =
//     currentTime.getHours().toString().padStart(2, "0") +
//     ":" +
//     currentTime.getMinutes().toString().padStart(2, "0") +
//     ":" +
//     currentTime.getSeconds().toString().padStart(2, "0");
//   timePicker.value = timeValueWithSeconds;

//   // Clear the existing map container
//   const editStopMapContainer = document.getElementById("editStopMapContainer");
//   editStopMapContainer.innerHTML = '<div id="editStopMap"></div>';

//   // Initialize a new map
//   editStopMap = new google.maps.Map(document.getElementById("editStopMap"), {
//     center: { lat: 0, lng: 0 },
//     zoom: 18,
//     mapId: "ddd9f6b48ff9646c",
//     gestureHandling: "greedy",
//     draggableCursor: "grab",
//   });

//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const currentLocation = new google.maps.LatLng(
//         position.coords.latitude,
//         position.coords.longitude
//       );
//       const accuracy = position.coords.accuracy;
//       new google.maps.marker.AdvancedMarkerElement({
//         map: editStopMap,
//         position: currentLocation,
//         content: createCurrentLocationMarker(accuracy),
//         zIndex: 2000,
//       });
//     },
//     (error) => {
//       console.error("Error getting current location:", error);
//     }
//   );

//   const selectedStop = stops[stopIndex];
//   const originalStopDetails = { ...selectedStop };
//   const selectedStopLocation = new google.maps.LatLng(
//     selectedStop.latitude,
//     selectedStop.longitude
//   );
//   const liveCoordinatesElement = document.getElementById("liveCoordinates");

//   // Update the marker position and live coordinates whenever the map is dragged
//   google.maps.event.addListener(editStopMap, "drag", function () {
//     const newCenter = editStopMap.getCenter();
//     editStopMarker.position = newCenter;
//     selectedStop.latitude = newCenter.lat();
//     selectedStop.longitude = newCenter.lng();

//     // Update the live coordinates display
//     liveCoordinatesElement.textContent = `Latitude: ${selectedStop.latitude.toFixed(
//       6
//     )}, Longitude: ${selectedStop.longitude.toFixed(6)}`;
//   });

//   // Set the initial live coordinates display
//   liveCoordinatesElement.textContent = `Latitude: ${selectedStop.latitude.toFixed(
//     6
//   )}, Longitude: ${selectedStop.longitude.toFixed(6)}`;

//   // Set the map center to the selected stop location
//   editStopMap.setCenter(selectedStopLocation);

//   stops.forEach((stop, index) => {
//     if (index !== stopIndex) {
//       const stopNumber = stops.length - index;
//       const markerElement = new google.maps.marker.AdvancedMarkerElement({
//         map: editStopMap,
//         position: new google.maps.LatLng(stop.latitude, stop.longitude),
//         content: createMarkerContent(stopNumber),
//       });
//     }
//   });

//   // Add a draggable marker for the selected stop
//   editStopMarker = new google.maps.marker.AdvancedMarkerElement({
//     position: selectedStopLocation,
//     map: editStopMap,
//     draggable: true,
//     content: createMarkerContent(stops.length - stopIndex),
//     zIndex: 1000,
//   });

//   google.maps.event.addListener(editStopMap, "drag", function () {
//     const newCenter = editStopMap.getCenter();
//     editStopMarker.position = newCenter;
//     selectedStop.latitude = newCenter.lat();
//     selectedStop.longitude = newCenter.lng();
//   });

//   // Update the stop location when the marker is dragged
//   editStopMarker.addListener("dragend", function () {
//     const newPosition = editStopMarker.getPosition();
//     selectedStop.latitude = newPosition.lat();
//     selectedStop.longitude = newPosition.lng();

//     // Update the corresponding marker on the main map
//     const markerElement = markers[stopIndex];
//     markerElement.position = newPosition;
//   });

//   document.querySelector(".close-button").onclick = () => {
//     Object.assign(selectedStop, originalStopDetails);
//     modal.style.display = "none";
//   };

//   cancelEdit.onclick = () => {
//     Object.assign(selectedStop, originalStopDetails);
//     modal.style.display = "none";
//   };

//   submitEdit.onclick = () => {
//     if (timePicker.checkValidity()) {
//       const editedTime = new Date(currentTime);
//       const [hours, minutes, seconds] = timePicker.value.split(":");
//       editedTime.setHours(hours, minutes, seconds);
//       stops[stopIndex].time = editedTime;

//       // Update the position of the corresponding marker on the main map
//       const markerElement = markers[stopIndex];
//       if (markerElement) {
//         const newPosition = new google.maps.LatLng(
//           selectedStop.latitude,
//           selectedStop.longitude
//         );
//         markerElement.position = newPosition;
//         markerElement.content = createMarkerContent(stops.length - stopIndex);
//       }

//       updateUI();
//       modal.style.display = "none";
//     } else {
//       alert("Invalid time. Please enter a valid time.");
//     }
//   };

//   window.onclick = (event) => {
//     if (event.target == modal) {
//       modal.style.display = "none";
//     }
//   };
// }

// function closeModalOnOutsideClick(event, modalId, closeModal) {
//   const modal = document.getElementById(modalId);
//   if (event.target === modal) {
//     closeModal();
//   }
// }

// function showAddStopsModal() {
//   const modal = document.getElementById("addStopsModal");
//   modal.style.display = "block";
//   window.addEventListener("click", (event) =>
//     closeModalOnOutsideClick(event, "addStopsModal", hideAddStopsModal)
//   );
// }

// function hideAddStopsModal() {
//   const modal = document.getElementById("addStopsModal");
//   modal.style.display = "none";
//   window.removeEventListener("click", (event) =>
//     closeModalOnOutsideClick(event, "addStopsModal", hideAddStopsModal)
//   );
// }

// function addAdditionalStops() {
//   const additionalStops = parseInt(
//     document.getElementById("additionalStopsInput").value,
//     10
//   );
//   if (!isNaN(additionalStops)) {
//     totalStopsRequired += additionalStops;
//     updateUI();
//     hideAddStopsModal();
//   } else {
//     alert("Please enter a valid number of stops.");
//   }
// }

// document
//   .getElementById("addStopsButton")
//   .addEventListener("click", showAddStopsModal);
// document
//   .getElementById("cancelAddStops")
//   .addEventListener("click", hideAddStopsModal);
// document
//   .getElementById("submitAddStops")
//   .addEventListener("click", addAdditionalStops);
// document.querySelector("#addStopsModal .close-button").onclick =
//   hideAddStopsModal;

// function showCurrentTime() {
//   const currentTimeContainerElement = document.getElementById(
//     "current-time-container"
//   );
//   const currentTimeDataElement = document.getElementById("current-time-data");

//   function updateTime() {
//     const now = new Date();
//     const timeString = now.toLocaleTimeString();
//     currentTimeContainerElement.textContent = timeString;
//     currentTimeDataElement.textContent = timeString;
//   }

//   updateTime();
//   setInterval(updateTime, 1000);
// }

// window.onload = showCurrentTime;

// document.getElementById("totalStops").focus();

// function saveToLocalStorage() {
//   if (typeof totalStopsRequired !== "undefined") {
//     localStorage.setItem("totalStopsRequired", totalStopsRequired.toString());
//   }
//   localStorage.setItem(
//     "stops",
//     JSON.stringify(
//       stops.map((stop) => ({
//         time: stop.time.toISOString(),
//         latitude: stop.latitude,
//         longitude: stop.longitude,
//       }))
//     )
//   );
// }

// function loadFromLocalStorage() {
//   const loadedTotalStopsRequired = localStorage.getItem("totalStopsRequired");
//   const loadedStops = localStorage.getItem("stops");

//   if (loadedTotalStopsRequired) {
//     totalStopsRequired = parseInt(loadedTotalStopsRequired, 10);
//     document.getElementById("totalStops").value = totalStopsRequired;
//     document.getElementById("stopsLabel").style.display = "none";
//     document.getElementById("totalStops").style.display = "none";
//   }

//   if (loadedStops) {
//     stops = JSON.parse(loadedStops).map((stop) => ({
//       time: new Date(stop.time),
//       latitude: stop.latitude,
//       longitude: stop.longitude,
//     }));
//     updateUI();
//     updateGraph();
//     updateStopsPerHourGraph();
//     updateMap();
//     zoomToAllStops();
//   }

//   updateDataContainerVisibility();
//   createGraph();
//   createStopsPerHourGraph();
// }

// let stopToDelete = null;

// function openDeleteConfirmationModal(stopIndex) {
//   stopToDelete = stopIndex;
//   const modal = document.getElementById("deleteConfirmationModal");
//   document.getElementById("deleteModalTitle").textContent = `Delete stop ${
//     stops.length - stopIndex
//   }?`;
//   modal.style.display = "block";
//   window.addEventListener("click", (event) =>
//     closeModalOnOutsideClick(
//       event,
//       "deleteConfirmationModal",
//       closeDeleteConfirmationModal
//     )
//   );
// }

// function closeDeleteConfirmationModal() {
//   const modal = document.getElementById("deleteConfirmationModal");
//   modal.style.display = "none";
//   window.removeEventListener("click", (event) =>
//     closeModalOnOutsideClick(
//       event,
//       "deleteConfirmationModal",
//       closeDeleteConfirmationModal
//     )
//   );
// }

// document.getElementById("confirmDelete").addEventListener("click", function () {
//   if (stopToDelete !== null) {
//     stops.splice(stopToDelete, 1);
//     updateUI();
//   }
//   closeDeleteConfirmationModal();
// });

// document.getElementById("resetButton").addEventListener("click", function () {
//   const modal = document.getElementById("resetConfirmationModal");
//   modal.style.display = "block";
//   window.addEventListener("click", (event) =>
//     closeModalOnOutsideClick(
//       event,
//       "resetConfirmationModal",
//       closeResetConfirmationModal
//     )
//   );
// });

// function closeResetConfirmationModal() {
//   const modal = document.getElementById("resetConfirmationModal");
//   modal.style.display = "none";
//   window.removeEventListener("click", (event) =>
//     closeModalOnOutsideClick(
//       event,
//       "resetConfirmationModal",
//       closeResetConfirmationModal
//     )
//   );
// }

// document.getElementById("confirmReset").addEventListener("click", function () {
//   localStorage.clear();
//   stops = [];
//   updateDataContainerVisibility(); // Call the new function here
//   location.reload();
// });

// function getCurrentLocation() {
//   return new Promise((resolve, reject) => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(resolve, reject);
//     } else {
//       reject(new Error("Geolocation is not supported by this browser."));
//     }
//   });
// }

// document.querySelectorAll(".break-icon").forEach((icon) => {
//   icon.addEventListener("click", () => {
//     const breakType = icon.dataset.breakType;
//     showBreakModal(breakType);
//   });
// });

// The main UI Screen
function App() {
  const [state, setState] = useLocalStorage<State>('test-3', {
    startTime: undefined,
    remainingStops: 0,
    completedStops: [],
  });

  const currentStop = state.completedStops.length + 1;
  const remainingStops = state.remainingStops;

  if (state.startTime === undefined) {
    return (
      <div className="m-auto max-w-screen-sm px-5">
        <div className="bg-white">
          <div className="px-4 py-4">
            <button
              className="block w-full rounded bg-yellow-300 py-8 font-bold text-black hover:bg-yellow-400 active:bg-yellow-500"
              onClick={() => {
                setState({
                  startTime: Date.now(),
                  remainingStops: 0,
                  completedStops: [],
                });
              }}
            >
              Start
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="m-auto max-w-screen-sm px-5">
      <div className="bg-white">
        <div className="flex h-16 items-center bg-slate-200 p-5 text-black">
          <div className="flex-grow text-center text-3xl font-bold">
            <Clock />
          </div>
          <div>
            <span className="block font-bold">Start time</span>
            <span>{format(state.startTime, 'p')}</span>
          </div>
        </div>

        <div className="h-px bg-slate-300"></div>

        <div className="px-4 py-4">
          <CompleteStopButton
            currentStop={currentStop}
            remainingStops={state.remainingStops}
            onClick={() => {
              const time = Date.now();
              setState((state) => ({
                ...state,
                remainingStops: state.remainingStops - 1,
                completedStops: [{ time }, ...state.completedStops],
              }));
            }}
          />
        </div>

        <div className="h-px bg-slate-300"></div>

        <div className="flex items-center justify-between px-5 py-5 text-xl font-bold">
          <span>
            {remainingStops} {remainingStops === 1 ? 'stop' : 'stops'} remaining
          </span>
          <RemainingStopsDialog
            remainingStops={state.remainingStops}
            onSubmit={(remainingStops) => {
              setState((state) => ({
                ...state,
                remainingStops,
              }));
            }}
          />
        </div>

        <div className="mb-5 h-px bg-slate-300"></div>

        <div className="p-4">
          <StopsTable
            stops={state.completedStops}
            onDelete={(index) => {
              setState((state) => ({
                ...state,
                completedStops: state.completedStops.filter(
                  (_, i) => i !== index,
                ),
              }));
            }}
          />
        </div>

        <div className="flex border-t border-t-slate-300 px-5 py-2">
          <div className="mr-2">
            <LoadState onLoad={() => {}} />
          </div>
          <div>
            <SaveState state={state} />
          </div>
        </div>

        <div className="flex border-t border-t-slate-300 px-5 py-2">
          <ConfirmDialog
            titleText="Reset"
            confirmText="Reset"
            trigger={
              <button className="w-full rounded bg-red-500 py-2 font-bold text-white">
                Reset
              </button>
            }
            onConfirm={() => {
              setState({
                startTime: undefined,
                remainingStops: 0,
                completedStops: [],
              });
            }}
          />
        </div>

        <div className="p-4">
          <div className="text-center text-sm text-slate-500">
            <p>
              <a
                href="https://github.com/zwazi/DeliveryHelper"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </p>
            <p id="copyright">&copy; {new Date().getFullYear()} Zwazi</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
