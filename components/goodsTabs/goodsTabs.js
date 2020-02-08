// components/goodsTabs/goodsTabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTabs:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(e){
      // console.log(e)
      let currentTabs = e.currentTarget.dataset.index
      this.setData({
        currentTabs
      })
    //  console.log(this.data.currentTabs)
      this.triggerEvent("handleIndexChange", currentTabs)
    }
  }
})
