const getStoredTheme = () => localStorage.getItem('theme')
const setStoredTheme = theme => localStorage.setItem('theme', theme)


const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
        return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function bgOpaque(mode) {
    // const mode = document.documentElement.attributes['data-bs-theme'].value
    const bgElement = document.getElementsByClassName('theme')
    for (let x of bgElement) {
        if (mode == 'dark') {
            x.classList.add('bg-dark')
            x.classList.remove('bg-light')
        }
        else {
            x.classList.add('bg-light')
            x.classList.remove('bg-dark')
        }
    }
}

function setStickyBg(theme) {
    const elements = [document.getElementsByClassName('sticky-top'), document.getElementsByClassName('sticky-bottom'), document.getElementsByClassName('fixed-top'), document.getElementsByClassName('fixed-bottom')]

    for (let x of elements) {
        for (let y of x) {
            if (theme == 'dark') {
                y.classList.add('bg-dark');
                y.classList.remove('bg-light')
            }
            else {
                y.classList.add('bg-light');
                y.classList.remove('bg-dark')
            }
        }
    }
}

const setTheme = theme => {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
        setStoredTheme('dark')
        setStickyBg('dark')
        bgOpaque('dark')
    } else {
        document.documentElement.setAttribute('data-bs-theme', theme)
        setStoredTheme(theme)
        setStickyBg(theme)
        bgOpaque(theme)
    }
}

// ---------------------------------------------------- //

// const thrice_matrix = ```<div class="matrix" id="matrix1">
//     <div class="row w-100">
//         <div class="col-4">
//             <input class="w-100" id="m1-1-1" type="number" min="-100" max="100" value="0" required="">
//         </div>
//         <div class="col-4">
//             <input class="w-100" id="m1-1-2" type="number" min="-100" max="100" value="0" required="">
//         </div>
//         <div class="col-4">
//             <input class="w-100" id="m1-1-3" type="number" min="-100" max="100" value="0" required="">
//         </div>
//     </div>
//     <div class="row w-100">
//         <div class="col-4">
//             <input class="w-100" id="m1-2-1" type="number" min="-100" max="100" value="0" required="">
//         </div>
//         <div class="col-4">
//             <input class="w-100" id="m1-2-2" type="number" min="-100" max="100" value="0" required="">
//         </div>
//         <div class="col-4">
//             <input class="w-100" id="m1-2-3" type="number" min="-100" max="100" value="0" required="">
//         </div>
//     </div>
//     <div class="row w-100">
//         <div class="col-4">
//             <input class="w-100" id="m1-3-1" type="number" min="-100" max="100" value="0" required="">
//         </div>
//         <div class="col-4">
//             <input class="w-100" id="m1-3-2" type="number" min="-100" max="100" value="0" required="">
//         </div>
//         <div class="col-4">
//             <input class="w-100" id="m1-3-3" type="number" min="-100" max="100" value="0" required="">
//         </div>
//     </div>
// </div>```

// const matrix1 = $('.matrix#matrix1');
// const row1 = matrix1.find('.row.w-100').eq(0);
// const input1_1_1 = row1.find('.col-4').eq(0).find('input');
// const input1_1_2 = row1.find('.col-4').eq(1).find('input');
// const input1_1_3 = row1.find('.col-4').eq(2).find('input');

// const row2 = matrix1.find('.row.w-100').eq(1);
// const input1_2_1 = row2.find('.col-4').eq(0).find('input');
// const input1_2_2 = row2.find('.col-4').eq(1).find('input');
// const input1_2_3 = row2.find('.col-4').eq(2).find('input');

// const row3 = matrix1.find('.row.w-100').eq(2);
// const input1_3_1 = row3.find('.col-4').eq(0).find('input');
// const input1_3_2 = row3.find('.col-4').eq(1).find('input');
// const input1_3_3 = row3.find('.col-4').eq(2).find('input');




$(document).ready(() => {
    changeColorMode()
    setTheme(getPreferredTheme())
    hideSidbar();
    showSidebar();
    mediaQuery();
    switchDimension();
})




class Matrix {
    constructor(id) {
        this.id = id;
    }

    createMatrix() {
        let matrix = $('<div>', { class: 'matrix', id: 'matrix' + this.id.toString() });
        for (let i = 1; i <= 3; i++) {
            matrix.append(this.createRow(i));
        }
        return matrix;
    }
    createRow(nrow) {
        const row = $('<div>', { class: 'row w-100' });
        for (let i = 1; i <= 3; i++) {
            row.append(this.createCol(nrow, i));
        }
        return row;
    }

    createCol(row, ncol) {
        const col = $('<div>', { class: 'col-4' });
        col.append(this.createInput(row, ncol));
        return col;
    }

    createInput(row, col) {
        const input = $('<input>', { class: 'w-100', id: `m${this.id}-${row}-${col}`, type: 'number', min: '-100', max: '100', value: '0', required: true });
        return input;
    }
}


function changeDimension(element, dimension) {
    const card = element.parents('.card')
    const cardBody = card.find('.card-body')
    const matrix = cardBody.find('.matrix')

    if (dimension === 'twice') {
        const lastRow = matrix.children().last()
        const firstTwoRows = matrix.children().not(lastRow);
        for (let row of firstTwoRows) {
            const lastCol = $(row).children().last()
            const firstTwoCol = $(row).children().not(lastCol)
            for (let col of firstTwoCol) {
                $(col).removeClass('col-4')
                $(col).addClass('col-6')
            }
            lastCol.remove()
        }
        lastRow.remove()
    }
    if (dimension === 'thrice') {
        cardBody.find('.matrix').html(thrice_matrix)
        console.log(element);
    }
}

function switchDimension() {
    const twiceBtn = $('.twice')
    const thriceBtn = $('.thrice')
    $(twiceBtn).on('click', function () {
        changeDimension(twiceBtn, 'twice')
        twiceBtn.addClass('active')
        thriceBtn.removeClass('active')
    })

    $(thriceBtn).on('click', function () {
        changeDimension(thriceBtn, 'thrice')
        thriceBtn.addClass('active')
        twiceBtn.removeClass('active')
    })
}








window.onresize = (function () {
    mediaQuery()
})

function mediaQuery() {
    var x = window.matchMedia("(max-width: 768px)");
    if (x.matches) {
        // $('#leftpane').css('width', '0')
        $('#leftpane').addClass('g-0')
        $('#show-sidebar').show(200);
        showSidebar(true)
    }
    else {
        // $('#leftpane').css('width', '')
        $('#leftpane').css('width', '')
        $('#show-sidebar').hide(200);
        showSidebar(false)
    }
}


function changeColorMode() {
    $('.mode-switcher').on('click', function () {
        if (getStoredTheme() === 'dark') {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    })
}

function hideSidbar() {
    const hideSidebarBtn = $('#hide-siderbar')
    const openSidebar = $('#show-sidebar')
    $(hideSidebarBtn).on('click', function () {
        $('#leftpane').css('width', '0')
        $('#leftpane').addClass('g-0')
        openSidebar.show(200);
    })
}

function showSidebar(m = false) {
    const openSidebar = $('#show-sidebar')
    openSidebar.on('click', function () {
        $('#leftpane').css('width', '')
        if (m) {
            $('#leftpane').css('width', '100%')
        }

        $('#leftpane').removeClass('g-0')
        $('#show-sidebar').hide(200);
    })
}