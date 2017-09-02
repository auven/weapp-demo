const postsData = require('../../../data/posts-data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postId: '',
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const postId = options.id;
    this.data.postId = postId;
    const postData = postsData.postList[postId];
    console.log(postData);
    this.setData({postData: postData});

    var postsCollected = wx.getStorageSync('postsCollected');
    if (postsCollected) {
      var collected = postsCollected[postId];
      this.setData({ collected: collected});
    } else {
      var postsCollected = [];
      postsCollected[postId] = false;
      wx.setStorageSync('postsCollected', postsCollected);
    }

    wx.setStorageSync('key', '风暴');
  },

  onCollectionTap(event) {
    var postsCollected = wx.getStorageSync('postsCollected');
    var postCollected = postsCollected[this.data.postId];
    console.log(postCollected);
    postCollected = !postCollected;
    postsCollected[this.data.postId] = postCollected;
    console.log(postCollected);
    
    // this.showToast(postsCollected, postCollected);

    this.showModal(postsCollected, postCollected);
  },

  showToast(postsCollected, postCollected) {
    // 更新文章是否的缓存值
    wx.setStorageSync('postsCollected', postsCollected);
    // 更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    })

    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功'
    });
  },

  showModal(postsCollected, postCollected) {
    const _this = this;

    wx.showModal({
      title: postCollected ? '收藏' : '取消收藏',
      content: postCollected ? '是否收藏该文章' : '是否取消收藏该文章',
      success(res) {
        if (res.confirm) {
          // 更新文章是否的缓存值
          wx.setStorageSync('postsCollected', postsCollected);
          // 更新数据绑定变量，从而实现切换图片
          _this.setData({
            collected: postCollected
          })
        }
      }
    });
  },

  onShareTap(event) {
    const itemList = ['分享到微信好友', '分享到朋友圈', '分享到QQ', '分享到微博'];

    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: function (res) {
        console.log(res.tapIndex)
        wx.showModal({
          title: itemList[res.tapIndex] || '用户点了取消 ' + res.cancel,
          content: '',
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  onMusicTap(event) {
    var postId = this.data.postId;
    const postData = postsData.postList[postId];

    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
      // this.data.isPlayingMusic = false;
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      })

      this.setData({
        isPlayingMusic: true
      })
      // this.data.isPlayingMusic = true;
    }
    
  }

})