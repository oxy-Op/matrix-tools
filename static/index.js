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


$(document).ready(() => {
    changeColorMode()
    setTheme(getPreferredTheme())
    hideSidbar();
    showSidebar();
    mediaQuery();
})

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