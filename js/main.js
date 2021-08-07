// 網頁的主程式寫在這裡
new WOW().init();
// $("CSS選擇器")
// 綁定.navbar 裡面的 .nav-link 的點擊事件
$(".navbar .nav-link, #goBackBtn").click(function () {
    $('#collapsibleNavId').removeClass('show');
    console.log("【導覽列按鈕被點了】");
    // 取得當下被點到的按鈕
    console.log(this);
    // 取得此按鈕的移動目標
    // const 宣告有一個資料叫做targetSection
    // 把按鈕href屬性的值擷取出來並存到 targetSection
    const targetSection = $(this).attr("href");
    console.log("移動目標", targetSection);
    // 取得移動目標在y軸上的目標
    const position = $(targetSection).offset().top;
    console.log("移動座標", position)
    // 設定動畫時間
    const duration = 1200;
    // 取得導覽列的高度
    const navbarHeight = $(".navbar").outerHeight();
    console.log("導覽列的高度", navbarHeight)
    // 先停止再執行自動滑動動畫
    // .animate({物件},時間)
    // 逗號是and的意思
    $("html,body").stop().animate({
        scrollTop: position - navbarHeight
    }, duration);
});

// 綁定 .ad-toggle-btn 的點擊事件
$(".ad-toggle-btn").click(function () {
    // alert("按鈕被點了")
    console.log("按鈕被點了");
    // .addClass()  新增class
    // .removeClass()  移除class
    // .toggleClass()  切換class
    $(".ad-box").toggleClass("active");
});

