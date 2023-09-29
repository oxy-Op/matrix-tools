const getStoredTheme = () => localStorage.getItem("theme");
const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
        return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

function bgOpaque(mode) {
    // const mode = document.documentElement.attributes['data-bs-theme'].value
    const bgElement = document.getElementsByClassName("theme");
    for (let x of bgElement) {
        if (mode == "dark") {
            x.classList.add("bg-dark");
            x.classList.remove("bg-light");
        } else {
            x.classList.add("bg-light");
            x.classList.remove("bg-dark");
        }
    }
}

function setStickyBg(theme) {
    const elements = [
        document.getElementsByClassName("sticky-top"),
        document.getElementsByClassName("sticky-bottom"),
        document.getElementsByClassName("fixed-top"),
        document.getElementsByClassName("fixed-bottom"),
    ];

    for (let x of elements) {
        for (let y of x) {
            if (theme == "dark") {
                y.classList.add("bg-dark");
                y.classList.remove("bg-light");
            } else {
                y.classList.add("bg-light");
                y.classList.remove("bg-dark");
            }
        }
    }
}

const setTheme = (theme) => {
    if (
        theme === "auto" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        document.documentElement.setAttribute("data-bs-theme", "dark");
        setStoredTheme("dark");
        setStickyBg("dark");
        bgOpaque("dark");
    } else {
        document.documentElement.setAttribute("data-bs-theme", theme);
        setStoredTheme(theme);
        setStickyBg(theme);
        bgOpaque(theme);
    }
};


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
    changeColorMode();
    setTheme(getPreferredTheme());
    hideSidbar();
    showSidebar();
    mediaQuery();
    localStorage.getItem('matrix') ? addCards(parseInt(localStorage.getItem('matrix'))) : addCards(2);
    // $("#cards-container").append(generateSign())
    switchDimension();
    addMatrix3();
    removeMatrix3();
    checkForMatrix3();
    activeDimension();

});

// ---------------------- Matrix Multiplication------------------------- //


function addCards(
    num,
    dimension = localStorage.getItem("dimension") == "twice" ? 2 : 3
) {
    $("#cards-container").empty();
    for (let i = 1; i <= num; i++) {
        $("#cards-container").append(generateCard(i, dimension));
        $("#cards-container").append(generateSign());
    }
    $('#cards-container').children().last().remove()
}

function addMatrix3() {
    $("#add-matrix").on("click", function () {
        localStorage.setItem("matrix", "3");

        addCards(3);
        checkForMatrix3();
    });
}

function removeMatrix3() {
    $("#remove-matrix").on("click", function () {
        addCards(2);
        localStorage.setItem("matrix", "2");
        checkForMatrix3();
    });
}

function checkForMatrix3() {
    if (localStorage.getItem("matrix") === "3") {
        $("#add-matrix").hide();
        $("#remove-matrix").show();
    } else {
        $("#add-matrix").show();
        $("#remove-matrix").hide();
    }
}

function generateCard(id, dimension) {
    const card = $("<div>", {
        class: "card mb-md-0 mb-4",
        style: "width: 200px;",
    });
    const cardHeader = $("<div>", {
        class: "card-header d-flex justify-content-around",
    }).appendTo(card);
    const cardBody = $("<div>", { class: "card-body w-100" }).appendTo(card);
    const cardFooter = $("<div>", { class: "card-footer" }).appendTo(card);
    const h5 = $("<h5>", { class: "text-center", text: `Matrix ${id}` }).appendTo(
        cardFooter
    );
    cardBody.append(new Matrix(id, dimension).createMatrix());
    return card;
}
class Matrix {
    constructor(id, dimension) {
        this.id = id;
        this.dimension = dimension;
    }

    createMatrix() {
        let matrix = $("<div>", {
            class: "matrix",
            id: "matrix" + this.id.toString(),
        });
        for (let i = 1; i <= this.dimension; i++) {
            matrix.append(this.createRow(i));
        }
        return matrix;
    }
    createRow(nrow) {
        const row = $("<div>", { class: "row w-100" });
        for (let i = 1; i <= this.dimension; i++) {
            row.append(this.createCol(nrow, i));
        }
        return row;
    }

    createCol(row, ncol) {
        const className = this.dimension === 3 ? "col-4" : "col-6";
        const col = $("<div>", { class: className });
        col.append(this.createInput(row, ncol));
        return col;
    }

    createInput(row, col) {
        const input = $("<input>", {
            class: "w-100",
            id: `m${this.id}-${row}-${col}`,
            type: "number",
            min: "-100",
            max: "100",
            value: "0",
            required: true,
        });
        return input;
    }

    getValues() {
        const values = [];
        const rows = $('#matrix' + this.id).children();
        for (let row of rows) {
            const cols = $(row).children();
            const col_values = []
            for (let col of cols) {
                col_values.push($(col).find('input').val());
            }
            values.push(col_values);
        }
        console.log(values);
    }
}



function generateSign() {
    const signDiv = $("<div>", { class: "sign" });
    const cardDiv = $("<div>", { class: "card border-0" }).appendTo(signDiv);
    const cardBodyDiv = $("<div>", { class: "card-body" }).appendTo(cardDiv);
    const svgDiv = $("<div>").appendTo(cardBodyDiv);
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" /></svg>`;
    svgDiv.html(svg)
    return signDiv;
}

function changeDimension(dimension) {
    const id = localStorage.getItem("matrix")
        ? parseInt(localStorage.getItem("matrix"))
        : 2;
    if (dimension === "twice") {
        addCards(id, 2);
        localStorage.setItem("dimension", "twice");
    }
    if (dimension === "thrice") {
        addCards(id, 3);
        localStorage.setItem("dimension", "thrice");
    }
}

function activeDimension() {
    const activeBtn = localStorage.getItem("dimension");
    if (activeBtn === "twice") {
        $(".twice").addClass("active");
        $(".thrice").removeClass("active");
    }
    if (activeBtn === "thrice") {
        $(".thrice").addClass("active");
        $(".twice").removeClass("active");
    }
}

function switchDimension() {
    const twiceBtn = $(".twice");
    const thriceBtn = $(".thrice");
    $(twiceBtn).on("click", function () {
        changeDimension("twice");
        twiceBtn.addClass("active");
        thriceBtn.removeClass("active");
    });

    $(thriceBtn).on("click", function () {
        changeDimension("thrice");
        thriceBtn.addClass("active");
        twiceBtn.removeClass("active");
    });
}

// ------------Responsiveness and Color modes --------------- //

window.onresize = function () {
    mediaQuery();
};

function mediaQuery() {
    var x = window.matchMedia("(max-width: 768px)");
    if (x.matches) {
        // $('#leftpane').css('width', '0')
        $("#leftpane").addClass("g-0");
        $("#show-sidebar").show(200);
        showSidebar(true);
    } else {
        // $('#leftpane').css('width', '')
        $("#leftpane").css("width", "");
        $("#show-sidebar").hide(200);
        showSidebar(false);
    }
}

function changeColorMode() {
    $(".mode-switcher").on("click", function () {
        if (getStoredTheme() === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    });
}

function hideSidbar() {
    const mainRow = $('#main-row');
    const hideSidebarBtn = $("#hide-siderbar");
    const openSidebar = $("#show-sidebar");
    $(hideSidebarBtn).on("click", function () {
        mainRow.removeClass('col-md-9')

        $("#leftpane").css("width", "0");
        $("#leftpane").addClass("g-0");
        openSidebar.show(200);
    });
}

function showSidebar(m = false) {
    const openSidebar = $("#show-sidebar");
    const mainRow = $('#main-row');
    openSidebar.on("click", function () {
        $("#leftpane").css("width", "");
        if (m) {
            $("#leftpane").css("width", "100%");
        }
        mainRow.addClass('col-md-9')
        mainRow.on('transitionend', function () {
            mainRow.removeClass('col-md-12')
            mainRow.off("transitionend");
        })
        $("#leftpane").removeClass("g-0");
        $("#show-sidebar").hide(200);
    });
}
