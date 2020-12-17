(function htmlFontSize() {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var width = w > h ? h : w;
    width = width > 750 ? 750 : width;
    var fz = ~~((width * 100000) / 75) / 10000;
    document.getElementsByTagName('html')[0].style.cssText = 'font-size: ' + fz + 'px !important';
    var realfz = ~~(+window.getComputedStyle(document.getElementsByTagName('html')[0]).fontSize.replace('px', '') * 10000) / 10000;
    if (fz !== realfz) {
        document.getElementsByTagName('html')[0].style.cssText = 'font-size: ' + fz * (fz / realfz) + 'px !important';
    }
})();
