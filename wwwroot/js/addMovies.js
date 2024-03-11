const addDateContainer = document.querySelector('.add-date-container');
const addDateBTN = document.querySelector('button.add-date')
const dateList = {}

// get image url from api
const endpoint = "https://api.imgbb.com/1/upload";
const apiKey = "62c18fb1790c4f52bb1a031c0332b453";
const fileInput = document.querySelector('input[type="file"]');
const imagePreview = document.querySelector('.preview-image');

fileInput.addEventListener('change', async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    formData.append('key', apiKey);
    const response = await fetch(endpoint, {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    imagePreview.style.backgroundImage = `url(${data.data.url})`;
});


// Add New Date
addDateBTN.addEventListener('click', () => {
    const newDateContainer = document.createElement('div');
    newDateContainer.classList.add('new-date');
    const newDateLabel = document.createElement('label');
    newDateLabel.setAttribute('for', 'date');
    newDateLabel.textContent = 'Select a date';
    newDateContainer.appendChild(newDateLabel);

    const newDateInput = document.createElement('input');
    newDateInput.setAttribute('type', 'date');
    newDateInput.setAttribute('id', `date-${newDateContainer.children.length}`);
    // date format: 10 March 2024

    newDateInput.setAttribute('value', new Date().toISOString().split('T')[0]);
    newDateContainer.appendChild(newDateInput);

    // disable button
    addDateBTN.disabled = true;

    addDateContainer.appendChild(newDateContainer);

    // submit button

    const submitDateContainer = document.createElement('div');
    submitDateContainer.classList.add('submit-date-container');

    const cancelBTN = document.createElement('button');
    cancelBTN.textContent = 'Cancel';
    cancelBTN.classList.add('cancel-date');
    submitDateContainer.appendChild(cancelBTN);
    cancelBTN.addEventListener('click', () => {
        addDateBTN.disabled = false;
        newDateContainer.remove();
    });

    const submitBTN = document.createElement('button');
    submitBTN.textContent = 'Add';
    submitBTN.classList.add('submit-date');
    submitDateContainer.appendChild(submitBTN);
    submitBTN.addEventListener('click', () => {
        // add date to database
        // do something with the date
        setTimeout(() => {
            console.log(newDateInput.value);
            // date format: 10 March 2024
            const date = new Date(newDateInput.value);
            const formattedDate = date.toLocaleString('default', { month: 'long' }) + ' ' + date.getDate() + ' ' + date.getFullYear();

            if (dateList[formattedDate] === undefined) {
                dateList[formattedDate] = [];
            }
            // check if date already exists
            if (dateList[formattedDate].includes(formattedDate)) {
                alert('Date already exists');
                return;
            }

            dateList[formattedDate].push(formattedDate);
            displayDates(dateList[formattedDate]);
            console.log(dateList);
            addDateBTN.disabled = false;
            newDateContainer.remove();
        }, 500);

    });

    newDateContainer.appendChild(submitDateContainer);
    isDisplayArrow();

});

// Display Movie Date
const dateHorizontal = document.querySelector('.date-horizontal');

const displayDates = (date) => {
    const dateContainer = document.createElement('div');
    dateContainer.classList.add('date-container');
    const dateP = document.createElement('p');
    dateP.textContent = date;
    const dayOfWeek = document.createElement('p');
    const curDate = new Date(date);
    dayOfWeek.textContent = curDate.toLocaleString('default', { weekday: 'short' });
    dateContainer.appendChild(dayOfWeek);
    dateContainer.appendChild(dateP);

//     <div class="date-container">
//     <p>@DateTime.Now.DayOfWeek</p>
//     <p>@DateTime.Now.ToString("dd MMMM yyyy")</p>
// <div class="ellipsis-container">
//     <i class="fa-solid fa-ellipsis"></i>
//     <div class="ellipsis-content">
//         <button class="edit-date">Edit</button>
//         <button class="delete-date">Delete</button>
//     </div>
// </div>

    const ellipsis = document.createElement('div');
    ellipsis.classList.add('ellipsis-container');
    const ellipsisIcon = document.createElement('i');
    ellipsisIcon.classList.add('fa-solid', 'fa-ellipsis-vertical');
    ellipsis.appendChild(ellipsisIcon);

    const ellipsisContent = document.createElement('div');
    ellipsisContent.classList.add('ellipsis-content');

    const deleteDateBTN = document.createElement('button');
    deleteDateBTN.textContent = 'Delete';
    deleteDateBTN.classList.add('delete-date');
    deleteDateBTN.addEventListener('click', () => {
        dateContainer.remove();
        dateList[date].pop(date);
        isDisplayArrow();
    });
    
    const editDateBTN = document.createElement('button');
    editDateBTN.textContent = 'Edit';
    editDateBTN.classList.add('edit-date');
    editDateBTN.addEventListener('click', () => {
        // edit date
    });

    ellipsisContent.appendChild(editDateBTN);
    ellipsisContent.appendChild(deleteDateBTN);
    ellipsisContent.style.display = 'none';
    ellipsis.appendChild(ellipsisContent);

    dateContainer.appendChild(ellipsis);

    ellipsisIcon.addEventListener('click', () => {
        ellipsisContent.style.display = ellipsisContent.style.display === 'none' ? 'block' : 'none';
        // editDateBTN.style.display = editDateBTN.style.display === 'none' ? 'block' : 'none';
        // deleteDateBTN.style.display = deleteDateBTN.style.display === 'none' ? 'block' : 'none';
    });


    dateHorizontal.appendChild(dateContainer);
    isDisplayArrow();
}


// JavaScript code to observe container size changes and apply corresponding classes
const container = document.querySelector('.date-horizontal');
const leftArrow = document.querySelector('i.fa-chevron-left');
const rightArrow = document.querySelector('i.fa-chevron-right');

leftArrow.addEventListener('click', () => {
    console.log('left arrow clicked');
    container.scrollLeft -= container.clientWidth;
    startOffset -= 1;
    if (startOffset < 0) {
        startOffset = 0;
    }
    isDisplayArrow();
});

rightArrow.addEventListener('click', () => {
    console.log('right arrow clicked');
    container.scrollLeft += container.clientWidth/currentItems;
    startOffset += 1;
    if (startOffset > container.children.length) {
        startOffset = container.children.length;
    }
    isDisplayArrow();
});

let startOffset = 0;
let currentItems = 5;
const observer = new ResizeObserver(entries => {
    for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width > 870) {
            container.classList.add('large');
            container.classList.remove('small');
            container.classList.remove('medium');
            container.classList.remove('xsmall');
            container.classList.remove('xxsmall');
            currentItems = 5;
        } else if (width > 650) {
            container.classList.add('medium');
            container.classList.remove('small');
            container.classList.remove('large');
            container.classList.remove('xsmall');
            container.classList.remove('xxsmall');
            currentItems = 4;


        } else if (width > 360) {
            container.classList.add('small');
            container.classList.remove('medium');
            container.classList.remove('large');
            container.classList.remove('xsmall');
            container.classList.remove('xxsmall');
            currentItems = 3;
        }
        else if (width > 200) {
            container.classList.add('xsmall');
            container.classList.remove('medium');
            container.classList.remove('large');
            container.classList.remove('small');
            container.classList.remove('xxsmall');
            currentItems = 2;
        }
        else {
            container.classList.add('xxsmall');
            container.classList.remove('medium');
            container.classList.remove('large');
            container.classList.remove('small');
            container.classList.remove('xsmall');
            currentItems = 1;
        }
        console.log(`currentItems: ${currentItems}`);
        isDisplayArrow();
    }
});

observer.observe(container);


// left and right arrow
const isDisplayArrow = () => {
    const dateContainer = document.querySelectorAll('.date-container');
    if (dateContainer.length === 0) {
        leftArrow.style.display = 'none';
        rightArrow.style.display = 'none';
        return;
    }
    if (dateContainer.length <= currentItems) {
        leftArrow.style.display = 'none';
        rightArrow.style.display = 'none';
        return;
    }
    if (startOffset === 0) {
        leftArrow.style.display = 'none';
        rightArrow.style.display = 'block';
        return;
    }
    if (dateContainer.length - startOffset <= currentItems) {
        leftArrow.style.display = 'block';
        rightArrow.style.display = 'none';
        return;
    }
    leftArrow.style.display = 'block';  
    rightArrow.style.display = 'block';
}

