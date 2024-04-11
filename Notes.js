document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    var noticeContent = formData.get('noticeContent').trim();
    var noticeFile = formData.get('noticeFile');

    if (noticeContent !== '' || noticeFile) {
        var noticeItem = document.createElement('li');
        noticeItem.className = 'notice-item';
        
        if (noticeContent !== '') {
            noticeItem.textContent = noticeContent;
        }

        if (noticeFile) {
            var fileExtension = noticeFile.name.split('.').pop().toLowerCase();
            if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
                var img = document.createElement('img');
                img.src = URL.createObjectURL(noticeFile);
                noticeItem.appendChild(img);
            } else if (fileExtension === 'pdf') {
                var pdfLink = document.createElement('a');
                pdfLink.href = URL.createObjectURL(noticeFile);
                pdfLink.textContent = noticeFile.name;
                pdfLink.target = "_blank";
                noticeItem.appendChild(pdfLink);
            }
        }
        
        
        // Create remove button
        var removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.type = 'button'; // Set button type to prevent form submission
        removeButton.addEventListener('click', function() {
            noticeItem.remove(); // Remove the notice item when the button is clicked
        });
        noticeItem.appendChild(removeButton);

        document.getElementById('noticeList').appendChild(noticeItem);
        document.getElementById('uploadForm').reset();

        // Dispatch a custom event to notify other parts of the application about the new note
        var noteAddedEvent = new CustomEvent('noteAdded', { detail: noticeContent });
        window.dispatchEvent(noteAddedEvent);
    } else {
        alert('Please enter notice content or upload a file!');
    }
});

const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu_bar');
const closeBtn = document.querySelector('#close_btn');
const themeToggler = document.querySelector('.theme-toggler');

themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
});