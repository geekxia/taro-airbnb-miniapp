import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'

import counterStore from './store/counter'

import '@/assets/css/app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  counterStore
}

class App extends Component {

  config = {
    pages: [
      'pages/canvas/canvas',
      'pages/index/index',
      'pages/camera/camera',
      'pages/star/star',
      'pages/message/message',
      'pages/user/user'
    ],
    permission: {
      'scope.userLocation': {
        desc: '你的位置信息将用于小程序位置接口的效果展示'
      }
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      navigationStyle: 'custom'
    },
    tabBar: {
      color: '#515151',
      selectedColor: '#FF5A5F',
      backgroundColor: '#ffffff',
      borderStyle: 'black',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '首页',
          iconPath: 'assets/images/icon/a.png',
          selectedIconPath: 'assets/images/icon/a-on.png'
        },
        {
          pagePath: 'pages/star/star',
          text: '收藏',
          iconPath: 'assets/images/icon/b.png',
          selectedIconPath: 'assets/images/icon/b-on.png'
        },
        {
          pagePath: 'pages/message/message',
          text: '消息',
          iconPath: 'assets/images/icon/c.png',
          selectedIconPath: 'assets/images/icon/c-on.png'
        },
        {
          pagePath: 'pages/user/user',
          text: '我的',
          iconPath: 'assets/images/icon/d.png',
          selectedIconPath: 'assets/images/icon/d-on.png'
        }
      ]
    }
  }

  componentDidMount() {
    // 登录，用code换取后端的token
    Taro.login().then(res=>{
      console.log('login_code', res.code)
    })
    // 获取用户位置授权
    Taro.getSetting().then(res=>{
      if (!res.authSetting['.scope.userLocation']) {
        Taro.authorize({
          scope: 'scope.userLocation'
        }).then(res=>{
          console.log('用户同意位置授权')
        }).catch(err=>{
          console.log('err')
        })
      }
    })
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
