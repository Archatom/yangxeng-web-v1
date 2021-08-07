// 產品列表
const productList = [
    {
        id: '1',
        title: '產品一',
        price: 10,
        img: 'https://picsum.photos/id/999/1200/600',
        tags: ['生活用品', '工具']
    },
    {
        id: '2',
        title: '產品二',
        price: 60,
        img: 'https://picsum.photos/id/1070/1200/600',
        tags: ['藥妝']
    },
    {
        id: '3',
        title: '產品三',
        price: 180,
        img: 'https://picsum.photos/id/1071/1200/600',
        tags: ['食品', '飲料']
    },
    {
        id: '4',
        title: '產品四',
        price: 220,
        img: 'https://picsum.photos/id/1072/1200/600',
        tags: ['生活用品', '文具']
    },
    {
        id: '5',
        title: '產品五',
        price: 360,
        img: 'https://picsum.photos/id/1073/1200/600',
        tags: ['工具']
    },
    {
        id: '6',
        title: '產品六',
        price: 360,
        img: 'https://picsum.photos/id/1074/1200/600',
        tags: ['食品']
    },
    {
        id: '7',
        title: '產品七',
        price: 400,
        img: 'https://picsum.photos/id/1075/1200/600',
        tags: ['生活用品', '工具']
    },
    {
        id: '8',
        title: '產品八',
        price: 450,
        img: 'https://picsum.photos/id/1076/1200/600',
        tags: ['生活用品', '工具']
    },
    {
        id: '9',
        title: '產品九',
        price: 520,
        img: 'https://picsum.photos/id/1077/1200/600',
        tags: ['藥妝', '保養']
    }
];

// 設計渲染商品的函數
function renderProductList() {
    // 透過迴圈將produstList內的資料一一取出
    productList.forEach(product => {
        // console.log('[product]', product)
        const card = createProductCardElement(product);
        // console.log("[card]", card);
        // 在目標內容的後面加上card
        // document.getElementById("productRow").innerHTML += card;
        $("#productRow").append(card);
    });
}
// 渲染商品列表至畫面上
renderProductList();

// 設計建立單一商品卡片HTML標籤的函數
function createProductCardElement(product) {
    // 產生一個Bootstrap Card的元件
    // https://getbootstrap.com/docs/4.4/components/card/
    const cardElement = `
        <div class="col-md-4">
            <div class="card mb-3">
                <img src="${product.img}" class="card-img-top">
                <form data-pid="${product.id}" id="form${product.id}" class="add-item-form card-body">
                    <h5 class="card-title">
                        ${product.title}
                    </h5>
                    <p class="card-text">
                        商品價格: $${product.price}
                    </p>
                    <div class="form-group">
                        <label>購買數量</label>
                        <input class="form-control" type="number" min="1" max="20" required>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary" type="submit">
                            <i class="fas fa-cart-plus"></i> 
                            加入購物車
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    // 回傳cardElement
    return cardElement;
}

// 購物車建構式
function Cart() {
    // 屬性:key(字串),itemList(陣列:想購買的品項清單)
    // localStorage key
    this.key = 'example-cart';
    // 購物車的品項
    this.itemList = [];
    // 初始化購物車
    this.initCart = function () {
        // 透過key取得存在localStorage的資料
        const listStr = localStorage.getItem(this.key);
        // 將字串還原成物件(陣列)
        const itemList = JSON.parse(listStr);
        // 第一次拜訪 null
        // 過去如果操作過 [{},{},{}]
        console.log("[從localStorage取回的]", itemList);
        // 如果itemList存在 (不是null也不是undefine)
        if (itemList) {
            // 把還原回來的物件作為購物車的品項清單
            this.itemList = itemList;
        }
        // 渲染畫面
        this.render();
    }
    // 傳入商品id與數量並新增商品至購物車
    this.addItem = function (pid, amount) {
        console.log("新增品項", pid, amount);
        // 建構一個購物車品項資料
        // { title: 品名, price: 單價, amount: 數量, createdAt: 新增時間 }
        // 從productList 裡找到一個id等於pid的元素
        const product = productList.find(product => product.id == pid);
        console.log("商品詳情", product);
        const item = {
            // id: product.id,
            // title: product.title,
            // price: product.price,
            // img: product.img,
            // 把product所有的屬性與值移植到item內
            ...product,
            // amount: amount
            amount,
            // 時間戳記
            createdAt: new Date().getTime()
        };
        console.log("[新品項]", item);
        //把品項加到清單內
        this.itemList.push(item);
        // 渲染購物車
        this.render();
    }
    // TODO: 至購物車刪除於購物車內指定索引商品
    this.deleteItem = function (i) {

    }
    // TODO: 清空購物車
    this.emptyCart = function () {
        // 還原itemList
        this.itemList = [];
        // 渲染資料
        this.render();
    }
    // 更新資料到localStorage
    this.updateDataToStorage = function () {
        // 取得this.itemList轉為文字的結果
        const listStr = JSON.stringify(this.itemList);
        // 把字串化的購物清單存到localStorage內
        localStorage.setItem(this.key, listStr);
    }
    // 渲染購物車
    this.render = function () {
        // 儲存資料到LocalStorage
        this.updateDataToStorage();
        // 更新顯示的數字
        // $().text("xxx") => DOM.innerText = "xxx"
        // $().html("<a>xxx</a>") => DOM.innerHTML = "<a>xxx</a>"
        $("#cartNumber").html(this.itemList.length);
        // 選到id是cartTableBody的元素
        const $tbody = $('#cartTableBody');
        // 選到id是cartTableFoot的元素
        const $tfoot = $('#cartTableFoot');
        // 清除畫面上原有$tbody的HTML
        // DOM.innerHTML ="",
        $tbody.empty();
        // 預設購物車總金額是0
        let cartValue = 0;
        // 將目前購物車的項目逐項取出 
        this.itemList.forEach((item, idx) => {
            // 品項價值 = 價格 * 數量
            const itemValue = item.price * item.amount;
            cartValue += itemValue;
            // 將內容渲染至tbody內
            const tr = `<tr>
            <td>
            <button class="delete-btn" data-index="${idx}"> 
            &times;
            </button>
            ${item.title}
            </td>
            <td class="text-right">${item.price}</td>
            <td class="text-right">${item.amount}</td>
            <td class="text-right">${itemValue}</td>
            </tr>`;
            // document.getElementById("cartTableBody").innerHTML += tr;
            $tbody.append(tr);
        });
        // 顯示總金額
        // DOM.innerHTML = ``
        $tfoot.html(
            `<tr>
                <td>總金額</td>
                <td class="text-right" colspan="3">${cartValue}</td>
            </tr>`
        )

    }
}

// 建立一個購物車的實例
const cart = new Cart();
// 初始化流程
cart.initCart();

// 綁定新增商品至購物車的表單送出事件
// .addEventListener("submit")
$(".add-item-form").submit(function (e) {
    e.preventDefault();
    console.log("[準備新增購物車品項]", this);
    // 取得送出表單的商品ID
    // 取得表單標籤屬性 data-pid的值
    // const pid = this.dataset.pid;
    const pid = $(this).attr("data-pid");
    // console.log("[pid]", pid);
    // 取得選擇商品數量
    // let amount = document.querySelector(`#form${pid} input`).value;
    let amount = $(`#form${pid} input`).val();
    //轉成數字
    amount = parseInt(amount);
    // console.log("[數量]", amount);
    cart.addItem(pid, amount);
});

// 綁定清空購物車按鈕的點擊事件
$("#clearCartBtn").click(function () {
    console.log("[準備清空購物車]");
    // 清空購物車
    cart.emptyCart();
});

// TODO: 綁定移除單一品項的點擊事件