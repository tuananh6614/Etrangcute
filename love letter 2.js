var envelope = $("#envelope");
var btn_open = $("#open");
var btn_reset = $("#reset");
var heartInterval;
var player;  // Biến chứa đối tượng YouTube player

// Hàm được gọi khi API YouTube sẵn sàng
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '0',
    width: '0',
    videoId: 'dqzghHuaHJg', // Chỉ cần video ID, không phải URL đầy đủ
    playerVars: {
      'autoplay': 0,
      'controls': 0,
      'loop': 1,
      'playlist': 'dqzghHuaHJg'  // Đặt playlist là video ID để lặp video
    }
  });
}

$(document).ready(function () {
  // Đếm lượt truy cập khi trang tải xong
fetch('https://api.countapi.xyz/hit/dongngac8march/visits')
.then(response => response.json())
.then(data => {
  console.log(`Trang web đã được xem ${data.value} lần`);
  // Nếu muốn hiển thị số lượt truy cập trên trang:
  // $('body').append(`<div style="position:fixed;bottom:10px;right:10px;background:white;padding:5px;border-radius:5px;">Số lượt truy cập: ${data.value}</div>`);
});

  envelope.click(function () {
    // Đếm số lần phong bì được mở
fetch('https://api.countapi.xyz/hit/dongngac8march/envelopes_opened')
.then(response => response.json())
.then(data => {
  console.log(`Phong bì đã được mở ${data.value} lần`);
});
    open();
  });
  btn_open.click(function () {
    open();
  });
  btn_reset.click(function () {
    close();
  });

  function open() {
    envelope.addClass("open").removeClass("close");
    // Phát nhạc từ YouTube
    if (player && typeof player.playVideo === 'function') {
      player.playVideo();
    }
    // Bắt đầu tạo tim động liên tục (nếu chưa được tạo)
    if (!heartInterval) {
      heartInterval = setInterval(createHeart, 1000);
    }
  }

  function close() {
    envelope.addClass("close").removeClass("open");
    // Dừng nhạc YouTube
    if (player && typeof player.pauseVideo === 'function') {
      player.pauseVideo();
    }
    // Dừng tạo tim động
    if (heartInterval) {
      clearInterval(heartInterval);
      heartInterval = null;
    }
    // Xóa các tim động hiện có
    $(".dynamic-heart").remove();
  }

  function createHeart() {
    // Tạo phần tử tim mới với kích thước và vị trí ngẫu nhiên
    var heart = $("<div class='heart dynamic-heart'></div>");
    var size = Math.random() * 20 + 20; // kích thước từ 20 đến 40px
    heart.css({
      width: size + "px",
      height: size + "px",
      left: Math.random() * 80 + "%",
      opacity: Math.random() * 0.5 + 0.5
    });
    // Thêm tim vào container .hearts
    $(".hearts").append(heart);
    // Sau khi animation hoàn thành (4s), tự xóa phần tử tim
    setTimeout(function () {
      heart.remove();
    }, 4000);
  }
});
