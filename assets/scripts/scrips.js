document.addEventListener("DOMContentLoaded", function () {
  const rowsPerPage = 5;
const tableBody = document.getElementById("table-body");
const rows = tableBody.querySelectorAll("tr");
const pagination = document.getElementById("pagination");
const pageCount = Math.ceil(rows.length / rowsPerPage);
let currentPage = 1;

function displayRows(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    rows.forEach((row, index) => {
        if (index >= start && index < end) {
            row.style.display = "";
            row.classList.remove("visible");

            setTimeout(() => {
                row.classList.add("visible");
            }, (index - start) * 120); // stagger
        } else {
            row.style.display = "none";
        }
    });
}

function updatePagination() {
    pagination.innerHTML = "";

    const prevButton = document.createElement("button");
    prevButton.textContent = "Prev";
    prevButton.className = currentPage === 1 ? "disabled" : "active";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            displayRows(currentPage);
            updatePagination();
        }
    });
    pagination.appendChild(prevButton);

    for (let i = 1; i <= pageCount; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.className = i === currentPage ? "active" : "";
        pageButton.addEventListener("click", () => {
            currentPage = i;
            displayRows(currentPage);
            updatePagination();
        });
        pagination.appendChild(pageButton);
    }

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.className = currentPage === pageCount ? "disabled" : "active";
    nextButton.disabled = currentPage === pageCount;
    nextButton.addEventListener("click", () => {
        if (currentPage < pageCount) {
            currentPage++;
            displayRows(currentPage);
            updatePagination();
        }
    });
    pagination.appendChild(nextButton);
}

// Init
displayRows(currentPage);
updatePagination();

    // Left Bar Chart
    const ctxBar = document.getElementById('barChart').getContext('2d');

    // Gradient: slightly lighter at bottom
    const gradientBar = ctxBar.createLinearGradient(0, 0, 0, 250);
    gradientBar.addColorStop(0, '#3498db');           // top color
    gradientBar.addColorStop(1, '#5dade2');           // slightly lighter bottom

    new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Sales',
                data: [120, 190, 150, 220, 180, 200, 170],
                backgroundColor: gradientBar,
                borderRadius: 10,
                barPercentage: 0.8,
                categoryPercentage: 0.8
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { display: false },    // hide Y axis line
                    ticks: { display: true, color: '#2c3e50' } // show labels
                },
                x: {
                    grid: { display: false },    // hide X axis line
                    ticks: { color: '#2c3e50', maxRotation: 0, autoSkip: false }
                }
            }
        }
    });

    // Right Curve Chart (Dark Mode)
    const ctxCurve = document.getElementById('curveChart').getContext('2d');

    // Create gradient for main dataset
    const gradient1 = ctxCurve.createLinearGradient(0, 0, 0, 250);
    gradient1.addColorStop(0, 'rgba(241, 196, 15, 0.6)');
    gradient1.addColorStop(1, 'rgba(241, 196, 15, 0)');

    // Gradient for second dataset
    const gradient2 = ctxCurve.createLinearGradient(0, 0, 0, 250);
    gradient2.addColorStop(0, 'rgba(46, 204, 113, 0.4)');
    gradient2.addColorStop(1, 'rgba(46, 204, 113, 0)');

    new Chart(ctxCurve, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Visitors',
                    data: [50, 70, 40, 90, 100, 80, 120],
                    borderColor: '#f1c40f',
                    backgroundColor: gradient1,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointBackgroundColor: '#f1c40f',
                },
                {
                    label: 'Page Views',
                    data: [30, 60, 80, 70, 90, 60, 100],
                    borderColor: '#2ecc71',
                    backgroundColor: gradient2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointBackgroundColor: '#2ecc71',
                }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                x: {
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                },
                y: {
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    beginAtZero: true
                }
            }
        }
    });

    const animateOnView = (elements, baseDelay = 150) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.classList.remove("visible"); // reset
                    setTimeout(() => {
                        el.classList.add("visible");
                    }, el.dataset.delay);
                } else {
                    entry.target.classList.remove("visible");
                }
            });
        }, { threshold: 0.2 });

        elements.forEach((el, index) => {
            el.dataset.delay = index * baseDelay;
            observer.observe(el);
        });
    };

    // Cards
    animateOnView(document.querySelectorAll(".stats-cards .card"), 150);

    // Charts
    animateOnView(document.querySelectorAll(".charts-container canvas"), 250);
});