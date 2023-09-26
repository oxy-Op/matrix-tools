const getStoredTheme = () => localStorage.getItem('theme')
const setStoredTheme = theme => localStorage.setItem('theme', theme)


const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
        return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
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
    } else {
        document.documentElement.setAttribute('data-bs-theme', theme)
        setStoredTheme(theme)
        setStickyBg(theme)
    }
}




$(document).ready(() => {
    changeColorMode()
    setTheme(getPreferredTheme())
    hideSidbar();
    showSidebar();
})


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
        $('#leftpane').css('width', '0%')
        $('#leftpane').addClass('g-0')
        openSidebar.show(200);
    })
}

function showSidebar() {
    const openSidebar = $('#show-sidebar')
    openSidebar.on('click', function () {
        $('#leftpane').css('width', '')
        $('#leftpane').removeClass('g-0')
        $('#show-sidebar').hide(200);
    })
}