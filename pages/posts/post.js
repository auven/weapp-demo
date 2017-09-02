var postsData = require('../../data/posts-data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad', postsData.postList);

    // 这里居然不能使用this.data.postList = postsData.postList 的方式来赋值。。
    this.setData({
      num: 520,
      postList: postsData.postList
    });

    this.data.num = 521;
  },

  onPostTap(event) {
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  }

})