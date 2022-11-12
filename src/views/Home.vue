<template>
  <!-- 搜索框 -->
  <div>
    <div class="input-group mb-3" style="width: 300px; margin: 0 auto">
      <img
        src="/assets/bing.png"
        alt=""
        width="35"
        height="35"
        style="margin-right: 10px"
      />
      <input
        :value="searchContent"
        type="text"
        class="form-control"
        placeholder="搜索一下，你就知道"
      />
      <button
        id="button-addon2"
        class="btn btn-outline-secondary"
        type="button"
        @click="search(searchContent)"
      >
        <i class="fa fa-search"></i>
      </button>
    </div>
  </div>

  <!-- QQ/微信 警告 -->
  <div
    v-if="alertVisible"
    class="alert alert-warning alert-dismissible"
    role="alert"
  >
    你正在使用QQ/微信访问本站，由于限制非腾讯官方网站在QQ/微信内访问导致本导航的部分网站可
    能无法打开，请使用浏览器
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
      @click="alertVisible = false"
    ></button>
  </div>
  <div class="container-lg">
    <!-- 个人网站 -->
    <div v-for="(value, idx) in datas" id="item-container" :key="idx">
      <div class="card item">
        <div class="card-body">
          <h5 :id="value.name" class="class-item-title">{{ value.name }}</h5>
          <div class="container-lg">
            <div
              class="item-container row row-cols-2 row-cols-sm-2 row-cols-md-4"
            >
              <div
                v-for="(item, idx) in value.data"
                id="child-item"
                :key="idx"
                class="col col-item"
                data-md-placement="bottom"
                data-md-toggle="tooltip"
                :title="item.description"
                @click="open(item.link)"
              >
                <div class="card grid" style="padding: 0">
                  <div class="card-body">
                    <div class="card-title">
                      <img
                        class="avatar"
                        :src="item.icon"
                        width="30"
                        height="30"
                      />
                      {{ item.title }}
                    </div>
                    <p class="card-text">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 右侧悬浮菜单 -->
  <!-- <div class="float-menu">
    <button
      class="btn btn-outline-warning"
      type="button"
      @click="() => (isFloatMenuCollapse = !isFloatMenuCollapse)"
    >
      <svg
        t="1665831126620"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1710"
        width="30"
        height="30"
      >
        <path
          d="M232.96 153.6c16.384 0 30.4128 5.632 41.8304 16.896 11.4688 11.264 17.2032 25.1392 17.2032 41.728v45.312c0 16.5888-5.7344 30.6176-17.2032 42.1888a56.832 56.832 0 0 1-41.8816 17.3056h-46.6944a55.808 55.808 0 0 1-41.0112-17.3056A57.6512 57.6512 0 0 1 128 257.536v-45.312c0-16.5888 5.7344-30.5152 17.2032-41.728 11.4688-11.264 25.088-16.896 40.96-16.896h46.7456z m604.8256 0c15.872 0 29.5424 5.632 41.0112 16.896 11.4688 11.264 17.2032 25.1392 17.2032 41.728v45.312c0 16.5888-5.7344 30.6176-17.2032 42.1888a55.808 55.808 0 0 1-40.96 17.3056H461.312a56.832 56.832 0 0 1-41.8816-17.3056 57.6512 57.6512 0 0 1-17.2032-42.1888v-45.312c0-16.5888 5.7344-30.5152 17.2032-41.728 11.4688-11.264 25.3952-16.896 41.8816-16.896h376.4736zM232.96 429.824c16.4864 0 30.464 5.7856 41.8816 17.3568 11.4688 11.52 17.2032 25.6 17.2032 42.1888v45.2608c0 16.0256-5.7344 29.7984-17.2032 41.3184a56.832 56.832 0 0 1-41.8816 17.3056h-46.6944a55.808 55.808 0 0 1-41.0112-17.3056 56.576 56.576 0 0 1-17.2032-41.3184v-45.2608c0-16.5888 5.7344-30.6688 17.2032-42.1888a55.808 55.808 0 0 1 40.96-17.3568h46.7456z m604.8768 0c15.872 0 29.5424 5.7856 41.0112 17.3568 11.4688 11.52 17.2032 25.6 17.2032 42.1888v45.2608c0 16.0256-5.7344 29.7984-17.2032 41.3184a55.808 55.808 0 0 1-40.96 17.3056H461.312a56.832 56.832 0 0 1-41.8816-17.3056 56.576 56.576 0 0 1-17.2032-41.3184v-45.2608c0-16.5888 5.7344-30.6688 17.2032-42.1888a56.832 56.832 0 0 1 41.8816-17.3568h376.4736zM232.96 706.9696c16.4864 0 30.464 5.7856 41.8816 17.3056 11.4688 11.5712 17.2032 25.344 17.2032 41.3184v45.312c0 16.5888-5.7344 30.6176-17.2032 42.1888A56.832 56.832 0 0 1 232.96 870.4h-46.6944a55.808 55.808 0 0 1-41.0112-17.3056 57.6512 57.6512 0 0 1-17.2032-42.1888v-45.312c0-15.9744 5.7344-29.7472 17.2032-41.3184a55.808 55.808 0 0 1 40.96-17.3056h46.7456z m604.8768 0c15.872 0 29.5424 5.7856 41.0112 17.3056 11.4688 11.5712 17.2032 25.344 17.2032 41.3184v45.312c0 16.5888-5.7344 30.6176-17.2032 42.1888a55.808 55.808 0 0 1-40.96 17.3056H461.312a56.832 56.832 0 0 1-41.8816-17.3056 57.6512 57.6512 0 0 1-17.2032-42.1888v-45.312c0-15.9744 5.7344-29.7472 17.2032-41.3184a56.832 56.832 0 0 1 41.8816-17.3056h376.4736z"
          p-id="1711"
        ></path>
      </svg>
    </button>
  </div> -->
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import NavDatas from "@/scripts/NavDatas";

export default class Home extends Vue {
  datas = NavDatas;
  clientWidth = 0; /* 屏幕宽度 */
  isMobile = false;
  isMobileCollapsed = true;
  isFloatMenuCollapse = true; /* 浮动按钮 */
  searchContent = "";

  alertVisible = false; /* 显示警告 */

  isQQ = navigator.appVersion.toLowerCase().match(/QQ\/[0-9]/i)
    ? true
    : false; /* QQ */
  isWechat = navigator.appVersion.toLowerCase().match(/MicroMessenger/i)
    ? true
    : false; /* 微信 */

  created() {
    this.alertVisible = this.isQQ || this.isWechat;
    this.clientWidth = document.body.clientWidth;
    this.isMobile = this.clientWidth <= 600;
  }

  toHash(hash: string) {
    this.isFloatMenuCollapse = true;
    window.location.hash = hash;
  }

  open(url: string) {
    window.location.href = url;
  }

  changeSearchContent(e: any) {
    this.searchContent = e.target.value;
  }

  search(searchContent: string) {
    if (searchContent.length > 0) {
      this.open("https://cn.bing.com/search?ensearch=1&q=" + searchContent);
    }
  }

  searchEnter(e: any, searchContent: string) {
    if (e.keyCode === 13) {
      this.search(searchContent);
    }
  }
}
</script>

<style lang="scss">
#item-container > .item:nth-of-type(n + 1) {
  margin-top: 10px;
}

.col-item .card-text {
  font-size: 14px;
}

/* 隐藏 item 简介超出部分 */
.col-item .card-text {
  white-space: nowrap;
  overflow: hidden;
}

/* 列表 */
.col-item {
  padding: 10px;
  cursor: pointer;
  :hover {
    --bs-border-opacity: 1;
    border-color: rgba(
      var(--bs-primary-rgb),
      var(--bs-border-opacity)
    ) !important;
    .card-title {
      --bs-text-opacity: 1;
      color: rgba(var(--bs-primary-rgb), var(--bs-text-opacity)) !important;
    }

    :hover:not(.card-title):not(.card-text):not(img) {
      box-shadow: 0px 2px 10px
        rgba(var(--bs-primary-rgb), var(--bs-border-opacity));
    }
  }
  .card.grid {
    height: 100%;
  }

  .card-title {
    font-size: 16px;
  }
}

.float-menu {
  z-index: 999;
  position: fixed;
  bottom: 80px;
  right: 30px;
  text-align: right;

  .menu {
    text-align: center;
    margin: 10px;
    padding: 10px;
    background: #fff;
  }
}
</style>
