<!--
sudo /usr/local/mysql/support-files/mysql.server start
-->
<template>
  <div class="container">
    <section class="intro">
      <h1>歡迎使用股票分析系統</h1>
      <p>這是一個強大的股票分析系統，幫助您做出明智的投資決策。</p>
    </section>

    <section class="about">
      <h2>關於開發者</h2>
      <p>我是一名熱衷於程式設計和股票分析的開發者，致力於為用戶提供優質的分析工具。</p>
    </section>

    <section class="demo">
      <h2>Demo 影片</h2>
      <video controls>
        <source src="path/to/demo.mp4" type="video/mp4">
        您的瀏覽器不支援 HTML5 影片標籤。
      </video>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.intro, .about, .demo {
  margin-bottom: 40px;
}

h1, h2 {
  color: #333;
}

p {
  color: #666;
  line-height: 1.6;
}

video {
  width: 100%;
  height: auto;
}

/* 响应式设计 */
@media (max-width: 600px) {
  .container {
    padding: 10px;
  }

  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 20px;
  }

  p {
    font-size: 16px;
  }
}
</style>
