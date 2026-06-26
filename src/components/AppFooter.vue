<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-grid">
        <div class="footer-col footer-brand-col">
          <div class="footer-brand">
            <img src="/logo.png" alt="Logo" class="footer-logo" />
            <span class="footer-name">菜头健身</span>
          </div>
          <p class="footer-desc">专业 · 科学 · 前沿的菜头健身，为您提供权威的训练指导与健康知识。</p>
        </div>
        <div class="footer-col">
          <h4>快速导航</h4>
          <a href="/home">首页</a>
          <a href="/news/list">资讯</a>
          <a href="/fitness">训练&饮食</a>
          <a href="/recommendation">发现</a>
        </div>
        <div class="footer-col">
          <h4>用户服务</h4>
          <a href="/profile">个人中心</a>
          <a href="/favorites">我的收藏</a>
          <a href="/learning-progress">学习进度</a>
          <a href="/my-comments">我的评论</a>
        </div>
        <div class="footer-col">
          <h4>联系我们</h4>
          <p>邮箱：contact@fitness.com</p>
          <p>电话：400-888-9999</p>
          <p>地址：北京市朝阳区健身大厦</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© {{ currentYear }} 菜头健身 版权所有 | 京ICP备12345678号 | 仅供学习交流使用</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.app-footer {
  background: var(--color-primary-dark);
  color: rgba(255,255,255,0.7);
  padding: 48px 0 0;
  margin-top: 60px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.3fr;
  gap: 40px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.footer-logo {
  height: 32px;
  width: auto;
  filter: drop-shadow(0 0 8px rgba(27, 107, 58, 0.4));
}

.footer-name {
  font-size: 20px;
  font-weight: 800;
  background: linear-gradient(135deg, #4ADE80, #22C55E);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: var(--font-display);
}

.footer-desc {
  font-size: 14px;
  line-height: 1.7;
  color: rgba(255,255,255,0.5);
}

.footer-col h4 {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 16px 0;
  font-family: var(--font-display);
}

.footer-col a {
  display: block;
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  text-decoration: none;
  padding: 5px 0;
  transition: color 0.2s;
}

.footer-col a:hover {
  color: #4ADE80;
}

.footer-col p {
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  margin: 6px 0;
}

.footer-bottom {
  text-align: center;
  padding: 18px 0;
  font-size: 12px;
  color: rgba(255,255,255,0.35);
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .footer-brand-col {
    grid-column: 1 / -1;
  }
}
</style>
