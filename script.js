document.getElementById('sendEmailForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = new URLSearchParams();

    for (const pair of formData) {
        data.append(pair[0], pair[1]);
    }

    fetch('/send_email', {
        method: 'POST',
        body: data,
    })
    .then(response => response.json())
    .then(result => {
        if (result.status === 'success') {
            alert('Email sent successfully!');
        } else {
            alert('Error: ' + result.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
