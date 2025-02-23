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
    videoId: 'F-s6Ike8u4M', // Chỉ cần video ID, không phải URL đầy đủ
    playerVars: {
      'autoplay': 0,
      'controls': 0,
      'loop': 1,
      'playlist': 'F-s6Ike8u4M'  // Đặt playlist là video ID để lặp video
    }
  });
}

$(document).ready(function () {

  envelope.click(function () {
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
