<template>
  <div
    :id="id"
    :style="{width:width+'px',height:height+'px',margin:'34px auto'}"
    class="m-map"/>
</template>

<script>
export default {
  props: {
    width: {
      type:Number,
      default:300
    },
    height: {
      type:Number,
      default:300
    },
    // 经纬度
    point: {
      type:Array,
      default(){
        return [116.46,39.92]
      }
    }
  },
  data() {
    return {
        // 这里的id是写死的，但是可以写成是动态的id
        // 但是如果在这里动态生成id，在后面在使用时候的id和这个是不一致的
        // 所以，我们在后面生成id，直接用，而不是在这里生成id 后面再用
      id: `map`,
      key: '51fba70c564d284955f247d639730512'
    }
  },
  watch: {
    point: function (val, old) {
      this.map.setCenter(val)
      this.marker.setPosition(val)
    }
  },
//强调：我们在mounted这个地方异步加载，因为我们下面要访问window对象，如果不在mounted中是拿不到window对象的，是会报错的
  mounted() {
    let self = this
    self.id = `map${Math.random().toString().slice(4, 6)}`
    // 异步加载的回调函数，可以起别的名，都行
    // 同步异步加载语法，应用区别：https://lbs.amap.com/api/javascript-api/guide/abc/prepare
    window.onmaploaded = () => {
        // 地图控件的类，实例化的对象
      let map = new window.AMap.Map(self.id, {
        resizeEnable: true, //自适应大小
        zoom: 11,          //初始视窗
        center: self.point
      })
      self.map = map
    //  有了对象，我们添加一个插件
    // Toolbar就是：https://lbs.amap.com/api/javascript-api/guide/overlays/toolbar地图左边像放大的那个地方
      window.AMap.plugin('AMap.ToolBar', () => {
        let toolbar = new window.AMap.ToolBar()
        map.addControl(toolbar)
        // marker漂浮物，就是地图上看见的类似定位 图标的东西，
        let marker = new window.AMap.Marker({
            // 图标固定地址 ，不能写错
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: self.point //此处根据页面数据可以直接传入经纬度进行描点
        })
        self.marker = marker
        marker.setMap(map)
      })
    }
    
    const url = `https://webapi.amap.com/maps?v=1.4.10&key=${self.key}&callback=onmaploaded`
    let jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
  },
}
</script>
