<template>
  <div v-if="isLoading" class="loader"></div>
  <div v-if="!isMobile" class="container large-screen">
    <!-- 标题 -->

    <!-- Large screen -->
    <header
      class="d-flex flex-wrap justify-content-center py-3 mb-2 border-bottom"
    >
      <a
        href="/"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
      >
        <img width="40" height="40" src="/favicon.ico" />
        <span class="fs-4">{{ title }}</span>
      </a>

      <ul class="nav nav-pills">
        <li v-for="(value, idx) in datas" :key="idx" class="nav-item">
          <a href="javascript:;" class="nav-link" @click="open(value.link)">{{
            value.name
          }}</a>
        </li>
      </ul>
    </header>
  </div>
  <!-- Mobile -->
  <header v-else>
    <nav class="navbar">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img
            class="d-inline-block"
            alt=""
            src="favicon.ico"
            width="40"
            height="40"
          />
          {{ title }}
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse"
          aria-expanded="false"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="collapse" class="collapse navbar-collapse">
          <div class="navbar-nav">
            <div v-for="(value, idx) in datas" :key="idx" class="nav-item">
              <a
                class="nav-link align-text-left"
                href="javascript:;"
                @click="open(value.link)"
                >{{ value.name }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <!-- 路由 -->
  <div class="container-moieo">
    <router-view />
  </div>

  <div class="container">
    <footer class="py-3 mt-4 border-top">
      Powered by&nbsp;<a href="https://angular.io/">Vue.js</a
      >&nbsp;&amp;&nbsp;<a href="https://getbootstrap.com/">Bootstrap 5</a>
      <br />
      Copyright © 2022&nbsp;<a href="https://info.moieo.top">Moieo</a>.
    </footer>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Datas from "@/scripts/NavMenu";
import NavDatas from "@/scripts/NavDatas";

export default class App extends Vue {
  public title: string = "彩虹导航";
  public datas = Datas;
  public navDatas = NavDatas;
  public clientWidth = 0; /* 屏幕宽度 */
  public isMobile = false;
  public isMobileCollapsed = true;
  public isLoading = true;
  public timer: any;

  created() {
    this.clientWidth = document.body.clientWidth;
    this.isMobile = this.clientWidth <= 600;
    this.loading();
  }

  toHash(hash: string) {
    window.location.hash = hash;
  }

  open(url: string) {
    window.location.href = url;
  }

  loading() {
    const that = this;
    that.timer = setInterval(() => {
      if (document.readyState === "complete") {
        that.isLoading = false;
        window.clearInterval(that.timer);
      }
    }, 800);
  }
}
</script>
<style lang="scss">
.large-screen {
  .nav-item a {
    cursor: pointer;
    text-align: center;
  }

  .nav-home {
    padding: 0px;
    li {
      list-style-type: none;
      padding: 8px;
      text-align: center;

      a {
        --bs-text-opacity: 1;
        color: rgba(var(--bs-primary-rgb), var(--bs-text-opacity)) !important;
      }
    }
  }
}

.navbar-toggler {
  :focus {
    border: none;
    box-shadow: none;
  }
  :hover {
    border: none;
    box-shadow: none;
  }
}

footer {
  text-align: center;
  a {
    text-decoration: none;
  }
}

/* 内容容器 */
.container-moieo {
  min-height: 100%;
}

/* 进度条 */
/* From uiverse.io by @satyamchaudharydev */
.loader {
  --height-of-loader: 4px;
  --loader-color: #0071e2;
  width: 100%;
  height: var(--height-of-loader);
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0.2);
  position: relative;
}

.loader::before {
  content: "";
  position: absolute;
  background: var(--loader-color);
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  border-radius: 30px;
  animation: moving 1s ease-in-out infinite;
}

@keyframes moving {
  50% {
    width: 100%;
  }

  100% {
    width: 0;
    right: 0;
    left: unset;
  }
}
</style>
