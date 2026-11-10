// Student Management Script

document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const studentName = document.getElementById('studentName');
    const studentEmail = document.getElementById('studentEmail');
    const studentProgram = document.getElementById('studentProgram');
    const studentTableBody = document.getElementById('studentTableBody');
    const statusMsg = document.getElementById('statusMsg');
    const submitBtn = document.getElementById('submitBtn');

    let students = [];
    let editIndex = null;

    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = studentName.value.trim();
        const email = studentEmail.value.trim();
        const program = studentProgram.value;

        if (!name || !email || !program) return;

        if (editIndex !== null) {
            students[editIndex] = { name, email, program };
            editIndex = null;
            submitBtn.textContent = 'Add Student';
            showStatus('Student updated successfully.');
        } else {
            students.push({ name, email, program });
            showStatus('Student added successfully.');
        }

        studentForm.reset();
        renderTable();
    });

    function renderTable() {
        studentTableBody.innerHTML = '';

        if (students.length === 0) {
            studentTableBody.innerHTML = `
                <tr>
                    <td colspan="4" class="py-4 px-4 text-center text-gray-500">No students added yet.</td>
                </tr>
            `;
            return;
        }

        students.forEach((student, index) => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-100 transition duration-150';
            tr.innerHTML = `
                <td class="py-2.5 px-4">${escapeHtml(student.name)}</td>
                <td class="py-2.5 px-4">${escapeHtml(student.email)}</td>
                <td class="py-2.5 px-4">${escapeHtml(student.program)}</td>
                <td class="py-2.5 px-4 flex gap-2">
                    <button onclick="editStudent(${index})" class="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                    <button onclick="deleteStudent(${index})" class="text-red-600 hover:text-red-800 font-medium">Delete</button>
                </td>
            `;
            studentTableBody.appendChild(tr);
        });
    }

    window.editStudent = function(index) {
        const student = students[index];
        studentName.value = student.name;
        studentEmail.value = student.email;
        studentProgram.value = student.program;
        editIndex = index;
        submitBtn.textContent = 'Update Student';
    };

    window.deleteStudent = function(index) {
        if (confirm('Are you sure you want to delete this student?')) {
            students.splice(index, 1);
            renderTable();
            showStatus('Student deleted successfully.');
        }
    };

    function showStatus(msg) {
        statusMsg.textContent = msg;
        statusMsg.classList.remove('hidden');
        setTimeout(() => {
            statusMsg.classList.add('hidden');
        }, 3000);
    }

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    renderTable();
});
