<template>
  <transition name="te-imgpreview">
    <div class="tb-imgpreview"
      v-show="show"
      @click="imgPreviewHideByBg">
      <div class="tb-imgpreview-con">
        <div :style="styleList">
          <img :src="url[urlIndex]" class="tb-imgpreview-img">
        </div>
      </div>
      <div class="tb-imgpreview-toolbar">
        <ul class="tb-imgpreview-ul clearfix">
          <li @click="close()" style="border-bottom: 1px solid rgba(0,0,0,.08)">
            <i class="tb-icon tb-icon-close"></i>
          </li>
          <li :class="{'disabled': url.length <= 1}" @click="changeImage(false)">
            <i class="tb-icon tb-icon-arrow-left"></i>
          </li>
          <li @click="rotatePreviewImage">
            <i class="tb-icon tb-icon-rotate-cw"></i>
          </li>
          <li :class="{'disabled': url.length <= 1}" @click="changeImage(true)">
            <i class="tb-icon tb-icon-arrow-right"></i>
          </li>
          <li :class="{'disabled': this.scaleNum == this.scaleNumArray.length - 1}" @click="scalePreviewImage(true)">
            <i class="tb-icon tb-icon-fullscreen"></i>
          </li>
          <li :class="{'disabled': this.scaleNum == 0}" @click="scalePreviewImage(false)">
            <i class="tb-icon tb-icon-fullscreen-exit"></i>
          </li>
          <li @click="showThumb=!showThumb"  style="border-top: 1px solid rgba(0,0,0,.08)">
            <i class="tb-icon" :class="{'tb-icon-collection-image-o': showThumb, 'tb-icon-collection-image': !showThumb}"></i>
          </li>
        </ul>
        <span class="tb-imgpreview-serial">{{urlIndex + 1}} / {{url.length}}</span>
      </div>
      <div class="tb-imgpreview-thumb" v-if="showThumb">
        <div class="tb-imgpreview-thumb-one" v-for="(urlOne, index) in url" @click="selectOne(index)">
          <img :src="urlOne">
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Emitter from '../../../mixins/emitter';

  export default {
    mixins: [Emitter],

    data () {
      return {
        show: false,
        showThumb: false,
        url: [],
        onClose: null,
        onOpen: null,
        styleList: [],
        urlIndex: 0,
        rotateNum: 0,
        scaleNum: 2,
        scaleNumArray: [0.5, 0.75, 1, 1.5, 2],
        bodyOverflow: ''
      }
    },
    mounted () {
      const bodyEle = document.querySelector('body');
      this.bodyOverflow = bodyEle.style.overflow;
      bodyEle.style.overflow = 'hidden';

      this.imgJsLoad(this.url[this.urlIndex], (code, img) => {
        this.setStyleList();
      });

      this.$watch('urlIndex', () => {
        this.imgJsLoad(this.url[this.urlIndex], (code, img) => {
          this.setStyleList();
        });
      });

      this.addEvent('resize', window, this.setStyleList, false);

      this.addEvent('keydown', document.body, this.handleKey, false);
    },
    beforeDestroy () {
      this.removeEvent('resize', window, this.setStyleList, false);
      this.removeEvent('keydown', document.body, this.handleKey, false);
    },
    methods: {
      handleKey (e) {
        switch (e.keyCode) {
          case 37:
            this.changeImage(false);
            break;
          case 39:
            this.changeImage(true);
            break;
          case 27:
            this.close();
            break;
          case 38:
            this.scalePreviewImage(true);
            break;
          case 40:
            this.scalePreviewImage(false);
            break;
          default:
            break;
        }
        e.preventDefault();
      },
      initImageStyle () {
        this.rotateNum = 0;
        this.scaleNum = 2;
      },
      selectOne (num) {
        this.urlIndex = num;
        this.initImageStyle();
        this.showThumb = false;
      },
      changeImage (type) {
        if (type) {
          if (this.urlIndex !== this.url.length - 1) {
            this.urlIndex++;
          } else {
            this.urlIndex = 0;
          }
        } else {
          if (this.urlIndex !== 0) {
            this.urlIndex--;
          } else {
            this.urlIndex = this.url.length - 1;
          }
        }
        this.initImageStyle();
      },
      rotatePreviewImage () {
        this.rotateNum++;
        this.setStyleList();
      },
      scalePreviewImage (type) {
        if (type) {
          if (this.scaleNum < this.scaleNumArray.length - 1) {
            this.scaleNum++;
            this.setStyleList();
          }
        } else {
          if (this.scaleNum > 0) {
            this.scaleNum--;
            this.setStyleList();
          }
        }
      },
      destroyElement () {
        this.$el.removeEventListener('transitionend', this.destroyElement);
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      },
      imgJsLoad (url, fn) {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          fn(1, img);
        };
        img.onerror = () => {
          fn(0, img);
        };
      },
      setStyleList () {
        const s = [];
        s.push({
          'transform': 'rotate(' + this.rotateNum * 90 + 'deg) scale(' + this.scaleNumArray[this.scaleNum] + ')'
        });
        this.styleList = s;
      },
      checkHasClass (classNames, curClassName) {
        const classNameList = classNames.split(' ');
        for (let i = 0; i < classNameList.length; i++) {
          for (let j = 0; j < curClassName.length; j++) {
            if (classNameList[i] === curClassName[j]) {
              return true;
            }
          }
        }
        return false;
      },
      checkIsImgPreviewBg (node) {
        if (!node) {
          return true;
        } else if (node.className && this.checkHasClass(node.className, ['tb-imgpreview-img', 'tb-imgpreview-toolbar', 'tb-imgpreview-thumb'])) {
          return false;
        } else if (node.className && this.checkHasClass(node.className, ['tb-imgpreview'])) {
          return true;
        }
        return this.checkIsImgPreviewBg(node.parentNode);
      },
      imgPreviewHideByBg (e) {
        if (this.checkIsImgPreviewBg(e.target)) {
          this.close();
        }
      },
      close () {
        const bodyEle = document.querySelector('body');
        bodyEle.style.overflow = this.bodyOverflow;
        this.show = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
        if (typeof this.onClose === 'function') {
          this.onClose(this);
        }
      }
    }
  }
</script>