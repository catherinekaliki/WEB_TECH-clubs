const API_URL = 'http://localhost:3000/api/clubs';

document.addEventListener('DOMContentLoaded', () => {
    fetchClubs();
    document.getElementById('club-form').addEventListener('submit', handleFormSubmit);
    document.getElementById('cancel-btn').addEventListener('click', clearForm);
});
async function fetchClubs() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error('Failed to fetch clubs');
        }

        const clubs = await response.json();
        const tableBody = document.getElementById('clubs-table-body');

        tableBody.innerHTML = '';

        clubs.forEach(club => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${club.id}</td>
                <td><strong></strong></td>
                <td></td>
                <td></td>
                <td>${club.member_count}</td>
                <td></td>
                <td>K${Number(club.budget || 0).toFixed(2)}</td>
                <td class="action-btns">
                    <button type="button" class="edit-btn">Edit</button>
                    <button type="button" class="delete-btn">Delete</button>
                </td>
            `;

            // Display club details safely
            row.cells[1].querySelector('strong').textContent = club.name;
            row.cells[2].textContent = club.category;
            row.cells[3].textContent = club.president;
            row.cells[5].textContent = club.meeting_day || 'N/A';

            // Make Edit button work
            row.querySelector('.edit-btn').addEventListener('click', () => {
                editClub(
                    club.id,
                    club.name,
                    club.category,
                    club.president,
                    club.member_count,
                    club.meeting_day || '',
                    club.budget
                );
            });

            // Keep Delete working
            row.querySelector('.delete-btn').addEventListener('click', () => {
                deleteClub(club.id);
            });

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching clubs:', error);
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('club-id').value;
    const clubData = {
        name: document.getElementById('name').value,
        category: document.getElementById('category').value,
        president: document.getElementById('president').value,
        member_count: parseInt(document.getElementById('member_count').value) || 0,
        meeting_day: document.getElementById('meeting_day').value,
        budget: parseFloat(document.getElementById('budget').value) || 0.00
    };

    try {
        let response;
        if (id) {
            response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clubData)
            });
        } else {
            response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clubData)
            });
        }
        if (response.ok) { clearForm(); fetchClubs(); }
    } catch (error) {
        console.error('Error saving club:', error);
    }
}

function editClub(id, name, category, president, member_count, meeting_day, budget) {
    document.getElementById('club-id').value = id;
    document.getElementById('name').value = unescape(name);
    document.getElementById('category').value = unescape(category);
    document.getElementById('president').value = unescape(president);
    document.getElementById('member_count').value = member_count;
    document.getElementById('meeting_day').value = unescape(meeting_day);
    document.getElementById('budget').value = budget;
    document.getElementById('form-title').innerText = 'Edit Campus Club Profile';
    document.querySelector('#club-form button:not(#cancel-btn').textContent='Update Club';
    document.getElementById('cancel-btn').style.display = 'inline-block';
}

async function deleteClub(id) {
    if (confirm('Are you sure you want to remove this club profile?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) fetchClubs();
        } catch (error) {
            console.error('Error deleting club:', error);
        }
    }
}

function clearForm() {
    document.getElementById('club-form').reset();
    document.getElementById('club-id').value = '';
    document.getElementById('form-title').innerText = 'Add New Campus Club';
    document.querySelector('#club-form button:not(#cancel-btn').textContent='Save Club';
    document.getElementById('cancel-btn').style.display = 'none';
}