<template>
  <div>
    <Header v-if="!showMap" name='创建签到'></Header>
    <div v-if="!showMap">
      <van-cell-group>
      <van-field v-model='code' type='text' label='签到码' disabled />
      <van-field v-model='prenum' type='number' label='预期人数' required/>
      <div v-for="item in dcns" :key="item.key">
        <div class="icons">
          <i class="iconfont icon-add-circle-s" @click="addForm"></i>
          <i class="iconfont icon-delete-s" @click="deleteForm(item.key)"></i>
        </div>
        <van-field
          readonly
          clickable
          label='班级人数'
          :value="item.dcn"
          placeholder="选择班级人数"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
      </div>
      <van-field v-model='name' type='text' label='活动名称' placeholder='请输入活动名称' required />
      <van-field
        v-model="start_time"
        readonly="readonly"
        required
        label="开始时间"
        @click="startTimePop=true"
        placeholder="请选择签到开始时间"
      />
      <van-popup v-model="startTimePop" position="bottom" :overlay="true">
        <van-datetime-picker
          v-model="currentDate_start"
          type="datetime"
          @cancel="startTimePop = false"
          @confirm="startTimePop = false"
          @change="startTimeChange"
        />
      </van-popup>
      <van-field
        v-model="end_time"
        readonly="readonly"
        required
        label="结束时间"
        @click="endTimePop=true"
        placeholder="请选择签到结束时间"
      />
      <van-popup v-model="endTimePop" position="bottom" :overlay="true">
        <van-datetime-picker
          v-model="currentDate_end"
          type="datetime"
          @cancel="endTimePop = false"
          @confirm="endTimePop = false"
          @change="endTimeChange"
        />
      </van-popup>
      <van-field
        v-model="late_time"
        readonly="readonly"
        required
        label="迟到时间"
        @click="lateTimePop=true"
        placeholder="请选择迟到时间"
      />
      <van-popup v-model="lateTimePop" position="bottom" :overlay="true">
        <van-datetime-picker
          v-model="currentDate_late"
          type="datetime"
          @cancel="lateTimePop = false"
          @confirm="lateTimePop = false"
          @change="lateTimeChange"
        />
      </van-popup>
      </van-cell-group>
    </div>
    <div>
      <van-field v-if="!showMap" label='签到地点' :placeholder='geo' required @click="showMap = true"/>
      <baidu-map
        :style="mapStyle"
        class="bm-view"
        v-if="showMap"
        :center="center"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        :autoLocation="true"
        @ready="handler"
        @click="getClickInfo"
        @moving="syncCenterAndZoom"
        @moveend="syncCenterAndZoom"
        @zoomend="syncCenterAndZoom"
      >
        <bm-view :style="mapStyle"></bm-view>
        <bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
        </bm-marker>
        <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>
        <bm-control :offset="{width: '10px', height: '10px'}">
          <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 999999}">
            <van-field class="search" type='text' placeholder='请输入地名' />
          </bm-auto-complete>
        </bm-control>
        <bm-local-search @searchcomplete='searchcomplete' :keyword="keyword" :auto-viewport="true" :selectFirstResult="true" style="width:0px;height:0px;overflow: hidden;"></bm-local-search>
      </baidu-map>
      <div class="btn" v-if="showMap">
        <van-button @click="confirm" type="info">确定</van-button>
        <van-button @click="cancel" type="danger">取消</van-button>
      </div>
    </div>
    <van-button v-if="!showMap" @click='create' class='btn' type='primary' size='large'>创建</van-button>
  </div>
</template>
<script>
import Header from '@/components/Header'
import { column } from '../../common/utils'
export default {
  data () {
    return {
      BMap: null,
      name: '',
      prenum: 0,
      end_time: '',
      start_time: '',
      late_time: '',
      geo: `点击选择地点`,
      currentDate_start: '',
      currentDate_end: '',
      currentDate_late: '',
      endTimePop: false,
      startTimePop: false,
      lateTimePop: false,
      showMap: false,
      keyword: '',
      mapStyle: {
        width: '100%',
        height: document.documentElement.clientHeight + 'px'
      },
      center: {lng: null, lat: null},
      zoom: 13.5,
      dcns: [{dcn: '', key: new Date().getTime()}],
      showPicker: false,
      columns: column()
    }
  },
  components: {
    Header
  },
  computed: {
    code () {
      return this.start_time.replace(/\s/g, '').replace(/-/g, '').replace(/:/g, '') + '' + Math.ceil(Math.random() * 1000)
    }
  },
  methods: {
    addForm () {
      this.dcns.push({dcn: '', key: new Date().getTime()})
      console.log(document.querySelectorAll('.icons'))
    },
    deleteForm (key) {
      this.dcns = this.dcns.filter(item => {
        return item.key !== key
      })
    },
    handler ({ BMap, map }) {
      this.BMap = BMap
      let _this = this
      let geo = new BMap.Geolocation()
      geo.getCurrentPosition(r => {
        // var mk = new BMap.Marker(r.point)
        // map.addOverlay(mk);
        // map.panTo(r.point);
        console.log(r)
        _this.center = {lng: r.point.lng, lat: r.point.lng}
      }, {enableHighAccuracy: true})
    },
    onConfirm (value) {
      for (let i of this.dcns) {
        if (i.dcn === '') {
          i.dcn = value.toString()
          this.showPicker = false
          return
        }
      }
      return
      // eslint-disable-next-line no-unreachable
      console.log(this.dcns)
    },
    test (key, dcn) {
      for (let item in this.dcns) {
        if (item.key === key) {
          item.dcn = dcn
        }
      }
    },
    getClickInfo (e) {
      this.center.lng = e.point.lng
      this.center.lat = e.point.lat
      let BMap = this.BMap
      let point = new BMap.Point(e.point.lng, e.point.lat)
      let gc = new BMap.Geocoder()
      let _this = this
      gc.getLocation(point, rs => {
        console.log(rs)
        _this.geo = rs.address
      })
    },
    syncCenterAndZoom (e) {
      const {lng, lat} = e.target.getCenter()
      this.center.lng = lng
      this.center.lat = lat
      // this.zoom = e.target.getZoom()
    },
    confirm () {
      this.showMap = false
    },
    cancel () {
      this.showMap = false
    },
    endTimeChange (e) {
      let endTimeArr = e.getValues()
      this.end_time = `${endTimeArr[0]}-${endTimeArr[1]}-${endTimeArr[2]}  ${endTimeArr[3]}:${endTimeArr[4]}:00`
    },
    startTimeChange (e) {
      let startTimeArr = e.getValues()
      this.start_time = `${startTimeArr[0]}-${startTimeArr[1]}-${startTimeArr[2]}  ${startTimeArr[3]}:${startTimeArr[4]}:00`
    },
    lateTimeChange (e) {
      let lateTimeArr = e.getValues()
      this.late_time = `${lateTimeArr[0]}-${lateTimeArr[1]}-${lateTimeArr[2]}  ${lateTimeArr[3]}:${lateTimeArr[4]}:00`
    },
    create () {
      let data = {}
      data.name = this.name
      data.geo = this.geo
      data.startTime = this.start_time
      data.endTime = this.end_time
      data.lateTime = this.late_time
      data.lng = this.center.lng
      data.lat = this.center.lat
      data.code = this.code
      data.account = this.$store.state.account
      data.prenum = this.prenum
      data.dcns = JSON.stringify(this.dcns)
      console.log(data)
      for (let item in data) {
        if (!data[item]) {
          this.$toast('似乎还有什么没有输入~')
          return false
        }
      }
      if (this.geo === '点击选择地点') {
        this.$toast('请选择签到地点')
        return false
      }
      this.$axios
        .post('/api/create', {
          params: data
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$toast(res.data.msg)
            this.$router.push('/MySetting')
          } else {
            this.$toast(res.data.msg)
          }
        })
    },
    searchcomplete (res) {
      console.log(res)
      let ifm = []
      res.Pq ? ifm = res.Pq : ifm = res.Ir
      this.center.lng = ifm[0].point.lng
      this.center.lat = ifm[0].point.lat
      this.geo = ifm[0].title
    }
  },
  mounted () {
    let list = document.querySelectorAll('.icons')
    for (let item of list) {
      item.parentElement.className = 'parent'
    }
  },
  updated () {
    let list = document.querySelectorAll('.icons')
    for (let item of list) {
      item.parentElement.className = 'parent'
    }
  }
}
</script>
<style lang='less' scoped>
.title {
  margin-left: 1rem
}
p {
  margin-left: 1rem
}
.search {
  width: 100%;
}
.btn {
  position: fixed;
  left: 1rem;
  bottom: 0.5rem;
}
.BMap_noprint {
  position: static !important;
}
.parent {
  position: relative;
}
.icons {
    position: absolute;
    right: 10px;
    top: 8px;
    z-index: 1;
}
</style>
