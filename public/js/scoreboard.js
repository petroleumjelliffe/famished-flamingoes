// public/js/scoreboard.js
export function createScoreboard(containerId = 'scoreboard-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <table class="scoreboard">
      <thead>
        <tr>
          <th>Team</th>
          <th>Funding</th>
          <th>Shrimp</th>
          <th>Energy</th>
        </tr>
      </thead>
      <tbody id="scoreboard-body"></tbody>
    </table>
  `;
}

export function updateScoreboard(state) {
  const body = document.getElementById('scoreboard-body');
  if (!body) return;

  const teams = state.teams || {};
  body.innerHTML = '';

  Object.entries(teams).forEach(([team, stats]) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="team-${team}">${team.toUpperCase()}</td>
      <td>${stats.funding}</td>
      <td>${stats.shrimp}</td>
      <td>${stats.energy}</td>
    `;
    body.appendChild(tr);
  });
}
